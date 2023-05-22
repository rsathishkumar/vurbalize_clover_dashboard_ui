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
    <Card extra={"w-full h-full sm:overflow-auto px-6"}>

      <div className="mt-8 overflow-x-scroll">
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
                  <div className="text-s px-[5px] text-white bg-green-900 rounded">
                    No.
                  </div>
                </th>
                <th
                  className="pl-[2px] text-center"
                  >
                  <div className="text-s px-[5px] text-white bg-green-900 rounded">
                    Conversation_ID
                  </div>
                </th>
                <th
                  className="pl-[2px] text-center"
                  >
                  <div className="text-s px-[5px] text-white bg-green-900 rounded">
                    su_ID
                  </div>
                </th>
                <th
                  className="pl-[2px] text-center"
                  >
                  <div className="text-s px-[5px] text-white bg-green-900 rounded">
                    convDate_created
                  </div>
                </th>
                <th
                  className="pl-[2px] text-center"
                  >
                  <div className="text-s px-[5px] text-white bg-green-900 rounded">
                    convTime_created
                  </div>
                </th>
                <th
                  className="pl-[2px] text-center"
                  >
                  <div className="text-s px-[5px] text-white bg-green-900 rounded">
                    LandingPage
                  </div>
                </th>
                <th
                  className="pl-[2px] text-center"
                  >
                  <div className="text-s px-[5px] text-white bg-green-900 rounded">
                    TurnCount
                  </div>
                </th>
                <th
                  className="pl-[2px] text-center"
                  >
                  <div className="text-s px-[5px] text-white bg-green-900 rounded">
                    ConvT2A
                  </div>
                </th>
                <th
                  className="pl-[2px] text-center"
                  >
                  <div className="text-s px-[5px] text-white bg-green-900 rounded">
                    ConvOutcome
                  </div>
                </th>
                <th
                  className="pl-[2px] text-center"
                  >
                  <div className="text-s px-[5px] text-white bg-green-900 rounded">
                    AppDate
                  </div>
                </th>
                <th
                  className="pl-[2px] text-center"
                  >
                  <div className="text-s px-[5px] text-white bg-green-900 rounded">
                    AppTime
                  </div>
                </th>
                <th
                  className="pl-[2px] text-center"
                  >
                  <div className="text-s px-[5px] text-white bg-green-900 rounded">
                    MarketoLeadID
                  </div>
                </th>
                <th
                  className="pl-[2px] text-center"
                  >
                  <div className="text-s px-[5px] text-white bg-green-900 rounded">
                    ConvRating
                  </div>
                </th>
                <th
                  className="pl-[2px] text-center"
                  >
                  <div className="text-s px-[5px] text-white bg-green-900 rounded">
                    ConvFeedback
                  </div>
                </th>

              </tr>
          </thead>
          <tbody>
            
          </tbody>
        </table>
      </div>
    </Card>
  );
};

export default CheckTable;
