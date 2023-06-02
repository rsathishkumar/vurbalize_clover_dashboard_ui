import {useEffect, useState} from 'react'
import MarketIcon from "components/icons/MarketIcon";
import ChatIcon from "components/icons/ChatIcon";
import Filters from "../../../components/filters";

import Widget from "components/widget/Widget";
import CheckTable from "views/admin/default/components/CheckTable";

const Dashboard = () => {

  const [tableList, setTableList] = useState([]);
  const [metrics, setMetrics] = useState({});
  const [landingPage, setLandingPage] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [columnsDataCheck, setColumnsDataCheck] = useState(false);
  const [isAsending, setIsAsending] = useState(false)
  const [filters, setFilters] = useState({
    startDate: new Date().setDate(new Date().getDate() - 30),
    endDate: new Date(),
    startTime: "10:00",
    endTime: new Date(),
    conversationId: '',
    landingpage: '',
    sort: "DESC",
    sorting: 'logtime'
  })

  useEffect(() => {
    __init()
  },[])


  function updateFilterValue(obj) {
    setFilters(prevState => ({
      ...prevState,
      ...obj
    }));
  }


  useEffect(() => {
    var start_date = new Date(filters.startDate);
    var startDate = start_date.toLocaleDateString('en-US')
    var date = new Date(filters.endDate);
    var endDate = date.toLocaleDateString('en-US')
    var endTime = date.getHours() + ':' + date.getMinutes()
    let object = {
      'startDate': startDate + ' ' + filters.startTime,
      'endDate': endDate + ' ' + endTime,
      'page_no': 1,
      'conversation_id': filters.conversationId,
      'landingpage': filters.landingpage,
      'sort': filters.sort,
      'sorting': filters.sorting
    }

    getAllConversations(object)
    getAllMetrics(object);
  },[filters])

  useEffect(() => {
    var date = new Date(filters.startDate);
    var startDate = date.toLocaleDateString('en-US')
    date = new Date(filters.endDate);
    var endDate = date.toLocaleDateString('en-US')
    var endTime = date.getHours() + ':' + date.getMinutes()
    let object = {
      'startDate': startDate + ' ' + filters.startTime,
      'endDate': endDate + ' ' + endTime,
      'page_no': page
    }

    getAllConversations(object)
  },[page])

  async function __init() {
    var date = new Date(filters.startDate);
    var startDate = date.toLocaleDateString('en-US')
    date = new Date(filters.endDate);
    var endDate = date.toLocaleDateString('en-US')
    var endTime = date.getHours() + ':' + date.getMinutes()
    let object = {
      'startDate': startDate + ' ' + filters.startTime,
      'endDate': endDate + ' ' + endTime,
      'page_no': 1,
      'sort': "DESC",
      'sorting': 'logtime'
    }
    await getAllConversations(object);
    await getAllMetrics(object);
    await getAllLandingPages();
  }

  function getAllConversations(object) {

    fetch(`${process.env.REACT_APP_APIURL}/conversation_list`, {
      method: 'post',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify(object)
     }).then(response => response.json())
     .then(data => {
       setColumnsDataCheck(true)
      setTableList(data[0]['record'])
      setTotal(data[0]['total'])
     })
     .catch((error) => {
      console.error(error);
    });
  }

  function getAllMetrics(object) {

    fetch(`${process.env.REACT_APP_APIURL}/conversation_metrics`, {
      method: 'post',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify(object)
     }).then(response => response.json())
     .then(data => {
      setMetrics(data[0])
     })
     .catch((error) => {
      console.error(error);
    });
  }

  function getAllLandingPages() {

    fetch(`${process.env.REACT_APP_APIURL}/landing_pages`, {
      method: 'post',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({})
     }).then(response => response.json())
     .then(data => {
      const uniqueArray = Array.from(new Set(data));
      setLandingPage(uniqueArray)
     })
     .catch((error) => {
      console.error(error);
    });
  }

  async function sortFunction(field) {
    let asending = true;
    await setIsAsending((prevValue) => {
      asending = prevValue;
      return prevValue;
    });

    await setIsAsending(!asending)
    updateFilterValue({'sort':(asending?"ASC":"DESC"), 'sorting':field})
  }


  return (
    <div>
      {/* Card widget */}
      <div className="abc py-5 mx-auto p-2">
                <Filters
                  filters={filters}
                  setFilters={updateFilterValue}
                  landingPage={landingPage}
                  total={total}
                />
      </div>

      <div className="mt-3 grid grid-cols-1 gap-[22px] md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-3 3xl:grid-cols-3">
        <Widget
          icon={<ChatIcon className="h-7 w-7 text-white" />}
          title={"Chat Engagement"}
          subtitle={
            (metrics.unique_conversation != null)?
              Math.round(metrics.unique_conversation/metrics.unique_session,2):"-"
            }
        />
        <Widget
          icon={<MarketIcon className="h-6 w-6 text-white" />}
          title={"Chat Conversion"}
          subtitle={
            (metrics.unique_conversation != null)?
              Math.round(metrics.tot_conversation/metrics.unique_conversation,2):"-"
            }
        />
        <Widget
          icon={<MarketIcon className="h-7 w-7 text-white" />}
          title={"Chat Ratings"}
          subtitle={""}
        />
        <Widget
          icon={<MarketIcon className="h-6 w-6" />}
          title={"Leads per 1000 visitors"}
          subtitle={
            (metrics.unique_conversation != null)?
              Math.round(metrics.leads*1000/metrics.unique_conversation,2):"-"
            }
        />
        <Widget
          icon={<MarketIcon className="h-7 w-7" />}
          title={"Avg # of turns/chats"}
          subtitle={
            (metrics.unique_conversation != null)?
              Math.round((metrics.unique_conversation / metrics.tot_conversation) * 100, 2):"-"
            }
        />
        <Widget
          icon={<MarketIcon className="h-6 w-6" />}
          title={"Avg time to answer"}
          subtitle={(metrics.avg_turn_time != null?metrics.avg_turn_time:"-")}
        />
      </div>

      <div className="mt-5 grid grid-cols-1 gap-1">
        <div>
          <CheckTable
            columnsData={columnsDataCheck}
            tableData={tableList}
            setPage={setPage}
            total={total}
            page={page}
            sortFunction={sortFunction}
          />
        </div>

      </div>
    </div>
  );
};

export default Dashboard;
