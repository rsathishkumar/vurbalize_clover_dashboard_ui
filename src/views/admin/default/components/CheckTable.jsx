import React, { useMemo } from "react";
import Card from "components/card";


const CheckTable = (props) => {
  const { columnsData, tableData } = props;

  return (
    <Card extra={"w-full h-full sm:overflow-auto shadow-none rounded-none mt-1"}>

      <div className="pt-4 overflow-x-scroll">
        <table
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
                  <div className="text-s px-[10px] text-white bg-green-900 rounded t ext-sm font-medium text-white font-poppins leading-[30px] py-1 whitespace-nowrap">
                    No.
                  </div>
                </th>
                <th
                  className="pl-[2px] text-center"
                  >
                 <div className="text-s px-[10px] text-white bg-green-900 rounded t ext-sm font-medium text-white font-poppins leading-[30px] py-1 whitespace-nowrap">
                    <a href="#" onClick={() => props.sortFunction('i.conversation_id')}>Conversation #</a>
                  </div>
                </th>
                <th
                  className="pl-[2px] text-center"
                  >
                 <div className="text-s px-[10px] text-white bg-green-900 rounded t ext-sm font-medium text-white font-poppins leading-[30px] py-1 whitespace-nowrap">
                    <a href="#" onClick={() => props.sortFunction('logtime')}>Date Created</a>
                  </div>
                </th>
                <th
                  className="pl-[2px] text-center"
                  >
                 <div className="text-s px-[10px] text-white bg-green-900 rounded t ext-sm font-medium text-white font-poppins leading-[30px] py-1 whitespace-nowrap">
                    <a href="#" onClick={() => props.sortFunction('user_rating')}>User Rating</a>
                  </div>
                </th>
                <th
                  className="pl-[2px] text-center"
                  >
                 <div className="text-s px-[10px] text-white bg-green-900 rounded t ext-sm font-medium text-white font-poppins leading-[30px] py-1 whitespace-nowrap">
                    <a href="#" onClick={() => props.sortFunction('conv_outcome')}>Outcome</a>
                  </div>
                </th>
                <th
                  className="pl-[2px] text-center"
                  >
                 <div className="text-s px-[10px] text-white bg-green-900 rounded t ext-sm font-medium text-white font-poppins leading-[30px] py-1 whitespace-nowrap">
                    <a href="#" onClick={() => props.sortFunction('turn_user')}>Turn Count</a>
                  </div>
                </th>
                <th
                  className="pl-[2px] text-center"
                  >
                 <div className="text-s px-[10px] text-white bg-green-900 rounded t ext-sm font-medium text-white font-poppins leading-[30px] py-1 whitespace-nowrap">
                    <a href="#" onClick={() => props.sortFunction('conv_rate')}>Time to Answer</a>
                  </div>
                </th>
                <th
                  className="pl-[2px] text-center"
                  >
                 <div className="text-s px-[10px] text-white bg-green-900 rounded t ext-sm font-medium text-white font-poppins leading-[30px] py-1 whitespace-nowrap">
                    <a href="#" onClick={() => props.sortFunction('avg_user_words')}>Avg User Words/Turn</a>
                  </div>
                </th>
                <th
                  className="pl-[2px] text-center"
                  >
                 <div className="text-s px-[10px] text-white bg-green-900 rounded t ext-sm font-medium text-white font-poppins leading-[30px] py-1 whitespace-nowrap">
                    <a href="#" onClick={() => props.sortFunction('avg_bot_words')}>Avg Agent Words/Turn</a>
                  </div>
                </th>
                <th
                  className="pl-[2px] text-center"
                  >
                 <div className="text-s px-[10px] text-white bg-green-900 rounded t ext-sm font-medium text-white font-poppins leading-[30px] py-1 whitespace-nowrap">
                    <a href="#" onClick={() => props.sortFunction('total_words_in_message_bot')}>Tot. Agent Words</a>
                  </div>
                </th>
                <th
                  className="pl-[2px] text-center"
                  >
                 <div className="text-s px-[10px] text-white bg-green-900 rounded t ext-sm font-medium text-white font-poppins leading-[30px] py-1 whitespace-nowrap">
                    <a href="#" onClick={() => props.sortFunction('conv_rate')}>Marketo Lead #</a>
                  </div>
                </th>
                <th
                  className="pl-[2px] text-center"
                  >
                 <div className="text-s px-[10px] text-white bg-green-900 rounded t ext-sm font-medium text-white font-poppins leading-[30px] py-1 whitespace-nowrap">
                    <a href="#" onClick={() => props.sortFunction('conv_rate')}>Appt. Date</a>
                  </div>
                </th>
                <th
                  className="pl-[2px] text-center"
                  >
                 <div className="text-s px-[10px] text-white bg-green-900 rounded t ext-sm font-medium text-white font-poppins leading-[30px] py-1 whitespace-nowrap">
                    <a href="#" onClick={() => props.sortFunction('conv_rate')}>Appt. Time</a>
                  </div>
                </th>                
                <th
                  className="pl-[2px] text-center"
                  >
                 <div className="text-s px-[10px] text-white bg-green-900 rounded t ext-sm font-medium text-white font-poppins leading-[30px] py-1 whitespace-nowrap">
                    <a href="#" onClick={() => props.sortFunction('leads')}>Calendly</a>
                  </div>
                </th>
                <th
                  className="pl-[2px] text-center"
                  >
                 <div className="text-s px-[10px] text-white bg-green-900 rounded t ext-sm font-medium text-white font-poppins leading-[30px] py-1 whitespace-nowrap">
                    <a href="#" onClick={() => props.sortFunction('landing_page')}>Landing Page</a>
                  </div>
                </th>
                <th
                  className="pl-[2px] text-center"
                  >
                 <div className="text-s px-[10px] text-white bg-green-900 rounded t ext-sm font-medium text-white font-poppins leading-[30px] py-1 whitespace-nowrap">
                    <a href="#" onClick={() => props.sortFunction('su_id')}>User #</a>
                  </div>
                </th>
                <th
                  className="pl-[2px] text-center"
                  >
                 <div className="text-s px-[10px] text-white bg-green-900 rounded t ext-sm font-medium text-white font-poppins leading-[30px] py-1 whitespace-nowrap">
                    <a href="#" onClick={() => props.sortFunction('i.session_id')}>Session #</a>
                  </div>
                </th>                
                <th
                  className="pl-[2px] text-center"
                  >
                 <div className="text-s px-[10px] text-white bg-green-900 rounded t ext-sm font-medium text-white font-poppins leading-[30px] py-1 whitespace-nowrap">
                    <a href="#" onClick={() => props.sortFunction('referrer_id')}>Referrer</a>
                  </div>
                </th>
              </tr>
          </thead>
          <tbody>
            {tableData.map((row, index) => (  
              <tr data-index={index + ((props.page - 1) * 25)}>  
              <td className="pl-2 text-sm">{(index+1) + ((props.page - 1) * 25)}</td>  
              <td className="pl-2 text-sm"><a href={`/chat/conversation?cid=${row.conversation_id}`} target="_blank" className="text-blueSecondary">{row.conversation_id}</a></td>  
              <td className="pl-2 text-sm">{row.logtime}</td>  
              <td className="pl-2 text-sm">{row.user_rating}</td>  
              <td className="pl-2 text-sm">{row.conv_outcome}</td>  
              <td className="pl-2 text-sm">{row.turn_user}</td>  
              <td className="pl-2 text-sm">{row.conv_rate?row.conv_rate + ' s':''}</td>  
              <td className="pl-2 text-sm">{row.avg_total_user_words}</td>  
              <td className="pl-2 text-sm">{row.avg_total_bot_words}</td>  
              <td className="pl-2 text-sm">{row.total_words_in_message_bot}</td>  
              <td className="pl-2 text-sm"></td>  
              <td className="pl-2 text-sm"></td>  
              <td className="pl-2 text-sm"></td>  
              <td className="pl-2 text-sm">{row.calendly_link}</td>  
              <td className="pl-2 text-sm">{row.landing_page}</td>  
              <td className="pl-2 text-sm">{row.su_id}</td>  
              <td className="pl-2 text-sm">{row.session_id}</td>  
              <td className="pl-2 text-sm">{row.referrer_id}</td>  
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
