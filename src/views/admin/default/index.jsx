import MiniCalendar from "components/calendar/MiniCalendar";
import WeeklyRevenue from "views/admin/default/components/WeeklyRevenue";
import TotalSpent from "views/admin/default/components/TotalSpent";
import PieChartCard from "views/admin/default/components/PieChartCard";
import MarketIcon from "components/icons/MarketIcon";
import ChatIcon from "components/icons/ChatIcon";

import { columnsDataCheck, columnsDataComplex } from "./variables/columnsData";

import Widget from "components/widget/Widget";
import CheckTable from "views/admin/default/components/CheckTable";
import ComplexTable from "views/admin/default/components/ComplexTable";
import DailyTraffic from "views/admin/default/components/DailyTraffic";
import TaskCard from "views/admin/default/components/TaskCard";
import tableDataCheck from "./variables/tableDataCheck.json";
import tableDataComplex from "./variables/tableDataComplex.json";

const Dashboard = () => {
  return (
    <div>
      {/* Card widget */}

      <div className="mt-3 grid grid-cols-1 gap-[22px] md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-3 3xl:grid-cols-3">
        <Widget
          icon={<ChatIcon className="h-7 w-7 text-white" />}
          title={"Chat Engagement"}
          subtitle={"656"}
        />
        <Widget
          icon={<MarketIcon className="h-6 w-6 text-white" />}
          title={"Chat Conversion"}
          subtitle={"247"}
        />
        <Widget
          icon={<MarketIcon className="h-7 w-7 text-white" />}
          title={"Chat Ratings"}
          subtitle={"10%"}
        />
        <Widget
          icon={<MarketIcon className="h-6 w-6" />}
          title={"Leads per 1000 visitors"}
          subtitle={"656"}
        />
        <Widget
          icon={<MarketIcon className="h-7 w-7" />}
          title={"Avg # of turns/chats"}
          subtitle={"145"}
        />
        <Widget
          icon={<MarketIcon className="h-6 w-6" />}
          title={"Avg time to answer"}
          subtitle={"10s"}
        />
      </div>

      <div className="mt-5 grid grid-cols-1 gap-1">
        <div>
          <CheckTable
            columnsData={columnsDataCheck}
            tableData={tableDataCheck}
          />
        </div>

      </div>
    </div>
  );
};

export default Dashboard;
