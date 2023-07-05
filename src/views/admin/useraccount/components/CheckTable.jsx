import React, { useMemo } from "react";
import Card from "components/card";


const CheckTable = (props) => {
  const { columnsData, tableData } = props;

  return (
    <Card extra={"w-full h-full sm:overflow-auto shadow-none rounded-none mt-1 relative"}>
      {props.isLoading && 
        <div className="loading-container"> <div className="loading-div"></div></div>
      }
      <div className="pt-4 overflow-x-scroll">
        <table
          className="w-3/4"
          variant="simple"
          color="gray-500"
          mb="24px"
        >
          <thead>
              <tr>
                <th
                  className="pl-[2px] text-center"
                  >
                  <div className="text-xl px-[10px] text-white bg-green-900 rounded t ext-sm font-medium text-white font-poppins leading-[30px] py-1 whitespace-nowrap">
                    No.
                  </div>
                </th>
                <th
                  className="pl-[2px] text-center"
                  >
                 <div className="text-xl px-[10px] text-white bg-green-900 rounded t ext-sm font-medium text-white font-poppins leading-[30px] py-1 whitespace-nowrap">
                    Username
                  </div>
                </th>
                <th
                  className="pl-[2px] text-center"
                  >
                 <div className={`text-xl px-[10px] text-white bg-green-900 rounded t ext-sm font-medium text-white font-poppins leading-[30px] py-1 whitespace-nowrap`}>
                    Email
                  </div>
                </th>
                <th
                  className="pl-[2px] text-center w-[200px]"
                  >
                 <div className={`text-xl px-[10px] text-white bg-green-900 rounded t ext-sm font-medium text-white font-poppins leading-[30px] py-1 whitespace-nowrap`}>
                    Actions
                  </div>
                </th>
              </tr>
          </thead>
          <tbody>
            {tableData.map((row, index) => (  
              <tr data-index={index + ((props.page - 1) * 25)} key={index}>  
              <td className="pl-2 text-xl py-2">{(index+1) + ((props.page - 1) * 25)}</td>  
              <td className="pl-2 text-xl">{row.username}</td>  
              <td className="pl-2 text-xl">{row.email}</td> 
              <td className="pl-2 text-xl">
                <a href={`/admin/user_account/${row.id}`}>Edit</a> / <span onClick={() => console.log("edit")} className="cursor-pointer">Delete</span>
              </td> 
              </tr>
            ))}
            {columnsData === false &&
              <tr><td colspan="6" className="text-center text-lg">loading ...</td></tr>
            }
            {columnsData === true && tableData.length === 0 &&
              <tr><td colspan="6" className="text-center text-lg">No Result</td></tr>
            }
          </tbody>
        </table>
      </div>
      <div className="m-auto my-12 flex gap-2">
        {props.page > 1 &&
          <button className="font-poppins font-normal text-base text-white bg-green-900 flex items-center justify-center gap-2.5 rounded py-1.5 pr-2 pl-3 w-16 h-10" onClick={() => props.setPage(props.page-1)}>Prev</button>
        }
        {(props.page * 25) < props.total &&
          <button className="font-poppins font-normal text-base text-white bg-green-900 flex items-center justify-center gap-2.5 rounded py-1.5 pr-2 pl-3 w-16 h-10" onClick={() => props.setPage(props.page+1)}>Next</button>
        }
      </div>

    </Card>
  );
};

export default CheckTable;
