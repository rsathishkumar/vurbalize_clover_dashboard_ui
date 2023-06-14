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
        { id: 1, name: "Conversation_id", type:'multilist' },
        { id: 2, name: "su_id", type:'multilist' },
        { id: 3, name: "turn_count", type:'numeric' },
        { id: 4, name: "ConvT2A", type:'numeric' },
        { id: 5, name: "ConvOutcome", type:'category' },
        { id: 6, name: "ApptDate", type:'datetime' },
        { id: 7, name: "ApptTime" },
        { id: 8, name: "MarketoLead", type:'multilist' },
    ];
    const [checkedList, setCheckedList] = useState(checkboxFilterOptions);
    const [selectedCheckboxes, setSelectedCheckboxes] = useState([]);
    const [showAdvancedFilters, setShowAdvancedFilters] = useState({
        'Conversation_id':[],
        'su_id':[]
    });
    const [showFiltersOptions, setShowFiltersOptions] = useState([]);

    const submitListValues = (list, field_name) => {
        console.log("List", list);
        var values = [];
        values[field_name] = list;

        setShowAdvancedFilters((prevValues) => {    
          return { ...prevValues, ...values };
        });
        console.log("filteroptions", showFiltersOptions.indexOf(field_name))
        if (showFiltersOptions.indexOf(field_name) === -1) {
            setShowFiltersOptions([...showFiltersOptions, field_name])
        }
        if (field_name === "Conversation_id") {
            props.setFilters({conversationId: list})
        }
        if (field_name === "su_id") {
            props.setFilters({suId: list})
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
                    console.log("Fields", showFiltersOptions)
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

                        {checkedList.map(({ id, name, checked, type }) => (
                            checked && type === 'multilist' &&  (
                                <MultiListSearchText 
                                    field_name={name} 
                                    id={props.id} 
                                    submitListValues={(list, field_name) => submitListValues(list, field_name)} 
                                    currentValues={showAdvancedFilters[name]} 
                                    closePopup={() => {console.log(id); checkboxClicked(id)}}
                                />
                            )
                        ))}
                    </div>

                }
            </div>
        </div>
    );
}

export default Filters;