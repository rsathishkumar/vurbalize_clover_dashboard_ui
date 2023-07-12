import {useEffect, useState, useRef} from 'react'
import MarketIcon from "components/icons/MarketIcon";
import ChatIcon from "components/icons/ChatIcon";
import ChatConversionIcon from "components/icons/ChatConversionIcon";
import ChatRatingIcon from "components/icons/ChatRatingIcon";
import ChatLeadIcon from "components/icons/ChatLeadIcon";
import TurnsChatIcon from "components/icons/TurnsChatIcon";
import AvgTimeIcon from "components/icons/AvgTimeIcon";
import Filters from "../../../components/filters";

import Widget from "components/widget/Widget";
import CheckTable from "views/admin/default/components/CheckTable";
import { CSVLink } from "react-csv";

const currentTimeMillis = new Date().getTime();
const currentDate = new Date(currentTimeMillis);
var records_list = [];

const Dashboard = () => {

  const csvLinkEl = useRef(null);

  const [tableList, setTableList] = useState([]);
  const [metrics, setMetrics] = useState({});
  const [landingPage, setLandingPage] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [columnsDataCheck, setColumnsDataCheck] = useState(false);
  const [isAsending, setIsAsending] = useState(false)
  const [filterChange, setFilterChange] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [csvData, setCsvData] = useState([])
  const [isDownloading, setIsDownloading] = useState(false)
  const headers = [
    { label: "Conversation #", key: "conversation_id" },
    { label: "Date Created", key: "logtime" },
    { label: "Outcome", key: "conv_outcome" },
    { label: "User Rating", key: "user_rating" },
    { label: "Turn Count", key: "turn_user" },
    { label: "Time to Answer", key: "conv_rate" },
    { label: "Landing Page", key: "landing_page" },
    { label: "Device", key: "device_type" },
    { label: "UTM Source", key: "utm_source" },
    { label: "UTM Medium", key: "utm_medium" },
    { label: "UTM Term", key: "utm_term" },
    { label: "UTM Campaign", key: "utm_campaign" },
    { label: "Avg User Words/Turn", key: "avg_total_user_words" },
    { label: "Avg Agent Words/Turn", key: "avg_total_bot_words" },
    { label: "Tot. Agent Words", key: "total_words_in_message_bot" },
    { label: "Marketo Lead #", key: "" },
    { label: "Appt Date", key: "" },
    { label: "Appt Time", key: "" },
    { label: "Calendly", key: "calendly_link" },
    { label: "User #", key: "su_id" },
    { label: "Session #", key: "session_id" },
    { label: "Referrer", key: "referrer_id" },
    { label: "Google Click ID", key: "gclid" }
  ]
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
    apptDate:{from:'',to:''},
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
    landingpage: [],
    sort: "DESC",
    sorting: 'logtime'
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
    console.log("updated valeus1",obj)
    setFilterChange(true)
  }

  useEffect(() => {
    if (filterChange === true) {
      console.log("updated valeus2",filters)
      setFilterChange(false);
      sendRequestToBackend()
    }
  },[filterChange])

  function changePage(page_no) {
    sendRequestToBackend(page_no);
  }

  function getAllFilterValues(page_no) {
    var date = new Date(filters.startDate);
    var startDate = date.toLocaleDateString('en-US')
    date = new Date(filters.endDate);
    var endDate = date.toLocaleDateString('en-US')
    let object = {
      'startDate': startDate + ' ' + filters.startTime,
      'endDate': endDate + ' ' + filters.endTime,
      'page_no': page_no != ''?page_no:page,
      'landingpage': filters.landingpage,
      'sort': filters.sort,
      'sorting': filters.sorting,
      'conversation_id': filters.conversationId,
      'su_id': filters.suId,
      'apptDate': filters.apptDate,
      'utmParam':filters.utmParam,
      'turn_id':filters.turnID,
      'convT2A':filters.convT2A,
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
    return object;
  }

  function sendRequestToBackend(page_no='') {
    var object = getAllFilterValues(page_no);
    localStorage.setItem("filters", JSON.stringify(filters));
    getAllConversations(object)
    getAllMetrics(object);
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
      setIsLoading(false);
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

  const getConversatinCSV = (page = 1) => {
    var object = getAllFilterValues(page);
    object['page_limit'] = 300;
    
    fetch(`${process.env.REACT_APP_APIURL}/conversation_list`, {
      method: 'post',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify(object)
     }).then(response => response.json())
     .then(async (data) => {
      let record = data[0]['record'];
      let total = data[0]['total'];

      if (record.length > 0) {
       // await setCsvData((prevSelectedValues) => [...prevSelectedValues, ...record]);
        records_list = [...records_list, ...record];
        console.log(records_list)
        if (page * 300 < total) {
          await getConversatinCSV(page+1)
        }
        else {
          await setCsvData(records_list);
          setTimeout(() => {csvLinkEl.current.link.click();setIsDownloading(false);}, 2000)
          records_list = [];
        }
      }
     })
     .catch((error) => {
      console.error(error);
    });
  }

  const downloadReport = async () => {
    setIsDownloading(true)
    const data = await getConversatinCSV(1);
  }

  return (
    <div className='relative'>
      {/* Card widget */}
      
      <div className="abc py-5 mx-auto p-2">
                <Filters
                  filters={filters}
                  setFilters={(obj) => updateFilterValue(obj)}
                  landingPage={landingPage}
                  total={total}
                  filterChange={filterChange}
                />
      </div>

      <div className="mt-3 grid grid-cols-1 gap-[22px] md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-3 3xl:grid-cols-3">
        <Widget
          icon={<ChatIcon className="h-7 w-7 text-white" />}
          title={"Chat Engagement"}
          url={"/admin/chat_engagement"}
          subtitle={
            (Object.keys(metrics).length !== 0 && metrics.user_engaged !== null && metrics.user_engaged !== 0)?
              ((metrics.user_engaged/metrics.unique_conversation) * 100).toFixed(2) + '%':"-"
            }
        />
        <Widget
          icon={<ChatConversionIcon className="h-6 w-6 text-white" />}
          title={"Chat Conversion"}
          url={"/admin/chat_conversation"}
          subtitle={
            (Object.keys(metrics).length !== 0 && metrics.leads !== null && metrics.user_engaged !== 0 && metrics.user_engaged !== "0" && metrics.user_engaged !== null)?
              ((metrics.leads/metrics.user_engaged) * 100).toFixed(2) + "%":"-"
            }
        />
        <Widget
          icon={<ChatRatingIcon className="h-7 w-7 text-white" />}
          title={"Chat Rating"}
          url={"/admin/chat_rating"}
          subtitle={
            (Object.keys(metrics).length !== 0 && metrics.distinct_conversation_rating !== null && metrics.distinct_conversation_rating !== 0)?
              (metrics.total_rating/metrics.distinct_conversation_rating).toFixed(2):"-"
            }
        />
        <Widget
          icon={<ChatLeadIcon className="h-6 w-6" />}
          title={"Leads per 1000 visitors"}
          url={"/admin/leads"}
          subtitle={
            (Object.keys(metrics).length !== 0 && metrics.unique_conversation !== null && metrics.leads !== 0)?
              (metrics.leads*1000/metrics.unique_conversation).toFixed(2):"-"
            }
        />
        <Widget
          icon={<TurnsChatIcon className="h-7 w-7" />}
          title={"Avg # of turns/chats"}
          url={"/admin/turn_chat"}
          subtitle={
            (Object.keys(metrics).length !== 0 && metrics.unique_conversation !== null && metrics.unique_conversation !== 0) && metrics.turn_count !== 0 && metrics.user_engaged !== "0"?
              ((metrics.turn_count / metrics.user_engaged)).toFixed(2):"-"
            }
        />
        <Widget
          icon={<AvgTimeIcon className="h-6 w-6" />}
          url={"/admin/time_to_answer"}
          title={"Avg time to answer"}
          subtitle={(Object.keys(metrics).length !== 0 && metrics.avg_turn_time !== null?metrics.avg_turn_time+'s':"-")}
        />
      </div>

      <div className="mt-5 grid grid-cols-1 gap-1">
      <div className="flex justify-end">
        <input type="button" value="Download CSV" onClick={() => downloadReport()}
        className="font-poppins font-normal text-base text-white bg-green-900 flex items-center justify-center gap-2.5 rounded py-1.5 pr-2 pl-3 cursor-pointer disabled:opacity-50"
       disabled={isDownloading}
       />
       {isDownloading && 
        <svg class="animate-spin p-1 h-10 w-10 text-green-900" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        }
       <CSVLink headers={headers} data={csvData} ref={csvLinkEl} filename="conversations.csv" className="absolute invisible">Download</CSVLink>
      </div>
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

export default Dashboard;
