import React, { useState, useRef, useEffect } from "react";
import styles from '../../../styles/Common.module.css';
import Datepicker from "react-tailwindcss-datepicker";
import Image from "next/image";
export default function Filter() {
    const [toggleArrow, setToggleArrow] = useState(false);
    const [toggleDateField, setToggleDateField] = useState(false);
    const [toggleFilter, setToggleFilter] = useState(false);
    const [filterData, setFilterData] = useState<any>({
        date: ""
    })
    const [fromDate, setFromDate] = useState({
        startDate: null,
        endDate: null
    });
    const [toDate, setToDate] = useState({
        startDate: null,
        endDate: null
    });
    const toggleFilterFunction = () => {
        setToggleArrow(!toggleArrow);
        setToggleFilter(!toggleFilter);
    }
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
    const handleCalendarFromChange = (newValue: any) => {
        setFromDate(newValue);
    }
    const handleCalendarToChange = (newValue: any) => {
        setToDate(newValue);
    }
    return (
        <>
            <div className="relative">
                <button
                    className={` border-2  h-[44px] transition-all duration-[400ms] rounded-xl px-2 py-2 flex items-center justify-start border-gray-969 ${toggleFilter ? 'bg-gray-969' : 'bg-white'}`}
                    onClick={toggleFilterFunction}
                >
                    <Image
                        src="/img/filter-icon.svg"
                        alt="calendar"
                        height={22}
                        width={22}
                    />
                    <span className="mr-2 ml-1 font-semibold">Filters</span>
                    <Image
                        src="/img/arrow-down-black.svg"
                        alt="Arrow Down"
                        height={24}
                        width={24}
                        className={`${toggleArrow === true ? 'rotate-180' : 'rotate-0'}`}
                    />
                </button>
                {toggleFilter &&
                    <div className={`w-[376px] shadow-xl min-h-[300px] bg-white text-black border overflow-hidden1 border-gray-969 rounded-xl flex flex-col flex-wrap items-start justify-start absolute top-[50px] right-[0px] z-[1] px-2 py-2`}>
                        <div className="flex justify-end items-center w-full mb-1">
                            <button onClick={() => setToggleFilter(false)} className="rounded-lg bg-gray-969 border border-black flex items-center jsutify-center text-black h-[30px] px-2 text-[13px] mr-3">Reset</button>
                            <button onClick={() => setToggleFilter(false)} className="rounded-lg bg-black border border-black flex items-center jsutify-center text-white h-[30px] px-2 text-[13px] mr-2">Apply</button>
                            <button>
                                <Image alt="close" src="/img/x-thin.svg" height={34} width={34} onClick={() => setToggleFilter(false)} />
                            </button>
                        </div>
                        <div className="w-full p-3 ">
                            <p className="mb-3 p-0 text-black text-sm font-bold">Any Date</p>
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
                                        <div className="relative border border-gray-962 rounded-md h-[50px] w-[160px]">
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
                                        <div className="relative border border-gray-962 rounded-md h-[50px] w-[160px]">
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
                }
            </div>
        </>
    )
}