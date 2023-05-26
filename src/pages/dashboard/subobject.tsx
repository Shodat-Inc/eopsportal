import React, { useState, useRef, useEffect } from "react";
import Layout from "../../components/Layout";
import NoDataFound from "../../common/nodatafound";
import styles from '../../styles/Common.module.css';
import { getChildAssetsData } from "../../lib/getchildassets";
import { useRouter } from 'next/router'
import Link from "next/link";
import Image from "next/image";
import Template from "./template";
import axios from 'axios';
import { getObjectsData } from "../../lib/getobjects";
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

export default function SubObject(localData: any) {
    const router = useRouter();
    const parentAsset = router.query;
    const [showModal, setShowModal] = useState(false);
    const [success, setSuccess] = useState(false);
    const assetid = useRef("");
    const assetname = useRef("");
    const assetkey = useRef("");
    const [data, setData] = useState([] as any[]);
    const [subClassData, setSubClassData] = useState<any[]>([]);

    // Get JSON data on page load
    const fetchData = () => {
        axios.get("/api/getObjects").then((response) => {
            if (response.data) {
                const filtered = response.data.filter((item: any) => {
                    return item.subObjects.VIN === parentAsset.object;
                });
                if (filtered && filtered.length > 0) {
                    setData(filtered);
                }
            }
        });
    };
    useEffect(() => {
        fetchData();
        if (fetchData.length) return;
    }, [localData.localData])

    // Get JSON data on page load
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


    return (
        <>
            <div className="flex font-OpenSans">

                <div className="w-[84%]">
                    <div className="columns-2 flex justify-between items-center">
                        <p className="text-black text-lg mb-0 font-bold">Asset Management</p>                        
                    </div>

                    <div className="border min-h-full-1 rounded-md mt-3 px-4 py-4">
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
                                            <Image
                                                src="/img/arrow-right.svg"
                                                alt="arrow-right"
                                                className="h-6"
                                                height={24}
                                                width={24}
                                            />
                                        </Link>
                                    </li>
                                    <li>
                                        <div className="flex items-center">
                                            <Link
                                                href={{
                                                    pathname: '/dashboard/objects',
                                                    query: {
                                                        assets: parentAsset.parentObject
                                                    }
                                                }}
                                                className="inline-flex items-center text-sm font-medium text-black hover:text-yellow-950"
                                            >
                                                <span className="ml-1 text-sm font-medium text-black hover:text-yellow-950 md:ml-1">Cars</span>
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
                                            <span className="ml-1 text-sm font-medium text-black hover:text-yellow-950 md:ml-1">VIN {parentAsset.object}</span>
                                        </div>
                                    </li>
                                </ol>
                            </nav>
                        </div>

                        {/* --- Alerts Start--- */}
                        {success ? <AlertMessage /> : null}
                        {/* --- Alerts End--- */}


                        {/* Child Asset Form Fields */}
                        {/* <div className="mt-8 hidden">
                            <form
                                className="flex w-full flex-wrap flex-col justify-between items-center"
                            >
                                <div className="flex w-full mb-5">
                                    <div className="w-[50%] pr-16">
                                        <input
                                            type="text"
                                            name="Mfg Date"
                                            placeholder="Mfg Date"
                                            className="block w-full border border-gray-951 rounded-md h-14 pl-4 pr-2"
                                        />
                                    </div>
                                    <div className="w-[50%] pl-16">
                                        <input
                                            type="text"
                                            name="vin"
                                            placeholder="VIN"
                                            className="block w-full border border-gray-951 rounded-md h-14 pl-4 pr-2"
                                        />
                                    </div>
                                </div>
                                <div className="flex w-full mb-5">
                                    <div className="w-[50%] pr-16">
                                        <input
                                            type="text"
                                            name="Color"
                                            placeholder="Color"
                                            className="block w-full border border-gray-951 rounded-md h-14 pl-4 pr-2"
                                        />
                                    </div>
                                    <div className="w-[50%] pl-16">
                                        <input
                                            type="text"
                                            name="Piston"
                                            placeholder="Piston"
                                            className="block w-full border border-gray-951 rounded-md h-14 pl-4 pr-2"
                                        />
                                    </div>
                                </div>
                            </form>
                        </div> */}


                        <div className="h-96 flex justify-start items-start flex-wrap flex-col mt-8">
                            <div className="overflow-hidden border rounded-xl w-full mb-10">
                                <table className={`table-auto min-w-full text-left ${styles.table}`}>
                                    <thead className="bg-black text-white rounded-xl h-10 text-sm font-light">
                                        <tr>
                                            <th>VIN</th>
                                            <th>Model Type</th>
                                            <th>Color</th>
                                            <th>Mfd Date</th>
                                            <th>Capacity In CC</th>
                                            <th>Cylinders/Valves</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>{data[0]?.subObjects.VIN}</td>
                                            <td>{data[0]?.subObjects.ModalType}</td>
                                            <td>{data[0]?.subObjects.Color}</td>
                                            <td>{data[0]?.subObjects.MfdDate}</td>
                                            <td>{data[0]?.subObjects.CapacityInCC}</td>
                                            <td>{data[0]?.subObjects.Cylinders}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            <div className="relative flex flex-wrap">
                                {
                                    subClassData && subClassData.length > 0 ?
                                        subClassData.map((item: any, index: any) => (
                                            <Link
                                                href={{
                                                    pathname: '/dashboard/childobject',
                                                    query: {
                                                        class: `${parentAsset.parentObject}`,
                                                        object: `${parentAsset.object}`,
                                                        subObject: `${item.assetName}`
                                                    }
                                                }}
                                                className="bg-yellow-951 rounded-lg h-20 inline-flex justify-center items-center w-44 mr-8 hover:bg-black hover:text-white transition-all duration-[400ms] mb-8"
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

                        {data.length > 0 ?
                            <div className="h-96 flex justify-start items-start flex-wrap flex-col mt-8 hidden">
                                <div className="overflow-hidden border rounded-md w-full">
                                    <table className={`table-auto min-w-full text-left ${styles.table}`}>
                                        <thead className="bg-gray-950 rounded-lg h-10 text-sm font-light">
                                            <tr>
                                                <th>S.No</th>
                                                <th>Asset ID</th>
                                                <th>Child Asset Name</th>
                                                <th>Tags/Key</th>
                                                <th>Geoscope</th>
                                                <th>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {data.map((item: any, index: any) => (
                                                <tr className="hover:bg-yellow-950" key={index}>
                                                    <td className="w-[50px]">{index + 1}</td>
                                                    <td className="w-[150px]">
                                                        <Link
                                                            href={{
                                                                pathname: '/dashboard/subasset',
                                                                query: {
                                                                    subassets: item.assetName
                                                                }
                                                            }}
                                                        >
                                                            {item.assetID}
                                                        </Link>
                                                    </td>
                                                    <td className="w-[180px]">
                                                        <Link
                                                            href={{
                                                                pathname: '/dashboard/childasset',
                                                                query: {
                                                                    asset: parentAsset.assets,
                                                                    subassets: item.assetName
                                                                }
                                                            }}
                                                        >
                                                            <span className="font-medium">{item.assetName}</span>
                                                        </Link>
                                                    </td>
                                                    <td className="flex items-center justify-start flex-wrap w-[200px]">
                                                        {
                                                            Array.isArray(item.tagsKeys) && item.tagsKeys.length > 0 ? item.tagsKeys.map((items: any, index: any) => (
                                                                <span
                                                                    key={index}
                                                                    className="bg-gray-951 rounded-md py-0 px-2 text-[12px] h-[22px] inline-flex items-center justify-center mr-1 mb-1">
                                                                    {items}
                                                                </span>
                                                            ))
                                                                : item.tagsKeys
                                                        }

                                                    </td>
                                                    <td><span className="block w-[100px] whitespace-nowrap overflow-hidden text-ellipsis">{item.geoScopeLink}</span></td>
                                                    <td>
                                                        <button className="mr-8">
                                                            <Image
                                                                src="/img/edit.svg"
                                                                alt="Edit"
                                                                height={18}
                                                                width={18}
                                                            />
                                                        </button>
                                                        <button>
                                                            <Image
                                                                src="/img/trash.svg"
                                                                alt="Trash"
                                                                height={18}
                                                                width={18}
                                                            />
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            :
                            <div className="h-72 flex justify-center items-center flex-wrap flex-col mt-8">
                                <NoDataFound createText="Create Sub Asset" />
                            </div>
                        }


                        {/* Links Box */}
                        <div className="mt-0 flex  w-full">
                            <div className="flex flex-wrap flex-row w-full justify-end">
                                <div className="rounded-lg h-20 w-auto bg-red-951 flex justify-center items-center px-2 py-2 mr-4 flex-wrap flex-col">
                                    <Image
                                        src="/img/clockwhite.svg"
                                        alt="eops watch"
                                        height={24}
                                        width={24}
                                        className="mb-4"
                                    />
                                    <span className="text-white font-12">eOps Watch</span>
                                </div>

                                <div className="rounded-lg h-20 w-auto bg-green-952 flex justify-center items-center px-2 py-2 flex-wrap flex-col mr-4">
                                    <Image
                                        src="/img/airplaywhite.svg"
                                        alt="eops watch"
                                        height={24}
                                        width={24}
                                        className="mb-4"
                                    />
                                    <span className="text-white font-12">eOps Trace</span>
                                </div>

                                <div className="rounded-lg h-20 w-auto bg-blue-953 flex justify-center items-center px-2 py-2 flex-wrap flex-col mr-4">
                                    <Image
                                        src="/img/maximizewhite.svg"
                                        alt="eops Prosense"
                                        height={24}
                                        width={24}
                                        className="mb-4"
                                    />
                                    <span className="text-white font-12">eOps Trace</span>
                                </div>

                                <div className="rounded-lg h-20 w-auto bg-brown-951 flex justify-center items-center px-2 py-2 flex-wrap flex-col">
                                    <Image
                                        src="/img/bar-chart-white.svg"
                                        alt="eops Prosense"
                                        height={24}
                                        width={24}
                                        className="mb-4"
                                    />
                                    <span className="text-white font-12">eOps Insight/Reports</span>
                                </div>

                            </div>
                        </div>
                        {/* Links Box Ends */}


                    </div>
                </div>

                <div className="w-[16%] pl-5">
                    <Template />
                </div>


            </div>
        </>
    )
}

SubObject.getLayout = function getLayout(page: any) {
    return (
        <Layout>{page}</Layout>
    )
}