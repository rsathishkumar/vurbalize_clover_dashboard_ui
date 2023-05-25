import { useEffect, useState } from 'react'
import Icon from "../../../assets/svg/icon.svg";
import sendIcon from "../../../assets/svg/send.svg";
import thumbIcon from "../../../assets/svg/thumbsup.svg";
import messageIcon from "../../../assets/svg/message.svg";

const Chat = () => {

  const [conversationList, setConversationList] = useState([]);

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
        console.log(data)
      })
      .catch((error) => {
        console.error(error);
      });
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
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-800 w-full">
          <div className="flex flex-col flex-grow w-full max-w-xl bg-white shadow-7xl rounded-lg overflow-hidden">
            <div className="p-3 bg-green-900 text-white text-2xl font-normal font-TimesNewRoman">
              Clover chat
            </div>
            <div className="flex flex-col flex-grow h-0 pt-4 pb-[76px] px-3 overflow-auto relative">
              {conversationList.length > 0 && conversationList.map((row, index) => {
                var message = row.message.replace("User received message", "")
                message = message.replace("User send message", "")
                message = message.replace(/['"]+/g, '')
                if (row.turn_actor === "bot") {
                  return (
                    <div className="flex mt-2 space-x-3 max-w-md items-end">
                      <div className="flex-shrink-0 h-[26px] w-[26px] rounded-full flex items-center justify-center">
                        <img className="w-full" src={Icon} />
                      </div>
                      <div>
                        <div className="bg-[#F1F1F1] py-4 px-5 rounded-r-[20px] rounded-tl-[20px] w-[290px] relative">
                          <span className="font-normal font-TimesNewRoman text-black text-base" dangerouslySetInnerHTML={{ __html: message }}></span>
                          <div className="absolute right-[20px] gap-[8px] flex">
                            <img className="h-[26px] w-[26px]" src={thumbIcon} />
                            <img className="h-[26px] w-[26px]" src={messageIcon} />
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                }
                else {
                  return (
                    <div className="flex w-full mt-8 space-x-3 max-w-md ml-auto justify-end">
                      <div>
                        <div className="bg-green-900 py-4 px-5 text-white p-3 rounded-l-[20px] rounded-tr-[20px] w-[290px]">
                          <span className="text-base font-normal text-right font-TimesNewRoman"> {message}</span>
                        </div>
                      </div>
                    </div>
                  )
                }
              })}
              <div className="absolute bg-[#F7F8FA] block w-full h-[76px] right-0 left-0 bottom-0 p-4 flex align-center justify-between gap-[11px]">
                <input className="placeholder:text-black px-[17px] py-[11px] w-full border border-solid border-[#DFE3E7] rounded-[100px] bg-white font-TimesNewRoman font-normal text-base text-black" placeholder="Type your message here..." />
                <button className="cursor-pointer">
                  <img src={sendIcon} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
