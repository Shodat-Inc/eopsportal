import React, { useState, useRef, useEffect } from "react";
import styles from '../../../styles/Common.module.css';
import Layout from "../../../components/Layout";
import Template from "../template";
import Image from "next/image";
import Link from "next/link";
import axios from 'axios';

export default function EopsWatch() {
    const [value, setValue] = useState("");
    const [data, setData] = useState([] as any);
    const [subObj, setSebObj] = useState({} as any);
    const onChange = (event: any) => {
        setValue(event.target.value)

        axios.get("/api/getChildObject").then((response) => {
            if (response.data) {

                if (event.target.value === "") {
                    setData([]); return;
                }
                const filtered = response.data.filter((item: any) => {
                    // console.log("ITEMS =>", item.tags.BatteryType)
                    if (item.tags.BatteryType.toString().toLowerCase().includes(event.target.value.toString().toLowerCase())) {
                        return item;
                    }
                });
                if (filtered && filtered.length > 0) {
                    setData(filtered);
                }

            }
        });
    }

    const subObjectSelected = (obj: any) => {
        console.log("Object", obj);
        setData([]);
        setValue("")

        axios.get("/api/getChildObject").then((response) => {
            if (response.data) {

                if (obj === "") {
                    return;
                }
                const filtered = response.data.filter((item: any) => {
                    if (item.tags.BatteryType.toString().toLowerCase().includes(obj.toString().toLowerCase())) {
                        return item;
                    }
                });
                if (filtered && filtered.length > 0) {
                    setSebObj(filtered[0]);
                }

            }
        });

    }

    console.log("AMIT - subObj =>", subObj)

    return (
        <div className="flex font-OpenSans">

            <div className="w-[84%]">
                <div className="columns-2 flex justify-between items-center">
                    <p className="text-black text-lg mb-0 font-semibold">eOps Watch</p>
                </div>

                <div className="border min-h-full rounded-xl mt-3 px-4 py-4">
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
                    <div className="flex w-full mt-10 justify-center items-center flex-wrap relative">
                        <div className="flex relative w-[480px] flex-wrap">
                            <input
                                type="text"
                                placeholder="Search"
                                id="searchobjects"
                                name="searchobjects"
                                className="rounded rounded-lg border border-gray-500 pl-10 pr-2 w-[480px] h-12"
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
                            data && data.length > 0
                                ?
                                <div className="bg-white shadow-lg rounded rounded-xl w-[480px] overflow-hidden overflow-y-auto h-[300px] absolute top-[100%]">
                                    {
                                        data.map((items: any, index: any) => (
                                            <button
                                                className="text-left px-4 py-3 hover:bg-yellow-951 w-full"
                                                key={index}
                                                onClick={() => subObjectSelected(items.tags.BatteryType)}
                                            >
                                                {items.tags.BatteryType}
                                            </button>
                                        ))
                                    }
                                </div>
                                :
                                null
                        }

                    </div>

                    
                    {subObj ? 
                    <div className="flex w-full flex-wrap mt-10">
                        <div className="text-black font-semibold text-md mb-2">Objects</div>
                        <div className="overflow-hidden border rounded-xl w-full">
                            <table className={`table-auto min-w-full text-left ${styles.table}`}>
                                <thead className="bg-black text-white rounded-xl h-10 text-sm font-light">
                                    {
                                        subObj && Object.keys(subObj).length != 0 ?
                                            Object.keys(subObj?.tags).map((item: any, i: any) => (
                                                <th>
                                                    {
                                                        item.split(/(?=[A-Z])/).join(" ").toUpperCase()
                                                    }
                                                </th>
                                            ))
                                            : null
                                    }
                                </thead>
                                <tbody>
                                    <tr>
                                        {
                                            subObj && Object.keys(subObj).length != 0 ?
                                                Object.values(subObj?.tags).map((item: any, i: any) => (

                                                    <td>
                                                        <Link
                                                            href="/dashboard/eopswatch/eopswatchmodel"
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
                    : null }

                </div>
            </div>

            <div className="w-[16%] pl-5">
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