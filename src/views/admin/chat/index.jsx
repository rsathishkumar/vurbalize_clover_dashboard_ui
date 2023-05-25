import {useEffect, useState} from 'react'

const Chat = () => {

  const [conversationList, setConversationList] = useState([]);

  useEffect(() => {
    __init()
  },[])


  async function __init() {
    const query = new URLSearchParams(window.location.search);
    let cid = query.get('cid');
    var object = {'cid': cid}
    await getConversations(object)
  }

  function getConversations(object) {

    fetch(`${process.env.REACT_APP_APIURL}/getconversation`, {
      method: 'post',
      headers: {'Content-Type':'application/json'},
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
    <div class="grid grid-cols-6 gap-3">
      <div class="col-span-4">HTML Content</div>
      <div class="col-span-2">
      {/* Card widget */}
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-800 w-full">
      <div class="flex flex-col flex-grow w-full max-w-xl bg-white shadow-xl rounded-lg overflow-hidden">
        <div className="p-5 bg-green-900 text-white">
          Header
        </div>
		<div class="flex flex-col flex-grow h-0 p-4 overflow-auto">
      {conversationList.length > 0 && conversationList.map((row, index) => { 
        var message = row.message.replace("User received message", "")
        message = message.replace("User send message", "")
        message = message.replace(/['"]+/g, '')
        if (row.turn_actor === "bot") {
          return (
            <div class="flex mt-2 space-x-3 max-w-md">
				      <div class="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300"></div>
              <div>
                <div class="bg-gray-300 p-3 rounded-r-lg rounded-bl-lg">
                  <span class="text-sm" dangerouslySetInnerHTML={{__html: message}}></span>
                </div>
              </div>
            </div>
          )
        }
        else {
          return (
          <div class="flex w-full mt-2 space-x-3 max-w-md ml-auto justify-end">
            <div>
              <div class="bg-green-900 text-white p-3 rounded-l-lg rounded-br-lg">
                <span class="text-sm">{message}</span>
              </div>
            </div>
          </div>
          )
        }
        })}
		</div>
	</div>
      </div>
      </div>
    </div>
  );
};

export default Chat;
