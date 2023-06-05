import React, { forwardRef, useState } from "react";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import TimePicker from 'react-time-picker';
import 'react-time-picker/dist/TimePicker.css';
import 'react-clock/dist/Clock.css';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import { AiOutlinePlus } from "react-icons/ai"


const Filters = (props) => {
    // ------------for date time and dropdown start ----------
    const [value, setValue] = useState('10:00');
    const { startDate, endDate, startTime, endTime } = props.filters;

    const [dateError, setDateError] = useState(false)

    const CustomInput = forwardRef(({ value, onClick, onChange }, ref) => (
        <input
            value={value}
            className="custom-input border border-gray-200 rounded py-2 font-poppins text-secondaryColor leading-7 text-sm font-normal w-full"
            style={{ backgroundImage: `url({../../../assets/svg/calendar.svg})` }}
            onClick={onClick}
            ref={ref}
        ></input>
    ));
    // ------------for date time and dropdown end ----------
    const checkboxFilterOptions = [
        { id: 1, name: "Conversation_id" },
        { id: 2, name: "su_id" },
        { id: 3, name: "turn_count" },
        { id: 4, name: "ConvT2A" },
        { id: 5, name: "ConvOutcome" },
        { id: 6, name: "ApptDate" },
        { id: 7, name: "ApptTime" },
        { id: 8, name: "MarketoLead" },
    ];
    const [checkedList, setCheckedList] = useState(checkboxFilterOptions);
    const [selectedCheckboxes, setSelectedCheckboxes] = useState([]);

    const checkboxClicked = (id) => {
        setCheckedList((prevCheckedList) =>
            prevCheckedList.map((checkedItem) => {
                if (checkedItem.id === id) {
                    const updatedItem = { ...checkedItem, checked: !checkedItem.checked };
                    if (updatedItem.checked) {
                        setSelectedCheckboxes((prevCheckedList) => [
                            ...prevCheckedList,
                            id,
                        ]);
                    } else {
                        setSelectedCheckboxes((prevCheckedList) =>
                            prevCheckedList.filter((checkboxId) => checkboxId !== id)
                        );
                    }
                    return updatedItem;
                }
                return checkedItem;
            })
        );
    };

    const showError = () => {
        setDateError(true);
     //   setTimeout(() => {setDateError(false)}, 2000)
    }

    // ------------nested checkboxes start---------
    const nestedFilterCheckbox = [
        { id: 1, name: "Categroy 1" },
        { id: 2, name: "Categroy 2" },
        { id: 3, name: "Categroy 3" }
    ];
    // ------------nested checkboxes end---------
    // ---------add filter button toogle start----------
    const [filterOptionsShow, setFilterOptionsShow] = useState(false)
    // ---------add filter button toogle end----------

    let start_time = new Date(startTime);

    return (
        <div className="filters">
            {dateError && 
             <div className="pb-6 text-red-500">Please select valid start date and end date</div>
            }
            <div className="flex gap-8 mb-10">
                <div>
                    <p className="font-poppins font-medium text-sm text-secondaryColor pb-1">From
                    </p>
                    {/* <BsFillCalendarCheckFill /> */}
                    <div className="flex gap-2">
                        <DatePicker
                            showIcon
                            selected={startDate}
                            onChange={(date) => {
                                setDateError(false);
                                if (date > endDate){showError();return;}
                                props.setFilters({ startDate: date })
                            }}
                            customInput={<CustomInput />}
                        />

                        <TimePicker clearIcon="" onChange={(time) => props.setFilters({ startTime: time })} value={start_time.getHours() + ':' + start_time.getMinutes()}
                            className="border border-gray-200 rounded bg-white pl-2 font-poppins text-secondaryColor leading-7 text-sm font-normal"
                        />
                    </div>

                </div>
                <div>
                    <p className="font-poppins font-medium text-sm text-secondaryColor pb-1">To
                    </p>
                    {/* <BsFillCalendarCheckFill /> */}
                    <div className="flex gap-2">
                        <DatePicker
                            showIcon
                            selected={endDate}
                            onChange={(date) => {
                                setDateError(false);
                                if (date < startDate){showError();return;}
                                props.setFilters({ endDate: date })}
                            }
                            customInput={<CustomInput />}
                        />

                        <TimePicker clearIcon="" onChange={(time) => props.setFilters({ endTime: time })} value={endTime}
                            className="border border-gray-200 rounded bg-white pl-2 font-poppins text-secondaryColor leading-7 text-sm font-normal"
                        />
                    </div>

                </div>
                <div className="basis-1/2">
                    <p className="font-poppins font-medium text-sm text-secondaryColor pb-1">Pages
                    </p>
                    <Dropdown options={props.landingPage} onChange={(e) => {props.setFilters({landingpage: e.value})}} placeholder="Select an option" className="font-poppins font-medium text-sm text-secondaryColor" />
                </div>
            </div>
            <h4 className="font-poppins font-medium text-sm text-green-900 mb-6">Showing results for {props.total} conversations</h4>
            <h4 className="font-poppins font-medium text-sm text-secondaryColor mb-4">Advanced filters</h4>
            <div className="flex items-start gap-x-16 mb-6 max-w-6xl advance_filter">
                <div className="border border-gray-200 rounded bg-white flex items-center">
                    <p className="font-poppins font-normal text-sm text-secondaryColor leading-7">Conversation_ID</p>
                </div>
                <div className="flex justify-start max-w-6xl gap-x-16 gap-y-4 flex-wrap advance_filter">
                    <div className="border border-gray-600 rounded bg-white p-1.5 flex items-center">
                        <input name="conversation_id" value={props.filters.conversationId} onChange={(e) => props.setFilters({conversationId: e.target.value})}></input>
                    </div>
                </div>
            </div>
            <div className="relative">
                <button onClick={() => setFilterOptionsShow(!filterOptionsShow)} className="font-poppins font-normal text-base text-white bg-green-900 flex items-center justify-center gap-2.5 rounded py-1.5 pr-2 pl-3 w-36 h-10">
                    <AiOutlinePlus />
                    Add Filters
                </button>

                {filterOptionsShow &&
                    <div className="absolute bg-green-900 rounded font-poppins font-normal text-base text-white flex flex-col gap-y-2 top-12 w-52 z-10 py-1.5 px-1.5">
                        {checkedList.map(({ id, name, checked }) => (
                            <label
                                htmlFor={id}
                                className={`checkboxFilterOption relative cursor-pointer ${checked ? "checkboxFilter" : ""
                                    }`}
                                key={id}
                            >
                                <input
                                    type="checkbox"
                                    name={id}
                                    id={id}
                                    value={id}
                                    checked={checked}
                                    onChange={() => checkboxClicked(id)}
                                    checked={checked}
                                />
                                {name}
                            </label>

                        ))}

                        {checkedList.map(({ id, name, checked }) => (
                            checked && (
                                <div className="absolute bg-white rounded p-3 ml-2 left-full top-0 w-52 shadow-6xl" key={id}>
                                    {/* Add your content for the checkbox here */}
                                    <button className="absolute -right-2 -top-2">
                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M15.5 7.56885C15.5 11.7111 12.1423 15.0688 8 15.0688C3.85775 15.0688 0.5 11.7111 0.5 7.56885C0.5 3.4266 3.85775 0.0688477 8 0.0688477C12.1423 0.0688477 15.5 3.4266 15.5 7.56885ZM5.7275 5.29635C5.83297 5.19101 5.97594 5.13184 6.125 5.13184C6.27406 5.13184 6.41703 5.19101 6.5225 5.29635L8 6.77385L9.4775 5.29635C9.58413 5.19699 9.72517 5.14289 9.87089 5.14547C10.0166 5.14804 10.1557 5.20707 10.2587 5.31013C10.3618 5.41319 10.4208 5.55223 10.4234 5.69796C10.426 5.84368 10.3719 5.98472 10.2725 6.09135L8.795 7.56885L10.2725 9.04635C10.3719 9.15298 10.426 9.29401 10.4234 9.43974C10.4208 9.58547 10.3618 9.7245 10.2587 9.82756C10.1557 9.93062 10.0166 9.98966 9.87089 9.99223C9.72517 9.9948 9.58413 9.94071 9.4775 9.84135L8 8.36385L6.5225 9.84135C6.41587 9.94071 6.27483 9.9948 6.12911 9.99223C5.98338 9.98966 5.84434 9.93062 5.74128 9.82756C5.63822 9.7245 5.57919 9.58547 5.57662 9.43974C5.57405 9.29401 5.62814 9.15298 5.7275 9.04635L7.205 7.56885L5.7275 6.09135C5.62216 5.98588 5.56299 5.84291 5.56299 5.69385C5.56299 5.54478 5.62216 5.40182 5.7275 5.29635Z" fill="#228800" />
                                        </svg>

                                    </button>
                                    <p className="font-poppins text-secondaryColor text-sm">{name} Content</p>
                                    {nestedFilterCheckbox.map(({  id: nestedId, name: nestedName}) => (
                                        <label
                                            htmlFor={nestedId}
                                            className={`checkboxFilterOption nestedFilterCheckbox pb-3 pr-8 relative cursor-pointer font-poppins text-secondaryColor leading-[21px] tracking-wide-[0.05em] text-sm font-medium block ${checked ? "checkboxFilter" : ""
                                                }`}
                                            key={nestedId}
                                        >
                                            <input
                                                type="checkbox"
                                                id={nestedId}
                                            />
                                            {nestedName}
                                        </label>
                                    ))}
                                    <button className="bg-green-900 px-3 py-1 cursor-pointer font-poppins text-white leading-5 tracking-wide-[0.05em] text-xs font-normal float-right relative rounded-sm mt-2.5">Confirm</button>
                                </div>
                            )
                        ))}
                    </div>

                }
            </div>
        </div>
    );
}

export default Filters;