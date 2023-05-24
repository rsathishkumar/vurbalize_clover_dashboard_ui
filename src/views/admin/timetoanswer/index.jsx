import {useEffect, useState} from 'react'
import MarketIcon from "components/icons/MarketIcon";
import ChatIcon from "components/icons/ChatIcon";
import Filters from "../../../components/filters";

import Widget from "components/widget/Widget";
import CheckTable from "views/admin/default/components/CheckTable";

const ChatEngagement = () => {

  const [tableList, setTableList] = useState([]);
  const [landingPage, setLandingPage] = useState([]);
  const [total, setTotal] = useState(0);
  const [filters, setFilters] = useState({
    startDate: new Date().setDate(new Date().getDate() - 30),
    endDate: new Date(),
    startTime: "10:00",
    endTime: "10:00"
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
    var date = new Date(filters.startDate);
    var startDate = date.toLocaleDateString('en-US')
    date = new Date(filters.endDate);
    var endDate = date.toLocaleDateString('en-US')
    let object = {
      'startDate': startDate + ' ' + filters.startTime,
      'endDate': endDate + ' ' + filters.endTime,
    }

    //getAllConversations(object)
    //getAllMetrics(object);
  },[filters])

  async function __init() {
    var date = new Date(filters.startDate);
    var startDate = date.toLocaleDateString('en-US')
    date = new Date(filters.endDate);
    var endDate = date.toLocaleDateString('en-US')
    let object = {
      'startDate': startDate + ' ' + filters.startTime,
      'endDate': endDate + ' ' + filters.endTime,
    }
    //await getAllConversations(object);
    //await getAllMetrics(object);
    //await getAllLandingPages();
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

      <div className="mt-5 grid grid-cols-1 gap-1">
        <div>
        </div>

      </div>
    </div>
  );
};

export default ChatEngagement;
