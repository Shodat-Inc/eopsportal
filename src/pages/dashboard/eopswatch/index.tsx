import React, { useState, useRef, useEffect } from "react";
import styles from '../../../styles/Common.module.css';
import Layout from "../../../components/Layout";
import Template from "../template";
import Image from "next/image";
import Link from "next/link";
import axios from 'axios';
import TabData from "./tabData";
import Tabs from './tabs';
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
        if (event.target.value === "" || event.target.value.length <=0) {
            fetchClassData(); 
            setData([])
            setSearch([])
            return;
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
                        {/* {showHideTab ?
                            <div className="relative border-l-[1px] hidden">
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
                            : null} */}
                        <div className="relative">
                            <Tabs
                                // objData={tabData}
                                className={chooseAsset}
                                searchData={search}
                                // subClassData={subClassData}
                            />
                        </div>
                    </div>

                    {/* =========== ENDS TABS ============= */}

                </div>
            </div>

            <div className="w-[16%] pl-5 hidden">
                <Template />
            </div>

        </div>
    )
}

EopsWatch.getLayout = function getLayout(page: any) {
    return (
        <Layout>{page}</Layout>
    )
}