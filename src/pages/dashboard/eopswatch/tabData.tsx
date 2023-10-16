import React, { useState, useRef, useEffect } from "react";
import styles from '../../../styles/Common.module.css';
import Image from "next/image";
import Link from "next/link";
import axios from 'axios';
import Spinner from "@/common/spinner";

export default function TabData(props: any) {
    console.log({
        props: props
    })
    const [data, setData] = useState([] as any);
    const [dataHeader, setDataHeader] = useState([] as any);
    const [searchData, setSearchData] = useState([] as any);
    const [actions, setActions] = useState(false);
    const [actionCount, setActionCount] = useState(1);

    function useOutsideAlerter(ref: any) {
        useEffect(() => {
            function handleClickOutside(event: any) {
                if (ref.current && !ref.current.contains(event.target)) {
                    setActions(false);
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

    // Get Child Object data on page load
    const fetchChildObjectData = () => {
        axios.get("/api/getObjects").then((response) => {
            if (response.data) {
                const filtered = response.data.filter((item: any) => {
                    return item.parentAssetName === props.objData;
                });
                if (filtered && filtered.length > 0) {
                    setData(filtered);
                    setDataHeader(filtered[0]);
                    props.handleClick(filtered.length)
                }
            }
        });
    };
    useEffect(() => {
        fetchChildObjectData();
        if (fetchChildObjectData.length) return;
    }, [props.objData])

    const toggleActions = (item: any) => {
        setActionCount(item);
        setActions(!actions);
    }
    const selectedAction = (item: any) => {
        setActions(false);
    }


    // Search useEffect
    useEffect(() => {
        if (props.search === "" || props.search <= 0) {
            axios.get("/api/getObjects").then((response) => {
                if (response.data) {
                    const filtered = response.data.filter((item: any) => {
                        return item.parentAssetName === props.objData;
                    });
                    if (filtered && filtered.length > 0) {
                        setData(filtered);
                        setDataHeader(filtered[0]);
                        props.handleClick(filtered.length)
                    }
                }
            });
            setData([])
            setSearchData([])
            return;
        }
        axios.get("/api/getObjects").then((response) => {
            if (response.data) {

                if (props.search === "") {
                    setData([]); return;
                }


                let filteredData = response.data.filter((item: any) => {
                    return item.parentAssetName === props.objData;
                })


                const filtered = filteredData.filter((item: any) => {
                    console.log("you are here 1")

                    if (item.subObjects?.hasOwnProperty("VIN")) {
                        if (item.subObjects?.VIN.toString().toLowerCase().includes(props.searchData.toString().toLowerCase())) {
                            return item;
                        }
                    }
                    // else if (item.subObjects?.hasOwnProperty("AssemblyPlant")) {
                    //     if (item.subObjects?.AssemblyPlant.toString().toLowerCase().includes(props.searchData.toString().toLowerCase())) {
                    //         return item;
                    //     }
                    // } else if (item.subObjects?.hasOwnProperty("LotNo")) {
                    //     if (item.subObjects?.LotNo.toString().toLowerCase().includes(props.searchData)) {
                    //         return item;
                    //     }
                    // } 

                    else if (item.subObjects?.hasOwnProperty("PlantID")) {
                        if (item.subObjects?.PlantID.toString().toLowerCase().includes(props.searchData.toString().toLowerCase())) {
                            return item;
                        }
                    }

                    // else if (item.subObjects?.hasOwnProperty("Name")) {
                    //     if (item.subObjects?.Name.toString().toLowerCase().includes(props.searchData)) {
                    //         return item;
                    //     }
                    // }
                    // else if (item.subObjects?.hasOwnProperty("Zipcode")) {
                    //     if (item.subObjects?.Zipcode.toString().toLowerCase().includes(props.searchData.toString().toLowerCase())) {
                    //         return item;
                    //     }
                    // } 
                    else {
                        if (item.subObjects?.VIN?.toString().toLowerCase().includes(props.searchData.toString().toLowerCase())) {
                            return item;
                        }
                    }
                });

                if (filtered && filtered.length > 0) {
                    setData(filtered);
                    setDataHeader(filtered[0]);
                    props.handleClick(filtered.length)
                }

                console.log({
                    filteredData: filteredData,
                    filtered: filtered
                })

            }
        });

    }, [props.searchData])

    const linkToNext = (items: any) => {
        if (props.classes === "Vehicles") {
            return <Link
                href={{
                    pathname: '/dashboard/eopswatch/models',
                    query: {
                        objectID: props.classes,
                        VIN: items?.subObjects.VIN
                    }
                }}
                onClick={() => selectedAction(items?.subObjects.VIN)}
                className="text-white text-[14px] hover:bg-yellow-951 hover:text-black h-[40px] px-4 border-b border-gray-900 w-full text-left flex items-center justify-start">
                <span>AI Model Detection</span>
            </Link>
        } else {
            return <Link
                href={{
                    pathname: '/dashboard/eopswatch/models',
                    query: {
                        objectID: props.classes,
                        PlantID: items?.subObjects.PlantID
                    }
                }}
                onClick={() => selectedAction(items?.subObjects.ID)}
                className="text-white text-[14px] hover:bg-yellow-951 hover:text-black h-[40px] px-4 border-b border-gray-900 w-full text-left flex items-center justify-start">
                <span>AI Model Detection</span>
            </Link>
        }
    }

    return (
        <>

            <div className="bg-white rounded rounded-xl min-h-[220px] px-3 py-4 flex justify-between items-center w-full">
                {data && data.length > 0 ?
                    <table className={`table-auto lg:min-w-full sm:w-full small:w-full text-left ${styles.tableV3}`}>
                        <thead className="text-sm font-normal">
                            <tr>
                                <th>S.No</th>
                                {
                                    dataHeader && Object.keys(dataHeader).length != 0 ?
                                        Object.keys(dataHeader?.subObjects).map((item: any, i: any) => (
                                            <th key={i}>
                                                {
                                                    item.split(/(?=[A-Z])/).join(" ")
                                                }
                                            </th>
                                        ))
                                        : null
                                }
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>

                            {
                                data && data.length > 0 ?
                                    data.map((items: any, index: any) => (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            {

                                                items && Object.keys(items).length != 0 ?
                                                    Object.values(items?.subObjects).map((item: any, i: any) => (
                                                        <td key={i}>
                                                            {
                                                                props.classes === "Manufacturing Plants" ?
                                                                    <Link
                                                                        href={{
                                                                            pathname: '/dashboard/eopswatch/objects',
                                                                            query: {
                                                                                objectID: props.classes,
                                                                                PlantID: items?.subObjects?.PlantID
                                                                            }
                                                                        }}
                                                                    >
                                                                        {item && item != "" ? item : "-"}
                                                                    </Link>
                                                                    :
                                                                    <Link
                                                                        href={{
                                                                            pathname: '/dashboard/eopswatch/objects',
                                                                            query: {
                                                                                objectID: props.classes,
                                                                                VIN: items?.subObjects?.VIN
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
                                            <td>
                                                <div className="flex justify-start items-center relative">
                                                    <button onClick={() => toggleActions(index + 1)}>
                                                        <Image
                                                            src="/img/more-vertical.svg"
                                                            alt="more-vertical"
                                                            height={24}
                                                            width={24}
                                                        />
                                                    </button>
                                                    {(actions && actionCount === index + 1) &&
                                                        <div ref={wrapperRef} className="bg-black text-white border overflow-hidden border-black rounded rounded-xl w-[160px] flex flex-col flex-wrap items-start justify-start shadow-sm absolute top-[30px] right-[40px] z-[1] ">
                                                            {linkToNext(items)}
                                                        </div>
                                                    }
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                    : null
                            }
                        </tbody>
                    </table>
                    :
                    <Spinner height={16} width={16} />
                }
            </div>
        </>
    )
}
