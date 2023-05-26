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
import AlertMessage from "@/common/alertMessage";

export async function getServerSideProps() {
    const localData = await getChildAssetsData()
    return {
        props: {
            localData,
        },
    }
}

export default function ChildAsset(localData: any) {
    const router = useRouter();
    const parentAsset = router.query;
    const [showModal, setShowModal] = useState(false);
    const [success, setSuccess] = useState(false);
    const filtered = localData.localData.filter((item: any) => {
        return item.parentAssetName === parentAsset.assets;
    });
    const [filteredList, setFilteredList] = useState(filtered);
    const assetid = useRef("");
    const assetname = useRef("");
    const assetkey = useRef("");
    const [data, setData] = useState([]);

    // Get JSON data on page load
    const fetchData = () => {
        axios.get("/api/getChildAssets").then((response) => {
            if (response.data) {
                setData(response.data);
            }
        });
    };

    useEffect(() => {
        fetchData();
        if (fetchData.length) return;
    }, [localData.localData])

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        var formData = new FormData(e.target);
        const form_values = Object.fromEntries(formData);
        console.log("form_values", form_values)
        const response = await fetch('/api/createSubAssets', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                {
                    assetID: `${form_values.assetid}`,
                    assetName: `${form_values.assetname}`,
                    slug: `${form_values.assetname}`,
                    parentAssetID: `${form_values.assetname}`,
                    parentAssetName: `${form_values.assetname}`,
                    tagsKeys: `${form_values.assetkey}`,
                    dateCreated: new Date().toLocaleString() + "",
                    dateModified: new Date().toLocaleString() + "",
                    geoScopeLink: "http://localhost:3000/dashboard/subasset?assets=Car"
                }
            )
        });
        const resdata = await response.json();
        if (resdata) {
            // console.log("SUCCESS")
            router.replace(router.asPath);
            setShowModal(false);
            setSuccess(true);
            setTimeout(() => {
                setSuccess(false);
            }, 5000);
        } else {
            console.log("FAILED")
        }
    }

    return (
        <>
            <div className="flex font-OpenSans">

                <div className="w-[84%]">
                    <div className="columns-2 flex justify-between items-center">
                        <p className="text-black text-lg mb-0 font-semibold">Sub Class Management</p>
                        <div className="flex justify-end items-right">
                            <button
                                className="rounded-lg bg-black text-white flex h-10 justify-center items-center pl-2 pr-2 hover:bg-yellow-950 hover:text-white transition-all duration-[400ms] mr-3"
                                onClick={() => setShowModal(true)}
                            >
                                <Image
                                    src="/img/plus.svg"
                                    alt="Create New Asset"
                                    className="mr-2"
                                    height={24}
                                    width={24}
                                />
                                Create Sub Class
                            </button>
                            {/* <button
                                className="rounded-lg bg-black text-white flex h-10 justify-center items-center pl-2 pr-2 hover:bg-yellow-950 hover:text-white transition-all duration-[400ms]"
                            >
                                <Image
                                    src="/img/download.svg"
                                    alt="Import Assets"
                                    className="mr-2"
                                    height={24}
                                    width={24}
                                />
                                Import Sub Class
                            </button> */}
                        </div>
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
                                                    pathname: '/dashboard/subasset',
                                                    query: {
                                                        assets: parentAsset.asset
                                                    }
                                                }}
                                                className="inline-flex items-center text-sm font-medium text-black hover:text-yellow-950"
                                            >
                                                <span className="ml-1 text-sm font-medium text-black hover:text-yellow-950 md:ml-1">{parentAsset.asset}</span>
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
                                            <span className="ml-1 text-sm font-medium text-black hover:text-yellow-950 md:ml-1">{parentAsset.subassets}</span>
                                        </div>
                                    </li>
                                </ol>
                            </nav>
                        </div>

                        {/* --- Alerts Start--- */}
                        {success ? <AlertMessage /> : null}
                        {/* --- Alerts End--- */}


                        {/* Child Asset Form Fields */}
                        <div className="mt-8">
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
                        </div>



                        {data.length > 0 ?
                            <div className="h-96 flex justify-start items-start flex-wrap flex-col mt-8">
                                <div className="overflow-hidden border rounded-md w-full">
                                    <table className={`table-auto min-w-full text-left ${styles.table}`}>
                                        <thead className="bg-gray-950 rounded-lg h-10 text-sm font-light">
                                            <tr>
                                                <th>S.No</th>
                                                {/* <th>Asset ID</th> */}
                                                <th>Child Class Name</th>
                                                <th>Tags/Key</th>
                                                <th>Geoscope</th>
                                                <th>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {data.map((item: any, index: any) => (
                                                <tr className="hover:bg-yellow-950" key={index}>
                                                    <td className="w-[50px]">{index + 1}</td>
                                                    {/* <td className="w-[150px]">
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
                                                    </td> */}
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
                                <div className="rounded-lg h-24 w-36 bg-red-951 flex justify-center items-center px-2 py-2 mr-4 flex-wrap flex-col">
                                    <Image
                                        src="/img/clockwhite.svg"
                                        alt="eops watch"
                                        height={24}
                                        width={24}
                                        className="mb-4"
                                    />
                                    <span className="text-white font-12">eOps Watch</span>
                                </div>

                                <div className="rounded-lg h-24 w-32 bg-green-952 flex justify-center items-center px-2 py-2 flex-wrap flex-col mr-4">
                                    <Image
                                        src="/img/airplaywhite.svg"
                                        alt="eops watch"
                                        height={24}
                                        width={24}
                                        className="mb-4"
                                    />
                                    <span className="text-white font-12">eOps Trace</span>
                                </div>

                                <div className="rounded-lg h-24 w-32 bg-blue-953 flex justify-center items-center px-2 py-2 flex-wrap flex-col mr-4">
                                    <Image
                                        src="/img/maximizewhite.svg"
                                        alt="eops Prosense"
                                        height={24}
                                        width={24}
                                        className="mb-4"
                                    />
                                    <span className="text-white font-12">eOps Trace</span>
                                </div>

                                <div className="rounded-lg h-24 w-44 bg-brown-951 flex justify-center items-center px-2 py-2 flex-wrap flex-col">
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


                {/* --- Modal Start --- */}
                {showModal ? (
                    <>
                        <div
                            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                        >
                            <div className="relative w-auto my-6 w-[677px]">

                                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                    {/*header*/}
                                    <div className="flex items-start justify-between p-5">
                                        <h3 className="text-lg font-medium">
                                            Add Sub Class
                                        </h3>
                                        <button
                                            className="p-1 ml-auto bg-transparent border-0 text-black float-right leading-none font-semibold outline-none focus:outline-none"
                                            onClick={() => setShowModal(false)}
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
                                    <div className="relative p-6 flex-auto">
                                        <form className="flex justify-start items-center flex-wrap flex-col" method='post' onSubmit={handleSubmit}>
                                            <div className="mb-5 relative column-2 flex justify-start items-center">
                                                <div className="w-[160px]">
                                                    <label className="font-semibold text-black">Sub Class ID</label>
                                                </div>
                                                <div className="w-3/4">
                                                    <input
                                                        type="text"
                                                        name="assetid"
                                                        placeholder="Enter asset ID"
                                                        className="rounded-lg border border-black h-[44px] pl-5 pr-5 w-[320px]"
                                                        onChange={(e) => (assetid.current = e.target.value)}
                                                    />
                                                    <div className="relative mt-2 flex w-full">
                                                        <input
                                                            type="checkbox"
                                                            className="checked:bg-black indeterminate:bg-gray-300"
                                                            name="autogenerateid"
                                                        />
                                                        <label
                                                            className="ml-2 text-gray-951 block flex justify-start items-center">
                                                            Auto generate ID
                                                            <button
                                                                data-tooltip-target="tooltip-animation" type="button"
                                                            >
                                                                <Image
                                                                    src="/img/info.svg"
                                                                    alt="info"
                                                                    className="ml-2 h-4"
                                                                    height={18}
                                                                    width={18}
                                                                />
                                                            </button>
                                                            <div id="tooltip-animation" role="tooltip" className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
                                                                Tooltip content
                                                                <div className="tooltip-arrow" data-popper-arrow></div>
                                                            </div>

                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="mb-10 relative column-2 flex justify-start items-center">
                                                <div className="w-[160px]">
                                                    <label className="font-semibold text-black">Sub Class Name</label>
                                                </div>
                                                <div className="w-3/4">
                                                    <input
                                                        type="text"
                                                        name="assetname"
                                                        placeholder="Enter class Name"
                                                        className="rounded-lg border border-black h-[44px] pl-5 pr-5 w-[320px]"
                                                        onChange={(e) => (assetname.current = e.target.value)}
                                                    />
                                                </div>
                                            </div>
                                            <div className="mb-10 relative column-2 flex justify-start items-center">
                                                <div className="w-[160px]">
                                                    <label className="font-semibold text-black">Add Tags/Key</label>
                                                </div>
                                                <div className="w-3/4">
                                                    <input
                                                        type="text"
                                                        name="assetkey"
                                                        placeholder="Enter tags/key"
                                                        className="rounded-lg border border-black h-[44px] pl-5 pr-5 w-[320px]"
                                                        onChange={(e) => (assetkey.current = e.target.value)}
                                                    />
                                                </div>
                                            </div>
                                            <div className="mb-5 relative flex justify-end items-center w-full pr-12">
                                                <button
                                                    className="border border-black rounded-lg bg-black text-white font-lg w-20 h-12 mr-5"
                                                >
                                                    Save
                                                </button>
                                                <button
                                                    className="border border-black rounded-lg bg-white text-black font-lg w-24 h-12"
                                                    onClick={() => setShowModal(false)}
                                                >
                                                    Cancel
                                                </button>
                                            </div>
                                        </form>
                                    </div>

                                </div>
                            </div>
                        </div>
                        <div className="opacity-75 fixed inset-0 z-40 bg-black"></div>
                    </>
                ) : null}
                {/* --- Modal Ends --- */}


            </div>
        </>
    )
}

ChildAsset.getLayout = function getLayout(page: any) {
    return (
        <Layout>{page}</Layout>
    )
}