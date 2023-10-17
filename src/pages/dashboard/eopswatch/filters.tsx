import React, { useState, useRef, useEffect } from "react";
import styles from '../../../styles/Common.module.css';
import Image from "next/image";
import Datepicker from "react-tailwindcss-datepicker";

export default function Filter(props: any) {


    const [toggleArrow, setToggleArrow] = useState(false);
    const [toggleDrop, setToggleDrop] = useState(false);
    const [toggleFilter, setToggleFilter] = useState(false);
    const [toggleSort, setToggleSort] = useState(false);

    const [fromDate, setFromDate] = useState({
        startDate: null,
        endDate: null
    });
    const [toDate, setToDate] = useState({
        startDate: null,
        endDate: null
    });

    const [filterData, setFilterData] = useState<any>({
        city: "",
        state: "",
        zipcode: "",
        date: "",
        from: "",
        to: ""
    })

    const [value, setValue] = useState(0);
    const [data, setData] = useState([] as any);
    const [toggleDateField, setToggleDateField] = useState(false);

    const toggleFilterFunction = () => {
        setToggleArrow(!toggleArrow);
        setToggleFilter(!toggleFilter);
    }
    const toggleDropFunction = () => {
        setToggleDrop(!toggleDrop);
    }

    // Sort Table By ID
    const sortByID = () => {
        setToggleSort(!toggleSort)
    }


    // Toggle Filters**
    // Handle Range Slider
    const handleRange = (e: any) => {
        setValue(e.target.value);
        let targetName = e.target.name;
        let targetValue = e.target.value;
        setFilterData((state: any) => ({
            ...state,
            [targetName]: targetValue
        }));
    }


    // Handle Value change for radio (Impact Filter)
    const handleValueChangeImpact = (e: any) => {
        let targetName = e.target.name;
        let targetValue = e.target.value;
        setFilterData((state: any) => ({
            ...state,
            [targetName]: targetValue
        }));
    }


    // Handle Value change for radio (Any Date Filter)
    const handleValueChange = (e: any) => {
        let targetName = e.target.name;
        let targetValue = e.target.value;
        setFilterData((state: any) => ({
            ...state,
            [targetName]: targetValue
        }));
        if (targetValue === "specificDate" && targetName === "date") {
            setToggleDateField(true);
        } else {
            setToggleDateField(false);
        }
    }

    // Handle DatePiker Change From Date
    const handleCalendarFromChange = (newValue: any) => {
        setFromDate(newValue);
        setFilterData((state: any) => ({
            ...state,
            from: newValue.startDate
        }));
    }
    // Handle DatePiker Change
    const handleCalendarToChange = (newValue: any) => {
        setToDate(newValue);
        setFilterData((state: any) => ({
            ...state,
            to: newValue.startDate
        }));
    }

    const handleClickFunction = () => {
        props.handleClick(false)
    }

    // Apply filter function
    const applyFilter = async () => {
        props.handleApply(filterData);
        setToggleFilter(false);
        props.handleClick(false)
    }

    // Reset filter
    const resetFilter = () => {
        setFilterData({
            city: "",
            state: "",
            zipcode: "",
            date: "",
            from: "",
            to: ""
        });
        setData([]);
        setToggleFilter(false);
        props.handleClick(false);
        props.handleApply(filterData);
    }


    return (
        <div className="rounded rounded-xl shadow shadow-xl border border-gray-951 min-h-[350px] w-[380px] px-4 py-3 bg-white absolute right-0 top-[100%] mt-1 z-10">
            <div className="flex w-full justify-end items-center mb-5">
                <button
                    onClick={resetFilter}
                    className="text-sm text-black bg-gray-957 flex justify-center items-center border border-black rounded rounded-lg px-2 py-1 mr-3">
                    Reset
                </button>
                <button
                    onClick={applyFilter}
                    className="text-sm text-white bg-black flex justify-center border border-black items-center rounded rounded-lg px-2 py-1">
                    Apply
                </button>

                <button
                    onClick={handleClickFunction}
                >
                    <Image
                        src="/img/x-thin.svg"
                        alt="calendar"
                        height={32}
                        width={32}
                        className="ml-5"
                    />
                </button>
            </div>

            <div className="w-full mb-5 hiiden flex justify-between items-center gap-2">
                <div className="flex flex-wrap">
                    <p className="mb-2 p-0 text-black text-sm font-bold">City</p>
                    <input
                        type="text"
                        className="border border-gray-951 rounded rounded-xl h-[40px] w-full px-2"
                        name="city"
                        id="city"
                        placeholder="City"
                        value={filterData.city}
                        onChange={handleValueChange}
                    />
                </div>
                <div className="flex flex-wrap">
                    <p className="mb-2 p-0 text-black text-sm font-bold">State</p>
                    <input
                        type="text"
                        className="border border-gray-951 rounded rounded-xl h-[40px] w-full px-2"
                        name="state"
                        id="state"
                        placeholder="State"
                        value={filterData.state}
                        onChange={handleValueChange}
                    />
                </div>
                <div className="flex flex-wrap">
                    <p className="mb-2 p-0 text-black text-sm font-bold">ZipCode</p>
                    <input
                        type="text"
                        className="border border-gray-951 rounded rounded-xl h-[40px] w-full px-2"
                        name="zipcode"
                        id="zipcode"
                        placeholder="Zip Code"
                        value={filterData.zipcode}
                        onChange={handleValueChange}
                    />
                </div>
            </div>

            <div className="w-full">
                <p className="mb-3 p-0 text-black text-sm font-bold">Mfd Date</p>
                <ul className="mb-4">
                    <li className="mb-1">
                        <div className="flex justify-start items-center">
                            <div className={`${styles.cricleCheckWrap}`}>
                                <input
                                    type="radio"
                                    name="date"
                                    id="date"
                                    value="today"
                                    onChange={handleValueChange}
                                    checked={filterData.date && filterData.date === "today" ? true : false}
                                />
                                <span></span>
                            </div>
                            <label htmlFor="impact" className="ml-1 text-sm">Today</label>
                        </div>
                    </li>
                    <li className="mb-1">
                        <div className="flex justify-start items-center">
                            <div className={`${styles.cricleCheckWrap}`}>
                                <input
                                    type="radio"
                                    name="date"
                                    id="date"
                                    value="yesterday"
                                    onChange={handleValueChange}
                                    checked={filterData.date && filterData.date === "yesterday" ? true : false}
                                />
                                <span></span>
                            </div>
                            <label htmlFor="impact" className="ml-1 text-sm">Yesterday</label>
                        </div>
                    </li>
                    <li className="mb-1">
                        <div className="flex justify-start items-center">
                            <div className={`${styles.cricleCheckWrap}`}>
                                <input
                                    type="radio"
                                    name="date"
                                    id="date"
                                    value="thisMonth"
                                    onChange={handleValueChange}
                                    checked={filterData.date && filterData.date === "thisMonth" ? true : false}
                                />
                                <span></span>
                            </div>
                            <label htmlFor="impact" className="ml-1 text-sm">This Month</label>
                        </div>
                    </li>
                    <li className="mb-1">
                        <div className="flex justify-start items-center">
                            <div className={`${styles.cricleCheckWrap}`}>
                                <input
                                    type="radio"
                                    name="date"
                                    id="date"
                                    value="past3month"
                                    onChange={handleValueChange}
                                    checked={filterData.date && filterData.date === "past3month" ? true : false}
                                />
                                <span></span>
                            </div>
                            <label htmlFor="impact" className="ml-1 text-sm">Past 3 Months</label>
                        </div>
                    </li>
                    <li className="mb-1">
                        <div className="flex justify-start items-center">
                            <div className={`${styles.cricleCheckWrap}`}>
                                <input
                                    type="radio"
                                    name="date"
                                    id="date"
                                    value="specificDate"
                                    onChange={handleValueChange}
                                    checked={filterData.date && filterData.date === "specificDate" ? true : false}
                                />
                                <span></span>
                            </div>
                            <label htmlFor="impact" className="ml-1 text-sm">Specific date range</label>
                        </div>
                    </li>
                </ul>
                {toggleDateField &&
                    <div className="flex justify-between items-center">

                        <div>
                            <label htmlFor="" className="font-bold mb-3 text-sm">From</label>
                            <div className="relative border border-gray-962 rounded rounded-md h-[50px] w-[160px]">
                                <div className="rounded-lg border border-gray-954 h-[50px] small lg:w-full small:w-full sm:w-full focus:outline-none focus:border-yellow-951 outline-none">
                                    <div className={`${styles.datepicker} ${styles.datepicker2} pl-5`}>
                                        <Datepicker
                                            toggleClassName={`absolute bg-transparent rounded-r-lg text-white right-0 h-[50px] px-3 text-gray-400 focus:outline-none disabled:opacity-40 disabled:cursor-not-allowed outline-none z-10 opacity-0 pr-0`}
                                            placeholder="DD/MM/YYYY"
                                            useRange={false}
                                            asSingle={true}
                                            value={fromDate}
                                            onChange={handleCalendarFromChange}
                                        />
                                    </div>
                                </div>
                                <Image
                                    src="/img/calendar-new.svg"
                                    alt="calendar"
                                    height={24}
                                    width={24}
                                    className="absolute top-[12px] left-[5px]"
                                />
                            </div>
                        </div>

                        <span className="h-[2px] w-[15px] bg-black inline-block relative top-3"></span>

                        <div>
                            <label htmlFor="" className="font-bold mb-3 text-sm">To</label>
                            <div className="relative border border-gray-962 rounded rounded-md h-[50px] w-[160px]">
                                <div className="rounded-lg border border-gray-954 h-[50px] small lg:w-full small:w-full sm:w-full focus:outline-none focus:border-yellow-951 outline-none">
                                    <div className={`${styles.datepicker} ${styles.datepicker2} pl-5`}>
                                        <Datepicker
                                            toggleClassName={`absolute bg-transparent rounded-r-lg text-white right-0 h-[50px] px-3 text-gray-400 focus:outline-none disabled:opacity-40 disabled:cursor-not-allowed outline-none z-10 opacity-0 pr-0`}
                                            placeholder="DD/MM/YYYY"
                                            useRange={false}
                                            asSingle={true}
                                            value={toDate}
                                            onChange={handleCalendarToChange}
                                        />
                                    </div>
                                </div>
                                <Image
                                    src="/img/calendar-new.svg"
                                    alt="calendar"
                                    height={24}
                                    width={24}
                                    className="absolute top-[12px] left-[5px]"
                                />
                            </div>
                        </div>


                    </div>
                }
            </div>

        </div>
    )
}