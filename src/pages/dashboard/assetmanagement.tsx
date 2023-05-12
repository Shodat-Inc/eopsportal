import React, { useState, useRef, useEffect } from "react";
import Layout from "../../components/Layout";
import NoDataFound from "../../common/nodatafound";
import styles from '../../styles/Common.module.css';
import { getAssetsData } from "../../lib/getassets";
import { useRouter } from 'next/router'
import Link from "next/link";
import Image from "next/image";
import Template from "./template";
import axios from 'axios';

export async function getServerSideProps() {
    const localData = await getAssetsData()
    return {
        props: {
            localData,
        },
    }
}

export default function AssetManagement(localData: any) {
    const [showModal, setShowModal] = useState(false);
    const [success, setSuccess] = useState(false);
    const assetid = useRef("");
    const assetname = useRef("");
    const assetkey = useRef("");
    const [data, setData] = useState([]);
    const router = useRouter();

    // Get JSON data on page load
    const fetchData = () => {
        axios.get("/api/getAssets").then((response) => {
            console.log("HERE", response.data);
              if (response.data) {
                setData(response.data);
              }
        });
    };

    useEffect(() => {
        fetchData();
        if (fetchData.length) return;
        // refreshData();
        // fetch('/api/getAssets')
        //     .then((res) => res.json())
        //     .then((data) => {
        //         setData(data);
        //     });
    }, [localData.localData])


    // Store Data into JSON File
    const handleSubmit = async (e: any) => {
        e.preventDefault();
        var formData = new FormData(e.target);
        const form_values = Object.fromEntries(formData);
        const response = await fetch('/api/assets', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                {
                    assetID: `${form_values.assetid}`,
                    assetName: `${form_values.assetname}`,
                    slug: `${form_values.assetname}`,
                    assetkey: `${form_values.assetkey}`,
                    dateCreated: new Date().toLocaleString() + "",
                    dateModified: new Date().toLocaleString() + "",
                }
            )
        });
        const resdata = await response.json();
        if (resdata) {
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

    // Delete Asset
    const deleteAsset = (assetID: any) => {
        console.log("Delete ID", assetID)
    }

    return (
        <>
            <div className="flex">

                <div className="w-[84%]">
                    <div className="columns-2 flex justify-between items-center">
                        <p className="text-gray-700 text-lg mb-0 font-bold">Asset Management</p>
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
                                Create New Asset
                            </button>
                            <button
                                className="rounded-lg bg-black text-white flex h-10 justify-center items-center pl-2 pr-2 hover:bg-yellow-950 hover:text-white transition-all duration-[400ms]"
                            >
                                <Image
                                    src="/img/download.svg"
                                    alt="Import Assets"
                                    className="mr-2"
                                    height={24}
                                    width={24}
                                />
                                Import Assets
                            </button>
                        </div>
                    </div>

                    <div className="border min-h-full rounded-md mt-3 px-4 py-4">
                        <div className="flex justify-start items-start">
                            <nav className="flex" aria-label="Breadcrumb">
                                <ol className="inline-flex items-center space-x-1 md:space-x-1">
                                    <li className="inline-flex items-center">
                                        <a href="#" className="inline-flex items-center text-sm font-medium text-black hover:text-yellow-950">
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
                                        </a>
                                    </li>
                                </ol>
                            </nav>
                        </div>

                        {/* --- Alerts Start--- */}
                        {success ?
                            <div id="alert-3" className="flex p-4 mb-4 text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400 mt-4" role="alert">
                                <svg aria-hidden="true" className="flex-shrink-0 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"></path></svg>
                                <span className="sr-only">Info</span>
                                <div className="ml-3 text-sm font-medium">
                                    Your Data is been saved successfully! Cheers!!
                                </div>
                                <button type="button" className="ml-auto -mx-1.5 -my-1.5 bg-green-50 text-green-500 rounded-lg focus:ring-2 focus:ring-green-400 p-1.5 hover:bg-green-200 inline-flex h-8 w-8 dark:bg-gray-800 dark:text-green-400 dark:hover:bg-gray-700" data-dismiss-target="#alert-3" aria-label="Close">
                                    <span className="sr-only">Close</span>
                                    <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                                </button>
                            </div>
                            : null
                        }
                        {/* --- Alerts End--- */}


                        {data.length > 0 ?
                            <div className="h-96 flex justify-start items-start flex-wrap flex-col mt-8">
                                <div className="overflow-hidden border rounded-md w-full">
                                    <table className={`table-auto min-w-full text-left ${styles.table}`}>
                                        <thead className="bg-gray-950 rounded-lg h-10 text-sm font-light">
                                            <tr>
                                                <th>S.No</th>
                                                <th>Asset ID</th>
                                                <th>Asset Name</th>
                                                <th>Asset Tags/Key</th>
                                                <th>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {data.map((item: any, index: any) => (
                                                <tr className="hover:bg-yellow-950" key={index}>
                                                    <td>{index + 1}</td>
                                                    <td>
                                                        <Link
                                                            href={{
                                                                pathname: '/dashboard/subasset',
                                                                query: {
                                                                    assets: item.assetName
                                                                }
                                                            }}
                                                        >
                                                            {item.assetID}
                                                        </Link>
                                                    </td>
                                                    <td>
                                                        <Link
                                                            href={{
                                                                pathname: '/dashboard/subasset',
                                                                query: {
                                                                    assets: item.assetName
                                                                }
                                                            }}
                                                        >
                                                            {item.assetName}
                                                        </Link>
                                                    </td>
                                                    <td><span className="bg-gray-951 rounded-md py-1 px-2 inline-flex items-center justify-center mr-1 mb-1">{item.assetkey}</span></td>
                                                    <td>
                                                        <button className="mr-8">
                                                            <Image
                                                                src="/img/edit.svg"
                                                                alt="Edit"
                                                                height={18}
                                                                width={18}
                                                            />
                                                        </button>
                                                        <button onClick={() => deleteAsset(item.assetID)}>
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
                                <NoDataFound createText="Create Asset" />
                            </div>
                        }

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
                                            Add New Asset
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
                                                    <label className="font-semibold text-black">Asset ID</label>
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
                                                                    height={16}
                                                                    width={16}
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
                                                    <label className="font-semibold text-black">Asset Name</label>
                                                </div>
                                                <div className="w-3/4">
                                                    <input
                                                        type="text"
                                                        name="assetname"
                                                        placeholder="Enter asset Name"
                                                        className="rounded-lg border border-black h-[44px] pl-5 pr-5 w-[320px]"
                                                        onChange={(e) => (assetname.current = e.target.value)}
                                                    />
                                                </div>
                                            </div>
                                            <div className="mb-10 relative column-2 flex justify-start items-center">
                                                <div className="w-[160px]">
                                                    <label className="font-semibold text-black">Tags/Key</label>
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

AssetManagement.getLayout = function getLayout(page: any) {
    return (
        <Layout>{page}</Layout>
    )
}