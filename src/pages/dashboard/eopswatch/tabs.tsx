import React, { useState, useRef, useEffect } from "react";
import styles from '../../../styles/Common.module.css';
import Image from "next/image";
import Link from "next/link";
import axios from 'axios';

export default function Tabs(props: any) {

    const [data, setData] = useState([] as any);
    const [dataHeader, setDataHeader] = useState([] as any);
    const [searchData, setSearchData] = useState([] as any);
    const [subClassData, setSubClassData] = useState<any[]>([]);
    const [selectedTab, setSelectedTab] = useState(0);
    const [tabData, setTabData] = useState();

    // Remove duplicate element from array
    function removeDuplicates(arr: any) {
        let unique = [];
        for (let i = 0; i < arr.length; i++) {
            if (unique.indexOf(arr[i]) === -1) {
                unique.push(arr[i]);
            }
        }
        return unique;
    }

    // Fetch the JSON data of sub Asset
    const fetchClassData = () => {
        // axios.get("/api/getSubAssets").then((response) => {
        axios.get("/api/getChildObject").then((response) => {
            if (response.data) {
                const filtered = response.data.filter((item: any) => {
                    return item.className === props.className;
                });
                if (filtered && filtered.length > 0) {                    
                    const filtered2 = filtered.map((item: any) => {
                        return item.object
                    })
                    setSubClassData(removeDuplicates(filtered2));
                    setTabData(removeDuplicates(filtered2)[0])
                }

            }
        });
    };
    useEffect(() => {
        fetchClassData();
        if (fetchClassData.length) return;
    }, [props])


    // Get Child Object data on page load
    const fetchChildObjectData = () => {
        axios.get("/api/getChildObject").then((response) => {
            if (response.data) {
                let filtered = [] as any;
                filtered = response.data.filter((item: any) => {
                    return item.object === tabData;
                });
                if (filtered && filtered.length > 0) {
                    setData(filtered);
                    setDataHeader(filtered[0]);
                }
            }
        });
    };

    // Fetch the Child Object data when search item passed.
    const fetchSearchedData = () => {
        axios.get("/api/getChildObject").then((response) => {
            if (response.data) {
                const filtered = response.data.filter((item: any) => {
                    // console.log("tabData", tabData, props.className)
                    if (props.className === "Manufacturing Plants") {
                        return item?.tags?.PlantID === props.searchData && item.object === tabData
                    } else {
                        return item?.tags?.VIN === props.searchData && item.object === tabData
                    }
                });
                if (filtered && filtered.length > 0) {
                    setData(filtered);
                    setDataHeader(filtered[0]);
                } else {
                    setData([]);
                    setDataHeader([]);
                }
            }
        });
    };

    useEffect(() => {
        if (props.searchData && props.searchData.length > 0) {
            if (tabData) {
                fetchSearchedData();
                if (fetchSearchedData.length) return;
            }
        } else {
            if (tabData) {
                fetchChildObjectData();
                if (fetchChildObjectData.length) return;
            }
        }

    }, [props, tabData])


    const tabSelection = (index: any, item: any) => {
        setSelectedTab(index);
        setTabData(item);
    }

    return (
        <>
            <div className="mt-2 flex w-full flex-wrap justify-start item-center flex-col">

                <div className="relative border-l-[1px]">

                    {
                        subClassData && subClassData.length > 0 ?
                            subClassData.map((item: any, index: any) => (
                                <button
                                    key={index}
                                    onClick={() => tabSelection(index, item)}
                                    className={`rounded rounded-tr-lg rounded-tl-lg rounded-bl-[0px] rounded-br-[0px] h-[44px] flex-inline justify-center items-center min-w-[70px] px-3 mr-2 font-semibold border-b-[0px] ${selectedTab === index ? 'bg-black text-white border border-black' : 'bg-gray-964 border border-gray-963 text-black'}`}>
                                    <span>{item}</span>
                                </button>
                            ))
                            : null
                    }

                </div>

                <div className="relative">
                    <div className="overflow-hidden border border-l-1 border-r-1 border-b-1 border-t-0  rounded-bl-xl rounded-br-xl w-full">
                        <table className={`table-auto min-w-full text-left ${styles.table} ${styles.tableTab}`}>
                            <thead className="bg-black text-white rounded-xl h-10 text-[14px] font-light">
                                <tr>
                                    <th>S.No</th>
                                    {
                                        dataHeader && Object.keys(dataHeader).length != 0 ?
                                            Object.keys(dataHeader?.tags).map((item: any, i: any) => (
                                                <th key={i}>
                                                    {
                                                        item.split(/(?=[A-Z])/).join(" ")
                                                    }
                                                </th>
                                            ))
                                            : null
                                    }
                                </tr>
                            </thead>
                            <tbody className="cursor-pointer text-[16px]">
                                {
                                    data && data.length > 0 ?
                                        data.map((items: any, index: any) => (
                                            <tr key={index}>
                                                <td>{index + 1}</td>
                                                {
                                                    items && Object.keys(items).length != 0 ?
                                                        Object.values(items?.tags).map((item: any, i: any) => (
                                                            <td key={i}>
                                                                {
                                                                    props.className === "Manufacturing Plants" ?
                                                                        <Link
                                                                            href={{
                                                                                pathname: '/dashboard/eopswatch/eopswatchmodel',
                                                                                query: {
                                                                                    objectID: props.className,
                                                                                    key: items?.tags.ID,
                                                                                    id: items?.tags.PlantID,
                                                                                    subObject: props.objData
                                                                                }
                                                                            }}
                                                                        >
                                                                            {item}
                                                                        </Link>
                                                                        :
                                                                        <Link
                                                                            href={{
                                                                                pathname: '/dashboard/eopswatch/eopswatchmodel',
                                                                                query: {
                                                                                    objectID: props.className,
                                                                                    key: items?.tags.SerialNo,
                                                                                    id: items?.subObject,
                                                                                    subObject: props.objData
                                                                                }
                                                                            }}
                                                                        >
                                                                            {item}
                                                                        </Link>
                                                                }
                                                            </td>

                                                        ))
                                                        : null
                                                }
                                            </tr>
                                        ))
                                        :
                                        <tr>
                                            <td>No Data Found with this search cateria!</td>
                                        </tr>
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}
