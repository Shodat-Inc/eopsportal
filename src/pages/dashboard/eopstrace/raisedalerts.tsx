import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import styles from '../../../styles/Common.module.css';
import Layout from "../../../components/Layout";
import Template from "../template";
import Image from "next/image";
import Link from "next/link";
import { getAssetsData } from "@/lib/getassets";
import axios from 'axios';
import Datepicker from "react-tailwindcss-datepicker";
import { getProsenseData } from "@/store/actions/prosenseAction";
import moment from "moment";
import { useRouter } from 'next/router';
import RaisedAlertTable from "./raisedalerttable";
import Router from 'next/router'

export async function getServerSideProps() {
    const assetData = await getAssetsData()
    return {
        props: {
            assetData,
        },
    }
}

export default function RaisedAlerts(props: any) {

    const router = useRouter();
    const parentAsset = router.query;
    const routerParams = router.query;

    const dispatch = useDispatch<any>();
    const [chooseAsset, setChooseAsset] = useState(parentAsset.objectID ? parentAsset.objectID : props.assetData && props.assetData[0].assetName);

    const [models, setModels] = useState([] as any);
    const [chooseModal, setChooseModal] = useState(parentAsset.model ? parentAsset.model : '');
    const [fromDate, setFromDate] = useState({
        startDate: null,
        endDate: null
    });
    const [toDate, setToDate] = useState({
        startDate: null,
        endDate: null
    });

    const [toggleAsset, setToggleAsset] = useState(false);
    const [toggleModel, setToggleModel] = useState(false);
    const [classData, setClassData] = useState(props.assetData);

    const [toggleArrow, setToggleArrow] = useState(false);
    const [toggleDrop, setToggleDrop] = useState(false)

    const [value, setValue] = useState(0);
    const [toggleDateField, setToggleDateField] = useState(false);

    // remove duplicate items in array
    function removeDuplicates(arr: any) {
        return arr.filter((item: any, index: any) => arr.indexOf(item) === index);
    }

    const [filterData, setFilterData] = useState<any>({
        threshold: "",
        impact: "",
        date: ""
    })

    const [data, setData] = useState([] as any);
    const sampleListData = useSelector((state: any) => state.prosenseData);
    const { sample } = sampleListData;
    useEffect(() => {
        dispatch(getProsenseData());
    }, [dispatch]);

    // Toggle for Asset
    const showChooseAssetList = () => {
        setToggleAsset(!toggleAsset)
    }

    // Get Prosense Data
    useEffect(() => {
        axios.get("/api/getWatchAlerts").then((response) => {
            if (response.data) {
                let filtered = response.data.filter((items: any) => {
                    return items.model === parentAsset.model
                })
                setData(filtered)
            }
        })
    }, [parentAsset])

    // Get Modal on load based on default class
    useEffect(() => {
        axios.get("/api/geteopsWatch").then((response) => {
            if (response.data) {
                const filtered = response.data.filter((items: any) => {
                    return items.class === chooseAsset;
                });
                if (filtered && filtered.length > 0) {
                    let arr = [] as any;
                    filtered.map((i: any) => {
                        arr.push(i.modal)
                    })
                    let dupRemove = removeDuplicates(arr)
                    setModels(dupRemove);
                    // setChooseModal(dupRemove[0])
                }
            }
        });
    }, [chooseAsset])

    const selectAsset = (item: any) => {
        setChooseAsset(item);
        setToggleAsset(false);
        axios.get("/api/geteopsWatch").then((response) => {
            if (response.data) {
                const filtered = response.data.filter((items: any) => {
                    return items.class === item;
                });
                if (filtered && filtered.length > 0) {
                    let arr = [] as any;
                    filtered.map((i: any) => {
                        arr.push(i.modal)
                    })
                    let dupRemove = removeDuplicates(arr)
                    setModels(dupRemove);
                    setChooseModal(dupRemove[0])
                }
            }
        });
    }

    // Toggle For Modal
    const toggleModalList = () => {
        setToggleModel(!toggleModel)
    }
    const selectModel = (item: any) => {
        setChooseModal(item);
        setToggleModel(false);
    }


    // Handle DatePiker Change From Date
    const handleCalendarFromChange = (newValue: any) => {
        setFromDate(newValue);
    }
    // Handle DatePiker Change
    const handleCalendarToChange = (newValue: any) => {
        setToDate(newValue);
    }

    // Configure the impact color
    const impactBGColor = (color: any) => {
        let bg = "";
        if (color === "high") {
            bg = 'bg-high'
        } else if (color === "low") {
            bg = 'bg-low'
        } else if (color === "medium") {
            bg = 'bg-medium'
        } else {
            bg = 'bg-themeYellow'
        }
        return bg;
    }


    // Filter Dropdown
    const toggleFilter = () => {
        setToggleArrow(!toggleArrow);
        setToggleDrop(!toggleDrop)
    }

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

    // Handle Value change for radio (Impact Filter)
    const handleValueChangeImpact = (e: any) => {
        let targetName = e.target.name;
        let targetValue = e.target.value;
        setFilterData((state: any) => ({
            ...state,
            [targetName]: targetValue
        }));
    }

    // Filter date condition
    const filterDateCondition = (item: any) => {
        let d = '';
        if (item === "today") {
            d = moment(new Date()).format("DD-MM-YYYY");
        } else if (item === "yesterday") {
            d = moment(new Date()).subtract(1, 'day').format("DD-MM-YYYY");
        }
        return d;
    }

    // Apply filter function
    const applyFilter = async () => {
        await axios.get("/api/getWatchAlerts").then((response) => {
            if (response.data) {
                const filtered = response.data.filter((item: any) => {
                    if (item.model === "Battery Life Prediction") {
                        if (filterData.impact !== "" && filterData.date !== "" && filterData.threshold !== "") {
                            console.log("ALL")
                            return item.impact === filterData.impact || item.date === filterDateCondition || item.threshold >= filterData.threshold
                        } else if (filterData.impact !== "" && filterData.date !== "") {
                            console.log("IMPACT AND DATE")
                            return item.impact === filterData.impact && item.date === filterDateCondition(filterData.date)
                        } else if (filterData.impact !== "" && filterData.threshold !== "") {
                            console.log("IMPACT AND THRESHOLD")
                            return item.date === filterData.date || item.threshold === filterData.threshold
                        } else if (filterData.date !== "" && filterData.threshold !== "") {
                            console.log("DATE AND THRESHOLD")
                            return item.impact === filterData.impact || item.threshold >= filterData.threshold
                        } else if (filterData.impact !== "") {
                            console.log("IMPACT")
                            return item.impact === filterData.impact
                        } else if (filterData.date !== "") {
                            console.log("DATE")
                            return item.date === filterDateCondition(filterData.date)
                        } else if (filterData.threshold !== "") {
                            console.log("THRESHOLD")
                            return item.threshold >= filterData.threshold
                        } else {
                            return []
                        }
                    }

                });

                if (filtered && filtered.length > 0) {
                    setData(filtered);
                }
            }
        });
        setToggleDrop(false)
    }

    // Reset filter
    const resetFilter = () => {
        setFilterData({
            threshold: "",
            impact: "",
            date: ""
        });
        axios.get("/api/getWatchAlerts").then((response) => {
            if (response.data) {
                let filtered = response.data.filter((items: any) => {
                    return items.model === parentAsset.model
                })
                setData(filtered)
            }
        })

        setToggleDrop(false)
    }



    // Hook that alerts clicks outside of the passed ref
    function useOutsideAlerter(ref: any) {
        useEffect(() => {
            function handleClickOutside(event: any) {
                if (ref.current && !ref.current.contains(event.target)) {
                    setToggleAsset(false);
                    setToggleModel(false);
                    setToggleDrop(false);
                }
            }
            // Bind the event listener
            document.addEventListener("mousedown", handleClickOutside);
            return () => {
                // Unbind the event listener on clean up
                document.removeEventListener("mousedown", handleClickOutside);
            };
        }, [ref]);
    }

    const wrapperRef = useRef(null);
    useOutsideAlerter(wrapperRef);


    const clickOnBreadcrumb = () => {
        setTimeout(() => {
            Router.push({
                pathname: '/dashboard/eopstrace/preview',
                query: {
                    objectID: routerParams?.objectID,
                    subObject: routerParams?.subObject,
                    key: routerParams?.key,
                    id: routerParams?.id,
                    model: routerParams?.model,
                    industryID: routerParams?.industryID,
                    from: "Production"
                }
            })
        }, 100)
    }

    return (
        <div className="flex font-OpenSans">

            <div className="w-[100%]">
                <div className="columns-2 flex justify-between items-center">
                    <p className="text-black text-lg mb-0 font-semibold">eOps Trace</p>
                </div>

                <div className="border border-gray-957 bg-gray-953 min-h-[450px] rounded-xl mt-3 px-4 py-4">
                    <div className="flex justify-start items-start">
                        {/* Breadcrumb */}
                        <nav className="flex" aria-label="Breadcrumb">
                            <ol className="inline-flex items-center space-x-1 md:space-x-1">
                                <li className="inline-flex items-center">
                                    <Link href="/dashboard/aimodaldetection"
                                        className="inline-flex items-center text-sm font-medium text-black hover:text-yellow-950">
                                        <Image
                                            src="/img/home.svg"
                                            alt="home"
                                            className="h-6"
                                            height={24}
                                            width={24}
                                        />
                                    </Link>
                                </li>
                                <li>
                                    <button
                                        onClick={clickOnBreadcrumb}
                                        // href={{
                                        //     pathname: "/dashboard/assetmanagement/subchildobject",
                                        //     query: {
                                        //         class: parentAsset.objectID,
                                        //         object: parentAsset.id,
                                        //         id: parentAsset.key,
                                        //         subObject: parentAsset.subObject,
                                        //     }
                                        // }}
                                        className="flex items-center">
                                        <Image
                                            src="/img/arrow-right.svg"
                                            alt="arrow-right"
                                            className="h-6"
                                            height={24}
                                            width={24}
                                        />
                                        <span className="ml-1 text-sm font-medium text-black hover:text-yellow-950 md:ml-1">{parentAsset.key}</span>
                                    </button>
                                </li>
                                <li>
                                    <button
                                        onClick={clickOnBreadcrumb}
                                        // href={{
                                        //     pathname: "/dashboard/eopstrace/tracemodel",
                                        //     query: {
                                        //         objectID: parentAsset.objectID,
                                        //         key: parentAsset.key,
                                        //         id: parentAsset.id,
                                        //         subObject: parentAsset.subObject,
                                        //     }
                                        // }}
                                        className="flex items-center"
                                    >
                                        <Image
                                            src="/img/arrow-right.svg"
                                            alt="arrow-right"
                                            className="h-6"
                                            height={24}
                                            width={24}
                                        />
                                        <span className="ml-1 text-sm font-medium text-black hover:text-yellow-950 md:ml-1">{parentAsset.model}</span>
                                    </button>
                                </li>
                                <li>
                                    <button
                                        // href={{
                                        //     pathname: "/dashboard/eopstrace/productionmodel",
                                        //     query: {
                                        //         objectID: parentAsset.objectID,
                                        //         key: parentAsset.key,
                                        //         id: parentAsset.id,
                                        //         subObject: parentAsset.subObject,
                                        //         model: parentAsset.model,
                                        //     }
                                        // }}
                                        onClick={clickOnBreadcrumb}
                                        className="flex items-center"
                                    >
                                        <Image
                                            src="/img/arrow-right.svg"
                                            alt="arrow-right"
                                            className="h-6"
                                            height={24}
                                            width={24}
                                        />
                                        <span className="ml-1 text-sm font-medium text-black hover:text-yellow-950 md:ml-1">Production</span>
                                    </button>
                                </li>
                                <li>
                                    <button
                                        onClick={clickOnBreadcrumb}
                                        // href={{
                                        //     pathname: "/dashboard/eopstrace/eopstracealerts",
                                        //     query: {
                                        //         objectID: parentAsset.objectID,
                                        //         key: parentAsset.key,
                                        //         id: parentAsset.id,
                                        //         subObject: parentAsset.subObject,
                                        //         model: parentAsset.model,
                                        //     }
                                        // }}
                                        className="flex items-center"
                                    >
                                        <Image
                                            src="/img/arrow-right.svg"
                                            alt="arrow-right"
                                            className="h-6"
                                            height={24}
                                            width={24}
                                        />
                                        <span className="ml-1 text-sm font-medium text-black hover:text-yellow-950 md:ml-1">Alerts</span>
                                    </button>
                                </li>
                                <li>
                                    <div className="flex items-center">
                                        <Image
                                            src="/img/arrow-right.svg"
                                            alt="arrow-right"
                                            className="h-6"
                                            height={24}
                                            width={24}
                                        />
                                        <span className="ml-1 text-sm font-medium text-black md:ml-1">Raised Alerts</span>
                                    </div>
                                </li>
                            </ol>
                        </nav>
                    </div>

                    {/* Content Goes Here */}
                    <div className="mb-10">

                        <div className="flex w-full justify-between items-start mt-8 lg:w-[850px]">
                            <div className="w-[380px]">
                                <div
                                    className="border rounded-xl border-gray-500 h-[55px] w-[380px] pl-2 pr-5 relative flex items-center justify-start bg-white"
                                    onClick={showChooseAssetList}
                                >
                                    <label className="absolute text-sm top-[-10px] left-2 pl-2 pr-2 bg-white">Class</label>
                                    <Image
                                        src="/img/arrow-down-black.svg"
                                        alt="arrow-down"
                                        height={20}
                                        width={20}
                                        className="absolute right-3 top-4"
                                    />
                                    <span className="text-lg text-black pl-2">{chooseAsset}</span>
                                </div>

                                {toggleAsset ?
                                    <div ref={wrapperRef} className={`h-52 border rounded-xl border-gray-500 h-auto max-h-[250px] w-[380px]  absolute flex items-start justify-start mt-1 overflow-hidden overflow-y-auto bg-white ${styles.scroll} z-10`}>
                                        <ul className="p-0 m-0 w-full">
                                            {
                                                classData.map((item: any, index: any) => (
                                                    <li
                                                        className="px-5 py-4 bg-white cursor-pointer hover:bg-yellow-951 w-full font-normal"
                                                        onClick={() => selectAsset(item.assetName)}
                                                        key={index}
                                                    >
                                                        <span>{item.assetName}</span>
                                                    </li>
                                                ))
                                            }
                                        </ul>
                                    </div>
                                    : null}
                            </div>

                            <div className="w-[380px]">
                                <div
                                    className="border rounded-xl border-gray-500 h-[55px] w-[380px] pl-2 pr-5 relative flex items-center justify-start bg-white"
                                    onClick={toggleModalList}
                                >
                                    <label className="absolute text-sm top-[-10px] left-2 pl-2 pr-2 bg-white">Model</label>
                                    <Image
                                        src="/img/arrow-down-black.svg"
                                        alt="arrow-down"
                                        height={20}
                                        width={20}
                                        className="absolute right-3 top-4"
                                    />
                                    <span className="text-lg text-black pl-2">{chooseModal}</span>
                                </div>
                                {toggleModel ?
                                    <div ref={wrapperRef} className={`h-52 border rounded-xl border-gray-500 h-auto max-h-[250px] w-[380px]  absolute flex items-start justify-start mt-1 overflow-hidden overflow-y-auto bg-white ${styles.scroll} z-10`}>
                                        <ul className="p-0 m-0 w-full">
                                            {
                                                models.map((item: any, index: any) => (
                                                    <li
                                                        className="px-5 py-4 bg-white cursor-pointer hover:bg-yellow-951 w-full font-normal"
                                                        onClick={() => selectModel(item)}
                                                        key={index}
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

                        <div className="flex w-full justify-between items-center mt-5 w-full shadow shadow-xl rounded rounded-xl border border-gray-962 bg-white relative">
                            <div className="flex relative w-full flex-wrap w-[83%]">
                                <input
                                    type="text"
                                    placeholder="Search by ID or Object name"
                                    id="searchobjects"
                                    name="searchobjects"
                                    className="rounded rounded-xl pl-10 pr-2 w-full h-14 pr-10 w-full "
                                />
                                <Image
                                    src="/img/search.svg"
                                    alt="search"
                                    height={18}
                                    width={18}
                                    className="absolute left-3 top-[18px]"
                                />
                            </div>
                            <div className="w-[17%] ralative flex items-center justify-end pr-1">
                                <button
                                    className="bg-white hover:bg-yellow-951 transition-all duration-[400ms] h-12 rounded rounded-xl px-2 py-2 flex w-[120px] items-center justify-start transition-all duration-[400ms] mr-3 transition-opacity duration-300 outline-none transform active:scale-75 transition-transform"
                                    onClick={toggleFilter}
                                >
                                    <Image
                                        src="/img/sliders.svg"
                                        alt="calendar"
                                        height={22}
                                        width={22}
                                        className="mr-2"
                                    />
                                    <span className="mr-2">Filter</span>
                                    <Image
                                        src="/img/arrow-down-black.svg"
                                        alt="Arrow Down"
                                        height={24}
                                        width={24}
                                        className={`${toggleArrow === true ? 'rotate-180' : 'rotate-0'}`}
                                    />
                                </button>

                                {toggleDrop &&
                                    <div ref={wrapperRef} className="rounded rounded-xl shadow shadow-xl border border-gray-951 min-h-[350px] w-[380px] px-4 py-3 bg-white absolute right-0 top-[100%] mt-1 z-10">
                                        <div className="flex w-full justify-end items-center mb-0">
                                            <button onClick={applyFilter} className="text-sm text-black bg-yellow-951 flex justify-center items-center rounded rounded-lg px-2 py-2 mr-5 transition-all duration-[400ms] mr-3 transition-opacity duration-300 outline-none transform active:scale-75 transition-transform">Apply</button>
                                            <button onClick={resetFilter} className="text-sm text-white bg-black flex justify-center items-center rounded rounded-lg px-2 py-2 transition-all duration-[400ms] mr-3 transition-opacity duration-300 outline-none transform active:scale-75 transition-transform">Reset</button>
                                            <button onClick={() => setToggleDrop(false)}>
                                                <Image
                                                    src="/img/x-thin.svg"
                                                    alt="calendar"
                                                    height={32}
                                                    width={32}
                                                    className="ml-5"
                                                />
                                            </button>
                                        </div>

                                        <div className="w-full mb-5">
                                            <p className="mb-2 p-0 text-black text-sm font-bold">Threshold Value</p>
                                            <div className="mb-2">
                                                <div className={`${styles.rangeSlider} ${styles.rangeSlider2}`}>
                                                    <input
                                                        type="range"
                                                        max={100}
                                                        min={0}
                                                        step={5}
                                                        defaultValue={value}
                                                        onChange={handleRange}
                                                        title={"20"}
                                                        name="threshold"
                                                    />
                                                </div>
                                                <div className="relative w-[280px] inline-block">
                                                    <span className={`absolute left-0 top-[-10px] text-md`}>{value}%</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="w-full mb-3">
                                            <p className="mb-2 p-0 text-black text-sm font-bold">Impact</p>
                                            <div className="flex justify-start items-center">
                                                <div className="flex-inline justify-start items-center mr-10">
                                                    <div className={`${styles.cricleCheckWrap}`}>
                                                        <input
                                                            type="radio"
                                                            name="impact"
                                                            id="impact"
                                                            value="high"
                                                            onChange={handleValueChangeImpact}
                                                            checked={filterData.impact && filterData.impact === "high" ? true : false}
                                                        />
                                                        <span></span>
                                                    </div>
                                                    <label htmlFor="impact" className="ml-1 text-sm">High</label>
                                                </div>
                                                <div className="flex-inline justify-start items-center mr-10">
                                                    <div className={`${styles.cricleCheckWrap}`}>
                                                        <input
                                                            type="radio"
                                                            name="impact"
                                                            id="impact"
                                                            value="medium"
                                                            onChange={handleValueChangeImpact}
                                                            checked={filterData.impact && filterData.impact === "medium" ? true : false}
                                                        />
                                                        <span></span>
                                                    </div>
                                                    <label htmlFor="impact" className="ml-1 text-sm">Medium</label>
                                                </div>
                                                <div className="flex-inline justify-start items-center">
                                                    <div className={`${styles.cricleCheckWrap}`}>
                                                        <input
                                                            type="radio"
                                                            name="impact"
                                                            id="impact"
                                                            value="low"
                                                            onChange={handleValueChangeImpact}
                                                            checked={filterData.impact && filterData.impact === "low" ? true : false}
                                                        />
                                                        <span></span>
                                                    </div>
                                                    <label htmlFor="impact" className="ml-1 text-sm">Low</label>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="w-full">
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

                        <div className="flex w-full justify-start items-center mt-5 lg:w-[900px] hidden">
                            <Image
                                src="/img/info-gray.svg"
                                alt="info"
                                height={32}
                                width={32}
                                className="pr-3"
                            />
                            <p className="text-[#666666]">You can select and change the below class and models from the dropdowns to view more alerts.</p>
                        </div>

                        <div className="flex w-full justify-between items-start mt-5 lg:w-[900px] hidden">
                            <div className="flex relative w-[380px] flex-wrap">
                                <input
                                    type="text"
                                    placeholder="Search by ID or Object name"
                                    id="searchobjects"
                                    name="searchobjects"
                                    className="rounded rounded-lg border border-gray-962 pl-10 pr-2 w-[380px] h-14"
                                />
                                <Image
                                    src="/img/search.svg"
                                    alt="search"
                                    height={18}
                                    width={18}
                                    className="absolute left-3 top-[18px]"
                                />
                            </div>
                            <div className="flex items-center justify-start flex-wrap">

                                <div className="relative border border-gray-962 rounded rounded-md h-[50px] w-[160px] mr-7">
                                    <div className="rounded-lg border border-gray-954 h-[50px] small lg:w-full small:w-full sm:w-full focus:outline-none focus:border-yellow-951 outline-none">
                                        <div className={`${styles.datepicker}`}>
                                            <Datepicker
                                                toggleClassName={`absolute bg-transparent rounded-r-lg text-white right-0 h-[50px] px-3 text-gray-400 focus:outline-none disabled:opacity-40 disabled:cursor-not-allowed outline-none z-10 opacity-0 `}
                                                placeholder="From"
                                                useRange={false}
                                                asSingle={true}
                                                value={fromDate}
                                                onChange={handleCalendarFromChange}
                                            />
                                        </div>
                                    </div>

                                    <Image
                                        src="/img/calendar.svg"
                                        alt="calendar"
                                        height={20}
                                        width={20}
                                        className="absolute top-[15px] right-[9px]"
                                    />
                                </div>

                                <div className="relative border border-gray-962 rounded rounded-md h-[50px] w-[160px] mr-7">
                                    <div className="rounded-lg border border-gray-954 h-[50px] small lg:w-full small:w-full sm:w-full focus:outline-none focus:border-yellow-951 outline-none">
                                        <div className={`${styles.datepicker}`}>
                                            <Datepicker
                                                toggleClassName={`absolute bg-transparent rounded-r-lg text-white right-0 h-[50px] px-3 text-gray-400 focus:outline-none disabled:opacity-40 disabled:cursor-not-allowed outline-none z-10 opacity-0 `}
                                                placeholder="To"
                                                useRange={false}
                                                asSingle={true}
                                                value={toDate}
                                                onChange={handleCalendarToChange}
                                            />
                                        </div>
                                    </div>

                                    <Image
                                        src="/img/calendar.svg"
                                        alt="calendar"
                                        height={20}
                                        width={20}
                                        className="absolute top-[15px] right-[9px]"
                                    />
                                </div>

                                <div className="relative">
                                    <button
                                        className="h-14 border w-[46px] bg-black text-white rounded rounded-lg flex justify-center items-center transition-all duration-[400ms] mr-3 transition-opacity duration-300 outline-none transform active:scale-75 transition-transform"
                                    >
                                        <Image
                                            src="/img/arrow-right-white.svg"
                                            alt="calendar"
                                            height={28}
                                            width={28}
                                        />
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="flex w-full justify-between items-start mt-8 lg:w-full">
                            <div className={`lg:overflow-x-auto md:overflow-x-scroll sm:overflow-x-scroll rounded-xl lg:w-full md:w-full lg:w-full sm:w-full small:w-full small:overflow-x-scroll max-h-[500px] ${styles.proTableWrap}`}>

                                <RaisedAlertTable
                                    objectID={parentAsset.objectID}
                                    keys={parentAsset.key}
                                    id={parentAsset.id}
                                    subObject={parentAsset.subObject}
                                    model={parentAsset.model}
                                    filterData={data}
                                />

                            </div>
                        </div>
                    </div>

                </div>
            </div>

            <div className="w-[16%] pl-5 hidden">
                <Template />
            </div>

        </div>
    )
}

RaisedAlerts.getLayout = function getLayout(page: any) {
    return (
        <Layout>{page}</Layout>
    )
}