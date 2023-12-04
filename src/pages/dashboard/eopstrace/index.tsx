import React, { useState, useRef, useEffect } from "react";
import Layout from "../../../components/Layout";
import styles from '../../../styles/Common.module.css';
import Image from "next/image";
import Link from "next/dist/client/link";
import Table from "./table";
import Filter from "./filters";
import axios from "axios";
import Drop from "./drop";
import CustomDrop from "@/common/customdrop";
import TabData from "./tabData";

export default function EopsTrace(props: any) {
    const [chooseAsset, setChooseAsset] = useState('Vehicles');
    const [actions, setActions] = useState(false);
    const [classData, setClassData] = useState([] as any);
    const [tabData, setTabData] = useState();
    const [subClassData, setSubClassData] = useState<any[]>([]);
    const [count, setCount] = useState(0);
    const [filter, setFilter] = useState({} as any);
    const [value, setValue] = useState("");
    const [data, setData] = useState([] as any);
    const [toggleArrow, setToggleArrow] = useState(false);
    const [toggleDrop, setToggleDrop] = useState(false);
    const [toggleFilter, setToggleFilter] = useState(false);


    // Fetch the JSON data of Classes
    const fetchClassData = () => {
        axios.get("/api/getAssets").then((response) => {
            if (response.data) {
                const filtered = response.data.filter((item: any) => {
                    return item.assetName
                });
                if (filtered && filtered.length > 0) {
                    setClassData(filtered);
                }
            }
        });
    };
    useEffect(() => {
        fetchClassData();
        if (fetchClassData.length) return;
    }, [])



    // Fetch the JSON data of sub Asset
    const fetchSubAssets = () => {
        axios.get("/api/getObjects").then((response) => {
            if (response.data) {
                const filtered = response.data.filter((item: any) => {
                    return item.parentAssetName === chooseAsset;
                });
                if (filtered && filtered.length > 0) {
                    setSubClassData(filtered);
                    setTabData(filtered[0].parentAssetName)
                }
            }
        });
    };
    useEffect(() => {
        fetchSubAssets();
        if (fetchSubAssets.length) return;
    }, [chooseAsset])

    const handleCounter = (item: any) => {
        setCount(item)
    }

    const handleDropDown = (item: any) => {
        setChooseAsset(item)
    }

    const handleFilterFunction = (data: any) => {
        setToggleFilter(false)
    }
    
    // Hook that alerts clicks outside of the passed ref
    function useOutsideAlerter(ref: any) {
        useEffect(() => {
            function handleClickOutside(event: any) {
                if (ref.current && !ref.current.contains(event.target)) {
                    setActions(false);
                    setToggleFilter(false)
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

    const toggleFilterFunction = () => {
        setToggleArrow(!toggleArrow);
        setToggleFilter(!toggleFilter);
    }

    const onChange = (event: any) => {
        setValue(event.target.value);
    }

    const handleApplyFunction = (data:any) => {
        setFilter(data)
    }

    return (
        <div className="w-full h-full font-OpenSans">
            <p className="text-black text-lg mb-4 font-semibold text-xl">eOps Trace</p>

            {/* Top Information */}
            <div className="bg-white rounded rounded-xl min-h-[120px] px-3 py-4 flex justify-between items-center mb-4">
                <div className="w-[34%] border border-[#EEEEEE] border-l-0 border-t-0 border-b-0 border-r-1">
                    <CustomDrop
                        data={classData}
                        handleClick={handleDropDown}
                        defaultClass={classData && classData.length > 0 ? classData[1].assetName : ""}
                    />
                </div>
                <div className="w-[34%] border border-[#EEEEEE] border-l-0 border-t-0 border-b-0 border-r-1">
                    <div className="text-center flex justify-center items-center w-full flex-wrap flex-col">
                        <p className="mb-2">Total {chooseAsset}</p>
                        <p className="text-2xl font-semibold">{count}</p>
                    </div>
                </div>
                <div className="w-[34%]">
                    <div className="text-center flex justify-center items-center w-full flex-wrap flex-col">
                        <p className="mb-2">Total Objects</p>
                        <p className="text-2xl font-semibold">-</p>
                    </div>
                </div>
            </div>

            {/* Table Information */}

            <div className="mb-4 flex justify-between items-center">
                <p className="text-black text-md font-semibold">{chooseAsset} </p>
                <div className="flex justify-start items-center">
                    <div className="flex relative">
                        <Image src="/img/search-icon-gray.svg" alt="search" height={22} width={22} className="absolute top-[11px] left-3" />
                        <input
                            type="text"
                            placeholder={`${chooseAsset === "Vehicles" ? "Search on VIN" : "Search on Plant ID"}`}
                            id="searchobjects"
                            name="searchobjects"
                            className="border-2 border-gray-969 rounded-xl h-[44px] w-[300px] pl-10 pr-2"
                            onChange={onChange}
                            value={value}
                            autoComplete="off"
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

                        {
                            toggleFilter &&
                            <div ref={wrapperRef}>
                                <Filter
                                    handleClick={handleFilterFunction}
                                    handleApply={handleApplyFunction}
                                    selectedClass={chooseAsset}
                                    classData={classData}
                                />
                            </div>
                        }

                    </div>
                </div>
            </div>
            <TabData
                objData={tabData}
                searchData={value}
                classes={chooseAsset}
                handleClick={handleCounter}
                filterData={filter}
            />
        </div>
    )
}

EopsTrace.getLayout = function getLayout(page: any) {
    return (
        <Layout>{page}</Layout>
    )
}