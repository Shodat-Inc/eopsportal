import React, { useState, useRef, useEffect } from "react";
import styles from '../../../styles/Common.module.css';
import Layout from "../../../components/Layout";
import Template from "../template";
import Image from "next/image";
import Link from "next/link";
import axios from 'axios';
import TabData from "./tabData";
<<<<<<< HEAD
import { getAssetsData } from "@/lib/getassets";

export async function getServerSideProps() {
    const assetData = await getAssetsData()
    return {
        props: {
            assetData,
        },
    }
}

export default function EopsWatch(props: any) {
    const [value, setValue] = useState("");
    const [data, setData] = useState([] as any);
    const [subObj, setSebObj] = useState({} as any);
    const [subClassData, setSubClassData] = useState<any[]>([]);
    const [selectedTab, setSelectedTab] = useState(0);
    const [tabData, setTabData] = useState();
    const [search, setSearch] = useState([] as any);
    const [chooseAsset, setChooseAsset] = useState(props.assetData && props.assetData.length > 0 ? props.assetData[0].assetName : '');
    const [toggleAsset, setToggleAsset] = useState(false);
    const [classData, setClassData] = useState(props.assetData);
    const [showHideTab, setShowHideTab] = useState(true);

    // Fetch the JSON data of sub Asset
    const fetchClassData = () => {
        axios.get("/api/getSubAssets").then((response) => {
            if (response.data) {
                const filtered = response.data.filter((item: any) => {
                    return item.parentAssetName === chooseAsset;
                });
                if (filtered && filtered.length > 0) {
                    console.log("filtered", filtered)
                    setSubClassData(filtered);
                    setTabData(filtered[0].assetName)
                }

            }
        });
    };
    useEffect(() => {
        fetchClassData();
        if (fetchClassData.length) return;
    }, [chooseAsset])

    const onChange = (event: any) => {
        setValue(event.target.value)
        if (event.target.value === "") {
            fetchClassData(); return;
        }
        axios.get("/api/getChildObject").then((response) => {
            if (response.data) {

                if (event.target.value === "") {
                    setData([]); return;
                }

                const filtered = response.data.filter((item: any) => {
                    if (item.tags.hasOwnProperty("VIN")) {
                        if (item.tags.VIN.toString().toLowerCase().includes(event.target.value.toString().toLowerCase())) {
                            return item;
                        }
                    } else {
                        if (item.tags.PlantID.toString().toLowerCase().includes(event.target.value.toString().toLowerCase())) {
                            return item;
                        }
                    }
                });

                if (filtered && filtered.length > 0) {
                    setData(filtered);
                }

            }
        });
    }

    const subObjectSelected = (obj: any) => {
        setData([]);
        // setValue("");
        setSearch(obj)
        setShowHideTab(false);
        axios.get("/api/getChildObject").then((response) => {
            if (response.data) {

                if (obj === "") {
                    return;
                }
                const filtered = response.data.filter((item: any) => {
                    if (item.tags.hasOwnProperty("VIN")) {
                        if (item.tags.VIN.toString().toLowerCase().includes(obj.toString().toLowerCase())) {
                            return item;
                        }
                    } else {
                        if (item.tags.PlantID.toString().toLowerCase().includes(obj.toString().toLowerCase())) {
                            return item;
                        }
                    }
                });
                if (filtered && filtered.length > 0) {
                    setSebObj(filtered[0]);
                }
            }
        });
    }


    const tabSelection = (index: any, item: any) => {
        setSelectedTab(index);
        setTabData(item);
        setShowHideTab(true);
    }

    // Getting the filtered list if VIN || PlantID from search bar
    const filteredData = data && data.map((items: any) => {
        if (items.className === "Manufacturing Plants") {
            return items.tags?.PlantID
        } else {
            return items.tags?.VIN
        }
    })

    // remove duplicate items in array
    function removeDuplicates(arr: any) {
        return arr.filter((item: any, index: any) => arr.indexOf(item) === index);
    }
    // New Array after removing duplicate items
    const arr = removeDuplicates(filteredData)


    // Show Choose Asset List
    const showChooseAssetList = () => {
        setToggleAsset(!toggleAsset)
    }

    const selectAsset = (item: any) => {
        setChooseAsset(item);
        setToggleAsset(false);
        setShowHideTab(true);
    }

    console.log({
        chooseAsset: chooseAsset,
        subObj: subObj,
        subClassData: subClassData,
        tabData: tabData
    })

    return (
        <div className="flex font-OpenSans">

            <div className="w-[100%]">
                <div className="columns-2 flex justify-between items-center">
                    <p className="text-black text-lg mb-0 font-semibold">eOps Watch</p>
                </div>

                <div className="border border-gray-957 bg-gray-953 min-h-full rounded-xl mt-3 px-4 py-4">
                    <div className="flex justify-start items-start">
                        <nav className="flex" aria-label="Breadcrumb">
                            <ol className="inline-flex items-center space-x-1 md:space-x-1">
                                <li className="inline-flex items-center">
                                    <Link href="/dashboard/eopswatch"
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
                            </ol>
                        </nav>
                    </div>

                    {/* Search Bar */}
                    <div className="flex w-full mt-5 justify-center items-center flex-wrap relative">
                        <>
                            <div className="relative">
                                <div className="flex relative w-[480px] flex-wrap">
                                    <input
                                        type="text"
                                        placeholder="Search"
                                        id="searchobjects"
                                        name="searchobjects"
                                        className="rounded rounded-lg border border-gray-962 pl-10 pr-2 w-[480px] h-12"
                                        onChange={onChange}
                                        value={value}
                                    />
                                    <Image
                                        src="/img/search.svg"
                                        alt="search"
                                        height={18}
                                        width={18}
                                        className="absolute left-3 top-[14px]"
                                    />
                                </div>

                                {
                                    data && data.length > 0 ?
                                        <div className="bg-white shadow-lg rounded rounded-xl w-[480px] overflow-hidden overflow-y-auto min-h-[200px] absolute top-[100%] z-10">
                                            {
                                                arr.map((items: any, index: any) => (
                                                    <button
                                                        className="text-left px-4 py-3 hover:bg-yellow-951 w-full"
                                                        key={index}
                                                        onClick={() => subObjectSelected(items)}
                                                    >
                                                        {items}

                                                    </button>
                                                ))
                                            }
                                        </div>
                                        :
                                        null
                                }
                            </div>

                            <div className="relative p-6 flex-auto">
                                <div className="flex justify-start items-center flex-wrap flex-col">
                                    <div className="w-[400px]">
                                        <div
                                            className="border rounded-xl border-gray-500 h-[55px] w-[400px] pl-2 pr-5 relative flex items-center justify-start bg-white"
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
                                            <div className={`h-52 border rounded-xl border-gray-500 h-auto max-h-[250px] w-[400px]  absolute flex items-start justify-start mt-1 overflow-hidden overflow-y-auto bg-white ${styles.scroll} z-10`}>
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
                                </div>
                            </div>

                        </>



                    </div>


                    {/* =========== TABS ============= */}
                    <div className="text-black font-semibold text-md mb-5">Objects</div>
                    <div className="mt-2 flex w-full flex-wrap justify-start item-center flex-col">
                        {showHideTab ?
                            <div className="relative border-l-[1px]">
                                {
                                    subClassData && subClassData.length > 0 ?
                                        subClassData.map((item: any, index: any) => (
                                            <button
                                                key={index}
                                                onClick={() => tabSelection(index, item.assetName)}
                                                className={`rounded rounded-tr-lg rounded-tl-lg rounded-bl-[0px] rounded-br-[0px] h-[44px] flex-inline justify-center items-center min-w-[70px] px-3 mr-2 font-semibold border-b-[0px] ${selectedTab === index ? 'bg-black text-white border border-black' : 'bg-gray-964 border border-gray-963 text-black'}`}>
                                                <span>{item.assetName}</span>
                                            </button>
                                        ))
                                        : null
                                }
                            </div>
                            : null}
                        <div className="relative">
                            <TabData
                                objData={tabData}
                                className={chooseAsset}
                                searchData={search}
                            />
                        </div>
                    </div>

                    {/* =========== ENDS TABS ============= */}

                </div>
            </div>

            <div className="w-[16%] pl-5 hidden">
                <Template />
            </div>

=======
import Tabs from './tabs';
import { getAssetsData } from "@/lib/getassets";
import Datepicker from "react-tailwindcss-datepicker";

export default function EopsWatch() {
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
        threshold: "",
        impact: "",
        date: ""
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
    // Hook that alerts clicks outside of the passed ref
    function useOutsideAlerter(ref: any) {
        useEffect(() => {
            function handleClickOutside(event: any) {
                if (ref.current && !ref.current.contains(event.target)) {
                    setToggleDrop(false)
                    // setToggleFilter(false);
                }
            }
            document.addEventListener("mousedown", handleClickOutside);
            return () => {
                document.removeEventListener("mousedown", handleClickOutside);
            };
        }, [ref]);
    }
    const wrapperRef = useRef(null);
    useOutsideAlerter(wrapperRef);

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

    // Apply filter function
    const applyFilter = async () => {
        setToggleFilter(false)
    }

    // Reset filter
    const resetFilter = () => {
        setFilterData({
            threshold: "",
            impact: "",
            date: ""
        });
        setData([]);
        setToggleFilter(false)
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
    }
    // Handle DatePiker Change
    const handleCalendarToChange = (newValue: any) => {
        setToDate(newValue);
    }
    return (
        <div className="w-full h-full font-OpenSans">
            <p className="text-black text-lg mb-4 font-semibold text-xl">eOps Watch</p>
            <div className="bg-white min-h-[500px] rounded rounded-xl lg:p-4 md:p-4 sm:p-4">
                {/* Top Section */}
                <div className="flex justify-between items-center mb-5">
                    <div className="flex relative justify-start items-center">
                        <span className="font-semibold">Walls</span>
                        <button className={`ml-2 border-2 rounded rounded-md ${toggleDrop === true ? 'border-black' : 'border-white'}`} onClick={toggleDropFunction}>
                            <Image src="/img/more-vertical.svg" alt="more-vertical" height={24} width={24} />
                        </button>
                        {toggleDrop &&
                            <div ref={wrapperRef} className="bg-black text-white border overflow-hidden border-black rounded rounded-xl w-52 flex flex-col flex-wrap items-start justify-start shadow-sm absolute top-[30px] left-[80%] z-[1]">
                                <button
                                    onClick={() => setToggleDrop(false)}
                                    className="text-white text-sm hover:bg-white hover:text-black h-[40px] px-4 border-b border-gray-900 w-full text-left">Pipes</button>
                                <button
                                    onClick={() => setToggleDrop(false)}
                                    className="text-white text-sm hover:bg-white hover:text-black h-[40px] px-4 border-b border-gray-900 w-full text-left">Windows</button>
                                <button
                                    onClick={() => setToggleDrop(false)}
                                    className="text-white text-sm hover:bg-white hover:text-black h-[40px] px-4 border-b border-gray-900 w-full text-left">Floor material</button>
                                <button
                                    onClick={() => setToggleDrop(false)}
                                    className="text-white text-sm hover:bg-white hover:text-black h-[40px] px-4 w-full text-left">Light</button>
                            </div>
                        }
                    </div>
                    <div className="flex">
                        <div className="flex relative">
                            <Image src="/img/search-icon-gray.svg" alt="search" height={22} width={22} className="absolute top-[11px] left-3" />
                            <input type="text" name="search" className="border-2 border-gray-969 rounded-xl h-[44px] w-[300px] pl-10 pr-2" placeholder="Search" />
                        </div>
                        <div className="relative ml-3">
                            <button
                                className={`bg-white border-2  rounded-xl h-[44px] transition-all duration-[400ms] h-[44px] rounded rounded-xl px-2 py-2 flex items-center justify-start ${toggleFilter === true ? 'border-black' : 'border-gray-969'}`}
                                onClick={toggleFilterFunction}
                            >
                                <Image
                                    src="/img/filter-icon.svg"
                                    alt="calendar"
                                    height={22}
                                    width={22}
                                />
                                <span className="mr-2 ml-1">Filters</span>
                                <Image
                                    src="/img/arrow-down-black.svg"
                                    alt="Arrow Down"
                                    height={24}
                                    width={24}
                                    className={`${toggleArrow === true ? 'rotate-180' : 'rotate-0'}`}
                                />
                            </button>
                            {toggleFilter &&
                                <div ref={wrapperRef} className="rounded rounded-xl shadow shadow-xl border border-gray-951 min-h-[350px] w-[380px] px-4 py-3 bg-white absolute right-0 top-[100%] mt-1 z-10">
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

                                        <button onClick={() => setToggleFilter(false)}>
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
                                        <p className="mb-2 p-0 text-black text-sm font-bold">Battery  Utilization</p>
                                        <div className="mb-2">
                                            <div className={`${styles.rangeSlider} ${styles.rangeSlider2}`}>
                                                <input
                                                    type="range"
                                                    max={100}
                                                    min={0}
                                                    step={5}
                                                    // value={value}
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

                                    <div className="w-full mb-3 hidden">
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

                                    <div className="w-full mb-3 hiiden flex justify-between items-center">
                                        <div className="flex flex-wrap w-[45%]">
                                            <p className="mb-2 p-0 text-black text-sm font-bold">Remaining cycles left</p>
                                            <input
                                                type="text"
                                                className="border border-gray-951 rounded rounded-xl h-[40px] w-full px-2"
                                            />
                                        </div>
                                        <div className="flex flex-wrap w-[45%]">
                                            <p className="mb-2 p-0 text-black text-sm font-bold">Est. total cycles</p>
                                            <input
                                                type="text"
                                                className="border border-gray-951 rounded rounded-xl h-[40px] w-full px-2"
                                            />
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
                </div>
                {/* Top Section Ends */}

                {/* Table Section */}
                <div className="flex flex-wrap flex-col justify-start items-start">
                    <table className={`table-auto lg:min-w-full sm:w-full small:w-full text-left ${styles.tableV3}`}>
                        <thead className="text-sm font-normal">
                            <tr>
                                <th>S.No</th>
                                <th>
                                    <button className="flex" onClick={sortByID}>
                                        <Image src="/img/arrow-up-gray.svg" alt="sort" height={20} width={20} className={`${toggleSort === true ? 'rotate-180' : 'rotate-0'}`} />
                                        <span>ID</span>
                                    </button>
                                </th>
                                <th>PlantID</th>
                                <th>Description</th>
                                <th>Floor</th>
                                <th>Room</th>
                                <th>Direction</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>1</td>
                                <td>
                                    <Link href="/dashboard/eopswatch/models" className="font-semibold">TPC71810-01-001</Link>
                                </td>
                                <td>TPC71810-01</td>
                                <td>Power Generator Engine</td>
                                <td>1</td>
                                <td>PGER</td>
                                <td>North</td>
                            </tr>
                            <tr>
                                <td>2</td>
                                <td>TPC71810-01-001</td>
                                <td>TPC71810-01</td>
                                <td>Power Generator Engine</td>
                                <td>3</td>
                                <td>PGER</td>
                                <td>North</td>
                            </tr>
                            <tr>
                                <td>3</td>
                                <td>TPC71810-01-001</td>
                                <td>TPC71810-01</td>
                                <td>Power Generator Engine</td>
                                <td>3</td>
                                <td>PGER</td>
                                <td>North</td>
                            </tr>
                            <tr>
                                <td>4</td>
                                <td>TPC71810-01-001</td>
                                <td>TPC71810-01</td>
                                <td>Power Generator Engine</td>
                                <td>2</td>
                                <td>PGER</td>
                                <td>North</td>
                            </tr>
                            <tr>
                                <td>5</td>
                                <td>TPC71810-01-001</td>
                                <td>TPC71810-01</td>
                                <td>Power Generator Engine</td>
                                <td>1</td>
                                <td>PGER</td>
                                <td>North</td>
                            </tr>
                            <tr>
                                <td>6</td>
                                <td>TPC71810-01-001</td>
                                <td>TPC71810-01</td>
                                <td>Power Generator Engine</td>
                                <td>4</td>
                                <td>PGER</td>
                                <td>North</td>
                            </tr>
                            <tr>
                                <td>7</td>
                                <td>TPC71810-01-001</td>
                                <td>TPC71810-01</td>
                                <td>Power Generator Engine</td>
                                <td>4</td>
                                <td>PGER</td>
                                <td>North</td>
                            </tr>
                            <tr>
                                <td>8</td>
                                <td>TPC71810-01-001</td>
                                <td>TPC71810-01</td>
                                <td>Power Generator Engine</td>
                                <td>1</td>
                                <td>PGER</td>
                                <td>North</td>
                            </tr>
                            <tr>
                                <td>9</td>
                                <td>TPC71810-01-001</td>
                                <td>TPC71810-01</td>
                                <td>Power Generator Engine</td>
                                <td>1</td>
                                <td>PGER</td>
                                <td>North</td>
                            </tr>
                            <tr>
                                <td>10</td>
                                <td>TPC71810-01-001</td>
                                <td>TPC71810-01</td>
                                <td>Power Generator Engine</td>
                                <td>2</td>
                                <td>PGER</td>
                                <td>North</td>
                            </tr>
                            <tr>
                                <td>11</td>
                                <td>TPC71810-01-001</td>
                                <td>TPC71810-01</td>
                                <td>Power Generator Engine</td>
                                <td>3</td>
                                <td>PGER</td>
                                <td>North</td>
                            </tr>
                            <tr>
                                <td>12</td>
                                <td>TPC71810-01-001</td>
                                <td>TPC71810-01</td>
                                <td>Power Generator Engine</td>
                                <td>3</td>
                                <td>PGER</td>
                                <td>North</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                {/* Table Section Ends */}
            </div>
>>>>>>> b0579d24bbe05fbed9660d886b2fc1aeecd70b1d
        </div>
    )
}

EopsWatch.getLayout = function getLayout(page: any) {
    return (
        <Layout>{page}</Layout>
    )
}