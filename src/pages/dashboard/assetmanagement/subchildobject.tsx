import React, { useState, useRef, useEffect } from "react";
import Layout from "../../../components/Layout";
import NoDataFound from "../../../common/nodatafound";
import styles from '../../../styles/Common.module.css';
import { getChildAssetsData } from "../../../lib/getchildassets";
import { useRouter } from 'next/router'
import Link from "next/link";
import Image from "next/image";
import Template from "../template";
import axios from 'axios';
import { getObjectsData } from "../../../lib/getobjects";
import AlertMessage from "@/common/alertMessage";

export async function getServerSideProps() {
    const localData = await getObjectsData()
    return {
        props: {
            localData,
        },
    }
}

interface Item {
    dateCreated: string;
    dateModified: string;
    assetID: string;
    parentAssetID: string;
    parentAssetName: string;
    VIN: string;
    ModalType: number;
    Color: number;
    CapacityInCC: number;
    Cylinders: number;
}

export default function SubChildObject(localData: any) {
    const router = useRouter();
    const parentAsset = router.query;
    const [success, setSuccess] = useState(false);
    const assetid = useRef("");
    const assetname = useRef("");
    const assetkey = useRef("");
    const [subObj, setSubObj] = useState({} as any);
    const [subClassData, setSubClassData] = useState<any[]>([]);
    const [joinKey, setJoinKey] = useState([] as any);

    // Fetch the JSON data of sub Asset
    const fetchClassData = () => {
        axios.get("/api/getSubAssets").then((response) => {
            if (response.data) {
                const filtered = response.data.filter((item: any) => {
                    return item.parentAssetName === parentAsset.parentObject;
                });
                if (filtered && filtered.length > 0) {
                    setSubClassData(filtered);
                }

            }
        });
    };
    useEffect(() => {
        fetchClassData();
        if (fetchClassData.length) return;
    }, [parentAsset])


    const fetchData = () => {
        axios.get("/api/getChildObject").then((response) => {
            if (response.data) {

                const filtered = response.data.filter((item: any) => {
                    if (parentAsset.class === "Manufacturing Plants") {
                        return item.tags.ID === parentAsset.id
                    } else if (parentAsset.class === "Vehicles") {
                        return item.tags.SerialID === parentAsset.id || item.tags.SerialNo === parentAsset.id
                    } else {
                        return item.tags.VIN === parentAsset.id
                    }
                });
                if (filtered && filtered.length > 0) {
                    setSubObj(filtered[0]);
                }
            }
        });
    };
    useEffect(() => {
        fetchData();
        if (fetchData.length) return;
    }, [localData.localData])


    return (
        <>
            <div className="flex font-OpenSans">

                <div className="w-[100%]">
                    <div className="columns-2 flex justify-between items-center">
                        <p className="text-black text-lg mb-0 font-bold">Object Management</p>
                    </div>

                    <div className="border min-h-full rounded-xl mt-3 px-4 py-4 bg-gray-953">
                        <div className="flex justify-start items-start">
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
                                        <div className="flex items-center">
                                            <Image
                                                src="/img/arrow-right.svg"
                                                alt="arrow-right"
                                                className="h-6"
                                                height={24}
                                                width={24}
                                            />
                                            <Link
                                                href={{
                                                    pathname: '/dashboard/assetmanagement/objects',
                                                    query: {
                                                        assets: parentAsset.class
                                                    }
                                                }}
                                                className="inline-flex items-center text-sm font-medium text-black hover:text-yellow-950"
                                            >
                                                <span className="ml-1 text-sm font-medium text-black hover:text-yellow-950 md:ml-1">{parentAsset.class}</span>
                                            </Link>
                                        </div>
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
                                            <Link
                                                href={{
                                                    pathname: '/dashboard/assetmanagement/subobject',
                                                    query: {
                                                        object: parentAsset.object,
                                                        parentObject: parentAsset.class
                                                    }
                                                }}
                                                className="inline-flex items-center text-sm font-medium text-black hover:text-yellow-950"
                                            >
                                                <span>{parentAsset.class === 'Manufacturing Plants' ? "PlantID" : "VIN"}</span>
                                                <span className="ml-2">{parentAsset.object}</span>
                                            </Link>
                                        </div>
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
                                            <Link
                                                href={{
                                                    pathname: '/dashboard/assetmanagement/childobject',
                                                    query: {
                                                        class: parentAsset.class,
                                                        object: parentAsset.object,
                                                        subObject: parentAsset.subObject
                                                    }
                                                }}
                                                className="inline-flex items-center text-sm font-medium text-black hover:text-yellow-950"
                                            >

                                                <span className="ml-2">{parentAsset.subObject}</span>
                                            </Link>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="flex items-center text-black hover:text-yellow-950">
                                            <Image
                                                src="/img/arrow-right.svg"
                                                alt="arrow-right"
                                                className="h-6"
                                                height={24}
                                                width={24}
                                            />
                                            <span className="ml-1 text-sm font-medium md:ml-1">{parentAsset.class === 'Manufacturing Plants' ? "ID" : "SerialNo"}</span>
                                            <span className="ml-1 text-sm font-medium  md:ml-1">{parentAsset.id}</span>
                                        </div>
                                    </li>
                                </ol>
                            </nav>
                        </div>


                        {/* Show The data for Sub Object */}
                        <div className="h-96 flex justify-start items-start flex-wrap flex-col mt-8">
                            <div className="overflow-x-auto border rounded-xl w-full mb-10">
                                <table className={`table-auto min-w-full w-full text-left ${styles.table} ${styles.tableTab}`}>
                                    <thead className="bg-black text-white rounded-xl h-10 text-sm font-light">
                                        {
                                            subObj && Object.keys(subObj).length != 0 ?
                                                Object.keys(subObj?.tags).map((item: any, i: any) => (
                                                    <th className="capitalize" key={i}>
                                                        {
                                                            item.split(/(?=[A-Z])/).join(" ")
                                                        }
                                                    </th>
                                                ))
                                                : null
                                        }
                                    </thead>
                                    <tbody className="cursor-pointer">
                                        <tr className={`text-sm`}>
                                            {
                                                subObj && Object.keys(subObj).length != 0 ?
                                                    Object.values(subObj?.tags).map((item: any, i: any) => (

                                                        <td key={i}>
                                                            {item}
                                                        </td>

                                                    ))
                                                    : null
                                            }
                                        </tr>
                                    </tbody>
                                </table>
                            </div>


                            {/* Show The Sub Asset Tabs  */}
                            <div className="relative flex flex-wrap">
                                {
                                    subClassData && subClassData.length > 0 ?
                                        subClassData.map((item: any, index: any) => (
                                            <Link
                                                href={{
                                                    pathname: '/dashboard/assetmanagement/childobject',
                                                    query: {
                                                        class: `${parentAsset.parentObject}`,
                                                        object: `${parentAsset.object}`,
                                                        subObject: `${item.assetName}`
                                                    }
                                                }}
                                                className="bg-yellow-951 rounded-lg h-20 inline-flex justify-center items-center w-44 mr-8 hover:bg-black hover:text-white transition-all duration-[400ms] mb-8"
                                                key={index}
                                            >
                                                <span>{item.assetName}</span>
                                                <Image
                                                    className="ml-10"
                                                    height={28}
                                                    width={28}
                                                    alt="plus"
                                                    src="/img/plusblack.svg"
                                                />
                                            </Link>
                                        ))
                                        : null
                                }

                            </div>
                        </div>


                        {/* Links Box */}
                        <div className="mt-0 flex  w-full">
<<<<<<< HEAD
=======
                            <div>
                                <button
                                    className="small:mb-2 small:w-[48%] rounded-lg h-20 w-auto bg-black flex justify-center items-center px-2 py-2 mr-4 small:mr-0 flex-wrap flex-row"
                                >
                                    <Image
                                        src="/img/upload-cloud.svg"
                                        alt="eops watch"
                                        height={24}
                                        width={24}
                                        className="mb-1"
                                    />
                                    <span className="text-white text-[14px]">Upload Related Documents </span>
                                </button>
                            </div>
>>>>>>> b0579d24bbe05fbed9660d886b2fc1aeecd70b1d
                            <div className="flex flex-wrap flex-row w-full lg:justify-end small:justify-between sm:justify-between small:flex-wrap small:flex-row sm:flex-wrap sm:flex-row">
                                <Link
                                    href={{
                                        pathname: '/dashboard/eopswatch/eopswatchmodel',
                                        query: {
                                            objectID: parentAsset.class,
                                            key: parentAsset.id,
                                            id: parentAsset.object,
                                            subObject: parentAsset.subObject
                                        }
                                    }}
                                    className="small:mb-2 small:w-[48%] sm:w-[48%] rounded-lg h-20 lg:w-auto bg-red-951 flex justify-center items-center px-2 py-2 lg:mr-4 small:mr-0 sm:mr-0 flex-wrap flex-col small:mb-2-0 sm:mb-2-0 mb-2"
                                >
                                    <Image
                                        src="/img/clockwhite.svg"
                                        alt="eops watch"
                                        height={24}
                                        width={24}
                                        className="mb-2"
                                    />
                                    <span className="text-white text-[14px]">eOps Watch</span>
                                </Link>

                                <Link
                                    href={{
                                        pathname: '/dashboard/eopstrace/tracemodel',
                                        query: {
                                            objectID: parentAsset.class,
                                            key: parentAsset.id,
                                            id: parentAsset.object,
                                            subObject: parentAsset.subObject
                                        }
                                    }}
                                    className="small:mb-2 small:w-[48%] sm:w-[48%] rounded-lg h-20 lg:w-auto bg-green-952 flex justify-center items-center px-2 py-2 lg:mr-4 small:mr-0 sm:mr-0 flex-wrap flex-col small:mb-2-0 sm:mb-2-0"
                                >
                                    <Image
                                        src="/img/airplaywhite.svg"
                                        alt="eops watch"
                                        height={24}
                                        width={24}
                                        className="mb-2"
                                    />
                                    <span className="text-white text-[14px]">eOps Trace</span>
                                </Link>

                                <div className="small:mb-2 small:w-[48%] sm:w-[48%] small:mb-2 rounded-lg h-20 lg:w-auto bg-blue-953 flex justify-center items-center px-2 py-2 flex-wrap flex-col lg:mr-4 small:mr-0 sm:mr-0">
                                    <Image
                                        src="/img/maximizewhite.svg"
                                        alt="eops Prosense"
                                        height={24}
                                        width={24}
                                        className="mb-2"
                                    />
                                    <span className="text-white text-[14px]">eOps Prosense</span>
                                </div>

                                <div className="small:mb-2 small:w-[48%] sm:w-[48%] rounded-lg h-20 lg:w-auto bg-brown-951 flex justify-center items-center px-2 py-2 flex-wrap flex-col small:mr-0 sm:mr-0">
                                    <Image
                                        src="/img/bar-chart-white.svg"
                                        alt="eops Prosense"
                                        height={24}
                                        width={24}
                                        className="mb-2"
                                    />
                                    <span className="text-white text-[14px]">eOps Insight/Reports</span>
                                </div>

                            </div>
                        </div>
                        {/* Links Box Ends */}


                    </div>
                </div>

                <div className="w-[16%] pl-5 hidden">
                    <Template />
                </div>


            </div>
        </>
    )
}

SubChildObject.getLayout = function getLayout(page: any) {
    return (
        <Layout>{page}</Layout>
    )
}