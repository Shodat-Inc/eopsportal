import React, { useState, useRef, useEffect, Component } from "react";
import { useDispatch, useSelector } from 'react-redux';
import styles from '../../../styles/Common.module.css';
import { useRouter } from 'next/router'
import Router from 'next/router'
import Image from "next/image";
import axios from "axios";
import moment from "moment";
import Select from "react-select";
import { successMessageAction } from '@/store/actions/classAction';

export default function AddNewSubClass(props: any) {

    // console.log({
    //     PROPS: props
    // })
    const dispatch = useDispatch<any>();
    const assetname = useRef("");
    const router = useRouter();
    const [allTags, setAllTags] = useState<any[]>([]);
    const [newTag, setNewTag] = useState<string>("");
    const [showInput, setShowInput] = useState(false);
    const [showHideAddTagButton, setShowHideAddTagButton] = useState(false);
    const [toggleDT, setToggleDT] = useState(false);
    const [dataType, setDataType] = useState("");
    const [assetDataType, setAssetDataType] = useState<any[]>([]);
    const [chooseAsset, setChooseAsset] = useState("");
    const [toggleAsset, setToggleAsset] = useState(false);
    const [dtObject, setDtObject] = useState<any[]>([]);

    const [allClassData, setAllClassData] = useState([] as any);
    const [selectedOptions, setSelectedOptions] = useState(null);
    const [selectParentJoin, setSelectParentJoin] = useState("");


    // Get class data and filter parent tags based on selected class
    useEffect(() => {
        if (props.classData && props.classData.length > 0) {
            let filtered = props.classData.filter((item: any) => {
                return item.assetName === props.selectedParentClass;
            })
            setAllClassData(filtered)
            
            let label = [] as any;
            let val = [] as any;
            let ajson = [] as any;
            filtered[0]?.tags?.map((item:any)=>{
                label.push(item.tagName)
                val.push(item.tagName)
                let json: any = CreateJSONForSelect(item.tagName, item.tagName);
                ajson.push(json)
            })

            

            
            // let jsonList = dtObject.slice();
            // jsonList.push(json)
            // setDtObject(jsonList)

            // console.log({
            //     label: label,
            //     val:val,
            //     ajson:ajson
            // })
        }

    }, [props.classData, props.selectedParentClass])

   


    const closeModal = () => {
        props.handleClick(false);
        setShowInput(false);
        setShowHideAddTagButton(false)
        setToggleDT(false);
        setDataType("");
        setAllTags([]);
        setNewTag("");
    }
    const cancelModal = () => {
        props.handleClick(false);
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
            "dataType": datatype
        };
        return myObject;
    }

    function CreateJSONForSelect(value: any, label: any) {
        var myObject = {
            "value": value,
            "label": label
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

        // console.log({
        //     formData: formData,
        //     form_values: form_values,
        //     tags:dtObject,
        //     assetkey: allTags,
        // })
        let parentJoinKeyArr = [] as any;
        parentJoinKeyArr.push(form_values.parentJoinKey)
        const response = await fetch('/api/createSubAssets', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                {
                    assetID: "1234567890",
                    assetName: `${form_values.assetname}`,
                    slug: `${form_values.assetname}`,
                    parentAssetID: `${props.selectedParentClass}`,
                    parentAssetName: `${props.selectedParentClass}`,
                    tags: allTags,
                    parentJoinKey:parentJoinKeyArr,
                    dateCreated: new Date().toLocaleString() + "",
                    dateModified: new Date().toLocaleString() + "",
                    geoScopeLink:"",
                    tagsWithDataType: dtObject,
                    assetTypes: assetDataType
                }
            )
        });
        const resdata = await response.json();
        if (resdata) {
            setAllTags([]);
            dispatch(successMessageAction(true))
            setTimeout(() => {
                props.handleClick(false);
            }, 50);
        } else {
            console.log("FAILED")
        }
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


    // Handle Parent Join Key
    const handleJoinKey = (e:any) => {
        setSelectParentJoin(e.target.value)
    } 


    return (
        <>
            <div className={`bg-white h-full z-[11] fixed top-0 right-0 p-5 shadow shadow-lg ${props.show === true ? `${styles.objectContainer} ${styles.sliderShow}` : `${styles.objectContainer}`}`}>

                <div className="flex justify-between items-center w-full mb-3">
                    <h2 className="font-semibold text-lg">Add New Sub Class</h2>
                    <button onClick={closeModal} className="transition-all duration-[100ms] transition-opacity duration-100 outline-none transform active:scale-75 transition-transform">
                        <Image
                            src="/img/x.svg"
                            alt="close"
                            height={27}
                            width={27}
                        />
                    </button>
                </div>

                <div className={`flex justify-start items-start w-full overflow-auto h-full pb-10 ${styles.scroll} pr-3`}>
                    <form
                        className="flex justify-center items-center flex-wrap flex-col lg:w-full"
                        method='post'
                        onSubmit={handleSubmit}
                    >
                        <div className="mb-1 relative flex justify-center items-center flex-wrap flex-col sm:w-full small:w-full lg:w-full">

                            <div className="mb-6 relative column-2 flex justify-start items-center sm:w-full small:w-full">
                                <div className="lg:w-full small:w-full sm:w-full">
                                    {/* <input
                                        type="hidden"
                                        name="assetid"
                                        placeholder="Enter asset ID"
                                        value={1}
                                    /> */}

                                    <div className={`mb-5 lg:w-full small:w-full small:w-full ${styles.form__wrap}`}>
                                        <div className={`relative ${styles.form__group} font-OpenSans`}>
                                            <input
                                                type="text"
                                                id="assetname"
                                                name="assetname"
                                                className={`border border-gray-961 ${styles.form__field}`}
                                                placeholder="Enter sub class name"
                                                required
                                                onChange={(e) => (assetname.current = e.target.value)}
                                            />
                                            <label htmlFor="assetname" className={`${styles.form__label}`}>Enter sub class name</label>
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
                                                                className="transition-all duration-[100ms] transition-opacity duration-100 outline-none transform active:scale-75 transition-transform rounded-full border-2 border-white h-[24px] w-[24px] inline-flex justify-center items-center ml-3"
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
                                                        className={`transition-all duration-[100ms] transition-opacity duration-100 outline-none transform active:scale-75 transition-transform text-black border border-transparent rounded inline-flex justify-center items-center text-sm h-8 px-2 ml-1 bg-yellow-951 ${dataType && (dataType != null || dataType != "") ? 'okay' : 'disabled disabled:bg-gray-300'}`}
                                                        onClick={saveNewTag}
                                                        disabled={dataType && (dataType != null || dataType != "") ? false : true}
                                                    >
                                                        Add
                                                    </button>
                                                    <button
                                                        className="text-white border border-transparent rounded inline-flex justify-center items-center text-sm h-8 px-2 ml-1 bg-red-600 transition-all duration-[100ms] transition-opacity duration-100 outline-none transform active:scale-75 transition-transform"
                                                        onClick={cancelAddingTag}
                                                    >
                                                        Cancel
                                                    </button>
                                                </span>
                                                : null
                                        }
                                        <input type="hidden" value={allTags} name="alltags" id="alltags" />


                                        <button
                                            className={`transition-all duration-[100ms] transition-opacity duration-100 outline-none transform active:scale-75 transition-transform text-black text-sm inline-flex justify-center items-center text-lg h-8 mb-2 px-2 mt-0 rounded rounded-lg font-semibold ${showHideAddTagButton ? 'bg-gray-951' : 'bg-yellow-951'}`}
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
                                            className={`transition-all duration-[100ms] transition-opacity duration-100 outline-none transform active:scale-75 transition-transform absolute right-1 top-5 ${allTags && allTags.length > 0 ? 'hidden' : ''} `}
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
                                                {/* <span className="bg-black h-8 w-8 p-1 inline-flex rounded-full justify-center items-center">
                                                <Image
                                                    src="/img/tick-white.svg"
                                                    alt="check"
                                                    height={20}
                                                    width={20}
                                                    className="inline-block"
                                                />
                                            </span> */}
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

                                            <div className="flex justify-end items-center w-full">
                                                <button
                                                    className={`transition-all duration-[100ms] transition-opacity duration-100 outline-none transform active:scale-75 transition-transform border border-black rounded-lg bg-black text-white text-md w-20 h-10 mr-5 hover:bg-yellow-951 hover:text-white hover:border-yellow-951 ease-in-out duration-300 disabled:bg-gray-951 disabled:hover:border-gray-951 disabled:border-gray-951 ${dataType && (dataType != null || dataType != "") ? 'okay' : 'disabled disabled:bg-gray-300'} `}
                                                    onClick={saveNewTag}
                                                    disabled={dataType && (dataType != null || dataType != "") ? false : true}
                                                >
                                                    <span>Save</span>
                                                </button>
                                                <button
                                                    className="border border-black rounded-lg bg-white text-black text-md w-20 h-10 hover:text-white hover:bg-yellow-951 hover:border-yellow-951 ease-in-out duration-300 transition-all duration-[100ms] transition-opacity duration-100 outline-none transform active:scale-75 transition-transform"
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


                            <div className="mb-6 relative column-2 flex justify-start items-center sm:w-full small:w-full">
                                <div className="lg:w-full small:w-full sm:w-full">

                                    <div className={`mb-5 lg:w-full small:w-full small:w-full ${styles.form__wrap}`}>
                                        <div className={`relative ${styles.form__group} font-OpenSans`}>
                                            <select
                                                id="parentJoinKey"
                                                name="parentJoinKey"
                                                className={`border border-gray-961 ${styles.form__field}`}
                                                placeholder="Parent Join Key"
                                                required
                                                onChange={(e) => (assetname.current = e.target.value)}
                                                // onChange={handleJoinKey}
                                                // multiple
                                            >
                                                {
                                                    allClassData && allClassData[0]?.tags?.map((item: any, index: any) => (
                                                        <option key={index} value={item.tagName}>{item.tagName}</option>
                                                    ))
                                                }
                                                <option value="">Select</option>
                                            </select>
                                            <label htmlFor="parentJoinKey" className={`${styles.form__label}`}>Parent Join Key </label>
                                        </div>
                                        <div className="mt-4 flex flex-wrap flex-col justify-start items-start hidden">
                                            <div className="flex flex-wrap justify-start items-center">
                                                <span
                                                    className="rounded-lg inline-flex justify-center items-center h-8 pl-2 pr-2 bg-[#F2F1F1] text-black text-[14px] mr-2 mb-2">
                                                    VinNo
                                                    <button
                                                        className="rounded-full border-2 border-white h-[24px] w-[24px] inline-flex justify-center items-center ml-3 transition-all duration-[100ms] transition-opacity duration-100 outline-none transform active:scale-75 transition-transform"
                                                    >
                                                        <Image
                                                            src="/img/x-circle.svg"
                                                            alt="close"
                                                            height={24}
                                                            width={24}
                                                        />
                                                    </button>
                                                </span>
                                                <span
                                                    className="rounded-lg inline-flex justify-center items-center h-8 pl-2 pr-2 bg-[#F2F1F1] text-black text-[14px] mr-2 mb-2">
                                                    MfdDate
                                                    <button
                                                        className="rounded-full border-2 border-white h-[24px] w-[24px] inline-flex justify-center items-center ml-3 transition-all duration-[100ms] transition-opacity duration-100 outline-none transform active:scale-75 transition-transform"
                                                    >
                                                        <Image
                                                            src="/img/x-circle.svg"
                                                            alt="close"
                                                            height={24}
                                                            width={24}
                                                        />
                                                    </button>
                                                </span>
                                                <span
                                                    className="rounded-lg inline-flex justify-center items-center h-8 pl-2 pr-2 bg-[#F2F1F1] text-black text-[14px] mr-2 mb-2">
                                                    Model
                                                    <button
                                                        className="rounded-full border-2 border-white h-[24px] w-[24px] inline-flex justify-center items-center ml-3 transition-all duration-[100ms] transition-opacity duration-100 outline-none transform active:scale-75 transition-transform"
                                                    >
                                                        <Image
                                                            src="/img/x-circle.svg"
                                                            alt="close"
                                                            height={24}
                                                            width={24}
                                                        />
                                                    </button>
                                                </span>
                                            </div>
                                            <div className="mt-3">
                                                <button className="rounded rounded-lg border border-black flex justify-center items-center py-1 px-3 text-sm transition-all duration-[100ms] transition-opacity duration-100 outline-none transform active:scale-75 transition-transform">Clear All</button>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>

                            <div className="mb-0 relative flex justify-end items-center w-full">
                                <button
                                    className="border border-black rounded-lg bg-black text-white text-lg w-20 h-12 mr-5 hover:bg-yellow-951 hover:text-white hover:border-yellow-951 ease-in-out duration-300 disabled:bg-gray-951 disabled:hover:border-gray-951 disabled:border-gray-951 transition-all duration-[100ms] transition-opacity duration-100 outline-none transform active:scale-75 transition-transform"
                                    disabled={(allTags && allTags.length > 0) ? false : true}
                                >
                                    Save
                                </button>
                                <button
                                    className="border border-black rounded-lg bg-white text-black text-lg w-24 h-12 hover:text-white hover:bg-yellow-951 hover:border-yellow-951 ease-in-out duration-300 transition-all duration-[100ms] transition-opacity duration-100 outline-none transform active:scale-75 transition-transform"
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