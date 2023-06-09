import React, { useState, useRef, useEffect } from "react";
import styles from '../../../styles/Common.module.css';
import Layout from "../../../components/Layout";
import Template from "../template";
import Image from "next/image";
import Link from "next/link";
import axios from 'axios';
import TabData from "../eopswatch/tabData";

export default function EopsWatch() {
    const [value, setValue] = useState("");
    const [data, setData] = useState([] as any);
    const [subObj, setSebObj] = useState({} as any);
    const [subClassData, setSubClassData] = useState<any[]>([]);
    const [selectedTab, setSelectedTab] = useState(0);
    const [tabData, setTabData] = useState();
    const [search, setSearch] = useState([] as any)

    // Fetch the JSON data of sub Asset
    const fetchClassData = () => {
        axios.get("/api/getSubAssets").then((response) => {
            if (response.data) {
                const filtered = response.data.filter((item: any) => {
                    return item.parentAssetName === "Manufacturing Plants";
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
    }, [])

    const onChange = (event: any) => {
        setValue(event.target.value)
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
        setValue("");
        setSearch(obj)
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

    

    const tabSelection = (index:any, item:any) => {
        setSelectedTab(index);
        setTabData(item)
    }
    
    // Getting the filtered list if VIN || PlantID from search bar
    const filteredData = data && data.map((items:any) => {
        if(items.className === "Manufacturing Plants") {
           return items.tags?.PlantID
        } else {
            return items.tags?.VIN
        }
    })

    // remove duplicate items in array
    function removeDuplicates(arr:any) {
        return arr.filter((item:any, index:any) => arr.indexOf(item) === index);
    }
    // New Array after removing duplicate items
    const arr = removeDuplicates(filteredData)
    console.log({
        subClassData: subClassData,
        filteredData:filteredData,
        arr : arr
    })

    return (
        <div className="flex font-OpenSans">

            <div className="w-[100%]">
                <div className="columns-2 flex justify-between items-center">
                    <p className="text-black text-lg mb-0 font-semibold">eOps Trace</p>
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


                    {/* =========== TABS ============= */}
                    <div className="text-black font-semibold text-md mb-5">Objects</div>
                    <div className="mt-2 flex w-full flex-wrap justify-start item-center flex-col">
                        <div className="relative border-l-[1px]">
                            {
                                subClassData && subClassData.length > 0 ?
                                    subClassData.map((item: any, index: any) => (
                                        <button  
                                        key={index}
                                        onClick={() => tabSelection(index, item.assetName)}
                                        className={`rounded rounded-tr-lg rounded-tl-lg rounded-bl-[0px] rounded-br-[0px] h-[44px] flex-inline justify-center items-center min-w-[70px] px-3 mr-2 font-semibold border-b-[0px] ${selectedTab === index ? 'bg-black text-white border border-black': 'bg-gray-964 border border-gray-963 text-black'}`}>
                                            <span>{item.assetName}</span>
                                        </button>
                                    ))
                                : null
                            }
                        </div>
                        <div className="relative">
                            <TabData objData={tabData} searchData={search} />
                        </div>
                    </div>

                    {/* =========== ENDS TABS ============= */}

                    {/* Table */}
                    {subObj ?
                        <div className="flex w-full flex-wrap mt-10 hidden">
                            <div className="text-black font-semibold text-md mb-2">Objects</div>
                            <div className="overflow-hidden border rounded-xl w-full">
                                <table className={`table-auto min-w-full text-left ${styles.table}`}>
                                    <thead className="bg-black text-white rounded-xl h-10 text-sm font-light">
                                        {
                                            subObj && Object.keys(subObj).length != 0 ?
                                                Object.keys(subObj?.tags).map((item: any, i: any) => (
                                                    <th key={i}>
                                                        {
                                                            item.split(/(?=[A-Z])/).join(" ").toUpperCase()
                                                        }
                                                    </th>
                                                ))
                                                : null
                                        }
                                    </thead>
                                    <tbody className="cursor-pointer">
                                        <tr>
                                            {
                                                subObj && Object.keys(subObj).length != 0 ?
                                                    Object.values(subObj?.tags).map((item: any, i: any) => (

                                                        <td key={i}>
                                                            <Link
                                                                href={{
                                                                    pathname: '/dashboard/eopswatch/eopswatchmodel',
                                                                    query: {
                                                                        key: item
                                                                    }
                                                                }}
                                                            >
                                                                {item}
                                                            </Link>
                                                        </td>

                                                    ))
                                                    : null
                                            }
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        : null}

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