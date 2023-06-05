import {useEffect, useState} from 'react'
import MarketIcon from "components/icons/MarketIcon";
import ChatIcon from "components/icons/ChatIcon";
import Filters from "../../../components/filters";
import LineChart from "components/charts/LineChart";
import { lineChartOptionsTotalSpent } from "../../../variables/charts";
import { lineChartDataTotalSpent } from "../../../variables/charts";

import Widget from "components/widget/Widget";
import CheckTable from "views/admin/default/components/CheckTable";

const ChatEngagement = () => {

  const [tableList, setTableList] = useState([]);
  const [metrics, setMetrics] = useState({});
  const [landingPage, setLandingPage] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [columnsDataCheck, setColumnsDataCheck] = useState(false);
  const [isAsending, setIsAsending] = useState(false)
  const [xaxis, setXaxis] = useState(false);
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
    getChatConversationChartMetrics(object);
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
      'page_no': page,
      'conversation_id': filters.conversationId,
      'landingpage': filters.landingpage,
      'sort': filters.sort,
      'sorting': filters.sorting
    }

    getAllConversations(object)
  },[page])

  async function __init() {
    let filters_object = localStorage.getItem("filters");
    let filters_list = filters;
    if (filters_object) {
      filters_list = JSON.parse(filters_object);
      filters_list.startDate = new Date(filters_list.startDate);
      filters_list.endDate = new Date(filters_list.endDate);
      setFilters(filters_list);
    }
    var date = new Date(filters_list.startDate);
    var startDate = date.toLocaleDateString('en-US')
    date = new Date(filters_list.endDate);
    var endDate = date.toLocaleDateString('en-US')
    let object = {
      'startDate': startDate + ' ' + filters_list.startTime,
      'endDate': endDate + ' ' + filters_list.endTime,
      'page_no': 1,
      'sort': "DESC",
      'sorting': 'logtime'
    }
    await getAllConversations(object);
    await getChatConversationChartMetrics(object);
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

  function getChatConversationChartMetrics(object) {

    fetch(`${process.env.REACT_APP_APIURL}/chartEngagementChartDetails`, {
      method: 'post',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify(object)
     }).then(response => response.json())
     .then(data => {
      lineChartOptionsTotalSpent.xaxis.categories = data[0]['record_data']
      setXaxis(true)
      /*
      setLineChartDataTotalSpent({
        name: "Chat Engagement",
        data: data[0]['record_day'],
        color: "#4318FF",
      })
      */
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

      <div className="h-[300px] w-2/4 pt-10 pb-0">
      {xaxis &&
      <LineChart
        xaxis={xaxis}
        options={lineChartOptionsTotalSpent}
        series={lineChartDataTotalSpent}
      />
      }
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

export default ChatEngagement;
