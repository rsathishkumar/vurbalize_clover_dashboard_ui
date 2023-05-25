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
    const {startDate, endDate, startTime, endTime} = props.filters;

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
        { id: 3, name: "turn_count" }
    ];
    const [checkedList, setCheckedList] = useState(checkboxFilterOptions);

    const checkboxClicked = (id) => {
        setCheckedList((prevCheckedList) =>
            prevCheckedList.map((checkedItem) => {
                if (checkedItem.id === id) {
                    return { ...checkedItem, checked: !checkedItem.checked };
                }
                return checkedItem;
            })
        );
    }
    // ---------add filter button toogle start----------
    const [filterOptionsShow, setFilterOptionsShow] = useState(false)
    // ---------add filter button toogle end----------

    return (
        <div className="filters">
            <div className="flex gap-8 mb-10">
                <div>
                    <p className="font-poppins font-medium text-sm text-secondaryColor pb-1">From
                    </p>
                    {/* <BsFillCalendarCheckFill /> */}
                    <div className="flex gap-2">
                        <DatePicker
                            showIcon
                            selected={startDate}
                            onChange={(date) => props.setFilters({startDate: date})}
                            customInput={<CustomInput />}
                        />

                        <TimePicker clearIcon="" onChange={(time) => props.setFilters({startTime: time})} value={startTime}
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
                            onChange={(date) => props.setFilters({endDate: date})}
                            customInput={<CustomInput />}
                        />

                        <TimePicker clearIcon="" onChange={(time) => props.setFilters({endTime: time})} value={endTime}
                            className="border border-gray-200 rounded bg-white pl-2 font-poppins text-secondaryColor leading-7 text-sm font-normal"
                        />
                    </div>

                </div>
                <div>
                    <p className="font-poppins font-medium text-sm text-secondaryColor pb-1">Pages
                    </p>
                    <Dropdown options={props.landingPage} placeholder="Select an option" className="font-poppins font-medium text-sm text-secondaryColor" />
                </div>
            </div>
            <h4 className="font-poppins font-medium text-sm text-green-900 mb-6">Showing results for {props.total} conversations</h4>
            <h4 className="font-poppins font-medium text-sm text-secondaryColor mb-4">Advanced filters</h4>
            <div className="flex justify-center items-start gap-x-16 mb-6 max-w-6xl advance_filter">
                <div className="border border-gray-200 rounded bg-white p-1.5 flex items-center">
                    <p className="font-poppins font-normal text-sm text-secondaryColor leading-7">Conversation_ID</p>
                </div>
                <div className="flex justify-start max-w-6xl gap-x-16 gap-y-4 flex-wrap advance_filter">
                    <div className="border border-gray-200 rounded bg-white p-1.5 flex items-center">
                        <p className="font-poppins font-normal text-sm text-secondaryColor">ap0023564gh87kllhkagjlakjl445</p>
                    </div>
                    <div className="border border-gray-200 rounded bg-white px-1.5 flex gap-1 items-center">
                        <p className="font-poppins font-normal text-sm text-secondaryColor flex items-center">Between</p>
                        <input className="border border-gray-200 rounded bg-white w-16 px-1" type="number" step="1" min="1" />
                        <input className="border border-gray-200 rounded bg-white w-16 px-1" type="number" step="1" min="1" />
                    </div>
                    
                    <div className="border border-gray-200 rounded bg-white px-1.5 py-[4px] flex gap-1 items-center">
                        <p className="font-poppins font-normal text-sm text-secondaryColor flex items-center">More than</p>
                        <input className="border border-gray-200 rounded bg-white w-16 px-1" type="number" step="1" min="1" />
                    </div>
                </div>
            </div>
            <div className="relative">
                <button onClick={() => setFilterOptionsShow(!filterOptionsShow)} className="font-poppins font-normal text-base text-white bg-green-900 flex items-center justify-center gap-2.5 rounded py-1.5 pr-2 pl-3 w-36 h-10">
                    <AiOutlinePlus />
                    Add Filters
                </button>

                {filterOptionsShow &&
                    <div className="absolute bg-green-900 rounded font-poppins font-normal text-base text-white flex flex-col gap-y-2 top-12 w-52 h-96 z-10 py-1.5 px-1.5">
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
                    </div>
                }
            </div>
        </div>
    );
}

export default Filters;