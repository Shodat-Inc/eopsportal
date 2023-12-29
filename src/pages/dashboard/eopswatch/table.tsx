import React, { useState, useRef, useEffect } from "react";
import styles from '../../../styles/Common.module.css';
import Image from "next/image";
import Link from "next/link";
import Spinner from "@/common/spinner";
import axios from 'axios';

export default function Table(props: any) {

    // console.log({
    //     "props in table": props
    // })
    const { tabledata, classData, assetData, urlParams } = props;
    const [toggleSort, setToggleSort] = useState(false);
    const [data, setData] = useState([] as any);
    const [dataHeader, setDataHeader] = useState([] as any);
    const [actions, setActions] = useState(false);
    const [actionCount, setActionCount] = useState(1);
    const [spinner, setSpinner] = useState(false);
    // console.log({
    //     urlParams: urlParams,
    //     props: props
    // })

    // Get Child Object data on page load
    const fetchChildObjectData = () => {
        axios.get("/api/getChildObject").then((response) => {
            if (response.data) {
                const filtered = response.data.filter((item: any) => {
                    return item.object === props.assetData;
                });


                if (filtered && filtered.length >= 0) {
                    setData(filtered);
                    setDataHeader(filtered[0]);
                    // props.handleClick(filtered.length)
                }
            }
        });
    };
    useEffect(() => {
        fetchChildObjectData();
        if (fetchChildObjectData.length) return;
    }, [props.assetData])


    const sortByID = () => {
        setToggleSort(!toggleSort)
    }

    const toggleActions = (item: any) => {
        setActionCount(item);
        setActions(!actions);
    }

    const selectedAction = (item: any) => {
        setActions(false);
    }

    // Hook that alerts clicks outside of the passed ref
    function useOutsideAlerter(ref: any) {
        useEffect(() => {
            function handleClickOutside(event: any) {
                if (ref.current && !ref.current.contains(event.target)) {
                    // setActions(false);
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


    const linkToNext = (items: any) => {
        if (props.classData === "Vehicles") {
            return <Link
                href={{
                    pathname: '/dashboard/eopswatch/models',
                    query: {
                        objectID: props.classData,
                        subObject: props.assetData,
                        id: items?.tags?.VIN,
                        key: items?.tags?.SerialNo ? items?.tags?.SerialNo : items?.tags?.SerialID,
                        industryID: "1122334455",
                        VIN: items?.tags?.VIN
                    }
                }}
                className="text-white text-[14px] hover:bg-yellow-951 hover:text-black h-[40px] px-4 border-b border-gray-900 w-full text-left flex items-center justify-start relative z-[99]">
                <span>AI Model Detection</span>
            </Link>
        } else {
            return <Link
                href={{
                    pathname: '/dashboard/eopswatch/models',
                    query: {
                        objectID: props.classData,
                        subObject: assetData,
                        key: items?.tags?.ID,
                        id: items?.tags?.PlantID,
                        industryID: "1122334455",
                        PlantID: items?.tags?.PlantID
                    }
                }}
                className="text-white text-[14px] hover:bg-yellow-951 hover:text-black h-[40px] px-4 border-b border-gray-900 w-full text-left flex items-center justify-start relative z-[99]">
                <span>AI Model Detection</span>
            </Link>
        }
    }



    // console.log({
    //     data: data,
    //     dataHeader: dataHeader
    // })

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
                                        Object.keys(dataHeader?.tags).map((item: any, i: any) => (
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
                                                    Object.values(items?.tags).map((item: any, i: any) => (
                                                        <td key={i}>
                                                            {
                                                                props.classData === "Manufacturing Plants" ?
                                                                    <Link
                                                                        href={{
                                                                            pathname: '/dashboard/eopswatch/models',
                                                                            query: {
                                                                                objectID: props.classData,
                                                                                subObject: assetData,
                                                                                key: items?.tags?.ID,
                                                                                id: items?.tags?.PlantID,
                                                                                industryID: "1122334455",
                                                                                PlantID: items?.tags?.PlantID
                                                                            }
                                                                        }}
                                                                    >
                                                                        {item && item != "" ? item : "-"}
                                                                    </Link>
                                                                    :
                                                                    <Link
                                                                        href={{
                                                                            pathname: '/dashboard/eopswatch/models',
                                                                            query: {
                                                                                objectID: props.classData,
                                                                                subObject: props.assetData,
                                                                                id: items?.tags?.VIN,
                                                                                key: items?.tags?.SerialNo ? items?.tags?.SerialNo : items?.tags?.SerialID,
                                                                                industryID: "1122334455",
                                                                                VIN: items?.tags?.VIN
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
                                                    {(actions && actionCount == index + 1) &&
                                                        <div className="bg-black text-white border overflow-hidden border-black rounded rounded-xl w-[160px] flex flex-col flex-wrap items-start justify-start shadow-sm absolute top-[30px] right-[40px] z-[10] ">
                                                            {/* {linkToNext(items)} */}
                                                            {
                                                                props.classData === "Vehicles"
                                                                    ?
                                                                    <Link
                                                                        href={{
                                                                            pathname: '/dashboard/eopswatch/models',
                                                                            query: {
                                                                                objectID: props.classData,
                                                                                subObject: props.assetData,
                                                                                id: items?.tags?.VIN,
                                                                                key: items?.tags?.SerialNo ? items?.tags?.SerialNo : items?.tags?.SerialID,
                                                                                industryID: "1122334455",
                                                                                VIN: items?.tags?.VIN
                                                                            }
                                                                        }}
                                                                        className="text-white text-[14px] hover:bg-yellow-951 hover:text-black h-[40px] px-4 border-b border-gray-900 w-full text-left flex items-center justify-start relative z-[99]">
                                                                        <span>AI Model Detection</span>
                                                                    </Link>
                                                                    :

                                                                    <Link
                                                                        href={{
                                                                            pathname: '/dashboard/eopswatch/models',
                                                                            query: {
                                                                                objectID: props.classData,
                                                                                subObject: assetData,
                                                                                key: items?.tags?.ID,
                                                                                id: items?.tags?.PlantID,
                                                                                industryID: "1122334455",
                                                                                PlantID: items?.tags?.PlantID
                                                                            }
                                                                        }}
                                                                        className="text-white text-[14px] hover:bg-yellow-951 hover:text-black h-[40px] px-4 border-b border-gray-900 w-full text-left flex items-center justify-start relative z-[99]">
                                                                        <span>AI Model Detection</span>
                                                                    </Link>
                                                            }
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