<<<<<<< HEAD
import React, { useState, useRef, useEffect } from "react";
import Layout from "../../../components/Layout";
import Template from "../template";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from 'next/router'

export default function EopsTraceAlert() {
    const router = useRouter();
    const parentAsset = router.query;
    console.log("parentAsset", parentAsset)
    return (
        <div className="flex font-OpenSans">

            <div className="w-[100%]">
                <div className="columns-2 flex justify-between items-center">
                    <p className="text-black text-lg mb-0 font-semibold">Alerts</p>
                </div>

                <div className="border min-h-full rounded-xl mt-3 px-4 py-4">
                    <div className="flex justify-start items-start">

                        <nav className="flex" aria-label="Breadcrumb">
                            <ol className="inline-flex items-center space-x-1 md:space-x-1">
                                <li className="inline-flex items-center">
=======
import React, { useState, useEffect } from "react";
import Layout from "../../../components/Layout";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from 'next/router'
import axios from 'axios';
import AlertTable from "./alerttable";

export default function EopsTraceAlert() {

    const router = useRouter();
    const parentAsset = router.query;
    const [data, setData] = useState([] as any);
    const [sortIcon, setSortIcon] = useState(false)

    // Fetch the JSON data of sub Asset
    const fetchClassData = () => {
        axios.get("/api/getAlerts").then((response) => {
            if (response.data) {
                let filterData = response.data.filter((item: any) => {
                    return item.model === parentAsset.model
                })
                setData(filterData);
            }
        });
    };
    useEffect(() => {
        fetchClassData();
        if (fetchClassData.length) return;
    }, [])

    // Sort Data
    const sortData = () => {
        setSortIcon(!sortIcon);
        let newArr = sortIcon === false ? data.sort((a: any, b: any) => a.alertName.localeCompare(b.alertName)) : data.sort((a: any, b: any) => b.alertName.localeCompare(a.alertName))
        setData(newArr);
    }

    return (
        <div className="flex font-OpenSans">

            <div className="w-full">
                <div className="columns-2 flex justify-between items-center">
                    <p className="text-black text-lg mb-0 font-semibold">eOps Trace</p>
                </div>

                <div className="border border-gray-957 bg-gray-953 min-h-full rounded-xl mt-3 px-4 py-4">
                    <div className="flex justify-between items-center">
                        {/* Breadcrumb */}
                        <nav className="flex" aria-label="Breadcrumb">
                            <ol className="inline-flex items-center space-x-1 md:space-x-1">
                                <li className="inline-flex items-center">
                                    <Link href="/dashboard/assetmanagement"
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
                                <li>
                                    <Link
                                        href={{
                                            pathname: "/dashboard/assetmanagement/subchildobject",
                                            query: {
                                                class: parentAsset.objectID,
                                                object: parentAsset.id,
                                                id: parentAsset.key,
                                                subObject: parentAsset.subObject,
                                            }
                                        }}
                                        className="flex items-center">
                                        <Image
                                            src="/img/arrow-right.svg"
                                            alt="arrow-right"
                                            className="h-6"
                                            height={24}
                                            width={24}
                                        />
                                        <span className="ml-1 text-sm font-medium text-black hover:text-yellow-950 md:ml-1">{parentAsset.key}</span>
                                    </Link>
                                </li>
                                <li>
>>>>>>> b0579d24bbe05fbed9660d886b2fc1aeecd70b1d
                                    <Link
                                        href={{
                                            pathname: "/dashboard/eopstrace/tracemodel",
                                            query: {
                                                objectID: parentAsset.objectID,
                                                key: parentAsset.key,
                                                id: parentAsset.id,
                                                subObject: parentAsset.subObject,
                                            }
                                        }}
<<<<<<< HEAD

                                        className="inline-flex items-center text-sm font-medium text-black hover:text-yellow-950">
                                        <Image
                                            src="/img/arrow-left.svg"
                                            alt="home"
=======
                                        className="flex items-center"
                                    >
                                        <Image
                                            src="/img/arrow-right.svg"
                                            alt="arrow-right"
>>>>>>> b0579d24bbe05fbed9660d886b2fc1aeecd70b1d
                                            className="h-6"
                                            height={24}
                                            width={24}
                                        />
<<<<<<< HEAD
                                        <span className="text-black ml-2">Back</span>
                                    </Link>
                                </li>
                            </ol>
                        </nav>
                    </div>

                    <div className="flex items-end justify-end mt-[-32px]">
                        <button
                            className="flex justify-center items-center text-black bg-yellow-951 rounded rounded-xl h-12 px-4 transition-opacity duration-300"
                        >
                            <Image
                                src="/img/settings.svg"
                                alt="activity"
                                height={19}
                                width={19}
                                className="mr-2"
                            />
                            <span>Configure Alerts</span>
                        </button>

                    </div>

                    {/* Content Goes Here */}
                    {/* <div className="flex h-96 w-full justify-center items-center">
                        <p className="text-gray-951 font-semibold text-5xl">This page is under progress</p>
                    </div>  */}
                    {
                        parentAsset.model === "Battery Life Prediction" ?

                            <div className="flex flex-wrap mt-5">
                                <Image
                                    src="/img/alerts/Alerts1.png"
                                    alt="Alert 1"
                                    height={186}
                                    width={740}
                                    className="w-full h-full"
                                />
                                <Image
                                    src="/img/alerts/Alerts2.png"
                                    alt="Alert 1"
                                    height={186}
                                    width={740}
                                    className="w-full h-full"
                                />
                                <Image
                                    src="/img/alerts/Alerts3.png"
                                    alt="Alert 1"
                                    height={186}
                                    width={740}
                                    className="w-full h-full"
                                />
                                <Image
                                    src="/img/alerts/Alerts4.png"
                                    alt="Alert 1"
                                    height={186}
                                    width={740}
                                    className="w-full h-full"
                                />
                            </div>
                            :
                            <div className="flex h-96 w-full justify-center items-center">
                                <p className="text-gray-951 font-semibold text-5xl">No alert configured!</p>
                            </div>
                    }

                </div>
            </div>

            <div className="w-[16%] pl-5 hidden">
                <Template />
=======
                                        <span className="ml-1 text-sm font-medium text-black hover:text-yellow-950 md:ml-1">{parentAsset.model}</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href={{
                                            pathname: "/dashboard/eopstrace/productionmodel",
                                            query: {
                                                objectID: parentAsset.objectID,
                                                key: parentAsset.key,
                                                id: parentAsset.id,
                                                subObject: parentAsset.subObject,
                                                model: parentAsset.model,
                                            }
                                        }}
                                        className="flex items-center"
                                    >
                                        <Image
                                            src="/img/arrow-right.svg"
                                            alt="arrow-right"
                                            className="h-6"
                                            height={24}
                                            width={24}
                                        />
                                        <span className="ml-1 text-sm font-medium text-black hover:text-yellow-950 md:ml-1">Production</span>
                                    </Link>
                                </li>
                                <li>
                                    <div className="flex items-center">
                                        <Image
                                            src="/img/arrow-right.svg"
                                            alt="arrow-right"
                                            className="h-6"
                                            height={24}
                                            width={24}
                                        />
                                        <span className="ml-1 text-sm font-medium text-black md:ml-1">Alerts</span>
                                    </div>
                                </li>
                            </ol>
                        </nav>

                        {/* Buttons */}
                        <div className="relative flex">
                            <Link
                                href={{
                                    pathname: "/dashboard/eopstrace/raisedalerts",
                                    query: {
                                        objectID: parentAsset.objectID,
                                        key: parentAsset.key,
                                        id: parentAsset.id,
                                        subObject: parentAsset.subObject,
                                        model: parentAsset.model,
                                    }
                                }}
                                className="flex justify-center items-center text-black bg-yellow-951 rounded rounded-xl h-12 px-4 transition-opacity duration-300 mr-5 outline-none transform active:scale-75 transition-transform"
                            >
                                <Image
                                    src="/img/announcement.svg"
                                    alt="activity"
                                    height={24}
                                    width={24}
                                    className="mr-2"
                                />
                                <span>Raised Alerts</span>
                            </Link>
                            <Link
                                className="flex justify-center items-center text-black bg-yellow-951 rounded rounded-xl h-12 px-4 transition-opacity duration-300 outline-none transform active:scale-75 transition-transform"
                                href={{
                                    pathname: "/dashboard/eopstrace/addalerts",
                                    query: {
                                        objectID: parentAsset.objectID,
                                        key: parentAsset.key,
                                        id: parentAsset.id,
                                        subObject: parentAsset.subObject,
                                        model: parentAsset.model,
                                    }
                                }}
                            >
                                <Image
                                    src="/img/plus-black.svg"
                                    alt="activity"
                                    height={24}
                                    width={24}
                                    className="mr-2"
                                />
                                <span>Add Alerts</span>
                            </Link>
                        </div>
                    </div>

                    <div className="relative mt-10 rounded overflow-hidden">
                        <div className="overflow-hidden w-full">
                            {/* Alert Table Component */}
                            <AlertTable
                                model={parentAsset.model}
                                objectID={parentAsset.objectID}
                                keys={parentAsset.key}
                                id={parentAsset.id}
                                subObject={parentAsset.subObject}
                            />

                        </div>


                    </div>
                </div>

>>>>>>> b0579d24bbe05fbed9660d886b2fc1aeecd70b1d
            </div>

        </div>
    )
}

EopsTraceAlert.getLayout = function getLayout(page: any) {
    return (
        <Layout>{page}</Layout>
    )
}