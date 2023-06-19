import React, { useState, useRef, useEffect } from "react";
import styles from '../../../styles/Common.module.css';
import Image from "next/image";
import Link from "next/link";
import axios from 'axios';

export default function TabData(props: any) {

    console.log({
        props:props
    })

    const [data, setData] = useState([] as any);
    const [dataHeader, setDataHeader] = useState([] as any);

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
    }, [props])

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

                                                    // http://localhost:3000/dashboard/eopswatch/eopswatchmodel?objectID=Manufacturing+Plants&key=TPC71810-01-011&id=TPC3305-01&subObject=Walls

                                                    <td key={i}>
                                                        <Link
                                                            href={{
                                                                pathname: '/dashboard/eopswatch/eopswatchmodel',
                                                                query: {
                                                                    objectID: "Manufacturing Plants",
                                                                    key: items?.tags.ID,
                                                                    id: items?.tags.PlantID,
                                                                    subObject: props.objData
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
                                ))
                                : null
                        }

                        {/* <tr>
                            <td>1</td>
                            <td>TPC71810-01-011</td>
                            <td>TPC71810-01</td>
                            <td>Power Generator Engine</td>
                            <td>1</td>
                            <td>PGER</td>
                            <td>North</td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td>TPC71810-01-012</td>
                            <td>TPC71810-01</td>
                            <td>Power Generator Engine</td>
                            <td>1</td>
                            <td>PGER</td>
                            <td>East</td>
                        </tr>
                        <tr>
                            <td>3</td>
                            <td>TPC71810-01-013</td>
                            <td>TPC71810-01</td>
                            <td>Gamma Reactor</td>
                            <td>2</td>
                            <td>GRR</td>
                            <td>North</td>
                        </tr>
                        <tr>
                            <td>4</td>
                            <td>TPC71810-01-014</td>
                            <td>TPC71810-01</td>
                            <td>Gamma Reactor</td>
                            <td>2</td>
                            <td>GRR</td>
                            <td>South</td>
                        </tr> */}
                    </tbody>
                </table>
            </div>
        </>
    )
}
