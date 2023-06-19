import React, { forwardRef, useState } from "react";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import TimePicker from 'react-time-picker';
import 'react-time-picker/dist/TimePicker.css';
import 'react-clock/dist/Clock.css';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import { AiOutlinePlus } from "react-icons/ai"
import MultiListSearchText from "components/multiListSearchText/index.jsx"
import DateFilterSearch from "components/dateFilterSearch/index.jsx"
import NumericFilterSearch from "components/numericFilterSearch/index.jsx"
import CatgoryFilterSearch from "components/CatgoryFilterSearch/index.jsx"
import calendaricon from "assets/svg/calendar.svg"
import { useEffect } from "react";

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
        { id: 1, name: "conversation_id", type:'multilist' },
        { id: 2, name: "su_id", type:'multilist' },
        { id: 3, name: "turn_count", type:'numeric' },
        { id: 4, name: "convT2A", type:'numeric' },
        { id: 5, name: "convOutcome", type:'category' },
        { id: 6, name: "apptDate", type:'datetime' },
        { id: 7, name: "MarketoLead", type:'multilist' },
        { id: 8, name: "chatRating", type:'numeric' },
        { id: 9, name: "chatFeedback", type:'multilist' },
    ];
    const [checkedList, setCheckedList] = useState(checkboxFilterOptions);
    const [selectedCheckboxes, setSelectedCheckboxes] = useState([]);
    const [showAdvancedFilters, setShowAdvancedFilters] = useState({
        'conversation_id':[],
        'su_id':[],
        'apptDate':{from_date:'',to_date:'',from_time:'',to_time:''},
        'turn_count':{},
        'convT2A':{},
        'convOutcome':[],
        'MarketoLead':[],
        'chatRating':{},
        'chatFeedback':[]
    });
    const [showFiltersOptions, setShowFiltersOptions] = useState([]);

    useEffect(() => {
        __init();
    }, [props.filterChange])

    const __init = async () => {
        const { conversationId, suId, apptDate, turnID,convT2A,convOutcome, MarketoLead, chatRating, chatFeedback } = props.filters;
        var key_values = {}
        var show_filters = []

        if (conversationId.length > 0) {
            key_values['conversation_id'] = conversationId;
            show_filters.push('conversation_id');
        }

        if (convOutcome.length > 0) {
            key_values['convOutcome'] = convOutcome;
            show_filters.push('convOutcome');
        }

        if (suId.length > 0) {
            key_values['su_id'] = suId;
            show_filters.push('su_id');
        }

        if (MarketoLead.length > 0) {
            key_values['MarketoLead'] = MarketoLead;
            show_filters.push('MarketoLead');
        }

        if(Object.keys(turnID).length > 0) {
            key_values['turn_count'] = turnID;
            show_filters.push('turn_count');
        }

        if(Object.keys(convT2A).length > 0) {
            key_values['convT2A'] = convT2A;
            show_filters.push('convT2A');
        }

        if(Object.keys(chatRating).length > 0) {
            key_values['chatRating'] = chatRating;
            show_filters.push('chatRating');
        }

        if(Object.keys(chatFeedback).length > 0) {
            key_values['chatFeedback'] = chatFeedback;
            show_filters.push('chatFeedback');
        }

        if (apptDate['from'] !== "") {
            var start_date = apptDate['from'].split(" ");
            var end_date = apptDate['to'].split(" ");
            key_values['apptDate'] = {
                from_date: start_date[0],
                to_date: end_date[0],
                from_time: start_date[1],
                to_time: end_date[1]
            };
            show_filters.push('apptDate');
        }
        if(show_filters.length > 0) {
            console.log("showfilters", show_filters)
            await setShowFiltersOptions(show_filters)
            await setShowAdvancedFilters(
                key_values
            )
        }
    }

    const getFieldType = (field) => {

        var type = '';
        for(var i = 0; i< checkboxFilterOptions.length; i++) {
            if (checkboxFilterOptions[i].name === field) {
                type = checkboxFilterOptions[i].type;
            }
        }
        return type;
    }

    const submitListValues = async (list, field_name) => {
        var values = [];
        values[field_name] = list;

        await setShowAdvancedFilters((prevValues) => {    
          return { ...prevValues, ...values };
        });
        if (showFiltersOptions.indexOf(field_name) === -1) {
            await setShowFiltersOptions([...showFiltersOptions, field_name])
        }
        if (field_name === "conversation_id") {
            await props.setFilters({conversationId: list})
        }
        if (field_name === "su_id") {
            await props.setFilters({suId: list})
        }
        if (field_name === "MarketoLead") {
            await props.setFilters({MarketoLead: list})
        }
        if (field_name === "convOutcome") {
            await props.setFilters({convOutcome: list})
        }
        if (field_name === "turn_count") {
            await props.setFilters({turnID: list})
        }
        if (field_name === "convT2A") {
            await props.setFilters({convT2A: list})
        }
        if (field_name === "chatRating") {
            await props.setFilters({chatRating: list})
        }
        if (field_name === "chatFeedback") {
            await props.setFilters({chatFeedback: list})
        }
        if (field_name === "apptDate") {
            var fromdate = '';

            if (list.from_date !== '') {
                fromdate = list.from_date + " " + list.from_time;
            }
            var todate = '';
            if (list.to_date !== '') {
                todate = list.to_date + " " + list.to_time;
            }
            var date = {from: fromdate, to: todate}
            await props.setFilters({apptDate: date})
        }
    };

    const checkboxClicked = (id) => {
        setCheckedList((prevCheckedList) =>
            prevCheckedList.map((checkedItem) => {
                if (checkedItem.id === id) {
                    checkedItem = { ...checkedItem, checked: !checkedItem.checked };
                }
                else {
                    checkedItem = { ...checkedItem, checked: false };
                }
                return checkedItem;
            })
        );
    };

    const showError = () => {
        setDateError(true);
     //   setTimeout(() => {setDateError(false)}, 2000)
    }

    const resetFilterValue = async (field_index, field_type, field_name) => {
        if (field_type === "multilist" || field_type === "category") {
            var values = [];
            var newValues = showAdvancedFilters[field_name]
            newValues.splice(field_index, 1);
            values[field_name] = newValues;
            setShowAdvancedFilters((prevValues) => {    
              return { ...prevValues, ...values };
            });
            if (newValues.length === 0) {
                var showFilters = showFiltersOptions;
                for (var i = showFilters.length - 1; i >= 0; i--) {
                    if (showFilters[i] === field_name) {
                        showFilters.splice(i, 1);
                    }
                }
                setShowFiltersOptions(showFilters)
            }
            props.setFilters({field_name: newValues})
        }
        else if (field_type === "numeric") {
            var values = [];
            values[field_name] = {};
            await setShowAdvancedFilters((prevValues) => {    
              return { ...prevValues, ...values };
            });
            var showFilters = showFiltersOptions;
            for (var i = showFilters.length - 1; i >= 0; i--) {
                if (showFilters[i] === field_name) {
                    showFilters.splice(i, 1);
                }
            }
            await setShowFiltersOptions(showFilters)
            props.setFilters({field_name: values[field_name]})
        }
        else if (field_type === "datetime") {
            var values = [];
            values[field_name] = {from_date:'',to_date:'',from_time:'',to_time:''};
            setShowAdvancedFilters((prevValues) => {    
              return { ...prevValues, ...values };
            });
            var showFilters = showFiltersOptions;
            for (var i = showFilters.length - 1; i >= 0; i--) {
                if (showFilters[i] === field_name) {
                    showFilters.splice(i, 1);
                }
            }
            setShowFiltersOptions(showFilters)
            props.setFilters({field_name: values[field_name]})
        }
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

    const renderKeyValuePairs = (obj) => {
        return Object.entries(obj).map(([key, value]) => {
            if (key === "between") {
                return (
                    <div key={key} className="flex gap-4">
                      <div className="p-1">{key}</div>
                      <div className="border border-gray-400 rounded p-1 w-[50px] text-right">{value[0]}</div>
                      <div className="border border-gray-400 rounded p-1 w-[50px] text-right">{value[1]}</div>
                    </div>
                )
            } 
            else {
                return (
                    <div key={key} className="flex gap-4">
                      <div className="p-1">{key}</div>
                      <div className="border border-gray-400 rounded p-1 w-[50px] text-right">{value}</div>
                    </div>
                )
            }   
        });
    };

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
                    <label>
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
                        </label>
                        <TimePicker  disableClock onChange={(time) => props.setFilters({ startTime: time })} value={startTime}
                            className="border border-gray-200 rounded bg-white pl-2 font-poppins text-secondaryColor leading-7 text-sm font-normal"
                        />
                    </div>
                </div>
                <div>
                    <p className="font-poppins font-medium text-sm text-secondaryColor pb-1">To
                    </p>
                    {/* <BsFillCalendarCheckFill /> */}
                    <div className="flex gap-2">
                    <label>
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
                    </label>
                        <TimePicker disableClock onChange={(time) => props.setFilters({ endTime: time })} value={endTime}
                            className="border border-gray-200 rounded bg-white pl-2 font-poppins text-secondaryColor leading-7 text-sm font-normal"
                        />
                    </div>

                </div>
                <div className="basis-1/2">
                    <p className="font-poppins font-medium text-sm text-secondaryColor pb-1">Pages
                    </p>
                    <Dropdown options={props.landingPage} onChange={(e) => {props.setFilters({landingpage: e.value})}} placeholder="All" className="font-poppins font-medium text-sm text-secondaryColor" />
                </div>
            </div>
            <h4 className="font-poppins font-medium text-sm text-green-900 mb-6">Showing results for {props.total} conversations</h4>
            <h4 className="font-poppins font-medium text-sm text-secondaryColor mb-4">Advanced filters</h4>
            <div className="my-4">
            {
                showFiltersOptions.map((key,index) => {
                    var fields = showAdvancedFilters[key]
                    var field_type = getFieldType(key);
                    if (field_type === 'multilist') {
                        return (
                            <div className="flex justify-start max-w-6xl gap-x-8 gap-y-4 flex-wrap my-4">
                                <div className="font-poppins font-normal text-sm text-secondaryColor leading-7 min-width-[100px]">
                                    {key}
                                </div>
                                {fields.map((field_key, field_index) => {
                                return (
                                    <div className="border border-gray-400 rounded p-1 min-w-[200px] relative">
                                      <button className="absolute -right-2 -top-2" onClick={() => resetFilterValue(field_index, field_type, key)}>
                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M15.5 7.56885C15.5 11.7111 12.1423 15.0688 8 15.0688C3.85775 15.0688 0.5 11.7111 0.5 7.56885C0.5 3.4266 3.85775 0.0688477 8 0.0688477C12.1423 0.0688477 15.5 3.4266 15.5 7.56885ZM5.7275 5.29635C5.83297 5.19101 5.97594 5.13184 6.125 5.13184C6.27406 5.13184 6.41703 5.19101 6.5225 5.29635L8 6.77385L9.4775 5.29635C9.58413 5.19699 9.72517 5.14289 9.87089 5.14547C10.0166 5.14804 10.1557 5.20707 10.2587 5.31013C10.3618 5.41319 10.4208 5.55223 10.4234 5.69796C10.426 5.84368 10.3719 5.98472 10.2725 6.09135L8.795 7.56885L10.2725 9.04635C10.3719 9.15298 10.426 9.29401 10.4234 9.43974C10.4208 9.58547 10.3618 9.7245 10.2587 9.82756C10.1557 9.93062 10.0166 9.98966 9.87089 9.99223C9.72517 9.9948 9.58413 9.94071 9.4775 9.84135L8 8.36385L6.5225 9.84135C6.41587 9.94071 6.27483 9.9948 6.12911 9.99223C5.98338 9.98966 5.84434 9.93062 5.74128 9.82756C5.63822 9.7245 5.57919 9.58547 5.57662 9.43974C5.57405 9.29401 5.62814 9.15298 5.7275 9.04635L7.205 7.56885L5.7275 6.09135C5.62216 5.98588 5.56299 5.84291 5.56299 5.69385C5.56299 5.54478 5.62216 5.40182 5.7275 5.29635Z" fill="#228800" />
                                        </svg>
                                      </button>
                                        {field_key}
                                    </div>
                                )  
                                })}
                            </div>
                        )
                    }
                    else if (field_type === 'datetime') {
                        return (
                            <div className="flex justify-start max-w-6xl gap-x-8 gap-y-4 flex-wrap my-4 items-center">
                                <div className="font-poppins font-normal text-sm text-secondaryColor leading-7 min-width-[100px]">
                                    {key}
                                </div>
                                <div className="border border-gray-400 rounded p-2 min-w-[200px] flex items-center gap-2 relative">
                                      <button className="absolute -right-2 -top-2" onClick={() => resetFilterValue(0, field_type, key)}>
                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M15.5 7.56885C15.5 11.7111 12.1423 15.0688 8 15.0688C3.85775 15.0688 0.5 11.7111 0.5 7.56885C0.5 3.4266 3.85775 0.0688477 8 0.0688477C12.1423 0.0688477 15.5 3.4266 15.5 7.56885ZM5.7275 5.29635C5.83297 5.19101 5.97594 5.13184 6.125 5.13184C6.27406 5.13184 6.41703 5.19101 6.5225 5.29635L8 6.77385L9.4775 5.29635C9.58413 5.19699 9.72517 5.14289 9.87089 5.14547C10.0166 5.14804 10.1557 5.20707 10.2587 5.31013C10.3618 5.41319 10.4208 5.55223 10.4234 5.69796C10.426 5.84368 10.3719 5.98472 10.2725 6.09135L8.795 7.56885L10.2725 9.04635C10.3719 9.15298 10.426 9.29401 10.4234 9.43974C10.4208 9.58547 10.3618 9.7245 10.2587 9.82756C10.1557 9.93062 10.0166 9.98966 9.87089 9.99223C9.72517 9.9948 9.58413 9.94071 9.4775 9.84135L8 8.36385L6.5225 9.84135C6.41587 9.94071 6.27483 9.9948 6.12911 9.99223C5.98338 9.98966 5.84434 9.93062 5.74128 9.82756C5.63822 9.7245 5.57919 9.58547 5.57662 9.43974C5.57405 9.29401 5.62814 9.15298 5.7275 9.04635L7.205 7.56885L5.7275 6.09135C5.62216 5.98588 5.56299 5.84291 5.56299 5.69385C5.56299 5.54478 5.62216 5.40182 5.7275 5.29635Z" fill="#228800" />
                                        </svg>
                                      </button>

                                    {fields.from_date !== '' &&
                                    <div className="border border-gray-400 rounded p-1 min-w-[100px] flex gap-4 tracking-wider">
                                        From: {fields.from_date} {fields.from_time} <img src={calendaricon} />
                                    </div>
                                    }
                                    {(fields.to_date && fields.from_date) &&
                                        <div>-</div> 
                                    }
                                    {fields.to_date !== '' &&
                                    <div className="border border-gray-400 rounded p-1 min-w-[100px] flex gap-4 tracking-wider">
                                        To: {fields.to_date} {fields.to_time} <img src={calendaricon} />
                                    </div>
                                    }
                                </div>
                            </div>
                        )
                    }
                    else if (field_type === 'numeric') {
                        return (
                            <div className="flex justify-start max-w-6xl gap-x-8 gap-y-4 flex-wrap my-4 items-center">
                                <div className="font-poppins font-normal text-sm text-secondaryColor leading-7 min-width-[100px]">
                                    {key}
                                </div>
                                <div className="border border-gray-400 rounded p-1 min-w-[200px] flex items-center gap-2 relative">
                                <button className="absolute -right-2 -top-2" onClick={() => resetFilterValue(0, field_type, key)}>
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M15.5 7.56885C15.5 11.7111 12.1423 15.0688 8 15.0688C3.85775 15.0688 0.5 11.7111 0.5 7.56885C0.5 3.4266 3.85775 0.0688477 8 0.0688477C12.1423 0.0688477 15.5 3.4266 15.5 7.56885ZM5.7275 5.29635C5.83297 5.19101 5.97594 5.13184 6.125 5.13184C6.27406 5.13184 6.41703 5.19101 6.5225 5.29635L8 6.77385L9.4775 5.29635C9.58413 5.19699 9.72517 5.14289 9.87089 5.14547C10.0166 5.14804 10.1557 5.20707 10.2587 5.31013C10.3618 5.41319 10.4208 5.55223 10.4234 5.69796C10.426 5.84368 10.3719 5.98472 10.2725 6.09135L8.795 7.56885L10.2725 9.04635C10.3719 9.15298 10.426 9.29401 10.4234 9.43974C10.4208 9.58547 10.3618 9.7245 10.2587 9.82756C10.1557 9.93062 10.0166 9.98966 9.87089 9.99223C9.72517 9.9948 9.58413 9.94071 9.4775 9.84135L8 8.36385L6.5225 9.84135C6.41587 9.94071 6.27483 9.9948 6.12911 9.99223C5.98338 9.98966 5.84434 9.93062 5.74128 9.82756C5.63822 9.7245 5.57919 9.58547 5.57662 9.43974C5.57405 9.29401 5.62814 9.15298 5.7275 9.04635L7.205 7.56885L5.7275 6.09135C5.62216 5.98588 5.56299 5.84291 5.56299 5.69385C5.56299 5.54478 5.62216 5.40182 5.7275 5.29635Z" fill="#228800" />
                                </svg>
                                </button>

                                {renderKeyValuePairs(fields)}
                                </div>
                            </div>
                        )
                    }
                    else if (field_type === 'category') {
                        return (
                            <div className="flex justify-start max-w-6xl gap-x-8 gap-y-4 flex-wrap my-4 items-center">
                                <div className="font-poppins font-normal text-sm text-secondaryColor leading-7 min-width-[100px]">
                                    {key}
                                </div>
                                {fields.map((field_key, field_index) => {
                                return (
                                    <div className="border border-gray-400 rounded p-1 min-w-[150px] relative group">
                                      <button className="absolute -right-2 -top-2 group-hover:block" onClick={() => resetFilterValue(0, field_type, key)}>
                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M15.5 7.56885C15.5 11.7111 12.1423 15.0688 8 15.0688C3.85775 15.0688 0.5 11.7111 0.5 7.56885C0.5 3.4266 3.85775 0.0688477 8 0.0688477C12.1423 0.0688477 15.5 3.4266 15.5 7.56885ZM5.7275 5.29635C5.83297 5.19101 5.97594 5.13184 6.125 5.13184C6.27406 5.13184 6.41703 5.19101 6.5225 5.29635L8 6.77385L9.4775 5.29635C9.58413 5.19699 9.72517 5.14289 9.87089 5.14547C10.0166 5.14804 10.1557 5.20707 10.2587 5.31013C10.3618 5.41319 10.4208 5.55223 10.4234 5.69796C10.426 5.84368 10.3719 5.98472 10.2725 6.09135L8.795 7.56885L10.2725 9.04635C10.3719 9.15298 10.426 9.29401 10.4234 9.43974C10.4208 9.58547 10.3618 9.7245 10.2587 9.82756C10.1557 9.93062 10.0166 9.98966 9.87089 9.99223C9.72517 9.9948 9.58413 9.94071 9.4775 9.84135L8 8.36385L6.5225 9.84135C6.41587 9.94071 6.27483 9.9948 6.12911 9.99223C5.98338 9.98966 5.84434 9.93062 5.74128 9.82756C5.63822 9.7245 5.57919 9.58547 5.57662 9.43974C5.57405 9.29401 5.62814 9.15298 5.7275 9.04635L7.205 7.56885L5.7275 6.09135C5.62216 5.98588 5.56299 5.84291 5.56299 5.69385C5.56299 5.54478 5.62216 5.40182 5.7275 5.29635Z" fill="#228800" />
                                        </svg>
                                      </button>
                                        {field_key}
                                    </div>
                                )  
                                })}
                            </div>
                        )
                    }
                })
            }
            </div>
            <div className="relative">
                <button onClick={() => setFilterOptionsShow(!filterOptionsShow)} className="font-poppins font-normal text-base text-white bg-green-900 flex items-center justify-center gap-2.5 rounded py-1.5 pr-2 pl-3 w-36 h-10">
                    <AiOutlinePlus />
                    Add Filters
                </button>

                {filterOptionsShow &&
                    <div className="absolute bg-green-900 rounded font-poppins font-normal text-base text-white flex flex-col gap-y-4 top-12 w-52 z-10 py-2 px-2">
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

                        {checkedList.map(({ id, name, checked, type }) => {
                            if (checked && type === 'multilist') {
                                return (
                                    <MultiListSearchText 
                                        field_name={name} 
                                        id={props.id} 
                                        submitListValues={(list, field_name) => submitListValues(list, field_name)} 
                                        currentValues={(showAdvancedFilters[name] !== undefined)?showAdvancedFilters[name]:[]} 
                                        closePopup={() => {console.log(id); checkboxClicked(id)}}
                                    />
                                )
                            }
                            else if(checked && type === "datetime") {
                                return (
                                    <DateFilterSearch 
                                        field_name={name} 
                                        id={props.id} 
                                        submitListValues={(list, field_name) => submitListValues(list, field_name)} 
                                        currentValues={(showAdvancedFilters[name] !== undefined)?showAdvancedFilters[name]:{from_date:'',to_date:'',from_time:'',to_time:''}} 
                                        closePopup={() => {console.log(id); checkboxClicked(id)}}
                                    />
                                )
                            }
                            else if(checked && type === "numeric") {
                                return (
                                    <NumericFilterSearch 
                                        field_name={name} 
                                        id={props.id} 
                                        submitListValues={(list, field_name) => submitListValues(list, field_name)} 
                                        currentValues={(showAdvancedFilters[name] !== undefined)?showAdvancedFilters[name]:{}} 
                                        closePopup={() => {console.log(id); checkboxClicked(id)}}
                                    />
                                )
                            }
                            else if(checked && type === "category") {
                                console.log("advanced filters", name)
                                return (
                                    <CatgoryFilterSearch 
                                        field_name={name} 
                                        id={props.id} 
                                        submitListValues={(list, field_name) => submitListValues(list, field_name)} 
                                        currentValues={(showAdvancedFilters[name] !== undefined)?showAdvancedFilters[name]:{}} 
                                        closePopup={() => {console.log(id); checkboxClicked(id)}}
                                    />
                                )
                            }
                            })}
                    </div>

                }
            </div>
        </div>
    );
}

export default Filters;