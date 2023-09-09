import React, { useState, useRef, useEffect } from "react";
import styles from '../../../styles/Common.module.css';
import Image from "next/image";
import Link from "next/link";
import axios from 'axios';

export default function AlertTable(props: any) {

    const [deleteModal, setDeleteModal] = useState(false);
    const [data, setData] = useState([] as any);

    // Fetch the JSON data of sub Asset
    const fetchClassData = () => {
        axios.get("/api/getParentAlerts").then((response) => {
            if (response.data) {
                let filterData = response.data.filter((item: any) => {
                    return item.model === props.model
                })
                setData(filterData);
            }
        });
    };
    useEffect(() => {
        fetchClassData();
        if (fetchClassData.length) return;
    }, [props])

    console.log({
        props: props, data: data
    })

    const result = () => {
        if (props.model === "Tire Wear Detection") {
            return (
                <table className={`table-auto min-w-full text-left ${styles.tableVer3}`}>
                    <thead className="h-10 text-[14px] font-light">
                        <tr>
                            <th>Alert Name</th>
                            <th>Condition</th>
                            <th>Date Created</th>
                            <th>Enabled/Disabled</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data.map((items: any, index: any) => (
                                <tr key={index}>
                                    <td>{items.alertName}</td>
                                    <td>
                                        {/* (Remaing Miles) */}
                                        {
                                            items.threshold ?
                                                <>
                                                    Remaing Miles
                                                    {items.condition === "less than" ? " < " : ">"}
                                                    {items.threshold}
                                                </>
                                                :
                                                " " + items.tireware
                                        }
                                    </td>
                                    <td>{items.dateCreated}</td>
                                    <td>
                                        <div className="flex items-center justify-start mr-5">
                                            <div className={`${styles.radioWrap}`}>
                                                <input
                                                    type="checkbox"
                                                />
                                                <span className={`${styles.radioFrame}`}></span>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <Link
                                            className="mr-5"
                                            href={{
                                                pathname: "/dashboard/eopswatch/editalerts",
                                                query: {
                                                    objectID: props.objectID,
                                                    key: props.keys,
                                                    id: props.id,
                                                    subObject: props.subObject,
                                                    model: props.model,
                                                    alertID:items.alertID
                                                }
                                            }}
                                        >
                                            <Image
                                                src="/img/edit.svg"
                                                alt="Edit"
                                                height={18}
                                                width={18}
                                                className="relative inline top-[-5px]"
                                            />
                                        </Link>
                                        <button onClick={() => setDeleteModal(true)}>
                                            <Image
                                                src="/img/trash.svg"
                                                alt="Trash"
                                                height={18}
                                                width={18}
                                            />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            )
        } else if (props.model === "Battery Life Prediction") {
            return (
                <table className={`table-auto min-w-full text-left ${styles.tableVer3}`}>
                    <thead className="h-10 text-[14px] font-light">
                        <tr>
                            <th>Alert Name</th>
                            <th>Battery Utilization</th>
                            <th>Date/Time of Creation</th>
                            <th>Updated Date/Time</th>
                            <th>Enabled/Disabled</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            data.map((items: any, index: any) => (
                                <tr key={index}>
                                    <td>{items.alertName}</td>
                                    <td>
                                        {items.batteryUtilization}
                                    </td>
                                    <td>{items.remainingCyclesLeft}</td>
                                    <td>{items.DateCreated}</td>
                                    <td>{items.DateModified}</td>
                                    <td>
                                        <div className="flex items-center justify-start mr-5">
                                            <div className={`${styles.radioWrap}`}>
                                                <input
                                                    type="checkbox"
                                                />
                                                <span className={`${styles.radioFrame}`}></span>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <Link
                                            className="mr-5"
                                            href={{
                                                pathname: "/dashboard/eopswatch/editalerts",
                                                query: {
                                                    objectID: props.objectID,
                                                    key: props.key,
                                                    id: props.id,
                                                    subObject: props.subObject,
                                                    model: props.model,
                                                }
                                            }}
                                        >
                                            <Image
                                                src="/img/edit.svg"
                                                alt="Edit"
                                                height={18}
                                                width={18}
                                                className="relative inline top-[-5px]"
                                            />
                                        </Link>
                                        <button
                                            onClick={() => setDeleteModal(true)}
                                        >
                                            <Image
                                                src="/img/trash.svg"
                                                alt="Trash"
                                                height={18}
                                                width={18}
                                            />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        }

                    </tbody>
                </table>
            )

        } else {
            return (
                <table className={`table-auto min-w-full text-left ${styles.tableVer3}`}>
                    <thead className="h-10 text-[14px] font-light">
                        <tr>
                            <th>Alert Name</th>
                            <th>Threshold Value</th>
                            <th>Date/Time of Creation</th>
                            <th>Updated Date/Time</th>
                            <th>Enabled/Disabled</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            data.map((items: any, index: any) => (
                                <tr key={index}>
                                    <td>{items.alertName}</td>
                                    <td>
                                        {items.thresholdMeasure === "lessThen" ? "<" : ">"} {items.thresholdMeasure} {items.thresholdValue} %
                                    </td>
                                    <td>{items.DateCreated}</td>
                                    <td>{items.DateModified}</td>
                                    <td>
                                        <div className="flex items-center justify-start mr-5">
                                            <div className={`${styles.radioWrap}`}>
                                                <input
                                                    type="checkbox"
                                                />
                                                <span className={`${styles.radioFrame}`}></span>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <Link
                                            className="mr-5"
                                            href={{
                                                pathname: "/dashboard/eopswatch/editalerts",
                                                query: {
                                                    objectID: props.objectID,
                                                    key: props.key,
                                                    id: props.id,
                                                    subObject: props.subObject,
                                                    model: props.model,
                                                }
                                            }}
                                        >
                                            <Image
                                                src="/img/edit.svg"
                                                alt="Edit"
                                                height={18}
                                                width={18}
                                                className="relative inline top-[-5px]"
                                            />
                                        </Link>
                                        <button
                                            onClick={() => setDeleteModal(true)}
                                        >
                                            <Image
                                                src="/img/trash.svg"
                                                alt="Trash"
                                                height={18}
                                                width={18}
                                            />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        }

                    </tbody>
                </table>
            )
        }
    }

    return (
        <>
            {result()}

            {/* ===== Delete Modal starts ===== */}
            {deleteModal ?
                <>
                    <div
                        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                    >
                        <div className="relative my-6 w-[580px]">
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                {/*header*/}
                                <div className="flex items-start justify-between p-2">
                                    <h3 className="text-lg font-medium"></h3>
                                    <button
                                        className="p-1 ml-auto bg-transparent border-0 text-black float-right leading-none font-semibold outline-none focus:outline-none"
                                        onClick={() => setDeleteModal(false)}
                                    >
                                        <Image
                                            src="/img/close.svg"
                                            alt="close"
                                            className="h-6"
                                            height={24}
                                            width={24}
                                        />
                                    </button>
                                </div>
                                {/*body*/}
                                <div className="relative pt-2 pb-8 flex-auto">
                                    <div className="flex justify-start items-center flex-wrap flex-col">
                                        <p className="flex justify-center items-center text-lg">Are you sure want to delete this alert?</p>
                                        <div className="mt-10 relative flex justify-center items-center w-full">
                                            <button
                                                className="border border-black rounded-lg bg-black text-white text-lg w-[70px] h-[47px] mr-5 hover:bg-yellow-951 hover:text-white hover:border-yellow-951 ease-in-out duration-300 disabled:bg-gray-951 disabled:hover:border-gray-951 disabled:border-gray-951"
                                                onClick={() => { setDeleteModal(false); }}
                                            >
                                                Yes
                                            </button>
                                            <button
                                                className="border border-black rounded-lg bg-white text-black text-lg w-[70px] h-[47px] hover:text-white hover:bg-yellow-951 hover:border-yellow-951 ease-in-out duration-300"
                                                onClick={() => { setDeleteModal(false); }}
                                            >
                                                No
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="opacity-75 fixed inset-0 z-40 bg-black"></div>
                </>
                : null}

            {/* ===== Delete Modal Ends ===== */}

        </>

    )
}