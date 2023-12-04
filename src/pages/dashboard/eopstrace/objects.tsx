import React, { useState, useRef, useEffect } from "react";
import Layout from "../../../components/Layout";
import Image from "next/image";
import Table from "./table";
import Filter from "./filters";
import axios from "axios";
import Drop from "./drop";
import Link from "next/link";
import { useRouter } from 'next/router'

const classes = [
    "Manufacturing Plants",
    "Vehicles"
]

export default function Objects() {
    const router = useRouter();
    const routerParams = router.query;

    console.log({
        routerParams:routerParams
    })

    const [toggleArrow, setToggleArrow] = useState(false);
    const [toggleDrop, setToggleDrop] = useState(false);
    const [toggleFilter, setToggleFilter] = useState(false);

    const [subAssets, setSubAssets] = useState([] as any);
    const [classData, setClassData] = useState('' as any);
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

    useEffect(()=>{
        setClassData(routerParams.objectID)
    }, [routerParams.objectID])

    useEffect(() => {
        axios.get("/api/getSubAssets").then((response) => {
            if (response.data) {
                let filteredData = response.data.filter((item: any) => {
                    return item.parentAssetName === routerParams.objectID
                })

                let arr = [] as any;
                if (filteredData.length > 0) {
                    filteredData.map((item: any) => {
                        arr.push(item.assetName)
                    })

                    setSubAssets(arr);
                    setShowAsset(filteredData[0].assetName);
                }
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
        var fArray = [];
        if (showAsset) {
            fArray = subAssets.filter(function (e: any) { return e != showAsset })
        }
        setFilteredArray(fArray)
    }, [showAsset])

    // console.log({
    //     filteredArray: filteredArray
    // })


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
                    filteredData: filteredData,
                    filtered: filtered
                })

            }
        });
    }

    const hasParams = routerParams.hasOwnProperty("PlantID")

    return (
        <div className="w-full h-full font-OpenSans">
            <p className="text-black text-lg mb-4 font-semibold text-xl">eOps Trace</p>

            {/* Breadcrumb */}
            <div className="flex relative bg-white rounded rounded-lg px-3 py-1 inline-flex border border-[#E3E3E3] mb-5">
                <ul className="flex justify-start items-center text-sm">
                    <li className="flex justify-start items-center">
                        <Link
                            href="/dashboard/eopstrace"
                            className="font-semibold"
                        >
                            All Industries
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
                                pathname: '/dashboard/eopstrace/',
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
                        <span className="text-gray-967 capitalize">
                            {
                                hasParams ?
                                    <>Plant ID : {routerParams.PlantID}</>
                                    :
                                    <>VIN : {routerParams.VIN}</>
                            }
                        </span>
                    </li>
                </ul>
            </div>


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
                    tabledata={objectData}
                    classData={classData}
                    assetData={showAsset}
                    urlParams={routerParams}
                />

            </div>
        </div>
    )
}

Objects.getLayout = function getLayout(page: any) {
    return (
        <Layout>{page}</Layout>
    )
}