import React, { forwardRef, useEffect, useState } from "react";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import TimePicker from 'react-time-picker';
import 'react-time-picker/dist/TimePicker.css';

var line_index = 0;
const DateFilterSearch = (props) => {

    const [dateFilter, setDateFilter] = useState({
        from_date:'',
        to_date:'',
        from_time:'01:00',
        to_time:'01:00' 
    });

    useEffect(() => {
        var endDate = '';
        var startDate = '';
        var start_time = '01:00';
        var end_time = '23:59';
        var date = '';
        if (props.currentValues.from_date !== '') {
            startDate = new Date(props.currentValues.from_date)
        }
        if (props.currentValues.to_date !== '') {
            endDate = new Date(props.currentValues.to_date)
        }
        if (props.currentValues.from_time !== '') {
            start_time = props.currentValues.from_time   
        }
        if (props.currentValues.to_time !== '') {
            end_time = props.currentValues.to_time   
        }
        var newDate = {
            from_date: startDate,
            from_time:start_time,
            to_date:endDate,
            to_time:end_time
        }
        console.log("current", newDate)
        console.log(props.currentValues)
        setDateFilter(newDate);
    }, [])


    const CustomInput = forwardRef(({ value, onClick, onChange }, ref) => (
        <input
            value={value}
            className="custom-input border border-gray-200 rounded py-2 font-poppins text-secondaryColor leading-7 text-sm font-normal w-full"
            style={{ backgroundImage: `url({../../../assets/svg/calendar.svg})` }}
            onClick={onClick}
            ref={ref}
        ></input>
    ));

    function submitAllValues() {
        var endDate = '';
        var startDate = '';
        var date = '';
        if (dateFilter.from_date !== '') {
            date = new Date(dateFilter.from_date);
            startDate = date.toLocaleDateString('en-US')
        }
        if (dateFilter.to_date !== '') {
            date = new Date(dateFilter.to_date);
            endDate = date.toLocaleDateString('en-US')    
        }
        var newDate = {
            from_date: startDate,
            from_time:dateFilter.from_time,
            to_date:endDate,
            to_time:dateFilter.to_time
        }
        props.submitListValues(newDate, props.field_name)
    }

    return (
        <div className="absolute bg-white rounded p-3 ml-2 left-full top-0 shadow-6xl advanced_filters" key={props.id}>
            {/* Add your content for the checkbox here */}
            <button className="absolute -right-2 -top-2" onClick={() => props.closePopup()}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M15.5 7.56885C15.5 11.7111 12.1423 15.0688 8 15.0688C3.85775 15.0688 0.5 11.7111 0.5 7.56885C0.5 3.4266 3.85775 0.0688477 8 0.0688477C12.1423 0.0688477 15.5 3.4266 15.5 7.56885ZM5.7275 5.29635C5.83297 5.19101 5.97594 5.13184 6.125 5.13184C6.27406 5.13184 6.41703 5.19101 6.5225 5.29635L8 6.77385L9.4775 5.29635C9.58413 5.19699 9.72517 5.14289 9.87089 5.14547C10.0166 5.14804 10.1557 5.20707 10.2587 5.31013C10.3618 5.41319 10.4208 5.55223 10.4234 5.69796C10.426 5.84368 10.3719 5.98472 10.2725 6.09135L8.795 7.56885L10.2725 9.04635C10.3719 9.15298 10.426 9.29401 10.4234 9.43974C10.4208 9.58547 10.3618 9.7245 10.2587 9.82756C10.1557 9.93062 10.0166 9.98966 9.87089 9.99223C9.72517 9.9948 9.58413 9.94071 9.4775 9.84135L8 8.36385L6.5225 9.84135C6.41587 9.94071 6.27483 9.9948 6.12911 9.99223C5.98338 9.98966 5.84434 9.93062 5.74128 9.82756C5.63822 9.7245 5.57919 9.58547 5.57662 9.43974C5.57405 9.29401 5.62814 9.15298 5.7275 9.04635L7.205 7.56885L5.7275 6.09135C5.62216 5.98588 5.56299 5.84291 5.56299 5.69385C5.56299 5.54478 5.62216 5.40182 5.7275 5.29635Z" fill="#228800" />
                </svg>
            </button>
            <p className="font-poppins text-secondaryColor text-sm"> Contains</p>
            <p className="font-poppins text-secondaryColor text-sm font-medium">From</p>
            <div className="flex gap-2">
                <label>
                    <DatePicker
                        showIcon
                        selected={dateFilter.from_date}
                        customInput={<CustomInput />}
                        onChange={(date) => {
                            setDateFilter(prevState => ({
                            ...prevState,
                            from_date:date
                            }));
                        }
                        }
                    />
                </label>
                    <TimePicker disableClock  value={dateFilter.from_time}
                        className="border border-gray-200 rounded bg-white pl-2 font-poppins text-secondaryColor leading-7 text-sm font-normal"
                        onChange={(time) => {
                            setDateFilter(prevState => ({
                                ...prevState,
                                from_time:time
                            }));
                        }}
                    />
            </div>
            <p className="font-poppins text-secondaryColor text-sm font-medium">To</p>
            <div className="flex gap-2">
                <label>
                    <DatePicker
                        showIcon
                        selected={dateFilter.to_date}
                        customInput={<CustomInput />}
                        onChange={(date) => {
                            setDateFilter(prevState => ({
                            ...prevState,
                            to_date:date
                            }));
                        }
                        }
                    />
                </label>
                    <TimePicker disableClock  value={dateFilter.to_time}
                        className="border border-gray-200 rounded bg-white pl-2 font-poppins text-secondaryColor leading-7 text-sm font-normal"
                        onChange={(time) => {
                            setDateFilter(prevState => ({
                                ...prevState,
                                to_time:time
                            }));
                        }}
                    />
            </div>
            <button 
            onClick={() => {submitAllValues()}}
            className="bg-green-900 px-3 py-1 cursor-pointer font-poppins text-white leading-5 tracking-wide-[0.05em] text-xs font-normal float-right relative rounded-sm mt-2.5">Confirm</button>
        </div>
    );
}

export default DateFilterSearch;