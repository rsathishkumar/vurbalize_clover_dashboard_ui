import React, { useMem, useState } from "react";
import thumbIcon from "../../../../assets/svg/thumbsup.svg";
import messageIcon from "../../../../assets/svg/message.svg";
import { useEffect } from "react";


const Feedback = (props) => {

  const [feedback, setFeedback] = useState();
  const [showFeedbackBox,setShowFeedbackBox] = useState(false);

  function showThumbsUp() {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width="25px" height="25px" viewBox="0 0 25 25" fill="none">
      <path d="M20.22 9.55C19.79 9.04 19.17 8.75 18.5 8.75H14.47V6C14.47 4.48 13.24 3.25 11.64 3.25C10.94 3.25 10.31 3.67 10.03 4.32L7.49 10.25H5.62C4.31 10.25 3.25 11.31 3.25 12.62V18.39C3.25 19.69 4.32 20.75 5.62 20.75H17.18C18.27 20.75 19.2 19.97 19.39 18.89L20.71 11.39C20.82 10.73 20.64 10.06 20.21 9.55H20.22ZM5.62 19.25C5.14 19.25 4.75 18.86 4.75 18.39V12.62C4.75 12.14 5.14 11.75 5.62 11.75H7.23V19.25H5.62ZM17.92 18.63C17.86 18.99 17.55 19.25 17.18 19.25H8.74V11.15L11.41 4.9C11.45 4.81 11.54 4.74 11.73 4.74C12.42 4.74 12.97 5.3 12.97 5.99V10.24H18.5C18.73 10.24 18.93 10.33 19.07 10.5C19.21 10.67 19.27 10.89 19.23 11.12L17.91 18.62L17.92 18.63Z" fill="#000000"/>
      </svg>
    )
  }

  function showThumbsUpSelected() {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width="25px" height="25px" viewBox="0 0 24 24" fill="none">
      <path d="M7.24001 11V20H5.63001C4.73001 20 4.01001 19.28 4.01001 18.39V12.62C4.01001 11.73 4.74001 11 5.63001 11H7.24001ZM18.5 9.5H13.72V6C13.72 4.9 12.82 4 11.73 4H11.64C11.24 4 10.88 4.24 10.72 4.61L7.99001 11V20H17.19C17.92 20 18.54 19.48 18.67 18.76L19.99 11.26C20.15 10.34 19.45 9.5 18.51 9.5H18.5Z" fill="#000000"/>
      </svg>
    )
  }

  function feedbackDiv() {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width="25px" height="25px" viewBox="0 0 25 25" fill="none">
      <path d="M21 13V7C21 5.11438 21 4.17157 20.4142 3.58579C19.8284 3 18.8856 3 17 3H7C5.11438 3 4.17157 3 3.58579 3.58579C3 4.17157 3 5.11438 3 7V13C3 14.8856 3 15.8284 3.58579 16.4142C4.17157 17 5.11438 17 7 17H7.5C7.77614 17 8 17.2239 8 17.5V20V20.1499C8 20.5037 8.40137 20.7081 8.6875 20.5L13.0956 17.2941C13.3584 17.103 13.675 17 14 17H17C18.8856 17 19.8284 17 20.4142 16.4142C21 15.8284 21 14.8856 21 13Z" stroke="#323232" strokeWidth="2" stroke-linejoin="round"/>
      <path d="M8 10H8.01" stroke="#323232" strokeWidth="2" strokeLinecap="round" stroke-linejoin="round"/>
      <path d="M12 10H12.01" stroke="#323232" strokeWidth="2" strokeLinecap="round" stroke-linejoin="round"/>
      <path d="M16 10H16.01" stroke="#323232" strokeWidth="2" strokeLinecap="round" stroke-linejoin="round"/>
      </svg>
    )
  }

  return (
    <div>
    <div className=" gap-[8px] flex z-10 justify-end mt-[-20px] mr-6">
      <div className={`thumbs_up cursor-pointer ${props.row.evaluator_rating === "1"?"selected":""}`} 
            onClick={() => {
              if (props.row.evaluator_rating === "1") {
                props.submitFeedback("0", props.row.turn_id, props.row.conversation_id)
              }
              else {
                props.submitFeedback("1", props.row.turn_id, props.row.conversation_id)
              }
            }}>
              {props.row.evaluator_rating === "1"? showThumbsUpSelected():showThumbsUp()}
          </div>
          <div className={`thumbs_down rotate-180 cursor-pointer ${props.row.evaluator_rating === "-1"?"selected":""}`} 
            onClick={() => {
              if (props.row.evaluator_rating === "-1") {
                props.submitFeedback("0", props.row.turn_id, props.row.conversation_id)
              }
              else {
                props.submitFeedback("-1", props.row.turn_id, props.row.conversation_id)
              }
            }}>
              {props.row.evaluator_rating === "-1"? showThumbsUpSelected():showThumbsUp()}
          </div>
          <div className={`feedback_icon cursor-pointer ${props.row.evaluator_feedback !== null && props.row.evaluator_feedback != ""?"selected":""}`}
            onClick={() => {
              setFeedback(props.row.evaluator_feedback)
              setShowFeedbackBox(!showFeedbackBox);
            }}>
            {feedbackDiv()}
          </div>
          
    </div>
    {showFeedbackBox && 
          <div className="py-4 ml-12 mr-6">
          <div className={`flex border-2 border-gray-600 rounded-md p-2 bg-white items-center`}>
            <textarea className="focus:outline-none pr-3 w-[350px]"  name="feedback" rows = "2" value={feedback} onChange={e => setFeedback(e.target.value)} required placeholder="Enter Feedback"></textarea>
            <button type="button" onClick={()=>{setShowFeedbackBox(false);props.submitFeedbackMessage(feedback, props.row.turn_id, props.row.conversation_id);}} value="Go"
            className="rounded-full bg-green-900 h-[30px] w-[30px] flex justify-center items-center"
            ><svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 512 512" fill="#FFFFFF"><path d="M476.59,227.05l-.16-.07L49.35,49.84A23.56,23.56,0,0,0,27.14,52,24.65,24.65,0,0,0,16,72.59V185.88a24,24,0,0,0,19.52,23.57l232.93,43.07a4,4,0,0,1,0,7.86L35.53,303.45A24,24,0,0,0,16,327V440.31A23.57,23.57,0,0,0,26.59,460a23.94,23.94,0,0,0,13.22,4,24.55,24.55,0,0,0,9.52-1.93L476.4,285.94l.19-.09a32,32,0,0,0,0-58.8Z"/></svg></button>
          </div>
          </div>
      }
    </div>
);
};

export default Feedback;
