import React, { useMemo } from "react";
import Card from "components/card";

import {
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable,
} from "react-table";

const CheckTable = (props) => {
  const { columnsData, tableData } = props;

  const columns = useMemo(() => columnsData, [columnsData]);
  const data = useMemo(() => tableData, [tableData]);

  const tableInstance = useTable(
    {
      columns,
      data,
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    initialState,
  } = tableInstance;
  initialState.pageSize = 11;

  return (
    <Card extra={"w-full h-full sm:overflow-auto shadow-none rounded-none mt-1"}>

      <div className="pt-4 overflow-x-scroll">
        <table
          {...getTableProps()}
          className="w-full"
          variant="simple"
          color="gray-500"
          mb="24px"
        >
          <thead>
              <tr>
                <th
                  className="pl-[2px] text-center"
                  >
                  <div className="text-s px-[10px] text-white bg-green-900 rounded t ext-sm font-medium text-white font-poppins leading-[30px] py-1">
                    No.
                  </div>
                </th>
                <th
                  className="pl-[2px] text-center"
                  >
                 <div className="text-s px-[10px] text-white bg-green-900 rounded t ext-sm font-medium text-white font-poppins leading-[30px] py-1">
                    Conversation_ID
                  </div>
                </th>
                <th
                  className="pl-[2px] text-center"
                  >
                 <div className="text-s px-[10px] text-white bg-green-900 rounded t ext-sm font-medium text-white font-poppins leading-[30px] py-1">
                    su_ID
                  </div>
                </th>
                <th
                  className="pl-[2px] text-center"
                  >
                 <div className="text-s px-[10px] text-white bg-green-900 rounded t ext-sm font-medium text-white font-poppins leading-[30px] py-1">
                    convDate_created
                  </div>
                </th>
                <th
                  className="pl-[2px] text-center"
                  >
                 <div className="text-s px-[10px] text-white bg-green-900 rounded t ext-sm font-medium text-white font-poppins leading-[30px] py-1">
                    LandingPage
                  </div>
                </th>
                <th
                  className="pl-[2px] text-center"
                  >
                 <div className="text-s px-[10px] text-white bg-green-900 rounded t ext-sm font-medium text-white font-poppins leading-[30px] py-1">
                    TurnCount
                  </div>
                </th>
              </tr>
          </thead>
          <tbody>
            {tableData.map((row, index) => (  
              <tr data-index={index}>  
              <td className="pl-2">{index}</td>  
              <td className="pl-2"><a href={`/chat/conversation?cid=${row.conversation_id}`} target="_blank">{row.conversation_id}</a></td>  
              <td className="pl-2">{row.su_id}</td>  
              <td className="pl-2">{row.logtime}</td>  
              <td className="pl-2">{row.landing_page}</td>  
              <td className="pl-2">{row.turn_user}</td>  
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
};

export default CheckTable;
