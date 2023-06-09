import React, { useState, useRef, useEffect } from "react";
import Layout from "../../../components/Layout";
import NoDataFound from "../../../common/nodatafound";
import styles from '../../../styles/Common.module.css';
import { getAssetsData } from "../../../lib/getassets";
import { useRouter } from 'next/router'
import Link from "next/link";
import Image from "next/image";
import Template from "../template";
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
    const [chooseAsset, setChooseAsset] = useState(localData && localData.localData.length > 0 ? localData.localData[0].assetName : '');
    const [toggleAsset, setToggleAsset] = useState(false);
    const [dtObject, setDtObject] = useState<any[]>([]);
    const [deleteModal, setDeleteModal] = useState(false);

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

    // Creating a JSON Object
    function CreateJSON(tag: any, datatype: any) {
        var myObject = {
            "tagName": tag,
            "dataType": datatype
        };
        return myObject;
    }

    // Save New Tag
    const saveNewTag = () => {
        if (newTag.trim().length !== 0) {

            // Creating the array of all tags
            let updatedList = allTags.slice();
            updatedList.push(newTag)
            setAllTags(updatedList)
            setShowInput(false);
            setNewTag("");
            setShowHideAddTagButton(false);
            setToggleDT(false);

            // Creating the array of data type
            let typeList = assetDataType;
            typeList.push(dataType)
            setAssetDataType(typeList);
            setDataType("");

            // Creating json object for tag and datatype together
            let json: any = CreateJSON(newTag, dataType);
            let jsonList = dtObject.slice();
            jsonList.push(json)
            setDtObject(jsonList)

        } else {
            console.log("Input must not be empty")
        }
    }


    // Remove Element from all Tag Array
    const removeElement = (item: any) => {
        // removing the item form all tags array
        let updatedList = allTags.slice();
        var filteredArray = updatedList.filter(function (e) { return e !== item })
        setAllTags(filteredArray)

        // removing the datatype from datatype array
        let updatedListType = assetDataType;
        var popped = updatedListType.splice(-1);
        setAssetDataType(updatedListType);

        // remove the json item from json item array
        let updatedJSON = dtObject.slice();
        var filteredJSON = updatedJSON.filter(function (e) { return e.tagName !== item })
        setDtObject(filteredJSON)

    }

    // Cancel Adding new tags
    const cancelAddingTag = () => {
        setShowInput(false);
        setShowHideAddTagButton(false)
        setToggleDT(false);
        setDataType("");
        setNewTag("");
    }

    // Store Data into JSON File
    const handleSubmit = async (e: any) => {
        e.preventDefault();
        var formData = new FormData(e.target);
        const form_values = Object.fromEntries(formData);
        const response = await fetch('/api/assets', {
            // const response = await fetch('https://shodat.vercel.app/api/assets', {
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
                    tags: dtObject
                }
            )
        });
        const resdata = await response.json();
        if (resdata) {
            router.replace(router.asPath);
            // Updated state to close the modal
            setShowModal(false);
            // Update state to Show the success message
            setSuccess(true);
            // Update state to empty all tags 
            setAllTags([]);
            // Update state to hide the success message after 5 seconds
            setTimeout(() => {
                setSuccess(false);
            }, 5000);
        } else {
            console.log("FAILED")
        }
    }

    // Delete Asset
    const deleteAsset = (assetID: any) => {
        setDeleteModal(true);
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

                <div className="lg:w-[86%] md:w-full sm:w-full small:w-full">
                    <div className="columns-2 flex justify-between md:items-center sm:flex sm:flex-wrap sm:flex-col sm:items-start md:flex-row small:flex-col small:flex-wrap small:items-start">
                        <p className="text-black text-lg lg:mb-0 font-semibold sm:mb-3 small:mb-3">Class Management</p>
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
                            >
                                <Image
                                    src="/img/download-black.svg"
                                    alt="Import Class"
                                    className="mr-2"
                                    height={24}
                                    width={24}
                                />
                                Import Class
                            </button>

                        </div>
                    </div>

                    <div className="border border-gray-957 bg-gray-953 min-h-full rounded-xl mt-3 px-4 py-4 ">
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
                        {success ? <AlertMessage alertType="success" title="Success" message="New class has been created successfully!" /> : null}
                        {/* --- Alerts End--- */}

                        <div className="w-full mt-7 flex">
                            <div className={`rounded rounded-xl border border-yelow-951 bg-yellow-951 h-[105px] w-[194px] p-3 lg:mr-28 md:mr-5 sm:mr-5 small:mr-5 hover:bg-yellow-951 transition-all duration-[400ms] ${router.pathname == "/dashboard/assetmanagement" ? 'bg-yellow-951' : 'bg-yellow-951'}`}>
                                <Link href="" className="flex justify-between items-start">
                                    <div className="text-black w-[75%] text-[16px] font-normal pt-6">Class Management</div>
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

                            <div className="rounded rounded-xl border border-yelow-951 bg-yellow-951 h-[105px] w-[194px] p-3 hover:bg-yellow-951 transition-all duration-[400ms] hover:text-white">
                                <Link href="" className="flex justify-between items-start" onClick={() => setShowObjectModal(true)}>
                                    <div className="text-black w-[75%] text-[16px] font-normal pt-6">Object Management</div>
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

                        {/* Table */}
                        {data.length > 0 ?
                            <div className="h-96 flex justify-start items-start flex-wrap flex-row mt-12">
                                <p className="text-black text-md mb-6 font-semibold">My Class</p>
                                <div className={`lg:overflow-hidden md:overflow-x-scroll sm:overflow-x-scroll border border-gray-958 rounded-xl lg:w-full md:w-full lg:w-full sm:w-full small:w-full small:overflow-x-scroll h-[300px] bg-white ${styles.proTableWrap}`}>
                                    <table className={`table-auto lg:min-w-full sm:w-full small:w-full text-left ${styles.table}`}>
                                        <thead className="bg-black text-white rounded-xl h-10 text-[14px] font-light">
                                            <tr>
                                                <th>S.No</th>
                                                <th>Class Name</th>
                                                <th>Tags</th>
                                                <th>Date Created</th>
                                                <th>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody className="text-sm cursor-pointer">
                                            {data.map((item: any, index: any) => (
                                                <tr className="hover:bg-yellow-950 text-sm border boder-gray-958 last:border-none" key={index}>
                                                    <td className="w-[6%] min-h-[50px]">{index + 1}</td>
                                                    <td className="w-[25%] min-h-[50px]">
                                                        <Link
                                                            href={{
                                                                pathname: '/dashboard/assetmanagement/subasset',
                                                                query: {
                                                                    assets: item.assetName
                                                                }
                                                            }}
                                                            className="w-[25%]"
                                                        >
                                                            <span className="font-semibold">{item.assetName}</span>
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
                                                    <td className="w-[15%] min-h-[50px]"><span>{moment(item.dateCreated).format('DD-MM-YYYY')}</span></td>
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
                            <>
                                <p className="text-black text-md font-semibold mt-8 mb-3">My Classes</p>
                                <div className="flex justify-center items-center flex-wrap flex-col h-[300px] border-white bg-white rounded rounded-lg">
                                    <NoDataFound titleText="No assets data found!" messageText="Please create the class by clicking on the" createText="Create New Class" />
                                </div>
                            </>
                        }

                    </div>
                </div>

                <div className="lg:w-[14%] lg:block md:hidden sm:hidden pl-5 small:hidden">
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
                                                                            key={index}
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
                                                        pathname: '/dashboard/assetmanagement/objects',
                                                        query: {
                                                            assets: chooseAsset
                                                        }
                                                    }}
                                                    className="rounded-xl bg-black border-[2px] border-black text-white flex h-12 justify-center items-center pl-2 pr-2 hover:bg-yellow-951 hover:text-black hover:border-yellow-951 w-[120px] transition-all duration-[400ms]"
                                                >
                                                    <span className="font-normal">Continue</span>
                                                </Link>
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
                            <div className="relative my-6 lg:w-[720px] small:w-[95%] sm:w-[95%]">

                                <div className="border-0 rounded-lg shadow-lg relative flex flex-col lg:w-full bg-white outline-none focus:outline-none">
                                    {/*header*/}
                                    <div className="flex items-center justify-between p-5">
                                        <h3 className="text-lg font-[600] text-black">
                                            Add New Class
                                        </h3>
                                        <button
                                            className="p-1 ml-auto bg-transparent border-0 text-black float-right leading-none font-semibold outline-none focus:outline-none"
                                            onClick={() => {
                                                setShowModal(false);
                                                setShowInput(false);
                                                setShowHideAddTagButton(false)
                                                setToggleDT(false);
                                                setDataType("");
                                                setAllTags([]);
                                                setNewTag("");
                                            }}
                                        >
                                            <Image
                                                src="/img/x.svg"
                                                alt="close"
                                                height={32}
                                                width={32}
                                            />
                                        </button>
                                    </div>
                                    {/*body*/}
                                    <div className="relative p-6 pt-0 flex-auto">
                                        <form
                                            className="flex justify-center items-center flex-wrap flex-col lg:w-full"
                                            method='post'
                                            onSubmit={handleSubmit}
                                        >
                                            <div className="mb-1 relative flex justify-center items-center flex-wrap flex-col sm:w-full small:w-full lg:w-[515px]">

                                                <div className="mb-3 relative column-2 flex justify-start items-center sm:w-full small:w-full">
                                                    <div className="lg:w-[160px] small:w-[35%] sm:w-[35%]">
                                                        <label className="font-normal text-black">Class Name <span className="text-red-500">*</span></label>
                                                    </div>
                                                    <div className="lg:w-3/4 small:w-[65%] sm:w-[65%]">
                                                        <input
                                                            type="hidden"
                                                            name="assetid"
                                                            placeholder="Enter asset ID"
                                                            value={parseInt(getLastID) + 1}
                                                        />

                                                        <div className={`mb-5 lg:w-full small:w-full small:w-full ${styles.form__wrap}`}>
                                                            <div className={`relative ${styles.form__group} font-OpenSans`}>
                                                                <input
                                                                    type="text"
                                                                    id="assetname"
                                                                    name="assetname"
                                                                    className={`border border-gray-961 ${styles.form__field}`}
                                                                    placeholder="Enter class name"
                                                                    required
                                                                    onChange={(e) => (assetname.current = e.target.value)}
                                                                />
                                                                <label htmlFor="assetname" className={`${styles.form__label}`}>Enter class name</label>
                                                            </div>
                                                        </div>

                                                    </div>
                                                </div>

                                                <div className="mb-7 relative column-2 flex justify-start items-center sm:w-full small:w-full">
                                                    <div className="lg:w-[160px] small:w-[35%] sm:w-[35%]">
                                                        <label className="font-normal text-black">Class Tags <span className="text-red-500">*</span></label>
                                                    </div>
                                                    <div className="lg:w-3/4 small:w-[65%] sm:w-[65%] relative">
                                                        <div className="rounded-lg border border-gray-961 min-h-[64px] pl-2 pr-2 lg:w-full small:w-full sm:w-full pt-2 pb-2 flex flex-wrap justify-start items-center">
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
                                                                    className="text-black text-sm inline-flex justify-center items-center text-lg h-8 mb-2 bg-yellow-951 px-2 mt-2 rounded rounded-lg font-semibold"
                                                                    onClick={addTags}
                                                                >
                                                                    <Image
                                                                        src="/img/plusblack.svg"
                                                                        alt="close"
                                                                        height={24}
                                                                        width={24}
                                                                    />
                                                                    <span>Add Tag</span>
                                                                </button>
                                                                : null}
                                                        </div>

                                                        {toggleDT ?
                                                            <div className="rounded rounded-lg border border-gray-500 min-h-[150px] mt-[1px] pl-2 pr-2 w-full pt-2 pb-2 bg-white absolute top-[100%] right-0 z-10">
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
                                                                    <label className="text-black font-semibold">int <span className="text-gray-500 font-normal text-[14px]">(myNum = 5)</span></label>
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
                                                                    <label className="text-black font-semibold">float <span className="text-gray-500 font-normal text-[14px]">(myFloatNum = 5.99f)</span></label>
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
                                                                    <label className="text-black font-semibold">char <span className="text-gray-500 font-normal text-[14px]">(myLetter = &apos;D&apos;)</span></label>
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
                                                                    <label className="text-black font-semibold">boolean <span className="text-gray-500 font-normal text-[14px]">(myBool = true/false)</span></label>
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
                                                                    <label className="text-black font-semibold">string <span className="text-gray-500 font-normal text-[14px]">(myText = &quot;Hello&quot;)</span></label>
                                                                </div>
                                                                <div className="flex pt-1 pb-1">
                                                                    <div className={`${styles.customRadio} mr-2`}>
                                                                        <input
                                                                            type="radio"
                                                                            name="datatype"
                                                                            className="scale-150"
                                                                            value="date"
                                                                            checked={dataType === "date"}
                                                                            onChange={() => radioChange("date")}
                                                                        />
                                                                        <span></span>
                                                                    </div>
                                                                    <label className="text-black font-semibold">date <span className="text-gray-500 font-normal text-[14px]">(myDate = &quot;29-05-2023&quot;)</span></label>
                                                                </div>

                                                            </div>
                                                            : null
                                                        }
                                                    </div>
                                                </div>

                                                <div className="mb-0 relative flex justify-end items-center w-full pr-4">
                                                    <button
                                                        className="border border-black rounded-lg bg-black text-white text-lg w-20 h-12 mr-5 hover:bg-yellow-951 hover:text-white hover:border-yellow-951 ease-in-out duration-300 disabled:bg-gray-951 disabled:hover:border-gray-951 disabled:border-gray-951"
                                                        disabled={(allTags && allTags.length > 0) ? false : true}
                                                    >
                                                        Save
                                                    </button>
                                                    <button
                                                        className="border border-black rounded-lg bg-white text-black text-lg w-24 h-12 hover:text-white hover:bg-yellow-951 hover:border-yellow-951 ease-in-out duration-300"
                                                        onClick={() => { setShowModal(false); setAllTags([]) }}
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



                {/* ===== Delete Modal starts ===== */}
                {deleteModal ?
                    <>
                        <div
                            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                        >
                            <div className="relative my-6 w-[580px]">
                                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                    {/*header*/}
                                    <div className="flex items-start justify-between p-2">
                                        <h3 className="text-lg font-medium"></h3>
                                        <button
                                            className="p-1 ml-auto bg-transparent border-0 text-black float-right leading-none font-semibold outline-none focus:outline-none"
                                            onClick={() => setDeleteModal(false)}
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
                                    <div className="relative pt-2 pb-8 flex-auto">
                                        <div className="flex justify-start items-center flex-wrap flex-col">
                                            <p className="flex justify-center items-center text-lg">Are you sure want to delete this record?</p>
                                            <div className="mt-10 relative flex justify-center items-center w-full">
                                                    <button
                                                        className="border border-black rounded-lg bg-black text-white text-lg w-[70px] h-[47px] mr-5 hover:bg-yellow-951 hover:text-white hover:border-yellow-951 ease-in-out duration-300 disabled:bg-gray-951 disabled:hover:border-gray-951 disabled:border-gray-951"
                                                        onClick={() => { setDeleteModal(false);}}
                                                    >
                                                        Yes
                                                    </button>
                                                    <button
                                                        className="border border-black rounded-lg bg-white text-black text-lg w-[70px] h-[47px] hover:text-white hover:bg-yellow-951 hover:border-yellow-951 ease-in-out duration-300"
                                                        onClick={() => { setDeleteModal(false);}}
                                                    >
                                                        No
                                                    </button>
                                                </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="opacity-75 fixed inset-0 z-40 bg-black"></div>
                    </>
                    : null}

                {/* ===== Delete Modal Ends ===== */}


            </div>
        </>
    )
}

AssetManagement.getLayout = function getLayout(page: any) {
    return (
        <Layout>{page}</Layout>
    )
}