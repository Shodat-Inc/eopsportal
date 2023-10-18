import React, { useState, useRef, useEffect } from "react";
import styles from '../../../styles/Common.module.css';
import Image from "next/image";
import Datepicker from "react-tailwindcss-datepicker";
import axios from "axios";

export default function Filter(props: any) {

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
        to: "",
        model: "",
        modelYear: "",
        type: "",
    })

    const [data, setData] = useState([] as any);
    const [dataCity, setDataCity] = useState([] as any);
    const [dataState, setDataState] = useState([] as any);
    const [dataZipcode, setDataZipcode] = useState([] as any);

    const [dataModel, setDataModel] = useState([] as any);
    const [dataModelYear, setDataModelYear] = useState([] as any);
    const [dataType, setDataType] = useState([] as any);
    const [toggleDateField, setToggleDateField] = useState(false);

    function removeDuplicates(arr: any) {
        return arr.filter((item: any, index: any) => arr.indexOf(item) === index);
    }

    // Get Child Object data on page load
    const fetchChildObjectData = () => {
        axios.get("/api/getObjects").then((response) => {
            if (response.data) {
                const filtered = response.data.filter((item: any) => {
                    return item.parentAssetName === props.selectedClass;
                    // return item;
                });
                if (filtered && filtered.length > 0) {
                    setData(filtered)
                    if (props.selectedClass === "Manufacturing Plants") {
                        let cityArray = [] as any;
                        let stateArray = [] as any;
                        let zipcodeArray = [] as any;
                        filtered.map((item: any) => {
                            cityArray.push(item?.subObjects?.City);
                            stateArray.push(item?.subObjects?.State);
                            zipcodeArray.push(item?.subObjects?.Zipcode);
                        })
                        setDataCity(removeDuplicates(cityArray));
                        setDataState(removeDuplicates(stateArray));
                        setDataZipcode(removeDuplicates(zipcodeArray));
                    } else {
                        let modelArray = [] as any;
                        let modelYearArray = [] as any;
                        let typeArray = [] as any;
                        filtered.map((item: any) => {
                            modelArray.push(item?.subObjects?.Model);
                            modelYearArray.push(item?.subObjects?.ModelYear);
                            typeArray.push(item?.subObjects?.Type);
                        })
                        setDataCity(removeDuplicates(modelArray));
                        setDataState(removeDuplicates(modelYearArray));
                        setDataZipcode(removeDuplicates(typeArray));
                    }
                }
            }
        });
    };
    useEffect(() => {
        fetchChildObjectData();
        if (fetchChildObjectData.length) return;
    }, [props.selectedClass])

    // console.log({
    //     data: data,
    //     dataCity: dataCity,
    //     dataState: dataState,
    //     dataZipcode: dataZipcode,
    //     dataModel: dataModel,
    //     dataModelYear: dataModelYear,
    //     dataType: dataType
    // })



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
            to: "",
            model: "",
            modelYear: "",
            type: "",
        });
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

            {props.selectedClass === "Manufacturing Plants" ?
                <div className="w-full mb-5 flex justify-start items-statr flex-wrap flex-col">
                    <div className="flex flex-wrap w-full mb-2">
                        <p className="mb-2 p-0 text-black text-sm font-bold">City</p>
                        <select
                            className="border border-gray-951 rounded rounded-xl h-[40px] w-full px-2"
                            name="city"
                            id="city"
                            placeholder="City"
                            value={filterData.city}
                            onChange={handleValueChange}
                        >
                            <option value="">-select-</option>
                            {
                                dataCity && dataCity.length > 0 ?
                                    dataCity.map((item: any, index: any) => (
                                        <option key={index} value={item}>{item}</option>
                                    ))
                                    :
                                    null
                            }
                        </select>
                    </div>
                    <div className="flex flex-wrap w-full mb-2">
                        <p className="mb-2 p-0 text-black text-sm font-bold">State</p>
                        <select
                            className="border border-gray-951 rounded rounded-xl h-[40px] w-full px-2"
                            name="state"
                            id="state"
                            placeholder="State"
                            value={filterData.state}
                            onChange={handleValueChange}
                        >
                            <option value="">-select-</option>
                            {
                                dataState && dataState.length > 0 ?
                                    dataState.map((item: any, index: any) => (
                                        <option key={index} value={item}>{item}</option>
                                    ))
                                    :
                                    null
                            }
                        </select>
                    </div>
                    <div className="flex flex-wrap w-full">
                        <p className="mb-2 p-0 text-black text-sm font-bold">ZipCode</p>
                        <select
                            className="border border-gray-951 rounded rounded-xl h-[40px] w-full px-2"
                            name="zipcode"
                            id="zipcode"
                            placeholder="Zip Code"
                            value={filterData.zipcode}
                            onChange={handleValueChange}
                        >
                            <option value="">-select-</option>
                            {
                                dataZipcode && dataZipcode.length > 0 ?
                                    dataZipcode.map((item: any, index: any) => (
                                        <option key={index} value={item}>{item}</option>
                                    ))
                                    :
                                    null
                            }
                        </select>
                    </div>
                </div>
                :
                <div className="w-full mb-5 flex justify-start items-statr flex-wrap flex-col">
                    <div className="flex flex-wrap w-full mb-2">
                        <p className="mb-2 p-0 text-black text-sm font-bold">Model</p>
                        <select
                            className="border border-gray-951 rounded rounded-xl h-[40px] w-full px-2"
                            name="model"
                            id="model"
                            placeholder="model"
                            value={filterData.model}
                            onChange={handleValueChange}
                        >
                            <option value="">-select-</option>
                            {
                                dataModel && dataModel.length > 0 ?
                                    dataModel.map((item: any, index: any) => (
                                        <option key={index} value={item}>{item}</option>
                                    ))
                                    :
                                    null
                            }
                        </select>
                    </div>
                    <div className="flex flex-wrap w-full mb-2">
                        <p className="mb-2 p-0 text-black text-sm font-bold">Model Year</p>
                        <select
                            className="border border-gray-951 rounded rounded-xl h-[40px] w-full px-2"
                            name="modelYear"
                            id="modelYear"
                            placeholder="Model Year"
                            value={filterData.modelYear}
                            onChange={handleValueChange}
                        >
                            <option value="">-select-</option>
                            {
                                dataModelYear && dataModelYear.length > 0 ?
                                    dataModelYear.map((item: any, index: any) => (
                                        <option key={index} value={item}>{item}</option>
                                    ))
                                    :
                                    null
                            }
                        </select>
                    </div>
                    <div className="flex flex-wrap w-full">
                        <p className="mb-2 p-0 text-black text-sm font-bold">Type</p>
                        <select
                            className="border border-gray-951 rounded rounded-xl h-[40px] w-full px-2"
                            name="type"
                            id="type"
                            placeholder="Type"
                            value={filterData.type}
                            onChange={handleValueChange}
                        >
                            <option value="">-select-</option>
                            {
                                dataType && dataType.length > 0 ?
                                    dataType.map((item: any, index: any) => (
                                        <option key={index} value={item}>{item}</option>
                                    ))
                                    :
                                    null
                            }
                        </select>
                    </div>
                </div>
            }

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