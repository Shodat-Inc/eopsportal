import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import styles from '../../../styles/Common.module.css';
import { useRouter } from 'next/router'
import Router from 'next/router'
import Image from "next/image";
import { createNewClass } from "@/store/actions/classAction";
import Layout from "../../../components/Layout";
import NoDataFound from "../../../common/nodatafound";
import { getAssetsData } from "../../../lib/getassets";
import Link from "next/link";
import Template from "../template";
import axios from 'axios';
import AlertMessage from "@/common/alertMessage";
import moment from "moment";
import { setSelectedClass } from "@/store/actions/classAction";
import DeleteModal from "@/common/deletemodal";
import ObjectModal from "./objectmodal";

export default function AddNewClass(props: any) {
    const dispatch = useDispatch<any>();
    const [showModal, setShowModal] = useState(false);
    const [success, setSuccess] = useState(false);
    const assetname = useRef("");
    const [dataTypes, setDataTypes] = useState<any[]>([]);
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
    let access_token = "" as any;
    if (typeof window !== 'undefined') {
        access_token = localStorage.getItem('authToken')
    }
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
            "dataTypeId": datatype
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
        const dataToSave = {
            className: form_values.assetname,
            tags: dtObject
        };
        let tokenStr = access_token;
        // dispatch(createNewClass(dataToSave))
        try {
            await axios({
                method: 'POST',
                url: `/api/createClasses`,
                data: dataToSave,
                headers: {
                    "Authorization": `Bearer ${tokenStr}`,
                    "Content-Type": "application/json"
                }
            }).then(function (response) {
                if (response) {
                    setShowModal(false);
                    setSuccess(true)
                    setAllTags([]);

                    setTimeout(() => {
                        setSuccess(false)
                        props.handleClick(false);
                    }, 1500)
                }
            }).catch(function (error) {
                console.log("err in action:", error)
            })
        } catch (err) {
            console.log("err in action:", err)
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
            <div className={`bg-white h-full z-[11] fixed top-0 right-0 p-5 shadow shadow-lg ${props.show === true ? `${styles.objectContainer} ${styles.sliderShow}` : `${styles.objectContainer}`}`}>

                <div className="flex justify-between items-center w-full mb-3">
                    <h2 className="font-semibold text-lg">Add New Class</h2>
                    <button onClick={closeModal}>
                        <Image
                            src="/img/x.svg"
                            alt="close"
                            height={27}
                            width={27}
                        />
                    </button>
                </div>

                {success &&
                    <div className={`bg-green-957 border-green-958 text-green-959 mb-1 mt-1 border text-md px-4 py-3 rounded rounded-xl relative flex items-center justify-start`}>
                        <Image
                            src="/img/AlertSuccess.svg"
                            alt="Alert Success"
                            height={24}
                            width={24}
                            className='mr-2'
                        />
                        <strong className="font-semibold">Success</strong>
                        <span className="block sm:inline ml-2">Class has been added successfully!</span>
                    </div>
                }

                <div className={`flex justify-start items-start w-full overflow-auto h-full pb-10 ${styles.scroll} pr-3`}>
                    <form
                        className="flex justify-center items-center flex-wrap flex-col lg:w-full"
                        method='post'
                        onSubmit={handleSubmit}
                    >
                        <div className="mb-1 relative flex justify-center items-center flex-wrap flex-col sm:w-full small:w-full lg:w-full">

                            <div className="mb-6 relative column-2 flex justify-start items-center sm:w-full small:w-full">
                                <div className="lg:w-full small:w-full sm:w-full">

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
                                <div className="lg:w-full small:w-full sm:w-full relative">
                                    <span className="text-[13px] bg-white px-[2px] absolute top-[-10px] left-[10px]">Class Tags</span>
                                    <div className={`rounded-lg border border-gray-961  pl-2 pr-2 lg:w-full small:w-full sm:w-full pt-3 pb-2 flex flex-wrap flex-col justify-start items-start min-h-[64px]`}>
                                        <div className={`flex flex-wrap flex-row justify-start w-full ${allTags && allTags.length > 0 ? 'min-h-[150px]' : 'ok'}`}>
                                            {
                                                allTags && allTags.length > 0 ?
                                                    allTags.map((items: any, index: any) => (
                                                        <span
                                                            key={index}
                                                            className="rounded-lg inline-flex justify-center items-center h-8 pl-2 pr-2 bg-[#F2F1F1] text-black text-[14px] mr-2 mb-2">
                                                            {items}
                                                            <button
                                                                className="rounded-full border-2 border-white h-[24px] w-[24px] inline-flex justify-center items-center ml-3"
                                                                onClick={() => removeElement(items)}
                                                            >
                                                                <Image
                                                                    src="/img/x-circle.svg"
                                                                    alt="close"
                                                                    height={24}
                                                                    width={24}
                                                                />
                                                            </button>
                                                        </span>
                                                    )) : null
                                            }
                                        </div>

                                        {
                                            showInput ?
                                                <span className="flex justify-center items-center mb-2 hidden">
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


                                        <button
                                            className={`text-black text-sm inline-flex justify-center items-center text-lg h-8 mb-2 px-2 mt-0 rounded rounded-lg font-semibold ${showHideAddTagButton ? 'bg-gray-951' : 'bg-yellow-951'}`}
                                            onClick={addTags}
                                            disabled={showHideAddTagButton}
                                        >
                                            <Image
                                                src="/img/plusblack.svg"
                                                alt="close"
                                                height={24}
                                                width={24}
                                            />
                                            <span>Add Tag</span>
                                        </button>


                                        <button
                                            className={`absolute right-1 top-5 ${allTags && allTags.length > 0 ? 'hidden' : ''} `}
                                            onClick={addTags}
                                        >
                                            <Image
                                                src="/img/arrow-down-black.svg"
                                                alt="arrow-down"
                                                height={29}
                                                width={29}
                                            />
                                        </button>
                                    </div>

                                    {toggleDT ?
                                        <div className="rounded rounded-lg border border-gray-500 min-h-[150px] mt-[1px] pl-2 pr-2 w-full pt-2 pb-2 bg-white absolute top-[100%] right-0 z-10">

                                            <span className="flex justify-center items-center mb-3">
                                                <input
                                                    type="text"
                                                    placeholder="Enter tag name"
                                                    className="border border-gray-951 rounded rounded-lg py-[5px] px-[5px] w-full mr-2 h-12 text-sm"
                                                    value={newTag}
                                                    onChange={(e) => setNewTag(e.target.value)}

                                                />
                                            </span>

                                            <div className="text-sm font-bold color-black mb-2 flex items-center justify-between">
                                                <span>Select Data Type</span>
                                            </div>

                                            {
                                                props.dataTypes && props.dataTypes.length >= 0 ?
                                                    props.dataTypes.map((item: any, index: any) => (
                                                        <>
                                                            <div className="flex pt-1 pb-1">
                                                                <div className={`${styles.customRadio} mr-2`}>
                                                                    <input
                                                                        id={item.type}
                                                                        type="radio"
                                                                        name="datatype"
                                                                        className="scale-150"
                                                                        value={item.type}
                                                                        checked={dataType === item.id}
                                                                        onChange={() => radioChange(item.id)}
                                                                    />
                                                                    <span></span>
                                                                </div>
                                                                <label htmlFor={item.type} className="text-black font-semibold">{item.name}<span className="text-gray-500 font-normal text-[14px] ml-2">
                                                                    {item.description}
                                                                </span>
                                                                </label>
                                                            </div>
                                                        </>
                                                    ))
                                                    :
                                                    null
                                            }
                                            <div className="hidden">
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

                                            <div className="flex justify-end items-center w-full">
                                                <button
                                                    className={`border border-black rounded-lg bg-black text-white text-md w-20 h-10 mr-5 hover:bg-yellow-951 hover:text-white hover:border-yellow-951 ease-in-out duration-300 disabled:bg-gray-951 disabled:hover:border-gray-951 disabled:border-gray-951 ${dataType && (dataType != null || dataType != "") ? 'okay' : 'disabled disabled:bg-gray-300'} `}
                                                    onClick={saveNewTag}
                                                    disabled={dataType && (dataType != null || dataType != "") ? false : true}
                                                >
                                                    <span>Save</span>
                                                </button>
                                                <button
                                                    className="border border-black rounded-lg bg-white text-black text-md w-20 h-10 hover:text-white hover:bg-yellow-951 hover:border-yellow-951 ease-in-out duration-300"
                                                    onClick={cancelAddingTag}
                                                >
                                                    <span>Cancel</span>
                                                </button>
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
            {props.show === true && <div className={styles.backdrop}></div>}
        </>
    )
}