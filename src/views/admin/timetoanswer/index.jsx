import {useEffect, useState} from 'react'
import Filters from "../../../components/filters";
import LineChart from "components/charts/LineChart";
import Dropdown from 'react-dropdown';

import CheckTable from "views/admin/default/components/CheckTable";

const currentTimeMillis = new Date().getTime();
const currentDate = new Date(currentTimeMillis);
const TimetoAnswer = () => {

  const [tableList, setTableList] = useState([]);
  const [landingPage, setLandingPage] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [columnsDataCheck, setColumnsDataCheck] = useState(false);
  const [isAsending, setIsAsending] = useState(false)
  const [xaxis, setXaxis] = useState([]);
  const [filterChange, setFilterChange] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [lineChartDataTotalSpent, setLineChartDataTotalSpent] = useState(
    {
      options: {
        chart: {
          id: 'timetoanswer'
        },
        xaxis: {
          categories: []
        }
      },
      series: [{
        name: 'Avg response time',
        data: []
      }]
    }
  )
  const [filters, setFilters] = useState({
    startDate: currentDate - (30 * 24 * 60 * 60 * 1000),
    endDate: currentDate,
    startTime: currentDate.getUTCHours() + ":" + currentDate.getUTCMinutes(),
    endTime: currentDate.getUTCHours() + ":" + currentDate.getUTCMinutes(),
    conversationId: [],
    suId:[],
    turnID:{},
    convT2A:{},
    convOutcome:[],
    MarketoLead:[],
    chatRating:{},
    chatFeedback:[],
    utm_source:[],
    utm_medium:[],
    utm_campaign:[],
    utm_placement:[],
    utm_term:[],
    utm_content:[],
    utm_adplacement:[],
    utm_match:[],
    utm_device:[],
    utm_location:[],
    utm_target:[],
    gclid:[],
    device_type:[],
    apptDate:{from:'',to:''},
    landingpage: [],
    sort: "DESC",
    sorting: 'logtime',
    reporttype: 'weekly'
  })

  useEffect(() => {
    var localstorage = localStorage.getItem('filters')
    if (localstorage !== "" && localstorage !== null) {
      var filters = JSON.parse(localStorage.filters);
      filters.startDate = new Date(filters.startDate)
      filters.endDate = new Date(filters.endDate)
      filters.reporttype = 'weekly'
      console.log(filters)
      updateFilterValue(filters)
      getAllLandingPages();
      return;
    }
    else {
      __init()
    }
  },[])


  function updateFilterValue(obj) {
    setIsLoading(true);
    setFilters(prevState => ({
      ...prevState,
      ...obj
    }));
    setFilterChange(true)
  }

  useEffect(() => {
    if (filterChange === true) {
      setFilterChange(false);
      sendRequestToBackend()
    }
  },[filterChange])

  function changePage(page_no) {
    sendRequestToBackend(page_no);
  }

  function sendRequestToBackend(page_no='') {
    var date = new Date(filters.startDate);
    var startDate = date.toLocaleDateString('en-US')
    date = new Date(filters.endDate);
    var endDate = date.toLocaleDateString('en-US')
    let object = {
      'startDate': startDate + ' ' + filters.startTime,
      'endDate': endDate + ' ' + filters.endTime,
      'page_no': page_no !== ''?page_no:page,
      'landingpage': filters.landingpage,
      'sort': filters.sort,
      'sorting': filters.sorting,
      'reporttype': filters.reporttype,
      'conversation_id': filters.conversationId,
      'su_id': filters.suId,
      'apptDate': filters.apptDate,
      'turn_id':filters.turnID,
      'convT2A':filters.convT2A,
      'utmParam':filters.utmParam,
      'convOutcome':filters.convOutcome,
      'MarketoLead':filters.MarketoLead,
      'chatRating':filters.chatRating,
      'chatFeedback':filters.chatFeedback,
      'utm_source':filters.utm_source,
      'utm_medium':filters.utm_medium,
      'utm_campaign':filters.utm_campaign,
      'utm_placement':filters.utm_placement,
      'utm_term':filters.utm_term,
      'utm_content':filters.utm_content,
      'utm_adplacement':filters.utm_adplacement,
      'utm_match':filters.utm_match,
      'utm_device':filters.utm_device,
      'utm_location':filters.utm_location,
      'utm_target':filters.utm_target,  
      'gclid':filters.gclid,
      'device_type':filters.device_type
    }
    localStorage.setItem("filters", JSON.stringify(filters));
    getChatConversationChartMetrics(object);
    getAllConversations(object)
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
    await getChatConversationChartMetrics(object);
    await getAllConversations(object);
    await getAllLandingPages();
  }

  function getAllConversations(object) {

    object['page_type'] = "engage";
    fetch(`${process.env.REACT_APP_APIURL}/conversation_engaged_list`, {
      method: 'post',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify(object)
     }).then(response => response.json())
     .then(data => {
      setIsLoading(false);
       setColumnsDataCheck(true)
      setTableList(data[0]['record'])
      setTotal(data[0]['total'])
     })
     .catch((error) => {
      console.error(error);
    });
  }

  function getChatConversationChartMetrics(object) {

    fetch(`${process.env.REACT_APP_APIURL}/timetoanswer`, {
      method: 'post',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify(object)
     }).then(response => response.json())
     .then(data => {
      setXaxis(data[0]['record_data'])
      setLineChartDataTotalSpent({
        options: {
          chart: {
            id: 'timetoanswer'
          },
          xaxis: {
            categories: data[0]['record_data']
          }
        },
        series: [{
          name: 'Avg response time',
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
      var list = []
      uniqueArray.map((item,index) => {
        list.push({"value":item, "label":item})
      })
      setLandingPage(list)
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
                  filterChange={filterChange}
                />
      </div>

      <div className=" w-1/4 pt-10 pb-0">
        <Dropdown options={['weekly', 'daily', 'monthly', 'yearly']} value={filters.reporttype} onChange={(e) => {updateFilterValue({reporttype: e.value})}} placeholder="Select an option" className="font-poppins font-medium text-sm text-secondaryColor" />
      </div>
      <div className={`h-[300px] ${filters.reporttype === 'daily'?"w-full":"w-2/4"} pt-10 pb-0`}>
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
            setPage={(page)=>{setPage(page);changePage(page)}}
            total={total}
            page={page}
            sortFunction={sortFunction}
            filters={filters}
            isLoading={isLoading}
          />
        </div>

      </div>
    </div>
  );
};

export default TimetoAnswer;
