import React, { useState, useRef, useEffect } from "react";
import styles from '../../../styles/Common.module.css';
import Layout from "../../../components/Layout";
import Image from "next/image";
import Link from "next/link";
import Test from "./test";
import Production from "./production";
import Datepicker from "react-tailwindcss-datepicker";
import { useRouter } from 'next/router'
import axios from "axios";

export default function Preview() {
    const router = useRouter();
    const routerParams = router.query;

    const [defaultTab, setDefaultTab] = useState("Test");
    const [toggleArrow, setToggleArrow] = useState(false);
    const [toggleDrop, setToggleDrop] = useState(false);
    const [toggleFilter, setToggleFilter] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [method, setMethod] = useState(false);
    const [defaultMethod, setDefaultMethod] = useState("GET");
    const [authType, setAuthType] = useState(false);
    const [drop, setDrop] = useState(false);
    const [data, setData] = useState([] as any);

    const authenticationType = [
        "Basic", "Client Certificate", "Active Directory OAuth", "Raw", "Managed Identity"
    ];
    const [defaultAuthType, setDefaultAuthType] = useState(authenticationType[0]);
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
    const [value, setValue] = useState(0);
    const [toggleDateField, setToggleDateField] = useState(false);
    const toggleTabFunction = (preview: any) => {
        setDefaultTab(preview)
    }
    const toggleFilterFunction = () => {
        setToggleArrow(!toggleArrow);
        setToggleFilter(!toggleFilter);
    }
    const toggleDropFunction = () => {
        setToggleDrop(!toggleDrop);
    }
    const handleCalendarFromChange = (newValue: any) => {
        setFromDate(newValue);
    }
    const handleCalendarToChange = (newValue: any) => {
        setToDate(newValue);
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
    const toggleMethod = () => {
        setMethod(!method)
    }
    const selectMethod = (item: any) => {
        setDefaultMethod(item);
        setMethod(false);
    }
    const toggleAuthType = () => {
        setAuthType(!authType);
    }
    const selectAuthType = (item: any) => {
        setDefaultAuthType(item);
        setAuthType(false);
    }


    // Fetch the JSON data of sub Asset
    const fetchClassData = () => {
        axios.get("/api/geteopsWatch").then((response) => {
            if (response.data) {
                const filtered = response.data.filter((item: any) => {
                    if (item.class === routerParams.objectID && item.ID === routerParams.key && item.modal === routerParams.model) {
                        return item;
                    }
                });
                if (filtered && filtered.length > 0) {
                    if (filtered[0].images) {
                        setData(filtered[0].images);
                    }
                }
            }
        });
    };
    useEffect(() => {
        fetchClassData();
        if (fetchClassData.length) return;
    }, [routerParams])

    const filteredDataTest = data.filter((item: any) => {
        return item.folder === "Test"
    })
    const filteredDataProduction = data.filter((item: any) => {
        return item.folder === "Production"
    })

    console.log({
        data:data,
        filteredDataTest:filteredDataTest,
        filteredDataProduction:filteredDataProduction
    })

    return (
        <div className="w-full h-full font-OpenSans">
            <p className="text-black text-lg mb-4 font-semibold text-xl">eOps Watch</p>
            {/* Breadcrumb */}
            <div className="flex relative bg-white rounded rounded-lg px-3 py-1 inline-flex border border-[#E3E3E3]">
                <ul className="flex justify-start items-center text-sm">
                <li className="flex justify-start items-center">
                        <Link
                            href="/dashboard/eopswatch"
                            className="font-semibold"
                        >
                            Home
                        </Link>
                    </li>
                    <li className="flex justify-start items-center">
                        <Image
                            src="/img/chevron-right.svg"
                            alt="chevron-right"
                            height={28}
                            width={28}
                        />
                        <Link
                            href={{
                                pathname: '/dashboard/eopswatch/',
                                query:{
                                    objectID:routerParams.objectID
                                }
                            }}
                            className="font-semibold"
                        >
                            {routerParams.objectID}
                        </Link>
                    </li>
                    <li className="flex justify-start items-center">
                        <Image
                            src="/img/chevron-right.svg"
                            alt="chevron-right"
                            height={28}
                            width={28}
                        />
                        <Link
                            href={{
                                pathname: '/dashboard/eopswatch/',
                            }}
                            className="font-semibold"
                        >
                            {routerParams.industryID}
                        </Link>
                    </li>
                    <li className="flex justify-start items-center">
                        <Image
                            src="/img/chevron-right.svg"
                            alt="chevron-right"
                            height={28}
                            width={28}
                        />
                        <Link
                            href={{
                                pathname: '/dashboard/eopswatch/',
                            }}
                            className="font-semibold"
                        >
                            {routerParams.subObject}
                        </Link>
                    </li>
                    <li className="flex justify-start items-center">
                        <Image
                            src="/img/chevron-right.svg"
                            alt="chevron-right"
                            height={28}
                            width={28}
                        />
                        <Link
                            href={{
                                pathname: '/dashboard/eopswatch/models',
                                query: {
                                    objectID: routerParams.objectID,
                                    subObject: routerParams.subObject,
                                    key: routerParams.key,
                                    id: routerParams.id,
                                    industryID:routerParams.industryID
                                }
                            }}
                            className="font-semibold"
                        >
                            {routerParams.key}
                        </Link>
                    </li>                 
                    <li className="flex justify-start items-center">
                        <Image
                            src="/img/chevron-right.svg"
                            alt="chevron-right"
                            height={28}
                            width={28}
                        />
                        <Link
                            href={{
                                pathname: '/dashboard/eopswatch/models',
                                query: {
                                    objectID: routerParams.objectID,
                                    subObject: routerParams.subObject,
                                    key: routerParams.key,
                                    id: routerParams.id,
                                    industryID:routerParams.industryID
                                }
                            }}
                            className="font-semibold"
                        >
                            {routerParams.model}
                        </Link>
                    </li>
                    <li className="flex justify-start items-center">
                        <Image
                            src="/img/chevron-right.svg"
                            alt="chevron-right"
                            height={28}
                            width={28}
                        />
                        <span className="text-gray-967 capitalize">{defaultTab}</span>
                    </li>
                </ul>
            </div>

            {/* content */}
            <div className="flex relative justify-start items-start h-[54px] mt-5">
                <button
                    onClick={() => toggleTabFunction("Test")}
                    className={`h-[54px] w-[70px] rounded-tl-lg rounded-tr-lg flex justify-center items-center ${defaultTab === "Test" ? "bg-white" : "bg-yellow-951 bg-opacity-50 hover:bg-opacity-100"}`}>
                    <span className="font-semibold">Test</span>
                </button>
                <button
                    onClick={() => toggleTabFunction("Production")}
                    className={`h-[54px] w-[120px] rounded-tl-lg rounded-tr-lg flex justify-center items-center ${defaultTab === "Production" ? "bg-white" : "bg-yellow-951 bg-opacity-50 hover:bg-opacity-100"}`}>
                    <span className="font-semibold">Production</span>
                </button>
            </div>
            <div className="flex flex-wrap flex-col justify-start items-start bg-white rounded-r-lg rounded-bl-xl overflow-hidden1 min-h-[600px]">
                {/*  Tab buttons and filters */}
                <div className="flex justify-between items-center w-full h-[65px]">
                    <div className="flex relative justify-start items-center h-[65px]">
                        <p className="text-md font-semibold px-3 py-2">Images</p>
                    </div>
                    <div className="flex justify-start items-center relative pr-3 h-[65px]">
                        {defaultTab === "Production" && <>
                            <div className="flex items-center justify-start ml-7">
                                <p className="text-gray mr-3 text-sm font-semibold">Site Visity</p>
                                <div className={`${styles.radioWrap} relative top-[2px]`}>
                                    <input
                                        type="checkbox"
                                    />
                                    <span className={`${styles.radioFrame}`}></span>
                                </div>
                            </div>
                            <Link
                                href="/dashboard/eopswatch/raisedalerts"
                                className={`border-2 rounded rounded-lg border-gray-969 h-[44px] px-2 py-1 flex justify-center items-center mr-4`}
                            >
                                <Image
                                    src="/img/message-square.svg"
                                    alt="Upload"
                                    height={24}
                                    width={24}
                                />
                                <span className="text-sm ml-2 mr-2 font-semibold">Alerts</span>
                            </Link>
                        </>}

                        <div className="relative">
                            <button
                                onClick={toggleDropFunction}
                                className={`border-2 rounded rounded-lg border-gray-969 h-[44px] px-2 py-1 flex justify-center items-center mr-4 relative ${toggleDrop ? 'bg-gray-969' : 'bg-white'}`}
                            >
                                <Image
                                    src="/img/upload-black.svg"
                                    alt="Upload"
                                    height={24}
                                    width={24}
                                />
                                <span className="text-sm ml-2 mr-2 font-semibold">Images Config</span>
                                <Image
                                    src="/img/more-vertical.svg"
                                    alt="more"
                                    height={24}
                                    width={24}
                                />
                            </button>
                            {toggleDrop &&
                                <div className="bg-black text-white border overflow-hidden border-black rounded rounded-xl w-56 flex flex-col flex-wrap items-start justify-start shadow-sm absolute top-[50px] right-[14px] z-[1]">
                                    <button
                                        onClick={() => { setShowModal(true); setToggleDrop(false) }}
                                        className="text-white text-sm hover:bg-white hover:text-black h-[40px] px-4 border-b border-gray-900 w-full text-left">
                                        <span>API Configuration</span>
                                    </button>
                                    <button
                                        onClick={() => setToggleDrop(false)}
                                        className="text-white text-sm hover:bg-white hover:text-black h-[40px] px-4 border-b border-gray-900 w-full text-left">
                                        <span>Upload Images</span>
                                    </button>
                                </div>}
                        </div>

                        <div className="relative">
                            <button
                                className={` border-2  rounded-xl h-[44px] transition-all duration-[400ms] h-[44px] rounded rounded-xl px-2 py-2 flex items-center justify-start border-gray-969 ${toggleFilter ? 'bg-gray-969' : 'bg-white'}`}
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
                                <div className={`w-[376px] shadow shadow-xl min-h-[300px] bg-white text-black border overflow-hidden1 border-gray-969 rounded rounded-xl flex flex-col flex-wrap items-start justify-start absolute top-[50px] right-[0px] z-[1] px-2 py-2`}>
                                    <div className="flex justify-end items-center w-full mb-1">
                                        <button onClick={() => setToggleFilter(false)} className="rounded rounded-lg bg-gray-969 border border-black flex items-center jsutify-center text-black h-[30px] px-2 text-[13px] mr-3">Reset</button>
                                        <button onClick={() => setToggleFilter(false)} className="rounded rounded-lg bg-black border border-black flex items-center jsutify-center text-white h-[30px] px-2 text-[13px] mr-2">Apply</button>
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
                            }
                        </div>

                    </div>
                </div>

                {/* Tab Contents */}
                <>
                    {defaultTab === "Test" && <Test data={filteredDataTest} routerParams={routerParams} />}
                    {defaultTab === "Production" && <Production data={filteredDataProduction} routerParams={routerParams} />}
                </>

            </div>
            {/* Content Ends */}


            {/* ----- OBJECT MODAL STARTS ----- */}
            {showModal ? (
                <>
                    <div
                        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                    >
                        <div className="relative my-6 w-[720px] rounded-lg">
                            <div className="rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">

                                <div className={`bg-white overflow-hidden shadow-lg rounded-lg`}>
                                    <div className="relative h-full w-full p-5">
                                        <div className="w-full relative mb-3">
                                            <button
                                                className="absolute right-0 top-0"
                                                onClick={() => setShowModal(false)}
                                            >
                                                <Image
                                                    src="/img/x-thin.svg"
                                                    alt="close"
                                                    height={32}
                                                    width={32}
                                                    className=""
                                                />
                                            </button>

                                            <div className="flex justify-start items-end h-full">
                                                <h2 className="font-semibold text-lg">API Configuration</h2>
                                            </div>
                                        </div>

                                        <div className="w-full relative bg-white">

                                            <div className={`mb-7 ${styles.form__wrap} ${styles.form__wrap_large}`}>
                                                <div className={`relative ${styles.form__group} font-OpenSans`}>
                                                    <input
                                                        type="text"
                                                        id="url"
                                                        name="url"
                                                        className={`${styles.form__field} border border-black border-black`}
                                                        placeholder="URL"
                                                        value="https://aws.amazon.com/opendata/?wwps-cards.sort-by=item.additionalFields.sortDate&wwps-cards.sort-rder=desc"
                                                    />
                                                    <label htmlFor="username" className={`${styles.form__label}`}>URL</label>
                                                </div>
                                            </div>

                                            <div className={`mb-7 w-full flex justify-between items-center ${styles.modalInput}`}>
                                                <div className="w-[48%]">
                                                    <div className="w-full">
                                                        <div
                                                            className="border rounded-xl border-black h-[55px] w-f pl-2 pr-5 relative flex items-center justify-start bg-white w-[325px]"
                                                            onClick={toggleMethod}
                                                        >
                                                            <label className="absolute text-sm top-[-10px] left-2 pl-2 pr-2 bg-white">Method</label>
                                                            <Image
                                                                src="/img/arrow-down-black.svg"
                                                                alt="arrow-down"
                                                                height={20}
                                                                width={20}
                                                                className="absolute right-3 top-4"
                                                            />
                                                            <span className="text-sm text-black pl-2 uppercase">{defaultMethod}</span>
                                                        </div>
                                                        {method ?
                                                            <div className={`border rounded-xl border-gray-500 w-[325px] absolute flex items-start justify-start mt-1 overflow-hidden overflow-y-auto bg-white ${styles.scroll} z-10`}>
                                                                <ul className="p-0 m-0 w-full">
                                                                    <li
                                                                        className="px-4 py-1 bg-white cursor-pointer text-sm hover:bg-yellow-951 w-full font-normal"
                                                                        onClick={() => selectMethod("GET")}
                                                                    >
                                                                        <span>GET</span>
                                                                    </li>
                                                                    <li
                                                                        className="px-4 py-1 text-sm bg-white cursor-pointer hover:bg-yellow-951 w-full font-normal"
                                                                        onClick={() => selectMethod("POST")}
                                                                    >
                                                                        <span>POST</span>
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                            : null}
                                                    </div>
                                                </div>

                                                <div className="w-[48%]">
                                                    <div className="w-full">
                                                        <div className="border rounded-xl border-black h-[56px] w-full pl-2 pr-5 relative flex items-center justify-start bg-white">
                                                            <label className="absolute text-sm top-[-10px] left-2 pl-2 pr-2 bg-white">Headers</label>
                                                            <div className="flex justify-start items-center w-[49%] text-sm h-full  border-r-[1px] border-gray-963">
                                                                {/* <label className="mr-4">Enter Key</label> */}
                                                                <input type="text" className="outline-none w-[130px]" placeholder="Enter Key" />
                                                            </div>

                                                            <div className="flex justify-start items-center w-[49%] text-sm h-full pl-2">
                                                                {/* <label className="mr-4">Enter Value</label> */}
                                                                <input type="text" className="outline-none w-[130px]" placeholder="Enter Value" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className={`mb-7 w-full flex justify-between items-center ${styles.modalInput}`}>
                                                <div className="w-[48%]">
                                                    <div className="w-full">
                                                        <div className="border rounded-xl border-black h-[56px] w-full pl-2 pr-5 relative flex items-center justify-start bg-white">
                                                            <label className="absolute text-sm top-[-10px] left-2 pl-2 pr-2 bg-white">Queries</label>
                                                            <div className="flex justify-start items-center w-[49%] text-sm h-full border-r-[1px] border-gray-963">
                                                                {/* <label className="mr-4">Enter Key</label> */}
                                                                <input type="text" className="outline-none w-[130px]" placeholder="Enter Key" />
                                                            </div>

                                                            <div className="flex justify-start items-center w-[49%] text-sm h-full pl-2">
                                                                {/* <label className="mr-4">Enter Value</label> */}
                                                                <input type="text" className="outline-none w-[130px]" placeholder="Enter Value" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="w-[48%]">
                                                    <div className="w-full">
                                                        <div className="border rounded-xl border-black h-[57px] w-full pl-2 pr-5 relative flex items-center justify-start bg-white">
                                                            <label className="absolute text-sm top-[-10px] left-2 pl-2 pr-2 bg-white">Body</label>
                                                            <div className="flex justify-start items-center w-full text-sm h-full  ">
                                                                {/* <label className="mr-1 w-[35%]">Enter Request Content</label> */}
                                                                <input type="text" className="outline-none w-full" placeholder="Enter Request Content" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className={`mb-4 w-full flex justify-between items-center ${styles.modalInput}`}>
                                                <div className="w-[48%]">
                                                    <div className="w-full">
                                                        <div className="border rounded-xl border-black h-[57px] w-full pl-2 pr-5 relative flex items-center justify-start bg-white">
                                                            <label className="absolute text-sm top-[-10px] left-2 pl-2 pr-2 bg-white">Cookies</label>
                                                            <div className="flex justify-start items-center w-full text-sm h-full  ">
                                                                {/* <label className="mr-1 w-[35%]">Enter HTTP Cookies</label> */}
                                                                <input type="text" className="outline-none w-full" placeholder="Enter HTTP Cookies" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="w-[48%]">
                                                    <div className="w-full">
                                                        <div
                                                            className="border rounded-xl border-black h-[55px] w-[325px] pl-2 pr-5 relative flex items-center justify-start bg-white"
                                                            onClick={toggleAuthType}
                                                        >
                                                            <label className="absolute text-sm top-[-10px] left-2 pl-2 pr-2 bg-white">Authentication Type</label>
                                                            <Image
                                                                src="/img/arrow-down-black.svg"
                                                                alt="arrow-down"
                                                                height={20}
                                                                width={20}
                                                                className="absolute right-3 top-4"
                                                            />
                                                            <span className="text-black pl-2">{defaultAuthType}</span>
                                                        </div>
                                                        {authType ?
                                                            <div className={`border rounded-xl border-gray-500  w-[325px] absolute flex items-start justify-start mt-1 overflow-hidden overflow-y-auto bg-white ${styles.scroll} z-10`}>
                                                                <ul className="p-0 m-0 w-full">
                                                                    {
                                                                        authenticationType && authenticationType.length > 0 &&
                                                                        authenticationType.map((item: any, index: any) => (
                                                                            <li
                                                                                className="px-4 py-1 bg-white cursor-pointer hover:bg-yellow-951 w-full font-normal"
                                                                                key={index}
                                                                                onClick={() => selectAuthType(item)}
                                                                            >
                                                                                <span>{item}</span>
                                                                            </li>
                                                                        ))
                                                                    }
                                                                </ul>
                                                            </div>
                                                            : null}
                                                    </div>
                                                </div>
                                            </div>

                                            <div className={`mb-7 w-full flex justify-between items-center ${styles.modalInput}`}>
                                                <div className="w-[48%]">
                                                    <div className={`${styles.form__wrap}`}>
                                                        <div className={`relative ${styles.form__group} font-OpenSans`}>
                                                            <input
                                                                type="text"
                                                                id="username"
                                                                name="username"
                                                                className={`${styles.form__field} border border-black`}
                                                                placeholder="User Name"
                                                                value="SERVICE_API"
                                                            />
                                                            <label htmlFor="password" className={`${styles.form__label}`}>User Name</label>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="w-[48%]">
                                                    <div className={`${styles.form__wrap}`}>
                                                        <div className={`relative ${styles.form__group} font-OpenSans`}>
                                                            <input
                                                                type="text"
                                                                id="password"
                                                                name="password"
                                                                className={`${styles.form__field} border border-black`}
                                                                placeholder="Password"
                                                                value="Pass123"
                                                            />
                                                            <label htmlFor="password" className={`${styles.form__label}`}>Password</label>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className={`w-full flex justify-end items-center ${styles.modalInput}`}>
                                                <div className="mb-0 relative flex justify-end items-center w-full pr-4">
                                                    <button
                                                        className="border border-black rounded-lg bg-black text-white text-lg w-20 h-12 mr-5 hover:bg-yellow-951 hover:text-white hover:border-yellow-951 ease-in-out duration-300 disabled:bg-gray-951 disabled:hover:border-gray-951 disabled:border-gray-951 outline-none transform active:scale-75 transition-transform"
                                                        onClick={() => setShowModal(false)}
                                                    >
                                                        Save
                                                    </button>
                                                    <button
                                                        className="border border-black rounded-lg bg-white text-black text-lg w-24 h-12 hover:text-white hover:bg-yellow-951 hover:border-yellow-951 ease-in-out duration-300 outline-none transform active:scale-75 transition-transform"
                                                        onClick={() => setShowModal(false)}
                                                    >
                                                        Cancel
                                                    </button>
                                                </div>
                                            </div>

                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="opacity-75 fixed inset-0 z-40 bg-black"></div>
                </>
            ) : null}
            {/* ----- MODAL ENDS ----- */}

        </div>
    )
}

Preview.getLayout = function getLayout(page: any) {
    return (
        <Layout>{page}</Layout>
    )
}