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
import AlertMessage from "@/common/alertMessage";
import moment from "moment";

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
    const assetname = useRef("");
    const [data, setData] = useState<any[]>([]);
    const router = useRouter();
    const [allTags, setAllTags] = useState<any[]>([]);
    const [newTag, setNewTag] = useState<string>("");
    const [showInput, setShowInput] = useState(false);
    const [showHideAddTagButton, setShowHideAddTagButton] = useState(false);
    const [toggleDT, setToggleDT] = useState(false);
    const [dataType, setDataType] = useState("");
    const [assetDataType, setAssetDataType] = useState<any[]>([]);
    const [showObjectModal, setShowObjectModal] = useState(false);
    const [chooseAsset, setChooseAsset] = useState("Cars");
    const [toggleAsset, setToggleAsset] = useState(false);


    // Get JSON data on page load
    const fetchData = () => {
        axios.get("/api/getAssets").then((response) => {
            if (response.data) {
                setData(response.data);
            }
        });
    };
    useEffect(() => {
        fetchData();
        if (fetchData.length) return;
    }, [localData.localData])


    // Get Last Asset ID
    const getLastID = (data && data.length > 0) ? data.slice(-1)[0].assetID : '1000000001';

    // Adding New Tags
    const addTags = () => {
        setShowInput(true);
        setShowHideAddTagButton(true);
        setToggleDT(true);
    }

    // Get Radio Button Value
    const radioChange = (value: any) => {
        setDataType(value);
    }

    // Save New Tag
    const saveNewTag = () => {
        if (newTag.trim().length !== 0) {
            let updatedList = allTags.slice();
            updatedList.push(newTag)
            setAllTags(updatedList)
            setShowInput(false);
            setNewTag("");
            setShowHideAddTagButton(false);
            setToggleDT(false);
            let typeList = assetDataType;
            typeList.push(dataType)
            setAssetDataType(typeList);
            setDataType("");
        } else {
            console.log("Input must not be empty")
        }
    }


    // Remove Elemnet from all Tag Array
    const removeElement = (item: any) => {
        let updatedList = allTags.slice();
        var filteredArray = updatedList.filter(function (e) { return e !== item })
        setAllTags(filteredArray)

        let updatedListType = assetDataType;
        var popped = updatedListType.splice(-1);
        setAssetDataType(popped);
    }

    // Cancel Adding new tags
    const cancelAddingTag = () => {
        setShowInput(false);
        setShowHideAddTagButton(false)
        setToggleDT(false);
        setDataType("");
    }



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
                    assetkey: allTags,
                    dateCreated: new Date().toLocaleString() + "",
                    dateModified: new Date().toLocaleString() + "",
                    assetTypes: assetDataType,
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


    // Show Choose Asset List
    const showChooseAssetList = () => {
        setToggleAsset(!toggleAsset)
    }
    const selectAsset = (item: any) => {
        setChooseAsset(item);
        setToggleAsset(false)
    }

    return (
        <>
            <div className="flex font-OpenSans">

                <div className="w-[84%]">
                    <div className="columns-2 flex justify-between items-center">
                        <p className="text-black text-lg mb-0 font-semibold">Class Management</p>
                        <div className="flex justify-end items-right">
                            <button
                                className="rounded-xl bg-yellow-951 border-[2px] border-yellow-951 text-black flex h-12 justify-center items-center pl-2 pr-2 hover:bg-white hover:text-black hover:border-black transition-all duration-[400ms] mr-3"
                                onClick={() => setShowModal(true)}
                            >
                                <Image
                                    src="/img/plus-black.svg"
                                    alt="Create New Asset"
                                    className="mr-2"
                                    height={24}
                                    width={24}
                                />
                                Create New Class
                            </button>

                            <button
                                className="rounded-xl bg-yellow-951 border-[2px] border-yellow-951 text-black flex h-12 justify-center items-center pl-2 pr-2 hover:bg-white hover:text-black hover:border-black transition-all duration-[400ms]"
                                onClick={() => setShowModal(true)}
                            >
                                <Image
                                    src="/img/download-black.svg"
                                    alt="Create New Asset"
                                    className="mr-2"
                                    height={24}
                                    width={24}
                                />
                                Import Class
                            </button>

                        </div>
                    </div>

                    <div className="border min-h-full rounded-xl mt-3 px-4 py-4">
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
                                        </a>
                                    </li>
                                </ol>
                            </nav>
                        </div>

                        {/* --- Alerts Start--- */}
                        {success ? <AlertMessage /> : null}
                        {/* --- Alerts End--- */}

                        <div className="w-full mt-10 flex">
                            <div className={`rounded rounded-xl border border-black bg-white h-32 w-56 p-3 shadow-lg mr-28 hover:bg-yellow-951 transition-all duration-[400ms] ${router.pathname == "/dashboard/assetmanagement" ? 'bg-yellow-951' : 'bg-white'}`}>
                                <Link href="" className="flex justify-between items-start">
                                    <div className="text-black w-[75%] text-lg font-semibold pt-10">Class Management</div>
                                    <div className="w-[25%] text-right">
                                        <Image
                                            src="/img/asset-management.svg"
                                            alt="asset management"
                                            height={50}
                                            width={50}
                                            className="inline-block"
                                        />
                                    </div>
                                </Link>
                            </div>

                            <div className="rounded rounded-xl border border-black bg-white h-32 w-56 p-3 shadow-lg hover:bg-yellow-951 transition-all duration-[400ms] hover:text-white">
                                <Link href="" className="flex justify-between items-start" onClick={() => setShowObjectModal(true)}>
                                    <div className="text-black w-[75%] text-lg font-semibold pt-10">Object Management</div>
                                    <div className="w-[25%] text-right">
                                        <Image
                                            src="/img/object-management.svg"
                                            alt="object management"
                                            height={50}
                                            width={50}
                                            className="inline-block"
                                        />
                                    </div>
                                </Link>
                            </div>

                        </div>


                        {data.length > 0 ?
                            <div className="h-96 flex justify-start items-start flex-wrap flex-col mt-12">
                                <p className="text-black text-md mb-6 font-semibold">My Class</p>
                                <div className="overflow-hidden border rounded-xl w-full">
                                    <table className={`table-auto min-w-full text-left ${styles.table}`}>
                                        <thead className="bg-black text-white rounded-xl h-10 text-sm font-light">
                                            <tr>
                                                <th>S.No</th>
                                                {/* <th>Asset ID</th> */}
                                                <th>Asset Name</th>
                                                <th>Tags</th>
                                                <th>Date Created</th>
                                                <th>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {data.map((item: any, index: any) => (
                                                <tr className="hover:bg-yellow-950" key={index}>
                                                    <td className="w-[6%] min-h-[50px]">{index + 1}</td>
                                                    {/* <td className="w-[14%] min-h-[50px]">{item.assetID}</td> */}
                                                    <td className="w-[20%] min-h-[50px]">
                                                        <Link
                                                            href={{
                                                                pathname: '/dashboard/subasset',
                                                                query: {
                                                                    assets: item.assetName
                                                                }
                                                            }}
                                                            className="w-[25%]"
                                                        >
                                                            <span className="font-medium">{item.assetName}</span>
                                                        </Link>
                                                    </td>
                                                    <td className="w-[25%] min-h-[50px]">
                                                        <div className="flex w-[300px]">
                                                            <Image
                                                                src="/img/export.svg"
                                                                height={18}
                                                                width={18}
                                                                alt="export"
                                                                className="mr-2"
                                                            />
                                                            <span className="whitespace-nowrap overflow-hidden text-ellipsis">
                                                                {item.assetkey.toString().split(",").join(", ")}
                                                            </span>
                                                        </div>
                                                    </td>
                                                    <td className="w-[20%] min-h-[50px]"><span>{moment(item.dateCreated).format('DD-MM-YYYY')}</span></td>
                                                    <td className="w-[15%]">
                                                        <button className="mr-5">
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
                                <NoDataFound createText="Create class" />
                            </div>
                        }

                    </div>
                </div>

                <div className="w-[16%] pl-5">
                    <Template />
                </div>


                {/* ----- OBJECT MODAL STARTS ----- */}
                {showObjectModal ? (
                    <>
                        <div
                            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                        >
                            <div className="relative my-6 w-[720px]">
                                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                    {/*header*/}
                                    <div className="flex items-start justify-between p-5">
                                        <h3 className="text-lg font-medium">
                                            Choose your class and continue
                                        </h3>
                                        <button
                                            className="p-1 ml-auto bg-transparent border-0 text-black float-right leading-none font-semibold outline-none focus:outline-none"
                                            onClick={() => setShowObjectModal(false)}
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
                                        <div className="flex justify-start items-center flex-wrap flex-col">
                                            <div className="w-[400px]">
                                                <div
                                                    className="border rounded-xl border-gray-500 h-[55px] w-[400px] pl-2 pr-5 relative flex items-center justify-start"
                                                    onClick={showChooseAssetList}
                                                >
                                                    <label className="absolute text-sm top-[-10px] left-2 pl-2 pr-2 bg-white">Class</label>
                                                    <Image
                                                        src="/img/arrow-down-black.svg"
                                                        alt="arrow-down"
                                                        height={20}
                                                        width={20}
                                                        className="absolute right-3 top-4"
                                                    />
                                                    <span className="text-lg text-black pl-2">{chooseAsset}</span>
                                                </div>
                                                {toggleAsset ?
                                                    <div className={`h-52 border rounded-xl border-gray-500 h-[155px] w-[400px]  relative flex items-start justify-start mt-1 overflow-hidden overflow-y-scroll ${styles.scroll}`}>
                                                        {data && data.length > 0 ?
                                                            <ul className="p-0 m-0 w-full">
                                                                {
                                                                    data.map((item: any, index: any) => (
                                                                        <li
                                                                            className="px-5 py-4 bg-white cursor-pointer hover:bg-yellow-951 w-full font-normal"
                                                                            onClick={() => selectAsset(item.assetName)}
                                                                        >
                                                                            <span>{item.assetName}</span>
                                                                        </li>
                                                                    ))
                                                                }
                                                            </ul>
                                                            : null}
                                                    </div>
                                                    : null}
                                            </div>
                                            <div className="w-[400px] mt-10 flex justify-end items-end">
                                                <Link
                                                    href={{
                                                        pathname: '/dashboard/objects',
                                                        query: {
                                                            assets: chooseAsset
                                                        }
                                                    }}
                                                    className="rounded-xl bg-black border-[2px] border-black text-white flex h-12 justify-center items-center pl-2 pr-2 hover:bg-yellow-951 hover:text-black hover:border-yellow-951 w-[120px] transition-all duration-[400ms]"
                                                >
                                                    <span className="font-normal">Continue</span>
                                                </Link>
                                                {/* <button className="rounded-xl bg-black border-[2px] border-black text-white flex h-12 justify-center items-center pl-2 pr-2 hover:bg-yellow-951 hover:text-black hover:border-yellow-951 w-[120px] transition-all duration-[400ms]">Continue</button> */}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="opacity-75 fixed inset-0 z-40 bg-black"></div>
                    </>
                ) : null}
                {/* ----- MODAL ENDS ----- */}


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
                                            Add New Class
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

                                                <div className="mb-10 relative column-2 flex justify-start items-center">
                                                    <div className="w-[160px]">
                                                        <label className="font-semibold text-black">Class Name <span className="text-red-500">*</span></label>
                                                    </div>
                                                    <div className="w-3/4">
                                                        <input
                                                            type="hidden"
                                                            name="assetid"
                                                            placeholder="Enter asset ID"
                                                            className="rounded-lg border border-gray-500 h-[44px] pl-5 pr-5 w-[320px]"
                                                            value={parseInt(getLastID) + 1}
                                                        />
                                                        <input
                                                            type="text"
                                                            name="assetname"
                                                            placeholder="Enter asset Name"
                                                            className="rounded-lg border border-gray-500 h-[44px] pl-5 pr-5 w-[320px]"
                                                            onChange={(e) => (assetname.current = e.target.value)}
                                                            required
                                                        />
                                                    </div>
                                                </div>

                                                <div className="mb-10 relative column-2 flex justify-start items-center">
                                                    <div className="w-[160px]">
                                                        <label className="font-semibold text-black">Class Tags <span className="text-red-500">*</span></label>
                                                    </div>
                                                    <div className="w-3/4">
                                                        <div className="rounded-lg border border-gray-500 min-h-[64px] pl-2 pr-2 w-[320px] pt-2 pb-2 flex flex-wrap justify-start items-center">
                                                            {
                                                                allTags && allTags.length > 0 ?
                                                                    allTags.map((items: any, index: any) => (
                                                                        <span
                                                                            key={index}
                                                                            className="rounded-lg inline-flex justify-center items-center h-8 pl-2 pr-2 bg-black text-white text-[14px] mr-2 mb-2">
                                                                            {items}
                                                                            <button
                                                                                className="rounded-full border-2 border-white h-[18px] w-[18px] inline-flex justify-center items-center ml-3"
                                                                                onClick={() => removeElement(items)}
                                                                            >
                                                                                <Image
                                                                                    src="/img/closewhite.svg"
                                                                                    alt="close"
                                                                                    height={14}
                                                                                    width={14}
                                                                                />
                                                                            </button>
                                                                        </span>
                                                                    )) : null
                                                            }

                                                            {
                                                                showInput ?
                                                                    <span className="flex justify-center items-center mb-2">
                                                                        <input
                                                                            type="text"
                                                                            placeholder="Tag Name"
                                                                            className="border border-gray-951 rounded py-[3px] px-[3px] w-[100px] mr-2 h-8 text-sm"
                                                                            value={newTag}
                                                                            onChange={(e) => setNewTag(e.target.value)}
                                                                            required
                                                                        />
                                                                        <button
                                                                            className={`text-black border border-transparent rounded inline-flex justify-center items-center text-sm h-8 px-2 ml-1 bg-yellow-951 ${dataType && (dataType != null || dataType != "") ? 'okay' : 'disabled disabled:bg-gray-300'}`}
                                                                            onClick={saveNewTag}
                                                                            disabled={dataType && (dataType != null || dataType != "") ? false : true}
                                                                        >
                                                                            Add
                                                                        </button>
                                                                        <button
                                                                            className="text-white border border-transparent rounded inline-flex justify-center items-center text-sm h-8 px-2 ml-1 bg-red-600"
                                                                            onClick={cancelAddingTag}
                                                                        >
                                                                            Cancel
                                                                        </button>
                                                                    </span>
                                                                    : null
                                                            }
                                                            <input type="hidden" value={allTags} name="alltags" id="alltags" />

                                                            {!showHideAddTagButton ?
                                                                <button
                                                                    className="text-gray-952 inline-flex justify-center items-center text-lg h-8 mb-2"
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
                                                                : null}
                                                        </div>

                                                        {toggleDT ?
                                                            <div className="rounded rounded-lg border border-gray-500 min-h-[150px] mt-[1px] pl-2 pr-2 w-[320px] pt-2 pb-2">
                                                                <div className="text-sm font-bold color-black mb-2 flex items-center justify-between">
                                                                    <span>Select Data Type</span>
                                                                    <span className="bg-black h-8 w-8 p-1 inline-flex rounded-full justify-center items-center">
                                                                        <Image
                                                                            src="/img/tick-white.svg"
                                                                            alt="check"
                                                                            height={20}
                                                                            width={20}
                                                                            className="inline-block"
                                                                        />
                                                                    </span>
                                                                </div>
                                                                <div className="flex pt-1 pb-1">
                                                                    <div className={`${styles.customRadio} mr-2`}>
                                                                        <input
                                                                            type="radio"
                                                                            name="datatype"
                                                                            className="scale-150"
                                                                            value="int"
                                                                            checked={dataType === "int"}
                                                                            onChange={() => radioChange("int")}
                                                                        />
                                                                        <span></span>
                                                                    </div>
                                                                    <label className="text-black font-semibold">int <span className="text-gray-500 font-normal text-[14px]">(myNum=5)</span></label>
                                                                </div>
                                                                <div className="flex pt-1 pb-1">
                                                                    <div className={`${styles.customRadio} mr-2`}>
                                                                        <input
                                                                            type="radio"
                                                                            name="datatype"
                                                                            className="scale-150"
                                                                            value="float"
                                                                            checked={dataType === "float"}
                                                                            onChange={() => radioChange("float")}
                                                                        />
                                                                        <span></span>
                                                                    </div>
                                                                    <label className="text-black font-semibold">float <span className="text-gray-500 font-normal text-[14px]">(myFloatNum=5.99f)</span></label>
                                                                </div>
                                                                <div className="flex pt-1 pb-1">
                                                                    <div className={`${styles.customRadio} mr-2`}>
                                                                        <input
                                                                            type="radio"
                                                                            name="datatype"
                                                                            className="scale-150"
                                                                            value="char"
                                                                            checked={dataType === "char"}
                                                                            onChange={() => radioChange("char")}
                                                                        />
                                                                        <span></span>
                                                                    </div>
                                                                    <label className="text-black font-semibold">char <span className="text-gray-500 font-normal text-[14px]">(myLetter='D')</span></label>
                                                                </div>
                                                                <div className="flex pt-1 pb-1">
                                                                    <div className={`${styles.customRadio} mr-2`}>
                                                                        <input
                                                                            type="radio"
                                                                            name="datatype"
                                                                            className="scale-150"
                                                                            value="boolean"
                                                                            checked={dataType === "boolean"}
                                                                            onChange={() => radioChange("boolean")}
                                                                        />
                                                                        <span></span>
                                                                    </div>
                                                                    <label className="text-black font-semibold">boolean <span className="text-gray-500 font-normal text-[14px]">(myBool=true/false)</span></label>
                                                                </div>
                                                                <div className="flex pt-1 pb-1">
                                                                    <div className={`${styles.customRadio} mr-2`}>
                                                                        <input
                                                                            type="radio"
                                                                            name="datatype"
                                                                            className="scale-150"
                                                                            value="string"
                                                                            checked={dataType === "string"}
                                                                            onChange={() => radioChange("string")}
                                                                        />
                                                                        <span></span>
                                                                    </div>
                                                                    <label className="text-black font-semibold">string <span className="text-gray-500 font-normal text-[14px]">(myText="Hello")</span></label>
                                                                </div>

                                                            </div>
                                                            : null
                                                        }
                                                    </div>
                                                </div>

                                                <div className="mb-5 relative flex justify-end items-center w-full pr-4">
                                                    <button
                                                        className="border border-black rounded-lg bg-black text-white font-lg w-20 h-12 mr-5 font-semibold hover:bg-yellow-951 hover:text-white hover:border-yellow-951 ease-in-out duration-300 disabled:bg-gray-951 disabled:hover:border-gray-951 disabled:border-gray-951"
                                                        disabled={(allTags && allTags.length > 0) ? false : true}
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

AssetManagement.getLayout = function getLayout(page: any) {
    return (
        <Layout>{page}</Layout>
    )
}