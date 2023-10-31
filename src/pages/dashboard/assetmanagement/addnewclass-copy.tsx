import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import Layout from "../../../components/Layout";
import NoDataFound from "../../../common/nodatafound";
import styles from '../../../styles/Common.module.css';
import { getAssetsData } from "../../../lib/getassets";
import { useRouter } from 'next/router'
import Router from 'next/router'
import Link from "next/link";
import Image from "next/image";
import Template from "../template";
import axios from 'axios';
import AlertMessage from "@/common/alertMessage";
import moment from "moment";
import { setSelectedClass } from "@/store/actions/classAction";
import DeleteModal from "@/common/deletemodal";
import ObjectModal from "./objectmodal";
export async function getServerSideProps() {
    const localData = await getAssetsData()
    return {
        props: {
            localData,
        },
    }
}
export default function AddNewClass(props: any, localData: any) {
    const dispatch = useDispatch<any>();
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
    const [chooseAsset, setChooseAsset] = useState("");
    const [toggleAsset, setToggleAsset] = useState(false);
    const [dtObject, setDtObject] = useState<any[]>([]);
    const [deleteModal, setDeleteModal] = useState(false);
    const closeModal = () => {
        props.handleClick(false);
        setShowModal(false);
        setShowInput(false);
        setShowHideAddTagButton(false)
        setToggleDT(false);
        setDataType("");
        setAllTags([]);
        setNewTag("");
    }
    const cancelModal = () => {
        props.handleClick(false);
        setShowModal(false); 
        setAllTags([]);
    }

    function useOutsideAlerter(ref: any) {
        useEffect(() => {
            function handleClickOutside(event: any) {
                if (ref.current && !ref.current.contains(event.target)) {
                    setToggleAsset(false)
                }
            }
            document.addEventListener("mousedown", handleClickOutside);
            return () => {
                document.removeEventListener("mousedown", handleClickOutside);
            };
        }, [ref]);
    }

    const wrapperRef = useRef(null);
    useOutsideAlerter(wrapperRef);

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

    // Continue to next page after setting the selected class to redux
    const continueToNext = () => {
        setTimeout(() => {
            Router.push({
                pathname: '/dashboard/assetmanagement/objects',
                query: {
                    assets: chooseAsset
                }
            })
        }, 100)
    }

    // Send props to next page
    function sendProps() {
        Router.push({
            pathname: "/dashboard/assetmanagement/subasset",
            query: {
                chooseAsset
            }
        }, 'assetmanagement/subasset')
    }


    const handleDeleteFunction = () => {
        setDeleteModal(false)
    }
    return (
        <>
            <div
                className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
            >
                <div className="relative my-6 lg:w-[580px] small:w-[95%] sm:w-[95%]">

                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col lg:w-full bg-white outline-none focus:outline-none">
                        {/*header*/}
                        <div className="flex items-center justify-between p-5">
                            <h3 className="text-lg text-black font-semibold">
                                Add New Class
                            </h3>
                            <button
                                className="p-1 ml-auto bg-transparent border-0 text-black float-right leading-none font-semibold outline-none focus:outline-none"
                                onClick={closeModal}
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
                                <div className="mb-1 relative flex justify-center items-center flex-wrap flex-col sm:w-full small:w-full lg:w-[440px]">

                                    <div className="mb-6 relative column-2 flex justify-start items-center sm:w-full small:w-full">
                                        {/* <div className="lg:w-[160px] small:w-[35%] sm:w-[35%]">
                                            <label className="font-normal text-black">Class Name <span className="text-red-500">*</span></label>
                                        </div> */}
                                        <div className="lg:w-full small:w-full sm:w-full">
                                            <input
                                                type="hidden"
                                                name="assetid"
                                                placeholder="Enter asset ID"
                                                value={1}
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
                                        {/* <div className="lg:w-[160px] small:w-[35%] sm:w-[35%]">
                                            <label className="font-normal text-black">Class Tags <span className="text-red-500">*</span></label>
                                        </div> */}
                                        <div className="lg:w-full small:w-full sm:w-full relative">
                                            <span className="text-[13px] bg-white px-[2px] absolute top-[-10px] left-[10px]">Class Tags</span>
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

                                    <div className="mb-0 relative flex justify-end items-center w-full">
                                        <button
                                            className="border border-black rounded-lg bg-black text-white text-lg w-20 h-12 mr-5 hover:bg-yellow-951 hover:text-white hover:border-yellow-951 ease-in-out duration-300 disabled:bg-gray-951 disabled:hover:border-gray-951 disabled:border-gray-951"
                                            disabled={(allTags && allTags.length > 0) ? false : true}
                                        >
                                            Save
                                        </button>
                                        <button
                                            className="border border-black rounded-lg bg-white text-black text-lg w-24 h-12 hover:text-white hover:bg-yellow-951 hover:border-yellow-951 ease-in-out duration-300"
                                            onClick={cancelModal}
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
    )
}