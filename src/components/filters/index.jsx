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
        { id: 4, name: "ConvT2A", type:'numeric' },
        { id: 5, name: "ConvOutcome", type:'category' },
        { id: 6, name: "apptDate", type:'datetime' },
        { id: 8, name: "MarketoLead", type:'multilist' },
    ];
    const [checkedList, setCheckedList] = useState(checkboxFilterOptions);
    const [selectedCheckboxes, setSelectedCheckboxes] = useState([]);
    const [showAdvancedFilters, setShowAdvancedFilters] = useState({
        'conversation_id':[],
        'su_id':[],
        'apptDate':{from_date:'',to_date:'',from_time:'',to_time:''}
    });
    const [showFiltersOptions, setShowFiltersOptions] = useState([]);

    useEffect(() => {
        __init();
    }, [props.filters])

    const __init = async () => {
        const { conversationId, suId, apptDate } = props.filters;
        var key_values = {}
        var show_filters = []

        if (conversationId.length > 0) {
            key_values['conversation_id'] = conversationId;
            show_filters.push('conversation_id');
        }
        if (suId.length > 0) {
            key_values['su_id'] = suId;
            show_filters.push('su_id');
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
                    console.log("Fields", field_type)
                    if (field_type === 'multilist') {
                        return (
                            <div className="flex justify-start max-w-6xl gap-x-8 gap-y-4 flex-wrap my-4">
                                <div className="font-poppins font-normal text-sm text-secondaryColor leading-7 min-width-[100px]">
                                    {key}
                                </div>
                                {fields.map((field_key, field_index) => {
                                return (
                                    <div className="border border-gray-400 rounded p-1 min-w-[200px]">
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
                                <div className="border border-gray-400 rounded p-2 min-w-[200px] flex items-center gap-2">
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
                })
            }
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

                        {checkedList.map(({ id, name, checked, type }) => {
                            if (checked && type === 'multilist') {
                                return (
                                    <MultiListSearchText 
                                        field_name={name} 
                                        id={props.id} 
                                        submitListValues={(list, field_name) => submitListValues(list, field_name)} 
                                        currentValues={showAdvancedFilters[name]} 
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
                                        currentValues={showAdvancedFilters[name]} 
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