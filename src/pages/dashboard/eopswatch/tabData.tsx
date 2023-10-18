import React, { useState, useRef, useEffect } from "react";
import styles from '../../../styles/Common.module.css';
import Image from "next/image";
import Link from "next/link";
import axios from 'axios';
import Spinner from "@/common/spinner";

export default function TabData(props: any) {
    const [data, setData] = useState([] as any);
    const [dataHeader, setDataHeader] = useState([] as any);
    const [searchData, setSearchData] = useState([] as any);
    const [actions, setActions] = useState(false);
    const [actionCount, setActionCount] = useState(1);
    const [spinner, setSpinner] = useState(false);

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

                    if (item.subObjects?.hasOwnProperty("VIN")) {
                        if (item.subObjects?.VIN.toString().toLowerCase().includes(props.searchData.toString().toLowerCase())) {
                            return item;
                        }
                    } else if (item.subObjects?.hasOwnProperty("PlantID")) {
                        if (item.subObjects?.PlantID.toString().toLowerCase().includes(props.searchData.toString().toLowerCase())) {
                            return item;
                        }
                    } else {
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
            }
        });

    }, [props.searchData])

    // Filter UseEffect
    useEffect(() => {
        if (props.filterData.state === "" && props.filterData.city === "" && props.filterData.zipcode === "" && props.filterData.date === "" && props.filterData.from === "" && props.filterData.to === "" && props.filterData.model === "" && props.filterData.modelYear === "" && props.filterData.type === "") {
            // console.log({
            //     message: "here you go"
            // })
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
                let resfiltered = response.data.filter((item: any) => {
                    return item.parentAssetName === props.objData;
                })
                const filtered = resfiltered.filter((item: any) => {
                    if (props.filterData.state !== "") {
                        if (item.subObjects?.hasOwnProperty("State")) {
                            if (item.subObjects?.State.toString().toLowerCase().includes(props.filterData.state.toString().toLowerCase())) {
                                return item;
                            }
                        }
                    } else if (props.filterData.city !== "") {
                        if (item.subObjects?.hasOwnProperty("City")) {
                            if (item.subObjects?.City.toString().toLowerCase().includes(props.filterData.city.toString().toLowerCase())) {
                                return item;
                            }
                        }
                    } else if (props.filterData.zipcode !== "") {
                        if (item.subObjects?.hasOwnProperty("Zipcode")) {
                            if (item.subObjects?.Zipcode.toString().toLowerCase().includes(props.filterData.zipcode.toString().toLowerCase())) {
                                return item;
                            }
                        }
                    } else if (props.filterData.date !== "") {
                        if (item.subObjects?.hasOwnProperty("mfdDate")) {
                            if (item.subObjects?.mfdDate.toString().toLowerCase().includes(props.filterData.date.toString().toLowerCase())) {
                                return item;
                            }
                        }
                    } else if (props.filterData.model !== "") {
                        if (item.subObjects?.hasOwnProperty("Model")) {
                            if (item.subObjects?.Model.toString().toLowerCase().includes(props.filterData.model.toString().toLowerCase())) {
                                return item;
                            }
                        }
                    } else if (props.filterData.modelYear !== "") {
                        if (item.subObjects?.hasOwnProperty("ModelYear")) {
                            if (item.subObjects?.ModelYear.toString().toLowerCase().includes(props.filterData.modelYear.toString().toLowerCase())) {
                                return item;
                            }
                        }
                    } else if (props.filterData.type !== "") {
                        if (item.subObjects?.hasOwnProperty("Type")) {
                            if (item.subObjects?.Type.toString().toLowerCase().includes(props.filterData.type.toString().toLowerCase())) {
                                return item;
                            }
                        }
                    } else if (props.filterData.state !== "" && props.filterData.zipcode !== "") {
                        if (item.subObjects?.hasOwnProperty("State") && item.subObjects?.hasOwnProperty("Zipcode")) {
                            if (
                                item.subObjects?.mfdDate.toString().toLowerCase().includes(props.filterData.date.toString().toLowerCase())
                                &&
                                item.subObjects?.Zipcode.toString().toLowerCase().includes(props.filterData.zipcode.toString().toLowerCase())
                            ) {
                                return item;
                            }
                        }
                    } else {
                        if (item.subObjects?.hasOwnProperty("State")) {
                            if (item.subObjects?.State.toString().toLowerCase().includes(props.filterData.state.toString().toLowerCase())) {
                                return item;
                            }
                        }
                    }
                })
                if (filtered) {
                    setData(filtered);
                    setDataHeader(filtered[0]);
                    props.handleClick(filtered.length)
                }
                // console.log({
                //     "filtered response": filtered
                // })
            }
        })
    }, [props.filterData])

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

    useEffect(() => {
        setSpinner(true)
        setTimeout(() => {
            setSpinner(false)
        }, 2000)
    }, [data])

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
                    <>
                        {spinner && <Spinner height={16} width={16} />}
                        {!spinner && <p className="text-xl text-center w-full">No Matched data found!!</p>}
                    </>
                }
            </div>
        </>
    )
}
