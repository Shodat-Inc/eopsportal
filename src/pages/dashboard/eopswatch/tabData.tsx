import React, { useState, useRef, useEffect } from "react";
import styles from '../../../styles/Common.module.css';
import Image from "next/image";
import Link from "next/link";
import axios from 'axios';

export default function TabData(props: any) {

    const [data, setData] = useState([] as any);
    const [dataHeader, setDataHeader] = useState([] as any);
    const [searchData, setSearchData] = useState([] as any);

    console.log({
        props: props
    })

    // Get Child Object data on page load
    const fetchChildObjectData = () => {
        axios.get("/api/getChildObject").then((response) => {
            if (response.data) {
                const filtered = response.data.filter((item: any) => {
                    return item.object === props.objData;
                });
                if (filtered && filtered.length > 0) {
                    setData(filtered);
                    setDataHeader(filtered[0]);
                }
            }
        });
    };
    useEffect(() => {
        fetchChildObjectData();
        if (fetchChildObjectData.length) return;
    }, [props.objData])


    // Fetch the Child Object data when search item passed.
    const fetchSearchedData = () => {
        axios.get("/api/getChildObject").then((response) => {
            if (response.data) {
                const filtered = response.data.filter((item: any) => {
                    if (props.classes === "Manufacturing Plants") {
                        return item?.tags?.PlantID === props.searchData
                    } else {
                        return item?.tags?.VIN === props.searchData
                    }
                    // return item?.tags?.VIN === props.searchData ||  item?.tags?.PlantID === props.searchData
                });
                if (filtered && filtered.length > 0) {
                    setData(filtered);
                    setDataHeader(filtered[0]);
                    setSearchData(filtered);
                }
            }
        });
    };
    useEffect(() => {
        props && props.searchData ?
            fetchSearchedData()
            : fetchChildObjectData();
    }, [props]);



    console.log({
        data: data
    })

    return (
        <>

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
                                                            props.classes === "Manufacturing Plants" ?
                                                                <Link
                                                                    href={{
                                                                        pathname: '/dashboard/eopstrace/tracemodel',
                                                                        query: {
                                                                            objectID: props.classes,
                                                                            key: items?.tags.SerialID,
                                                                            id: items?.subObject,
                                                                            subObject: items?.object
                                                                        }
                                                                    }}
                                                                >
                                                                    {item}
                                                                </Link>
                                                                :
                                                                <Link
                                                                    href={{
                                                                        pathname: '/dashboard/eopstrace/tracemodel',
                                                                        query: {
                                                                            objectID: props.classes,
                                                                            key: items?.tags.SerialNo,
                                                                            id: items?.subObject,
                                                                            subObject: items?.object
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
                                : null
                        }
                    </tbody>
                </table>
            </div>
        </>
    )
}
