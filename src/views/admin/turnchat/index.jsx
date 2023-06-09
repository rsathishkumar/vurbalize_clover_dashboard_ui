import {useEffect, useState} from 'react'
import MarketIcon from "components/icons/MarketIcon";
import ChatIcon from "components/icons/ChatIcon";
import Filters from "../../../components/filters";
import LineChart from "components/charts/LineChart";
import Dropdown from 'react-dropdown';

import Widget from "components/widget/Widget";
import CheckTable from "views/admin/default/components/CheckTable";

const currentTimeMillis = new Date().getTime();
const currentDate = new Date(currentTimeMillis);
const TurnChat = () => {

  const [tableList, setTableList] = useState([]);
  const [metrics, setMetrics] = useState({});
  const [landingPage, setLandingPage] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [columnsDataCheck, setColumnsDataCheck] = useState(false);
  const [isAsending, setIsAsending] = useState(false)
  const [xaxis, setXaxis] = useState([]);
  const [lineChartDataTotalSpent, setLineChartDataTotalSpent] = useState(
    {
      options: {
        chart: {
          id: 'turnchat'
        },
        xaxis: {
          categories: []
        }
      },
      series: [{
        name: 'Total turns',
        data: []
      }]
    }
  )
  const [filters, setFilters] = useState({
    startDate: currentDate - (30 * 24 * 60 * 60 * 1000),
    endDate: currentDate,
    startTime: currentDate.getUTCHours() + ":" + currentDate.getUTCMinutes(),
    endTime: currentDate.getUTCHours() + ":" + currentDate.getUTCMinutes(),
    conversationId: '',
    landingpage: '',
    sort: "DESC",
    sorting: 'logtime',
    reporttype: 'weekly'
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
    if (page === 1) {
      sendRequestToBackend()
    }
    else {
      setPage(1);
    }
  },[filters])

  useEffect(() => {
    sendRequestToBackend()
  },[page])

  function sendRequestToBackend() {
    var date = new Date(filters.startDate);
    var startDate = date.toLocaleDateString('en-US')
    date = new Date(filters.endDate);
    var endDate = date.toLocaleDateString('en-US')
    let object = {
      'startDate': startDate + ' ' + filters.startTime,
      'endDate': endDate + ' ' + filters.endTime,
      'page_no': page,
      'conversation_id': filters.conversationId,
      'landingpage': filters.landingpage,
      'sort': filters.sort,
      'sorting': filters.sorting,
      'reporttype': filters.reporttype
    }
    localStorage.setItem("filters", JSON.stringify(filters));
    getAllConversations(object)
    getChatConversationChartMetrics(object);
  }

  async function __init() {
    var date = new Date(filters.startDate);
    var startDate = date.toLocaleDateString('en-US')
    date = new Date(filters.endDate);
    var endDate = date.toLocaleDateString('en-US')

    let object = {
      'startDate': startDate + ' ' + filters.startTime,
      'endDate': endDate + ' ' + filters.endTime,
      'page_no': 1,
      'sort': "DESC",
      'sorting': 'logtime',
      'reporttype': "weekly"
    }
    await getAllConversations(object);
    await getChatConversationChartMetrics(object);
    await getAllLandingPages();
  }

  function getAllConversations(object) {

    fetch(`${process.env.REACT_APP_APIURL}/conversation_engaged_list`, {
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

    fetch(`${process.env.REACT_APP_APIURL}/chatturns`, {
      method: 'post',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify(object)
     }).then(response => response.json())
     .then(data => {
      setXaxis(data[0]['record_data'])
      setLineChartDataTotalSpent({
        options: {
          chart: {
            id: 'turnchat'
          },
          xaxis: {
            categories: data[0]['record_data']
          }
        },
        series: [{
          name: 'Total turns',
          data: data[0]['record_day']
        }]
      }
      )   
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

      <div className=" w-1/4 pt-10 pb-0">
        <Dropdown options={['weekly', 'daily', 'monthly', 'yearly']} value={filters.reporttype} onChange={(e) => {updateFilterValue({reporttype: e.value})}} placeholder="Select an option" className="font-poppins font-medium text-sm text-secondaryColor" />
      </div>
      <div className="h-[300px] w-2/4 pt-10 pb-0">
      {xaxis &&
      <LineChart
        xaxis={xaxis}
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

export default TurnChat;
