import { useEffect, useState } from 'react'
import Icon from "../../../assets/svg/icon.svg";
import thumbIcon from "../../../assets/svg/thumbsup.svg";
import messageIcon from "../../../assets/svg/message.svg";
import thumbIconEval from "../../../assets/svg/thumbsup_eval.svg";
import messageIconEval from "../../../assets/svg/message_eval.svg";
import Feedback from "views/admin/chat/components/Feedback";

const Chat = () => {

  const [conversationList, setConversationList] = useState([]);
  const [indexValue, setIndexValue] = useState('');
  const [showFeedback, setShowFeedback] = useState(false);
  const [selectedTurnid, setSelectedTurnid] = useState(-1)

  useEffect(() => {
    __init()
  }, [])


  async function __init() {
    const query = new URLSearchParams(window.location.search);
    let cid = query.get('cid');
    var object = { 'cid': cid }
    await getConversations(object)
  }

  function getConversations(object) {

    fetch(`${process.env.REACT_APP_APIURL}/getconversation`, {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(object)
    }).then(response => response.json())
      .then(data => {
        setConversationList(data)
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function submitFeedback(rating, turn_id, conversation_id, feedbacktext='') {
    setSelectedTurnid(-1)
    var object = { 'conversation_id': conversation_id, 'rating': rating, 'turn_id': turn_id, 'feebacktext': feedbacktext }
    refreshConversationRating(rating, turn_id, conversation_id, feedbacktext)
    fetch(`${process.env.REACT_APP_APIURL}/feedback`, {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(object)
    }).then(response => response.json())
      .then(data => {
        console.log(data)
      })
      .catch((error) => {
        console.error(error);
      });
  }

  useEffect(() => {
    const handleClick = async (e) => {
      let l_tmp = e.target;
      if (l_tmp.classList.contains('user-message') || l_tmp.classList.contains('all-messages') || l_tmp.classList.contains('clover-chat-container')) {
        setSelectedTurnid(-1);
      }
    };

    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener('click',handleClick)
    }
  }, [])

  function refreshConversationRating(rating, turn_id, conversation_id, feedbacktext) {
    var tmp = conversationList;
    var newlist = [];
    tmp.map(function (row, index) {
      if (turn_id === row.turn_id) {
        if (rating != '') {
          tmp[index]['evaluator_rating'] = rating;
        }
        else {
          tmp[index]['evaluator_feedback'] = feedbacktext;
        }
      }
    })
    setConversationList(tmp)
  }

  return (
    <div className="grid grid-cols-6 gap-3 max-w-[1272px] mx-auto my-0">
      <div className="col-span-4">
        <div className="max-w-[664px] mt-[46px]">
          <h4 className="font-bold text-[42px] leading-[56px] font-Inter">
            Everything you need to run your business
          </h4>
          <p className="font-TimesNewRoman font-normal text-black text-2xl mt-8">
            Smarter, faster, easier. Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor
          </p>
        </div>
      </div>
      <div className="col-span-2">
        {/* Card widget */}
        <div className="flex flex-col items-center justify-center min-h-[85%] bg-gray-100 text-gray-800 w-[30%] fixed">
          <div className="flex flex-col flex-grow w-full max-w-xl bg-white shadow-7xl rounded-lg overflow-hidden clover-chat-container">
            <div className="p-3 bg-green-900 text-white text-2xl font-normal font-TimesNewRoman">
              Clover chat
            </div>
            <div className="flex flex-col flex-grow h-0 pt-4 pb-[76px] px-6 overflow-auto relative all-messages">
              {conversationList.length > 0 && conversationList.map((row, index) => {
                var message = row.message.replace("User received message", "")
                message = message.replace("User send message", "")
                message = message.replace(/['"]+/g, '')
                if (row.turn_actor === "bot") {
                  let isRating = true;
                  let isEvaluator = false;
                  if ((row.user_rating === null || row.user_rating === 0) && (row.user_feedback === null || row.user_feedback === '')) {
                    isRating = false;
                  }
                  if (row.evaluator_rating !== null || row.evaluator_feedback !== null) {
                    isEvaluator = true;
                  }
                  return (
                    <div className="flex mt-2 mb-2 space-x-3 max-w-md items-end" >
                      <div className="flex-shrink-0 h-[26px] w-[26px] rounded-full flex items-center justify-center">
                        <img className="w-full" src={Icon} />
                      </div>
                      <div>
                        <div className="bg-[#F1F1F1] py-4 px-5 rounded-r-[20px] rounded-tl-[20px] relative" onClick={()=>{if(row.turn_id != selectedTurnid)setSelectedTurnid(row.turn_id)}}>
                          <span className="font-normal font-TimesNewRoman text-black text-base" dangerouslySetInnerHTML={{ __html: message }}></span>
                          {isRating && 
                          <div className="absolute right-[20px] gap-[8px] flex">
                            {row.user_rating === "1" &&
                              <img className="h-[32px] w-[32px] bg-white rounded-[50px] p-[3px]" src={thumbIcon} />
                            }
                            {row.user_rating === "-1" &&
                              <img className="h-[32px] w-[32px] rotate-180 bg-white rounded-[50px] p-[3px]" src={thumbIcon} />
                            }
                            {row.user_feedback != null &&
                             <div className="relative group">
                              <img className="h-[32px] w-[32px] bg-white rounded-[50px] p-[3px]" onClick={()=>{(index === indexValue)?setIndexValue(""):setIndexValue(index)}} src={messageIcon} />
                              {selectedTurnid === row.turn_id &&
                                <div className={`group${index} duration-100 absolute left-[-300px] w-[350px] inset-x-0 flex justify-left items-end text-lg bg-green-900 z-50 text-white p-4`}>{row.user_feedback}</div>
                              }
                              </div>
                            }
                          </div>
                          }
                          {isEvaluator && selectedTurnid != row.turn_id &&
                          <div className="absolute right-[20px] gap-[8px] flex">
                            {row.evaluator_rating === "1" &&
                              <img className="h-[32px] w-[32px] bg-white rounded-[50px] p-[3px]" src={thumbIconEval} />
                            }
                            {row.evaluator_rating === "-1" &&
                              <img className="h-[32px] w-[32px] rotate-180 bg-white rounded-[50px] p-[3px]" src={thumbIconEval} />
                            }
                            {row.evaluator_feedback != null && row.evaluator_feedback != "" &&
                             <div className="relative group">
                              <img className="h-[32px] w-[32px] bg-white rounded-[50px] p-[3px]" src={messageIconEval} />
                              </div>
                            }
                          </div>
                          }
                          {!isRating && selectedTurnid === row.turn_id &&
                            <Feedback submitFeedbackMessage={(feedback, turn_id, conversation_id) => submitFeedback('', turn_id, conversation_id, feedback)} submitFeedback={(rating, turn_id, conversation_id)=>submitFeedback(rating, turn_id, conversation_id)} row={row} />
                          }
                        </div>
                      </div>
                    </div>
                  )
                }
                else {
                  return (
                    <div className="flex w-full my-8 space-x-3 max-w-md ml-auto justify-end user-message">
                      <div>
                        <div className="bg-green-900 py-4 px-5 text-white p-3 rounded-l-[20px] rounded-tr-[20px] user-message">
                          <span className="text-base font-normal text-right font-TimesNewRoman user-message"> {message}</span>
                        </div>
                      </div>
                    </div>
                  )
                }
              })}
              {/*<div className="absolute bg-[#F7F8FA] block w-full h-[76px] right-0 left-0 bottom-0 p-4 flex align-center justify-between gap-[11px]">
                <input className="placeholder:text-black px-[17px] py-[11px] w-full border border-solid border-[#DFE3E7] rounded-[100px] bg-white font-TimesNewRoman font-normal text-base text-black" placeholder="Type your message here..." />
                <button className="cursor-pointer">
                  <img src={sendIcon} />
                </button>
              </div>
            */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
