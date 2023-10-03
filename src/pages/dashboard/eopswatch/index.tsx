import React, { useState, useRef, useEffect } from "react";
import styles from '../../../styles/Common.module.css';
import Layout from "../../../components/Layout";
import Image from "next/image";
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
    const [objectData, setObjectData] = useState([] as any)

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
                setSubAssets(filteredData);
                setShowAsset(filteredData[0].assetName)
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

    useEffect(()=> {
        axios.get("/api/getChildObject").then((response) => {
            if (response.data) {
                let filteredData = response.data.filter((item: any) => {
                    return item.object === showAsset
                })
                setObjectData(filteredData)
                console.log({
                    response:response.data,
                    filteredData:filteredData
                })
            }
        });
    }, [showAsset])


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
                            <Drop
                                subAssets={subAssets}
                                handleClick={handleDropFunction}
                            />
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

                            {toggleFilter && <Filter />}

                        </div>
                    </div>
                </div>
                {/* Top Section Ends */}

                <Table data={objectData} />

            </div>
        </div>
    )
}

EopsWatch.getLayout = function getLayout(page: any) {
    return (
        <Layout>{page}</Layout>
    )
}