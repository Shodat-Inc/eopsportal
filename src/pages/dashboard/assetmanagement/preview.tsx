import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import styles from '../../../styles/Common.module.css';
import Layout from "../../../components/Layout";
import Image from "next/image";
import Link from "next/link";
import Test from "./test";
import Production from "./production";
import Datepicker from "react-tailwindcss-datepicker";
import { useRouter } from 'next/router'
import axios from "axios";
import { setClassBreadcrumb, setDataForeOpsWatchAction } from "@/store/actions/classAction";
import ApiConfiguration from "@/common/apiconfiguration";

export default function Preview() {
    const router = useRouter();
    const routerParams = router.query;
    const dispatch = useDispatch<any>()
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
    const [enabled, setEnabled] = useState(false);
    const [nav, setNav] = useState({} as any)
    const [expend, setExpend] = useState(false);

    const getSelClass = useSelector((state: any) => state.classReducer);
    const classSelector = useSelector((state: any) => state.classReducer);
    useEffect(() => {
        setNav(getSelClass.classBreadcrumbs)
    }, [getSelClass.classBreadcrumbs])

    const toggleExpend = () => {
        setExpend(!expend)
    }
    // console.log({
    //     getSelClass: getSelClass,
    //     classSelector: classSelector
    // })

    const authenticationType = [
        "Basic", "Client Certificate", "Active Directory OAuth", "Raw", "Managed Identity"
    ];

    useEffect(() => {
        if (routerParams?.tab && routerParams?.tab !== "") {
            setDefaultTab(routerParams?.tab as any)
            // console.log({
            //     "____TAB": routerParams?.tab
            // })
        }
    }, [routerParams?.tab])
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
        // http://localhost:3000/dashboard/assetmanagement/preview?objectID=Manufacturing+Plants&subObject=Walls&key=TPC71810-01-012&id=TPC3305-02&model=Crack+Detection&industryID=TPC3305-02&from=eopswatch
        axios.get("/api/geteopsWatch").then((response) => {
            if (response.data) {
                const filtered = response.data.filter((item: any) => {
                    if (item.class === (routerParams.objectID || classSelector?.dataforeopswatchReducer?.class) &&
                        item.ID === (routerParams.key || classSelector?.dataforeopswatchReducer?.subClassObjValue) &&
                        item.modal === (routerParams.model || classSelector?.dataforeopswatchReducer?.model)
                    ) {
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
    })

    const filteredDataTest = data.filter((item: any) => {
        return item.folder === "Test"
    })
    const filteredDataProduction = data.filter((item: any) => {
        return item.folder === "Production"
    })

    // console.log({
    //     data: data,
    //     filteredDataTest: filteredDataTest,
    //     filteredDataProduction: filteredDataProduction
    // })

    const hasParams = routerParams.hasOwnProperty("PlantID");
    const hasObjectParams = routerParams.hasOwnProperty("subObject")

    const checkboxFunction = (event: any) => {
        if (event.currentTarget.checked) {
            setEnabled(true)
        } else {
            setEnabled(false)
        }
    }

    const goBacktoHome = () => {

        let abc = {
            "flow": "Object Management",
            "class": classSelector?.classBreadcrumbs?.class,
            "classObjKey": classSelector?.classBreadcrumbs?.classObjKey,
            "classObjValue": classSelector?.classBreadcrumbs?.classObjValue,
            "subClass": classSelector?.classBreadcrumbs?.subClass,
            "subClassObjKey": classSelector?.classBreadcrumbs?.subClassObjKey,
            "subClassObjValue": classSelector?.classBreadcrumbs?.subClassObjValue,
            "tab": 2,
            "parentTab": 0,
            "model": classSelector?.dataforeopswatchReducer?.model
        }
        dispatch(setClassBreadcrumb(abc))
        dispatch(setDataForeOpsWatchAction(abc))

        setTimeout(() => {
            router.push('/dashboard/assetmanagement');
        }, 100)
    }

    const backtoObjectManagementLevel = () => {
        let abc = {
            "flow": "Object Management",
            "class": classSelector?.classBreadcrumbs?.class,
            "classObjKey": classSelector?.classBreadcrumbs?.classObjKey,
            "classObjValue": classSelector?.classBreadcrumbs?.classObjValue,
            "subClass": classSelector?.classBreadcrumbs?.subClass,
            "subClassObjKey": classSelector?.classBreadcrumbs?.subClassObjKey,
            "subClassObjValue": classSelector?.classBreadcrumbs?.subClassObjValue,
            "tab": 2,
            "parentTab": 0,
            "model": classSelector?.dataforeopswatchReducer?.model
        }
        dispatch(setClassBreadcrumb(abc))
        dispatch(setDataForeOpsWatchAction(abc))
        setTimeout(() => {
            router.push('/dashboard/assetmanagement');
        }, 100)
    }


    const backtoSubObjectManagementLevel = () => {
        let abc = {
            "flow": "Object Management",
            "class": classSelector?.classBreadcrumbs?.class,
            "classObjKey": classSelector?.classBreadcrumbs?.classObjKey,
            "classObjValue": classSelector?.classBreadcrumbs?.classObjValue,
            "subClass": classSelector?.classBreadcrumbs?.subClass,
            "subClassObjKey": classSelector?.classBreadcrumbs?.subClassObjKey,
            "subClassObjValue": classSelector?.classBreadcrumbs?.subClassObjValue,
            "tab": 3,
            "parentTab": 2,
            "model": classSelector?.dataforeopswatchReducer?.model
        }
        dispatch(setClassBreadcrumb(abc))
        dispatch(setDataForeOpsWatchAction(abc))
        setTimeout(() => {
            router.push('/dashboard/assetmanagement');
        }, 100)
    }

    const backtoModelPage = () => {
        let abc = {
            "flow": "Object Management",
            "class": classSelector?.classBreadcrumbs?.class,
            "classObjKey": classSelector?.classBreadcrumbs?.classObjKey,
            "classObjValue": classSelector?.classBreadcrumbs?.classObjValue,
            "subClass": classSelector?.classBreadcrumbs?.subClass,
            "subClassObjKey": classSelector?.classBreadcrumbs?.subClassObjKey,
            "subClassObjValue": classSelector?.classBreadcrumbs?.subClassObjValue,
            "tab": 3,
            "parentTab": 2,
            "model": classSelector?.dataforeopswatchReducer?.model
        }
        dispatch(setClassBreadcrumb(abc))
        dispatch(setDataForeOpsWatchAction(abc))
        setTimeout(() => {
            router.push('/dashboard/assetmanagement/models');
        }, 100)
    }

    const handleModal = (item: any) => {
        setShowModal(false)
    }

    return (
        <div className="w-full h-full font-OpenSans">
            <p className="text-black mb-4 font-semibold text-xl">eOps Watch</p>

            <div className="mb-5 flex justify-start items-center">
                {/* Breadcrumb */}
                {nav ?
                    <>
                        <div className="relative bg-white rounded-lg px-3 py-1 inline-flex border border-[#E3E3E3]">
                            <ul className="flex justify-start items-center text-sm">
                                <li className="flex justify-start items-center">
                                    <Link
                                        href="/dashboard/assetmanagement"
                                        className="font-semibold"
                                    >
                                        {nav.flow}
                                    </Link>
                                </li>

                                {
                                    !expend &&
                                    <li className=" flex justify-start items-center">
                                        <Image
                                            src="/img/chevron-right.svg"
                                            alt="chevron-right"
                                            height={28}
                                            width={28}
                                        />
                                        <span className=" ">[......]</span>
                                    </li>
                                }
                                {expend &&
                                    <>
                                        <li className="flex justify-start items-center">
                                            <Image
                                                src="/img/chevron-right.svg"
                                                alt="chevron-right"
                                                height={28}
                                                width={28}
                                            />
                                            <button
                                                onClick={goBacktoHome}
                                                className="font-semibold"
                                            >
                                                <span>Class name: {nav.class}</span>
                                            </button>
                                        </li>
                                        <li className="flex justify-start items-center">
                                            <Image
                                                src="/img/chevron-right.svg"
                                                alt="chevron-right"
                                                height={28}
                                                width={28}
                                            />
                                            <button
                                                onClick={backtoObjectManagementLevel}
                                                className="font-semibold"
                                            >
                                                <span>{nav.classObjKey}: {nav.classObjValue}</span>
                                            </button>
                                        </li>

                                        <li className="flex justify-start items-center">
                                            <Image
                                                src="/img/chevron-right.svg"
                                                alt="chevron-right"
                                                height={28}
                                                width={28}
                                            />
                                            <button
                                                onClick={backtoSubObjectManagementLevel}
                                                className="font-semibold"
                                            >
                                                <span>
                                                    Sub Class: {nav.subClass}
                                                </span>
                                            </button>
                                        </li>

                                        <li className="flex justify-start items-center">
                                            <Image
                                                src="/img/chevron-right.svg"
                                                alt="chevron-right"
                                                height={28}
                                                width={28}
                                            />
                                            <button
                                                onClick={backtoSubObjectManagementLevel}
                                                className="font-semibold"
                                            >
                                                <span>{nav.subClassObjKey}: {nav.subClassObjValue}</span>
                                            </button>
                                        </li>
                                    </>
                                }

                                <li className="flex justify-start items-center">
                                    <Image
                                        src="/img/chevron-right.svg"
                                        alt="chevron-right"
                                        height={28}
                                        width={28}
                                    />
                                    <button
                                        onClick={backtoModelPage}
                                        className="font-semibold"
                                    >
                                        <span>{classSelector?.dataforeopswatchReducer?.model}</span>
                                    </button>
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
                        <button
                            onClick={toggleExpend}
                            className="bg-yellow-951 h-[22px] w-[22px] rounded-full inline-flex justify-center items-center cursor-pointer ml-1"
                        >
                            {
                                expend ?
                                    <Image
                                        src="/img/arrow-left-black.svg"
                                        alt="arrow"
                                        height={20}
                                        width={20}
                                    />
                                    :
                                    <Image
                                        src="/img/arrow-right-black.svg"
                                        alt="arrow"
                                        height={20}
                                        width={20}
                                    />
                            }

                        </button>
                    </>
                    : null
                }
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
                                <p className="text-gray mr-3 text-sm font-semibold">{enabled ? "Enabled" : "Disabled"}</p>
                                <div className={`${styles.radioWrap} relative top-[2px]`}>
                                    <input
                                        type="checkbox"
                                        onChange={checkboxFunction}
                                    />
                                    <span className={`${styles.radioFrame}`}></span>
                                </div>
                            </div>
                            <Link
                                // href="/dashboard/eopswatch/alerts"
                                href={{
                                    pathname: '/dashboard/eopswatch/alerts',
                                    query: {
                                        objectID: routerParams.objectID,
                                        key: routerParams.key,
                                        model: routerParams.model,
                                        id: routerParams.id,
                                        subObject: routerParams.subObject
                                    }
                                }}
                                className={`border-2 rounded-lg border-gray-969 h-[44px] px-2 py-1 flex justify-center items-center mr-4`}
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
                                className={`border-2 rounded-lg border-gray-969 h-[44px] px-2 py-1 flex justify-center items-center mr-4 relative ${toggleDrop ? 'bg-gray-969' : 'bg-white'}`}
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
                                <div className="bg-black text-white border overflow-hidden border-black rounded-xl w-56 flex flex-col flex-wrap items-start justify-start shadow-sm absolute top-[50px] right-[14px] z-[1]">
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
                                className={` border-2  h-[44px] transition-all duration-[400ms]   rounded-xl px-2 py-2 flex items-center justify-start border-gray-969 ${toggleFilter ? 'bg-gray-969' : 'bg-white'}`}
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
                    <ApiConfiguration handleModal={handleModal} />
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