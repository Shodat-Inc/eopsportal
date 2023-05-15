import React, { useState, useRef, useEffect } from "react";
import Layout from "../../components/Layout";
import NoDataFound from "../../common/nodatafound";
import styles from '../../styles/Common.module.css';
import { getSubAssetsData } from "../../lib/getsubassets";
import { useRouter } from 'next/router'
import Link from "next/link";
import Image from "next/image";
import Template from "./template";
import axios from 'axios';
import moment from "moment";
import AlertMessage from "@/common/alertMessage";

export async function getServerSideProps() {
    const localData = await getSubAssetsData()
    return {
        props: {
            localData,
        },
    }
}

export default function SubAsset(localData: any) {
    const [query, setQuery] = useState('');
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
    const [allTags, setAllTags] = useState("Battery Type, Size, Mfg Date")
    const [parentJoinKey, setParentJoinKey] = useState("Battery Type, Size, Mfg Date");
    const [newTag, setNewTag] = useState("");
    const [showInput, setShowInput] = useState(false);
    const [hide, setHide] = useState(false);

    // Get JSON data on page load
    const fetchData = () => {
        axios.get("/api/getSubAssets").then((response) => {
            console.log("HERE", response.data);
            if (response.data) {
                setData(response.data);
            }
        });
    };


    // Getting data on props refresh
    useEffect(() => {
        fetchData();
        if (fetchData.length) return;
    }, [localData.localData])



    // Adding New Tags
    const addTags = () => {
        const myArray = allTags.split(",");
        console.log("myArray =>", myArray);
        setShowInput(true);
        setHide(true)
    }
    // Save New Tag
    const saveNewTag = () => {
        console.log("Here")
        setShowInput(false);
        setHide(false)
    }

    // Refresh Function
    const refreshFunction = () => {
        console.log("Refresh")
    }


    // Storing data in json for sub class
    const handleSubmit = async (e: any) => {
        e.preventDefault();
        var formData = new FormData(e.target);
        const form_values = Object.fromEntries(formData);
        console.log("form_values", form_values)
        // const response = await fetch('/api/createSubAssets', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify(
        //         {
        //             assetID: `${form_values.assetid}`,
        //             assetName: `${form_values.assetname}`,
        //             slug: `${form_values.assetname}`,
        //             parentAssetID: `${form_values.assetname}`,
        //             parentAssetName: `${form_values.assetname}`,
        //             tagsKeys: `${form_values.assetkey}`,
        //             dateCreated: new Date().toLocaleString() + "",
        //             dateModified: new Date().toLocaleString() + "",
        //             geoScopeLink: "https://dymmylink.com/"
        //         }
        //     )
        // });
        // const resdata = await response.json();
        // if (resdata) {
        //     console.log("SUCCESS")
        //     router.replace(router.asPath);
        //     setShowModal(false);
        //     setSuccess(true);
        //     setTimeout(() => {
        //         setSuccess(false);
        //     }, 5000);
        // } else {
        //     console.log("FAILED")
        // }
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
                                Create Sub Asset
                            </button>
                        </div>
                    </div>

                    <div className="border min-h-full rounded-md mt-3 px-4 py-4">
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
                                            <span className="ml-1 text-sm font-medium text-black hover:text-yellow-950 md:ml-1">{parentAsset.assets}</span>
                                        </div>
                                    </li>
                                </ol>
                            </nav>
                        </div>

                        {/* --- Alerts Start--- */}
                        {success ? <AlertMessage /> : null}
                        {/* --- Alerts End--- */}


                        {data.length > 0 ?
                            <div className="h-96 flex justify-start items-start flex-wrap flex-col mt-4">
                                <h4 className="font-bold text-lg color-black mb-4 font-semibold">Sub Class</h4>
                                <div className="overflow-hidden border rounded-md w-full">
                                    <table className={`table-auto min-w-full text-left ${styles.table}`}>
                                        <thead className="bg-gray-950 rounded-lg h-10 text-sm font-light">
                                            <tr>
                                                <th>S.No</th>
                                                <th>Name</th>
                                                <th>Tags</th>
                                                <th>Parent Join Key</th>
                                                <th>Date Created</th>
                                                <th>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {data.map((item: any, index: any) => (
                                                <tr className="hover:bg-yellow-950" key={index}>
                                                    <td className="w-[50px]">{index + 1}</td>
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
                                                    <td><span>{item.tagsKeys}</span></td>
                                                    <td><span>{item.parentJoinKey}</span></td>
                                                    <td><span>{moment(item.dateCreated).format('DD-MM-YYYY')}</span></td>
                                                    <td>
                                                        <button className="mr-4">
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
                            <div className="relative my-6 w-[720px]">

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
                                        <form
                                            className="flex justify-center items-center flex-wrap flex-col w-full"
                                            method='post'
                                            onSubmit={handleSubmit}
                                        >
                                            <div className="mb-5 relative flex justify-center items-center flex-wrap flex-col">
                                                <div className="mb-7 relative column-2 flex justify-center items-center">
                                                    <div className="w-[160px]">
                                                        <label className="font-semibold text-black">Name</label>
                                                    </div>
                                                    <div className="w-3/4">
                                                        <input
                                                            type="text"
                                                            name="assetname"
                                                            placeholder="Enter asset Name"
                                                            className="rounded-lg border border-black h-[44px] pl-5 pr-5 w-[320px]"
                                                            onChange={(e) => (assetid.current = e.target.value)}
                                                        />
                                                    </div>
                                                </div>

                                                <div className="mb-10 relative column-2 flex justify-start items-center">
                                                    <div className="w-[160px]">
                                                        <label className="font-semibold text-black">Tags</label>
                                                    </div>
                                                    <div className="w-3/4">
                                                        <div className="rounded-lg border border-gray-500 min-h-[64px] pl-2 pr-2 w-[320px] pt-2 pb-2 flex flex-wrap justify-start items-center">
                                                            <span
                                                                className="rounded-lg inline-flex justify-center items-center h-8 pl-2 pr-2 bg-black text-white text-[14px] mr-2 mb-2">
                                                                Battery Type
                                                                <button className="rounded-full border-2 border-white h-[18px] w-[18px] inline-flex justify-center items-center ml-3">
                                                                    <Image
                                                                        src="/img/closewhite.svg"
                                                                        alt="close"
                                                                        height={14}
                                                                        width={14}
                                                                    />
                                                                </button>
                                                            </span>

                                                            <span
                                                                className="rounded-lg inline-flex justify-center items-center h-8 pl-2 pr-2 bg-black text-white text-[14px] mr-2 mb-2">
                                                                Size
                                                                <button className="rounded-full border-2 border-white h-[18px] w-[18px] inline-flex justify-center items-center ml-3">
                                                                    <Image
                                                                        src="/img/closewhite.svg"
                                                                        alt="close"
                                                                        height={14}
                                                                        width={14}
                                                                    />
                                                                </button>
                                                            </span>

                                                            <span
                                                                className="rounded-lg inline-flex justify-center items-center h-8 pl-2 pr-2 bg-black text-white text-[14px] mr-2 mb-2">
                                                                Mfg Date
                                                                <button className="rounded-full border-2 border-white h-[18px] w-[18px] inline-flex justify-center items-center ml-3">
                                                                    <Image
                                                                        src="/img/closewhite.svg"
                                                                        alt="close"
                                                                        height={14}
                                                                        width={14}
                                                                    />
                                                                </button>
                                                            </span>
                                                            <input type="hidden" value={allTags} name="alltags" id="alltags" />


                                                            {
                                                                showInput ?
                                                                    <span>
                                                                        <input
                                                                            type="text"
                                                                            placeholder="Tag"
                                                                            className="border border-gray-951 rounded py-[3px] px-[3px] w-[100px] mr-2"
                                                                            value={newTag}
                                                                        />
                                                                        <button
                                                                            className="text-black border border-black rounded inline-flex justify-center items-center text-lg px-2"
                                                                            onClick={saveNewTag}
                                                                        >
                                                                            Save
                                                                        </button>
                                                                    </span>
                                                                    : null
                                                            }


                                                            <button
                                                                className="text-gray-952 inline-flex justify-center items-center text-lg"
                                                                onClick={addTags}
                                                            >
                                                                <Image
                                                                    src="/img/pluswhite.svg"
                                                                    alt="close"
                                                                    height={20}
                                                                    width={20}
                                                                />
                                                                <span>Add Tag</span>
                                                            </button>

                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="mb-10 relative column-2 flex justify-start items-center">
                                                    <div className="w-[160px]">
                                                        <label className="font-semibold text-black">Parent Join Key</label>
                                                    </div>
                                                    <div className="w-3/4">
                                                        <div className="rounded-lg border border-gray-500 min-h-[64px] pl-2 pr-2 w-[320px] pt-2 pb-2 flex flex-wrap justify-start items-center">
                                                            <span
                                                                className="rounded-lg inline-flex justify-center items-center h-8 pl-2 pr-2 bg-black text-white text-[14px] mr-2 mb-2">
                                                                Model Type
                                                                <button className="h-[18px] w-[18px] inline-flex justify-center items-center ml-3">
                                                                    <Image
                                                                        src="/img/box_check_icon_white.svg"
                                                                        alt="close"
                                                                        height={14}
                                                                        width={14}
                                                                    />
                                                                </button>
                                                            </span>

                                                            <span
                                                                className="rounded-lg inline-flex justify-center items-center h-8 pl-2 pr-2 bg-black text-white text-[14px] mr-2 mb-2">
                                                                VIN
                                                                <button className="h-[18px] w-[18px] inline-flex justify-center items-center ml-3">
                                                                    <Image
                                                                        src="/img/blank_check_box_icon_white.svg"
                                                                        alt="close"
                                                                        height={14}
                                                                        width={14}
                                                                    />
                                                                </button>
                                                            </span>

                                                            <span
                                                                className="rounded-lg inline-flex justify-center items-center h-8 pl-2 pr-2 bg-black text-white text-[14px] mr-2 mb-2">
                                                                Color
                                                                <button className="h-[18px] w-[18px] inline-flex justify-center items-center ml-3">
                                                                    <Image
                                                                        src="/img/blank_check_box_icon_white.svg"
                                                                        alt="close"
                                                                        height={14}
                                                                        width={14}
                                                                    />
                                                                </button>
                                                            </span>

                                                            <span
                                                                className="rounded-lg inline-flex justify-center items-center h-8 pl-2 pr-2 bg-black text-white text-[14px] mr-2 mb-2">
                                                                Serial No
                                                                <button className="h-[18px] w-[18px] inline-flex justify-center items-center ml-3">
                                                                    <Image
                                                                        src="/img/blank_check_box_icon_white.svg"
                                                                        alt="close"
                                                                        height={14}
                                                                        width={14}
                                                                    />
                                                                </button>
                                                            </span>
                                                            <input type="hidden" value={parentJoinKey} name="parentJoinKey" id="parentJoinKey" />

                                                            <button
                                                                className="text-gray-952 inline-flex justify-center items-center text-lg"
                                                                onClick={refreshFunction}
                                                            >
                                                                <Image
                                                                    src="/img/refresh_gray.svg"
                                                                    alt="close"
                                                                    height={20}
                                                                    width={20}
                                                                />
                                                                <span>Refresh</span>
                                                            </button>

                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="mb-5 relative flex justify-end items-center w-full pr-4">
                                                    <button
                                                        className="border border-black rounded-lg bg-black text-white font-lg w-20 h-12 mr-5 font-semibold hover:bg-yellow-951 hover:text-white hover:border-yellow-951 ease-in-out duration-300"
                                                    >
                                                        Save
                                                    </button>
                                                    <button
                                                        className="border border-black rounded-lg bg-white font-semibold text-black font-lg w-24 h-12 hover:text-white hover:bg-yellow-951 hover:border-yellow-951 ease-in-out duration-300"
                                                        onClick={() => setShowModal(false)}
                                                    >
                                                        Cancel
                                                    </button>
                                                </div>

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

SubAsset.getLayout = function getLayout(page: any) {
    return (
        <Layout>{page}</Layout>
    )
}