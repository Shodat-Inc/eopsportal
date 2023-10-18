import React, { useState, useRef, useEffect } from "react";
import styles from '../../../styles/Common.module.css';
import Image from "next/image";
import Link from "next/link";
import axios from 'axios';

export default function RaisedAlertTable(props: any) {

    const [data, setData] = useState([] as any);

    const impactBGColor = (color: any) => {
        let bg = "";
        if (color === "high") {
            bg = 'bg-high'
        } else if (color === "low") {
            bg = 'bg-low'
        } else if (color === "medium") {
            bg = 'bg-medium'
        } else {
            bg = 'bg-themeYellow'
        }
        return bg;
    }

    // Fetch the JSON data of sub Asset
    const fetchClassData = () => {
        axios.get("/api/getWatchAlerts").then((response) => {
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

    const result = () => {
        if (props.model === "Battery Life Prediction") {

            return (

                <table className={`table-auto lg:min-w-full sm:w-full small:w-full text-left ${styles.proSenseTable}`}>
                    <thead className="text-sm font-normal">
                        <tr>
                            <th>Object ID</th>
                            <th>Alert Name</th>
                            <th>Condition</th>
                            <th>Battery Utilization</th>
                            <th>Remaining Cycles Left</th>
                            <th>Impact</th>
                            <th>DateTime</th>
                            <th>Result</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            props.filterData && props.filterData.length > 0 ?
                                props.filterData.map((item: any, index: any) => (
                                    <tr key={index}>
                                        <td>{item.ObjectID}</td>
                                        <td>{item.alertName}</td>
                                        <td>
                                            {
                                                item.condition === "less than"
                                                ?
                                                `< ${item.conditionValue}`
                                                :
                                                `> ${item.conditionValue}`
                                            }
                                        </td>
                                        <td>{item.batteryUtilizationValue  ? item.batteryUtilizationValue : "--"}</td>
                                        <td>{item.remainingCyclesLeft ? item.remainingCyclesLeft : "--"}</td>
                                        <td><span className={`text-black ${impactBGColor(item.impact)} inline-flex justify-center items-center rounded rounded-md p-1 w-16 text-sm capitalize`}>{item.impact}</span></td>
                                        <td><span className="text-gray-951">{item.dateModified}</span></td>
                                        <td>
                                            <Link
                                                href={{
                                                    pathname: "/dashboard/eopstrace/result",
                                                    query: {
                                                        objectID: props.objectID,
                                                        key: props.keys,
                                                        id: props.id,
                                                        subObject: props.subObject,
                                                        model: props.model,
                                                        selectedID: item.ObjectID
                                                    }
                                                }}
                                                className="flex justify-center items-center bg-yellow-951 text-black text-sm h-[40px] p-1 rounded rounded-lg min-w-[90px]">
                                                <Image
                                                    src="/img/prosense-action-icon.svg"
                                                    alt="home"
                                                    className="mr-2"
                                                    height={18}
                                                    width={18}
                                                />
                                                <span>Result</span>
                                            </Link>
                                        </td>
                                    </tr>
                                ))
                                : <tr>
                                    <td colSpan={6}>No alerts found!</td>
                                </tr>
                        }
                    </tbody>
                </table>


            )

        } else if (props.model === "Tire Wear Detection") {
            <table className={`table-auto lg:min-w-full sm:w-full small:w-full text-left ${styles.proSenseTable}`}>
                <thead className="text-sm font-normal">
                    <tr>
                        <th>Image</th>
                        <th>ObjectID</th>
                        <th>Alert Name</th>
                        <th>Alert Condition</th>
                        <th>Predictions</th>
                        <th>Impact</th>
                        <th>DateTime</th>
                        <th>Result</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        props.filterData && props.filterData.length > 0 ?
                            props.filterData.map((item: any, index: any) => (
                                <tr key={index}>
                                    <td>
                                        <span>
                                            <Image
                                                src={`/img/TireWearPrediction/${props.keys}/Test/${item.resultImage}`}
                                                alt="home"
                                                height={60}
                                                width={80}
                                            />
                                        </span>
                                    </td>
                                    <td>{item.ObjectID}</td>
                                    <td>{item.alertName}</td>
                                    <td>{item.condition === "less than" ? "<" : ">"} {item.threshold}</td>
                                    <td>{item.prediction}</td>
                                    <td><span className={`text-black ${impactBGColor(item.impact)} inline-flex justify-center items-center rounded rounded-md p-1 w-16 text-sm capitalize`}>{item.impact}</span></td>
                                    <td><span className="text-gray-951">{item.dateModified}</span></td>
                                    <td>
                                        <Link
                                            href={{
                                                pathname: "/dashboard/eopswatch/result",
                                                query: {
                                                    objectID: props.objectID,
                                                    key: props.keys,
                                                    id: props.id,
                                                    subObject: props.subObject,
                                                    model: props.model,
                                                    selectedID: item.ObjectID
                                                }
                                            }}
                                            className="flex justify-center items-center bg-yellow-951 text-black text-sm h-[40px] p-1 rounded rounded-lg min-w-[90px]">
                                            <Image
                                                src="/img/prosense-action-icon.svg"
                                                alt="home"
                                                className="mr-2"
                                                height={18}
                                                width={18}
                                            />
                                            <span>Result</span>
                                        </Link>
                                    </td>
                                </tr>
                            ))
                            : <tr>
                                <td colSpan={6}>No alerts found!</td>
                            </tr>
                    }
                </tbody>
            </table>
        } else {

        }
    }

    return (
        <>
            {result()}
        </>

    )
}