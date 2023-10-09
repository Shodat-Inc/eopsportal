import React, { useState, useRef, useEffect } from "react";
import Layout from "../../../components/Layout";
import Image from "next/image";
import Link from "next/link";
import axios from 'axios';
import TabData from "./tabData";
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
=======
import Table from "./table";
import Filter from "./filters";
import axios from "axios";
import Drop from "./drop";

const classes = [
    "Manufacturing Plants",
    "Vehicles"
]

export default function EopsWatch() {
    const [toggleArrow, setToggleArrow] = useState(false);
    const [toggleDrop, setToggleDrop] = useState(false);
    const [toggleFilter, setToggleFilter] = useState(false);

    const [subAssets, setSubAssets] = useState([] as any);
    const [classData, setClassData] = useState(classes[0]);
    const [showAsset, setShowAsset] = useState();
    const [objectData, setObjectData] = useState([] as any);
    const [filteredArray, setFilteredArray] = useState([] as any);

    const [search, setSearch] = useState([] as any);
    const [value, setValue] = useState("");
    const [data, setData] = useState([] as any);

    const toggleFilterFunction = () => {
        setToggleArrow(!toggleArrow);
        setToggleFilter(!toggleFilter);
    }

    useEffect(() => {
        axios.get("/api/getSubAssets").then((response) => {
            if (response.data) {
                let filteredData = response.data.filter((item: any) => {
                    return item.parentAssetName === classData
                })

                let arr = [] as any;
                if (filteredData.length > 0) {
                    filteredData.map((item: any) => {
                        arr.push(item.assetName)
                    })
                }
                setSubAssets(arr);
                setShowAsset(filteredData[0].assetName);
            }
        });
    }, [])

    function useOutsideAlerter(ref: any) {
        useEffect(() => {
            function handleClickOutside(event: any) {
                if (ref.current && !ref.current.contains(event.target)) {
                    setToggleDrop(false);
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

    const toggleDropFunction = () => {
        setToggleDrop(!toggleDrop);
    }

    const handleDropFunction = (data: any) => {
        setToggleDrop(false);
        setShowAsset(data);
    }

    const handleFilterFunction = (data: any) => {
        setToggleFilter(false)
    }

    useEffect(() => {
        axios.get("/api/getChildObject").then((response) => {
            if (response.data) {
                let filteredData = response.data.filter((item: any) => {
                    return item.object === showAsset
                })
                setObjectData(filteredData)
            }
        });
    }, [showAsset])

    useEffect(() => {
        var filteredArray = [];
        if (showAsset) {
            filteredArray = subAssets.filter(function (e: any) { return e != showAsset })
        }
        setFilteredArray(filteredArray)
    }, [showAsset])


    const onChange = (event: any) => {
        setValue(event.target.value);
        if (event.target.value === "" || event.target.value.length <= 0) {
            axios.get("/api/getChildObject").then((response) => {
                if (response.data) {
                    let filteredData = response.data.filter((item: any) => {
                        return item.object === showAsset
                    })
                    setObjectData(filteredData)
                }
            });
            setData([])
            setSearch([])
            return;
        }
        axios.get("/api/getChildObject").then((response) => {
            if (response.data) {

                if (event.target.value === "") {
                    setData([]); return;
                }

                let filteredData = response.data.filter((item: any) => {
                    return item.object === showAsset
                })

                
                const filtered = filteredData.filter((item: any) => {

                    if (item.tags.hasOwnProperty("VIN")) {
                        if (item.tags.VIN.toString().toLowerCase().includes(event.target.value.toString().toLowerCase())) {
                            return item;
                        }
                    } else if (item.tags.hasOwnProperty("SerialNo")) {
                        if (item.tags.SerialNo.toString().toLowerCase().includes(event.target.value.toString().toLowerCase())) {
                            return item;
                        }
                    } else if (item.tags?.hasOwnProperty("SerialNo")) {
                        if (item.tags?.SerialNo.toString().toLowerCase().includes(event.target.value.toString().toLowerCase())) {
                            return item;
                        }
                    } else if (item.tags.hasOwnProperty("ID")) {
                        if (item.tags.ID.toString().toLowerCase().includes(event.target.value.toString().toLowerCase())) {
                            return item;
                        }
                    } else if (item.tags.hasOwnProperty("PlantID")) {
                        if (item.tags.PlantID.toString().toLowerCase().includes(event.target.value.toString().toLowerCase())) {
                            return item;
                        }
                    } else if (item.tags.hasOwnProperty("Room")) {
                        if (item.tags.Room.toString().toLowerCase().includes(event.target.value.toString().toLowerCase())) {
                            return item;
                        }
                    } else {
                        if (item.tags?.VIN?.toString().toLowerCase().includes(event.target.value.toString().toLowerCase())) {
                            return item;
                        }
                    }
                });

                if (filtered && filtered.length > 0) {
                    setObjectData(filtered);
                }

                console.log({
                    filteredData:filteredData,
                    filtered:filtered
                })

            }
        });
    }


    return (
        <div className="w-full h-full font-OpenSans">
            <p className="text-black text-lg mb-4 font-semibold text-xl">eOps Watch</p>
            <div className="bg-white min-h-[500px] rounded rounded-xl lg:p-4 md:p-4 sm:p-4">
                {/* Top Section */}
                <div className="flex justify-between items-center mb-5">
                    <div className="flex relative justify-start items-center">
                        <span className="font-semibold">{showAsset}</span>
                        <button className={`ml-2 border-2 rounded rounded-md ${toggleDrop === true ? 'border-black' : 'border-white'}`} onClick={toggleDropFunction}>
                            <Image src="/img/more-vertical.svg" alt="more-vertical" height={24} width={24} />
                        </button>

                        {
                            toggleDrop &&
                            <div ref={wrapperRef}>
                                <Drop
                                    subAssets={filteredArray}
                                    handleClick={handleDropFunction}
                                />
                            </div>
                        }

                    </div>
                    <div className="flex">
                        <div className="flex relative">
                            <Image src="/img/search-icon-gray.svg" alt="search" height={22} width={22} className="absolute top-[11px] left-3" />
                            <input 
                                type="text"
                                placeholder="Search"
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
                                <Filter handleClick={handleFilterFunction} />
                            }

                        </div>
                    </div>
                </div>
                {/* Top Section Ends */}

                <Table
                    data={objectData}
                    classData={classData}
                    assetData={showAsset}
                />

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