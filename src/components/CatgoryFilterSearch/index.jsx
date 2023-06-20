import React, { forwardRef, useEffect, useState } from "react";

var line_index = 0;
const CatgoryFilterSearch = (props) => {

    const [categoryValue, setCategoryValue] = useState([]);
    const [ranges, setRanges] = useState([])

    useEffect(() => {
        var current_values = props.currentValues;
        if (current_values.length > 0) {
            setCategoryValue(current_values)
        }
        if (props.field_name === "convOutcome") {
            setRanges(['UserNotEngaged', 'UserEngaged', 'AppointmentScheduled']);
        }
        else {
            getAllUTMValues()
        }
    }, [])

    function submitAllValues() {       
        props.submitListValues(categoryValue, props.field_name)
    }

    const selectOptions = (event) => {
        const { value, checked } = event.target;
        if (checked) {
            setCategoryValue((prevSelectedValues) => [...prevSelectedValues, value]);
        } else {
            setCategoryValue((prevSelectedValues) =>
            prevSelectedValues.filter((item) => item !== value)
            );
        }
    };

    function getFilterObjects(filters) {
        var date = new Date(filters.startDate);
        var startDate = date.toLocaleDateString('en-US')
        date = new Date(filters.endDate);
        var endDate = date.toLocaleDateString('en-US')
        let object = {
          'startDate': startDate + ' ' + filters.startTime,
          'endDate': endDate + ' ' + filters.endTime,
          'landingpage': filters.landingpage,
          'conversation_id': filters.conversationId,
          'su_id': filters.suId,
          'apptDate': filters.apptDate,
          'utmParam':filters.utmParam,
          'turn_id':filters.turnID,
          'convT2A':filters.convT2A,
          'convOutcome':filters.convOutcome,
          'MarketoLead':filters.MarketoLead,
          'chatRating':filters.chatRating,
          'chatFeedback':filters.chatFeedback,
          'utm_param': props.field_name
        }
        return object;
      }

    function getAllUTMValues() {
        var object = getFilterObjects(props.filters);

        fetch(`${process.env.REACT_APP_APIURL}/get_utm_values`, {
          method: 'post',
          headers: {'Content-Type':'application/json'},
          body: JSON.stringify(object)
         }).then(response => response.json())
         .then(data => {
            setRanges(data)
         })
         .catch((error) => {
          console.error(error);
        });
      }


    return (
        <div className="absolute bg-white rounded p-3 ml-2 left-full top-0 shadow-6xl advanced_filters" key={props.id}>
            {/* Add your content for the checkbox here */}
            <button className="absolute -right-2 -top-2" onClick={() => props.closePopup()}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M15.5 7.56885C15.5 11.7111 12.1423 15.0688 8 15.0688C3.85775 15.0688 0.5 11.7111 0.5 7.56885C0.5 3.4266 3.85775 0.0688477 8 0.0688477C12.1423 0.0688477 15.5 3.4266 15.5 7.56885ZM5.7275 5.29635C5.83297 5.19101 5.97594 5.13184 6.125 5.13184C6.27406 5.13184 6.41703 5.19101 6.5225 5.29635L8 6.77385L9.4775 5.29635C9.58413 5.19699 9.72517 5.14289 9.87089 5.14547C10.0166 5.14804 10.1557 5.20707 10.2587 5.31013C10.3618 5.41319 10.4208 5.55223 10.4234 5.69796C10.426 5.84368 10.3719 5.98472 10.2725 6.09135L8.795 7.56885L10.2725 9.04635C10.3719 9.15298 10.426 9.29401 10.4234 9.43974C10.4208 9.58547 10.3618 9.7245 10.2587 9.82756C10.1557 9.93062 10.0166 9.98966 9.87089 9.99223C9.72517 9.9948 9.58413 9.94071 9.4775 9.84135L8 8.36385L6.5225 9.84135C6.41587 9.94071 6.27483 9.9948 6.12911 9.99223C5.98338 9.98966 5.84434 9.93062 5.74128 9.82756C5.63822 9.7245 5.57919 9.58547 5.57662 9.43974C5.57405 9.29401 5.62814 9.15298 5.7275 9.04635L7.205 7.56885L5.7275 6.09135C5.62216 5.98588 5.56299 5.84291 5.56299 5.69385C5.56299 5.54478 5.62216 5.40182 5.7275 5.29635Z" fill="#228800" />
                </svg>
            </button>
            <div className="max-h-64 overflow-scroll px-4">
            {ranges.length > 0 && ranges.map((key) => {
                return (
                    <div className={`relative text-black mb-4 w-64`}>
                        <label className={`checkboxFilterOption checkboxFilterOption_black ${categoryValue.indexOf(key) > -1?"checkboxFilter checkboxFilter_black":""}`}>
                            <input type="checkbox" 
                            value={key}
                            checked={categoryValue.includes(key)}
                            onChange={selectOptions}
                            className="" /> {key}
                        </label>   
                    </div>
                )
            })
            }
            </div>
            {ranges.length === 0 &&
                <div className={`relative text-black mb-4 w-64`}>
                    No values found
                </div>
            }
            {ranges.length > 0 && 
                <button 
                onClick={() => {submitAllValues()}}
                className="bg-green-900 px-3 py-1 cursor-pointer font-poppins text-white leading-5 tracking-wide-[0.05em] text-xs font-normal float-right relative rounded-sm mt-2.5">Confirm</button>
            }
        </div>
    );
}

export default CatgoryFilterSearch;