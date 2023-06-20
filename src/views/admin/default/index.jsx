import {useEffect, useState} from 'react'
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
import { MdLastPage } from 'react-icons/md';

const currentTimeMillis = new Date().getTime();
const currentDate = new Date(currentTimeMillis);

const Dashboard = () => {

  const [tableList, setTableList] = useState([]);
  const [metrics, setMetrics] = useState({});
  const [landingPage, setLandingPage] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [columnsDataCheck, setColumnsDataCheck] = useState(false);
  const [isAsending, setIsAsending] = useState(false)
  const [filterChange, setFilterChange] = useState(false);
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

  function sendRequestToBackend(page_no='') {
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
    }
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

  return (
    <div>
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
            (metrics.user_engaged != null && metrics.user_engaged != 0)?
              ((metrics.user_engaged/metrics.unique_conversation) * 100).toFixed(2) + '%':"-"
            }
        />
        <Widget
          icon={<ChatConversionIcon className="h-6 w-6 text-white" />}
          title={"Chat Conversion"}
          url={"/admin/chat_conversation"}
          subtitle={
            (metrics.unique_conversation != null && metrics.unique_conversation != 0)?
              ((metrics.unique_conversation/metrics.unique_session) * 100).toFixed(2) + "%":"-"
            }
        />
        <Widget
          icon={<ChatRatingIcon className="h-7 w-7 text-white" />}
          title={"Chat Rating"}
          url={"/admin/chat_rating"}
          subtitle={
            (metrics.distinct_conversation_rating != null && metrics.distinct_conversation_rating != 0)?
              (metrics.total_rating/metrics.distinct_conversation_rating).toFixed(2):"-"
            }
        />
        <Widget
          icon={<ChatLeadIcon className="h-6 w-6" />}
          title={"Leads per 1000 visitors"}
          url={"/admin/leads"}
          subtitle={
            (metrics.unique_conversation != null && metrics.leads != 0)?
              (metrics.leads*1000/metrics.unique_conversation).toFixed(2):"-"
            }
        />
        <Widget
          icon={<TurnsChatIcon className="h-7 w-7" />}
          title={"Avg # of turns/chats"}
          url={"/admin/turn_chat"}
          subtitle={
            (metrics.unique_conversation != null && metrics.unique_conversation != 0) && metrics.turn_count != 0?
              ((metrics.turn_count / metrics.user_engaged)).toFixed(2):"-"
            }
        />
        <Widget
          icon={<AvgTimeIcon className="h-6 w-6" />}
          url={"/admin/time_to_answer"}
          title={"Avg time to answer"}
          subtitle={(metrics.avg_turn_time != null?metrics.avg_turn_time+'s':"-")}
        />
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
          />
        </div>

      </div>
    </div>
  );
};

export default Dashboard;
