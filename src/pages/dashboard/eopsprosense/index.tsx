import React, { useState, useRef, useEffect } from "react";
import styles from '../../../styles/Common.module.css';
import Layout from "../../../components/Layout";
<<<<<<< HEAD
import Template from "../template";
import Image from "next/image";
import Link from "next/link";
import { getAssetsData } from "@/lib/getassets";

export async function getServerSideProps() {
    const assetData = await getAssetsData()
    return {
        props: {
            assetData,
        },
    }
}

export default function EopsProsense(props: any) {
    const [chooseAsset, setChooseAsset] = useState(props.assetData && props.assetData.length > 0 ? props.assetData[0].assetName : '');
    const [toggleAsset, setToggleAsset] = useState(false);
    const [classData, setClassData] = useState(props.assetData);
    const [showHideTab, setShowHideTab] = useState(true);

    // Show Choose Asset List
    const showChooseAssetList = () => {
        setToggleAsset(!toggleAsset)
    }

=======
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import Datepicker from "react-tailwindcss-datepicker";
import { useRouter } from 'next/router'
import Router from 'next/router'


const ManufacturingPlantsClass = [
    "Crack Detection",
    "Parts Detection",
    "Workplace Safety Detection"
]
const VehicleClass = [
    "Battery Life Prediction",
    "Crack Detection",
    "Tire Wear Detection",
    "Crystallization Detection",
    "Parts Detection"
]

export default function EopsProsense() {
    const router = useRouter();
    const [toggleDrop, setToggleDrop] = useState(false);
    const [selectedOption, setSelectedOption] = useState(1);
    const [toggleAsset, setToggleAsset] = useState(false);
    const [toggleFilter, setToggleFilter] = useState(false);
    const [toggleObject, setToggleObject] = useState(false);
    const [toggleModel, setToggleModel] = useState(false);
    const [toggleSort, setToggleSort] = useState(false);
    const [toggleArrow, setToggleArrow] = useState(false);

    const [classData, setClassData] = useState([] as any);
    const [objectData, setObjectData] = useState([] as any);
    const [modelData, setModelData] = useState([] as any);

    const [tableData, setTableData] = useState([] as any);
    const [dataHeader, setDataHeader] = useState([] as any);
    const [searchData, setSearchData] = useState([] as any);

    const [toggleDateField, setToggleDateField] = useState(false);
    const [createIssueModal, setCreateIssueModal] = useState(false);
    const [search, setSearch] = useState("");

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


    // Get class Data
    const fetchClassData = () => {
        axios.get("/api/getAssets").then((response) => {
            if (response.data) {
                setClassData(response.data);
            }
        });
    };
    useEffect(() => {
        fetchClassData();
        if (fetchClassData.length) return;
    }, [])
    const [chooseAsset, setChooseAsset] = useState(classData && classData.length > 0 ? classData[0].assetName : "Manufacturing Plants");

    // Get Object Data
    const fetchObjectData = () => {
        axios.get("/api/getSubAssets").then((response) => {
            if (response.data) {
                const filtered = response.data.filter((item: any) => {
                    return item.parentAssetName === chooseAsset;
                });
                if (filtered && filtered.length > 0) {
                    setObjectData(filtered);
                    setChooseObject(filtered[0].assetName)
                }
            }
        });
    };
    useEffect(() => {
        fetchObjectData();
        if (fetchObjectData.length) return;
    }, [chooseAsset]);

    const [chooseObject, setChooseObject] = useState((objectData && objectData.length > 0) ? objectData[0].assetName : "Walls");

    const [chooseModel, setChooseModel] = useState(ManufacturingPlantsClass[0]);

    // Set Model Data
    useEffect(() => {
        if (chooseAsset === "Manufacturing Plants") {
            setModelData(ManufacturingPlantsClass);
            setChooseModel(ManufacturingPlantsClass[0])
        } else if (chooseAsset === "Vehicles") {
            setModelData(VehicleClass);
            setChooseModel(VehicleClass[0])
        } else {
            setModelData(ManufacturingPlantsClass)
        }

    }, [chooseAsset])

    // Sort Table by ID
    const sortByID = () => {
        setToggleSort(!toggleSort)
    }

    // Toggle Dropdowns 
    const toggleDropFunction = (item: any) => {
        setToggleDrop(!toggleDrop);
        setSelectedOption(item)
    }
    const showChooseAssetList = () => {
        setToggleAsset(!toggleAsset)
    }
    const toggleObjectFunction = () => {
        setToggleObject(!toggleObject)
    }
    const toggleModelFunction = () => {
        setToggleModel(!toggleModel)
    }

    // set Selected Class
>>>>>>> b0579d24bbe05fbed9660d886b2fc1aeecd70b1d
    const selectAsset = (item: any) => {
        setChooseAsset(item);
        setToggleAsset(false);
    }
<<<<<<< HEAD

    return (
        <div className="flex font-OpenSans">

            <div className="w-[100%]">
                <div className="columns-2 flex justify-between items-center">
                    <p className="text-black text-lg mb-0 font-semibold">eOPS Prosense</p>
                </div>

                <div className="border border-gray-957 bg-gray-953 min-h-[450px] rounded-xl mt-3 px-4 py-4">
                    <div className="flex justify-start items-start">
                        <nav className="flex" aria-label="Breadcrumb">
                            <ol className="inline-flex items-center space-x-1 md:space-x-1">
                                <li className="inline-flex items-center">
                                    <Link href="/dashboard/assetmanagement"
                                        className="inline-flex items-center justify-start text-sm font-medium text-black hover:text-yellow-950">
                                        <Image
                                            src="/img/home.svg"
                                            alt="home"
=======
    // set Selected Object
    const selectObject = (item: any) => {
        setChooseObject(item);
        setToggleObject(false);
    }
    // set Selected Model
    const selectModel = (item: any) => {
        setChooseModel(item);
        setToggleModel(false);
    }

    // Toggle Filter Dropdown function
    const toggleFilterFunction = () => {
        setToggleArrow(!toggleArrow);
        setToggleFilter(!toggleFilter);
    }


    // Hook that alerts clicks outside of the passed ref
    function useOutsideAlerter(ref: any) {
        useEffect(() => {
            function handleClickOutside(event: any) {
                if (ref.current && !ref.current.contains(event.target)) {
                    setToggleAsset(false);
                    setToggleObject(false);
                    setToggleModel(false);
                    setToggleFilter(false);
                    setToggleDrop(false)
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

    // Get Table Data (Prosense Alert API)
    useEffect(() => {
        axios.get("/api/getProsenseAlert").then((response) => {
            if (response.data) {
                chooseModel: chooseModel
                // })
                const filtered = response.data.filter((item: any) => {
                    return item.class == chooseAsset && item.object == chooseObject && item.model == chooseModel;
                });
                setTableData(filtered);
            }
        });
    }, [chooseAsset, chooseObject, chooseModel])


    // Set Issue Status
    const issueStatusFunction = (item: any) => {
        if (item === "new") {
            return <><span className="bg-new h-3 w-3 rounded rounded-full inline-block"></span> <span className="text-sm ml-2">New</span></>
        } else if (item === "in-process") {
            return <><span className="bg-inProcess h-3 w-3 rounded rounded-full inline-block"></span> <span className="text-sm ml-2">In-Process</span></>
        } else if (item === "resolved") {
            return <><span className="bg-resolved h-3 w-3 rounded rounded-full inline-block"></span> <span className="text-sm ml-2">Resolved</span></>
        } else {
            return <><span className="bg-new h-3 w-3 rounded rounded-full inline-block"></span> <span className="text-sm ml-2">New</span></>
        }
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

    // Reset filter
    const resetFilter = () => {
        setFilterData({
            threshold: "",
            impact: "",
            date: ""
        });
        setData([])
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

    // Search Filter 
    const searchFilterFunction = (event: any) => {
        setSearch(event.target.value);
    }
    /*
    Update Table data when search keyword changes
    */
    useEffect(() => {
        if (search != "") {
            console.log({
                search: search
            })
            axios.get("/api/getProsenseAlert").then((response) => {
                if (response.data) {
                    const filtered = response.data.filter((item: any) => {
                        if (
                            item.alertID.toString().toLowerCase().includes(search.toLowerCase())
                            || item.alertName.toString().toLowerCase().includes(search.toLowerCase())
                            && item.class == chooseAsset
                            && item.object == chooseObject
                            && item.model == chooseModel
                        ) {
                            return item;
                        }
                    })
                    if (filtered && filtered.length > 0) {
                        setTableData(filtered);
                    }
                }
            });
        }
    }, [search])

    console.log({
        tableData: tableData
    })

    return (
        <div className="w-full h-full font-OpenSans">
            <p className="text-black text-lg mb-4 font-semibold text-xl">eOps Prosense</p>
            {/* Breadcrumb */}
            <div className="hidden flex relative bg-white rounded rounded-lg px-3 py-1 inline-flex border border-[#E3E3E3]">
                <ul className="flex justify-start items-center text-sm">
                    <li className="flex justify-start items-center">
                        <Link
                            href="/dashboard/eopswatch"
                            className="font-semibold"
                        >
                            TPC71810-01-012
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
                            href="/dashboard/eopswatch/models"
                            className="font-semibold"
                        >
                            Models
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
                            href="/dashboard/eopswatch/models"
                            className="font-semibold"
                        >
                            Crack Detection
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
                            href="/dashboard/eopswatch/models"
                            className="font-semibold"
                        >
                            Alerts
                        </Link>
                    </li>
                    <li className="flex justify-start items-center">
                        <Image
                            src="/img/chevron-right.svg"
                            alt="chevron-right"
                            height={28}
                            width={28}
                        />
                        <span className="text-gray-967 capitalize">Raised Alert</span>
                    </li>
                </ul>
            </div>

            {/* Top Dropdowns */}
            <div className="flex justify-between items-center mt-5 bg-white rounded rounded-lg px-3 py-5">
                {/* Class */}
                <div className="w-[27%] relative">
                    <div
                        className="border rounded-xl border-gray-500 h-[44px] w-full pl-2 pr-5 relative flex items-center justify-start bg-white"
                        onClick={showChooseAssetList}
                    >
                        <label className="absolute text-[13px] top-[-10px] left-2 pl-2 pr-2 bg-white">Class</label>
                        <Image
                            src="/img/arrow-down-black.svg"
                            alt="arrow-down"
                            height={20}
                            width={20}
                            className="absolute right-3 top-3"
                        />
                        <span className="text-md text-black pl-2">{chooseAsset}</span>
                    </div>

                    {toggleAsset ?
                        <div ref={wrapperRef} className={`h-52 border rounded-xl border-gray-500 h-auto max-h-[300px] w-full absolute flex items-start justify-start mt-1 overflow-hidden overflow-y-auto bg-white ${styles.scroll} z-10`}>
                            <ul className="p-0 m-0 w-full text-md">
                                {
                                    classData && classData.length > 0 ?
                                        classData.map((item: any, index: any) => (
                                            <li
                                                key={index}
                                                className="px-5 py-4 bg-white cursor-pointer hover:bg-yellow-951 w-full font-normal"
                                                onClick={() => selectAsset(item.assetName)}
                                            >
                                                <span>{item.assetName}</span>
                                            </li>
                                        ))
                                        : null
                                }
                            </ul>
                        </div>
                        : null
                    }
                </div>

                {/* Object */}
                <div className="w-[27%] relative">
                    <div
                        className="border rounded-xl border-gray-500 h-[44px] w-full pl-2 pr-5 relative flex items-center justify-start bg-white"
                        onClick={toggleObjectFunction}
                    >
                        <label className="absolute text-[13px] top-[-10px] left-2 pl-2 pr-2 bg-white">Object</label>
                        <Image
                            src="/img/arrow-down-black.svg"
                            alt="arrow-down"
                            height={20}
                            width={20}
                            className="absolute right-3 top-3"
                        />
                        <span className="text-md text-black pl-2">{chooseObject}</span>
                    </div>

                    {toggleObject ?
                        <div ref={wrapperRef} className={`h-52 border rounded-xl border-gray-500 h-auto max-h-[300px] w-full absolute flex items-start justify-start mt-1 overflow-hidden overflow-y-auto bg-white ${styles.scroll} z-10`}>
                            <ul className="p-0 m-0 w-full text-md">
                                {
                                    objectData && objectData.length > 0 ?
                                        objectData.map((item: any, index: any) => (
                                            <li
                                                key={index}
                                                className="px-5 py-4 bg-white cursor-pointer hover:bg-yellow-951 w-full font-normal"
                                                onClick={() => selectObject(item.assetName)}
                                            >
                                                <span>{item.assetName}</span>
                                            </li>
                                        ))
                                        : null
                                }
                            </ul>
                        </div>
                        : null
                    }
                </div>

                {/* Models */}
                <div className="w-[27%] relative">
                    <div
                        className="border rounded-xl border-gray-500 h-[44px] w-full pl-2 pr-5 relative flex items-center justify-start bg-white"
                        onClick={toggleModelFunction}
                    >
                        <label className="absolute text-[13px] top-[-10px] left-2 pl-2 pr-2 bg-white">Model</label>
                        <Image
                            src="/img/arrow-down-black.svg"
                            alt="arrow-down"
                            height={20}
                            width={20}
                            className="absolute right-3 top-3"
                        />
                        <span className="text-md text-black pl-2">{chooseModel}</span>
                    </div>

                    {toggleModel ?
                        <div ref={wrapperRef} className={`h-52 border rounded-xl border-gray-500 h-auto max-h-[300px] w-full  absolute flex items-start justify-start mt-1 overflow-hidden overflow-y-auto bg-white ${styles.scroll} z-10`}>
                            <ul className="p-0 m-0 w-full text-md">
                                {
                                    modelData ?
                                        modelData.map((item: any, index: any) => (
                                            <li
                                                key={index}
                                                className="px-5 py-4 bg-white cursor-pointer hover:bg-yellow-951 w-full font-normal"
                                                onClick={() => selectModel(item)}
                                            >
                                                <span>{item}</span>
                                            </li>
                                        ))
                                        :
                                        null
                                }
                            </ul>
                        </div>
                        : null
                    }
                </div>

                {/* Analytics Button */}
                <div className="w-[13%] relative text-right">
                    <Link href="/dashboard/eopsprosense/analytics" className="rounded-xl bg-yellow-951 border-[2px] border-yellow-951 text-black inline-flex w-full h-[44px] justify-center items-center pl-2 pr-2 hover:bg-yellow-951 hover:text-black hover:border-yellow-951 transition-all duration-[400ms] transition-opacity duration-300 outline-none transform active:scale-75 transition-transform">
                        <Image alt="Create New Asset" width="24" height="24" src="/img/pie-chart.svg" />
                        <span className="font-semibold ml-2">Analytics</span>
                    </Link>
                </div>
            </div>

            {/* content */}
            <div className="flex flex-wrap flex-col justify-start items-start mt-5 bg-white rounded rounded-lg overflow-hidden1 min-h-[600px] p-3">
                <div className="mb-6 pl-2 flex justify-between items-center w-full">
                    <div className="text-lg font-semibold">Alerts</div>
                    <div className="flex">
                        <div className="flex relative">
                            <Image src="/img/search-icon-gray.svg" alt="search" height={22} width={22} className="absolute top-[11px] left-3" />
                            <input
                                type="text"
                                name="search"
                                className="border-2 border-gray-969 rounded-xl h-[44px] w-[300px] pl-10 pr-2"
                                placeholder="Search alert ID or alert name"
                                value={search}
                                onChange={searchFilterFunction}
                            />
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
                                <div className="rounded rounded-xl shadow shadow-xl border border-gray-951 min-h-[350px] w-[380px] px-4 py-3 bg-white absolute right-0 top-[100%] mt-1 z-10">
                                    <div className="flex w-full justify-end items-center mb-0">
                                        <button
                                            // onClick={applyFilter} 
                                            className="text-sm text-black bg-yellow-951 flex justify-center items-center rounded rounded-lg px-2 py-2 mr-5">Apply</button>
                                        <button
                                            // onClick={resetFilter} 
                                            className="text-sm text-white bg-black flex justify-center items-center rounded rounded-lg px-2 py-2">Reset</button>
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
                                        <p className="mb-2 p-0 text-black text-sm font-bold">Threshold Value</p>
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
                                                <span className={`absolute left-0 top-[-10px] text-md`}>20%</span>
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
                </div>
                <div className="relative w-full">
                    <table className={`table-auto lg:min-w-full sm:w-full small:w-full text-left ${styles.tableV3}`}>
                        <thead className="text-sm font-normal">
                            <tr>
                                <th>Image</th>
                                <th>Alert ID</th>
                                <th>
                                    <button className="flex" onClick={sortByID}>
                                        <Image src="/img/arrow-up-gray.svg" alt="sort" height={20} width={20} className={`${toggleSort === true ? 'rotate-180' : 'rotate-0'}`} />
                                        <span>Alert Name</span>
                                    </button>
                                </th>
                                <th>Condition</th>
                                <th>Prediction</th>
                                <th>Impact</th>
                                <th>Date & Time</th>
                                <th>Ticket ID</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>

                            {
                                tableData && tableData.length > 0 ?
                                    tableData.map((item: any, index: any) => (
                                        <tr key={index}>
                                            <td>

                                                {
                                                    item.image != "" ?
                                                        <span className="h-[60px] w-[80px] inline-block bg-gray-962 rounded rounded-xl overflow-hidden">
                                                            <Image
                                                                src={`/img/${item.image}`}
                                                                alt={item.alertName}
                                                                height={60}
                                                                width={80}
                                                            />
                                                        </span>
                                                        :
                                                        <span className="h-[60px] w-[80px] inline-block bg-gray-962 rounded rounded-xl"></span>
                                                }
                                            </td>
                                            <td>{item.alertID}</td>
                                            <td>{item.alertName}</td>
                                            <td>{item.condition}</td>
                                            <td>{item.prediction}</td>
                                            <td>
                                                <span className={`bg-${item.impact} h-[29px] w-[60px] text-[13px] flex justify-center items-center rounded rounded-lg text-white capitalize`}>{item.impact}</span>
                                            </td>
                                            <td>{item.date}</td>
                                            <td>{item.ticketID ? item.ticketID : '-'}</td>
                                            <td>
                                                <div className="flex justify-start items-center relative">

                                                    <button className="" onClick={() => toggleDropFunction(index)}>
                                                        <Image
                                                            src="/img/more-vertical.svg"
                                                            alt="more"
                                                            height={24}
                                                            width={24}
                                                        />
                                                    </button>
                                                    {(toggleDrop && selectedOption === index) &&
                                                        <div ref={wrapperRef} className="bg-black text-white border overflow-hidden border-black rounded rounded-xl w-[160px] flex flex-col flex-wrap items-start justify-start shadow-sm absolute top-[30px] right-[40px] z-[1]">
                                                            <button
                                                                onClick={() => { setToggleDrop(false); setCreateIssueModal(true) }}
                                                                className="text-white text-[14px] hover:bg-white hover:text-black h-[40px] px-4 border-b border-gray-900 w-full text-left">
                                                                <span>View Result</span>
                                                            </button>
                                                            {
                                                                !item.ticketID ?

                                                                    <Link
                                                                        href={{
                                                                            pathname: '/dashboard/eopsinsight/createticket',
                                                                            query: {
                                                                                alertID: item.alertID
                                                                            }
                                                                        }}
                                                                        className="text-white text-[14px] hover:bg-white hover:text-black h-[40px] px-4 border-b border-gray-900 w-full text-left flex justify-start items-center">
                                                                        <span>Add New Ticket</span>
                                                                    </Link>
                                                                    :
                                                                    <button
                                                                        onClick={() => { setToggleDrop(false); setCreateIssueModal(true) }}
                                                                        className="text-white text-[14px] hover:bg-white hover:text-black h-[40px] px-4 border-b border-gray-900 w-full text-left">
                                                                        <span>Unassigned Ticket</span>
                                                                    </button>
                                                            }
                                                            <Link
                                                                href={{
                                                                    pathname: '/dashboard/eopsinsight/assignticket',
                                                                    query: {
                                                                        alertID: item.alertID
                                                                    }
                                                                }}
                                                                className="text-white text-[14px] hover:bg-white hover:text-black h-[40px] px-4 border-b border-gray-900 w-full text-left flex justify-start items-center">
                                                                <span>Assign Ticket</span>
                                                            </Link>
                                                            {
                                                                item.ticketID ?

                                                                    <Link
                                                                        href={{
                                                                            pathname: '/dashboard/eopsinsight/viewticket',
                                                                            query: {
                                                                                alertID: item.alertID
                                                                            }
                                                                        }}
                                                                        className="text-white text-[14px] hover:bg-white hover:text-black h-[40px] px-4 border-b border-gray-900 w-full text-left flex justify-start items-center">
                                                                        <span>View Ticket</span>
                                                                    </Link>
                                                                    : null}
                                                        </div>
                                                    }
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                    :
                                    <tr className="text-center">
                                        <td colSpan={10}><span className="text-lg text-center">No data found!</span></td>
                                    </tr>
                            }

                        </tbody>
                    </table>
                </div>
            </div>
            {/* Content Ends */}




            {/* ===== Delete Modal starts ===== */}
            {createIssueModal ?
                <>
                    <div
                        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                    >
                        <div className="relative my-6 w-[500px]">
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                {/*header*/}
                                <div className="flex items-start justify-between px-5 py-2">
                                    <h3 className="text-lg font-medium">New Issue</h3>
                                    <button
                                        className="p-1 ml-auto bg-transparent border-0 text-black float-right leading-none font-semibold outline-none focus:outline-none"
                                        onClick={() => setCreateIssueModal(false)}
                                    >
                                        <Image
                                            src="/img/close.svg"
                                            alt="close"
>>>>>>> b0579d24bbe05fbed9660d886b2fc1aeecd70b1d
                                            className="h-6"
                                            height={24}
                                            width={24}
                                        />
<<<<<<< HEAD
                                        <span className="font-semibold text-md ml-3">Alerts</span>
                                    </Link>
                                </li>
                            </ol>
                        </nav>
                    </div>

                    {/* Content Goes Here */}
                    <div className="mb-10">
                        <div className="flex w-full justify-between items-start mt-8 lg:w-[900px]">
                            <div className="flex relative w-[380px] flex-wrap">
                                <input
                                    type="text"
                                    placeholder="Search"
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
                                <div className="relative border border-gray-962 rounded rounded-md h-14 w-[140px] mr-7">
                                    <input
                                        type="text"
                                        className="w-full h-full rounded rounded-md pr-8 pl-2"
                                        placeholder="From"
                                    />
                                    <Image
                                        src="/img/calendar.svg"
                                        alt="calendar"
                                        height={20}
                                        width={20}
                                        className="absolute top-[12px] right-[9px]"
                                    />
                                </div>
                                <div className="relative border border-gray-962 rounded rounded-md h-14 w-[140px] mr-7">
                                    <input
                                        type="text"
                                        className="w-full h-full rounded rounded-md pr-8 pl-2"
                                        placeholder="To"
                                    />
                                    <Image
                                        src="/img/calendar.svg"
                                        alt="calendar"
                                        height={20}
                                        width={20}
                                        className="absolute top-[12px] right-[9px]"
                                    />
                                </div>
                                <div className="relative">
                                    <button
                                        className="h-14 border w-[46px] bg-black text-white rounded rounded-lg flex justify-center items-center"
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

                        <div className="flex w-full justify-start items-center mt-5 lg:w-[900px]">
                            <Image
                                src="/img/info-gray.svg"
                                alt="info"
                                height={32}
                                width={32}
                                className="pr-3"
                            />
                            <p className="text-[#666666]">You can select and change the below class and models from the dropdowns to view more alerts.</p>
                        </div>

                        <div className="flex w-full justify-between items-start mt-8 lg:w-[900px]">
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
                                    <div className={`h-52 border rounded-xl border-gray-500 h-auto max-h-[250px] w-[380px]  absolute flex items-start justify-start mt-1 overflow-hidden overflow-y-auto bg-white ${styles.scroll} z-10`}>
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
                                    onClick={showChooseAssetList}
                                >
                                    <label className="absolute text-sm top-[-10px] left-2 pl-2 pr-2 bg-white">Model</label>
                                    <Image
                                        src="/img/arrow-down-black.svg"
                                        alt="arrow-down"
                                        height={20}
                                        width={20}
                                        className="absolute right-3 top-4"
                                    />
                                    <span className="text-lg text-black pl-2">{"Crack Deduction"}</span>
                                </div>
                                {toggleAsset ?
                                    <div className={`h-52 border rounded-xl border-gray-500 h-auto max-h-[250px] w-[380px]  absolute flex items-start justify-start mt-1 overflow-hidden overflow-y-auto bg-white ${styles.scroll} z-10`}>
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

                        <div className="flex w-full justify-between items-start mt-8 lg:w-full">
                            <div className={`lg:overflow-x-auto md:overflow-x-scroll sm:overflow-x-scroll rounded-xl lg:w-full md:w-full lg:w-full sm:w-full small:w-full small:overflow-x-scroll max-h-[300px] ${styles.proTableWrap}`}>
                                <table className={`table-auto lg:min-w-full sm:w-full small:w-full text-left ${styles.proSenseTable}`}>
                                    <thead className="text-sm font-normal">
                                        <tr>
                                            <th>Image</th>
                                            <th>ID</th>
                                            <th>Tags</th>
                                            <th>Impact</th>
                                            <th>Date</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>
                                                <span>
                                                    <Image
                                                        src="/img/pro-1.png"
                                                        alt="home"
                                                        height={60}
                                                        width={80}
                                                    />
                                                </span>
                                            </td>
                                            <td>112233445566</td>
                                            <td>Crack</td>
                                            <td><span className="text-white bg-red-960 inline-flex justify-center items-center rounded rounded-md p-1 text-sm">High</span></td>
                                            <td><span className="text-gray-951">16-06-2023</span></td>
                                            <td>
                                                <button className="flex justify-center items-center bg-yellow-951 text-black text-sm h-[40px] p-1 rounded rounded-lg min-w-[90px]">
                                                    <Image
                                                        src="/img/prosense-action-icon.svg"
                                                        alt="home"
                                                        className="mr-2"
                                                        height={18}
                                                        width={18}
                                                    />
                                                    <span>Result</span>
                                                </button>
                                            </td>
                                        </tr>

                                        <tr>
                                            <td>
                                                <span>
                                                    <Image
                                                        src="/img/pro-2.png"
                                                        alt="home"
                                                        height={60}
                                                        width={80}
                                                    />
                                                </span>
                                            </td>
                                            <td>112233445567</td>
                                            <td>Crack</td>
                                            <td><span className="text-white bg-orange-952 inline-flex justify-center items-center rounded rounded-md p-1 text-sm">Medium</span></td>
                                            <td><span className="text-gray-951">16-06-2023</span></td>
                                            <td>
                                                <button className="flex justify-center items-center bg-yellow-951 text-black text-sm h-[40px] p-1 rounded rounded-lg min-w-[90px]">
                                                    <Image
                                                        src="/img/prosense-action-icon.svg"
                                                        alt="home"
                                                        className="mr-2"
                                                        height={18}
                                                        width={18}
                                                    />
                                                    <span>Result</span>
                                                </button>
                                            </td>
                                        </tr>

                                        <tr>
                                            <td>
                                                <span>
                                                    <Image
                                                        src="/img/pro-3.png"
                                                        alt="home"
                                                        height={60}
                                                        width={80}
                                                    />
                                                </span>
                                            </td>
                                            <td>112233445568</td>
                                            <td>Crack</td>
                                            <td><span className="text-white bg-orange-952 inline-flex justify-center items-center rounded rounded-md p-1 text-sm">Medium</span></td>
                                            <td><span className="text-gray-951">15-06-2023</span></td>
                                            <td>
                                                <button className="flex justify-center items-center bg-yellow-951 text-black text-sm h-[40px] p-1 rounded rounded-lg min-w-[90px]">
                                                    <Image
                                                        src="/img/prosense-action-icon.svg"
                                                        alt="home"
                                                        className="mr-2"
                                                        height={18}
                                                        width={18}
                                                    />
                                                    <span>Result</span>
                                                </button>
                                            </td>
                                        </tr>

                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            <div className="w-[16%] pl-5 hidden">
                <Template />
            </div>
=======
                                    </button>
                                </div>
                                {/*body*/}
                                <div className="relative pt-2 pb-8 flex-auto">
                                    <div className="flex justify-start items-center flex-wrap flex-col px-5">
                                        <div className="w-full">
                                            <div className={`mb-5 ${styles.form__wrap}`}>
                                                <div className={`relative ${styles.form__group} font-OpenSans`}>
                                                    <input
                                                        type="text"
                                                        id="alertName"
                                                        name="alertName"
                                                        className={`${styles.form__field} border border-black w-full`}
                                                        placeholder="Issue ID"
                                                        value="1100"
                                                    />
                                                    <label htmlFor="alertName" className={`${styles.form__label}`}>Issue ID</label>
                                                </div>
                                                <span className='text-red-952 text-sm flex items-center justify-start'>

                                                </span>
                                            </div>
                                        </div>

                                        <div className="w-full">
                                            <div className={`mb-5 ${styles.form__wrap}`}>
                                                <div className={`relative ${styles.form__group} font-OpenSans`}>
                                                    <input
                                                        type="text"
                                                        id="alertName"
                                                        name="alertName"
                                                        className={`${styles.form__field} border border-black w-full`}
                                                        placeholder="Priority"
                                                        value="High"
                                                    />
                                                    <label htmlFor="alertName" className={`${styles.form__label}`}>Priority</label>
                                                </div>
                                                <span className='text-red-952 text-sm flex items-center justify-start'>

                                                </span>
                                            </div>
                                        </div>

                                        <div className="w-full">
                                            <div className={`mb-5 ${styles.form__wrap}`}>
                                                <div className={`relative ${styles.form__group} font-OpenSans`}>
                                                    <input
                                                        type="text"
                                                        id="alertName"
                                                        name="alertName"
                                                        className={`${styles.form__field} border border-black w-full`}
                                                        placeholder="Issue Title"
                                                        value="Can't access"
                                                    />
                                                    <label htmlFor="alertName" className={`${styles.form__label}`}>Issue Title</label>
                                                </div>
                                                <span className='text-red-952 text-sm flex items-center justify-start'>

                                                </span>
                                            </div>
                                        </div>

                                        <div className="w-full">
                                            <div className={`mb-5 ${styles.form__wrap}`}>
                                                <div className={`relative ${styles.form__group} font-OpenSans`}>
                                                    <input
                                                        type="text"
                                                        id="alertName"
                                                        name="alertName"
                                                        className={`${styles.form__field} border border-black w-full !h-[100px]`}
                                                        placeholder="Description"
                                                        value="Lorem ipsum dolor sit amet consectetur. Orci varius at consequat magna vitae. Purus vestibulum pulvinar nisl elit sollicitudin dui a. Facilisis in tellus viverra faucibus phasellus senectus adipiscing."
                                                    />
                                                    <label htmlFor="alertName" className={`${styles.form__label}`}>Description</label>
                                                </div>
                                                <span className='text-red-952 text-sm flex items-center justify-start'>

                                                </span>
                                            </div>
                                        </div>

                                        <div className="w-full">
                                            <div className={`mb-5 ${styles.form__wrap}`}>
                                                <div className={`relative ${styles.form__group} font-OpenSans`}>
                                                    <input
                                                        type="text"
                                                        id="alertName"
                                                        name="alertName"
                                                        className={`${styles.form__field} border border-black w-full`}
                                                        placeholder="Assigned To"
                                                        value="Amit Pandey"
                                                    />
                                                    <label htmlFor="alertName" className={`${styles.form__label}`}>Assigned To</label>
                                                </div>
                                                <span className='text-red-952 text-sm flex items-center justify-start'>

                                                </span>
                                            </div>
                                        </div>

                                        {/* <p className="flex justify-center items-center text-lg">Are you sure want to delete this record?</p> */}
                                        <div className="relative flex justify-end items-center w-full">
                                            <button
                                                className="border border-black rounded-lg bg-black text-white text-lg w-[100px] h-[52px] mr-5 hover:bg-yellow-951 hover:text-white hover:border-yellow-951 ease-in-out duration-300 disabled:bg-gray-951 disabled:hover:border-gray-951 disabled:border-gray-951"
                                                onClick={() => { setCreateIssueModal(false); }}
                                            >
                                                Save
                                            </button>
                                            <button
                                                className="border border-black rounded-lg bg-white text-black text-lg w-[100px] h-[52px] hover:text-white hover:bg-yellow-951 hover:border-yellow-951 ease-in-out duration-300"
                                                onClick={() => { setCreateIssueModal(false); }}
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="opacity-75 fixed inset-0 z-40 bg-black"></div>
                </>
                : null}

            {/* ===== Delete Modal Ends ===== */}

>>>>>>> b0579d24bbe05fbed9660d886b2fc1aeecd70b1d

        </div>
    )
}

EopsProsense.getLayout = function getLayout(page: any) {
    return (
        <Layout>{page}</Layout>
    )
}