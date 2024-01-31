import React, { useState, useRef, useEffect } from "react";
import { useDispatch } from 'react-redux';
import styles from '../../../styles/Common.module.css';
import Image from "next/image";
import axios from "axios";
import { 
    editSubClassModalAction, 
    successMessageAction, 
    successMessagAdvancedAction 
} from '@/store/actions/classAction';

export default function EditSubClass(props: any) {

    const dispatch = useDispatch<any>();
    const assetname = useRef("");
    const [allTags, setAllTags] = useState<any[]>([]);
    const [newTag, setNewTag] = useState<string>("");
    const [showInput, setShowInput] = useState(false);
    const [showHideAddTagButton, setShowHideAddTagButton] = useState(false);
    const [toggleDT, setToggleDT] = useState(false);
    const [dataType, setDataType] = useState("");
    const [assetDataType, setAssetDataType] = useState<any[]>([]);
    const [dtObject, setDtObject] = useState<any[]>([]);
    const [allClassData, setAllClassData] = useState([] as any);
    const [allSubClassData, setAllSubClassData] = useState([] as any);
    const [newlyAddedTag, setNewlyAddedTag] = useState([] as any);
    const [deleteTagIDS, setDeleteTagIDS] = useState([] as any);
    const [allDataTypes, setAllDataTypes] = useState([] as any);
    const [className, setClassName] = useState('' as any)
    let access_token = "" as any;
    if (typeof window !== 'undefined') {
        access_token = localStorage.getItem('authToken')
    }
    // GET ALL DATATYPES
    async function fetchData() {
        try {
            await axios({
                method: 'GET',
                url: `/api/getDataType`,
                headers: {
                    "Authorization": `Bearer ${access_token}`,
                    "Content-Type": "application/json"
                }
            }).then(function (response) {
                if (response) {
                    setAllDataTypes(response.data?.data)
                }
            }).catch(function (error) {
                console.log({
                    "ERROR IN AXIOS CATCH (GET DT)": error
                })
            })
        } catch (err) {
            console.log({
                "ERROR IN TRY CATCH (GET DT)": err
            })
        }
    }
    useEffect(() => {
        fetchData();
    }, [access_token])


    // Get class data and filter parent tags based on selected class
    useEffect(() => {
        if (props.classData && props.classData.length > 0) {
            let filtered = props.classData.filter((item: any) => {
                return item.id === props.selectedParentClass;
            })
            setAllClassData(filtered)
        }

    }, [props.classData, props.selectedParentClass])


    // Get Selected Class Data
    useEffect(() => {
        if (props.subClassData && props.subClassData.length > 0) {
            const filtered = props.subClassData.filter((item: any) => {
                return item.id === props.selectedSubClass
            })
            setAllSubClassData(filtered);
            setClassName(filtered[0]?.className)
            setAllTags(filtered[0]?.ClassTags);
        }
    }, [props])


    const closeModal = () => {
        dispatch(editSubClassModalAction(false));
        setShowInput(false);
        setShowHideAddTagButton(false)
        setToggleDT(false);
        setDataType("");
        setAllTags([]);
        setNewTag("");
        setNewlyAddedTag([]);
    }
    const cancelModal = () => {
        dispatch(editSubClassModalAction(false));
        setAllTags([]);
    }


    // Adding New Tags
    const addTags = () => {
        setShowInput(true);
        setShowHideAddTagButton(true);
        setToggleDT(true);
    }
    const closeAddTags = () => {
        setShowInput(!showInput);
        setShowHideAddTagButton(!showHideAddTagButton);
        setToggleDT(!toggleDT);
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
            setShowInput(false);
            setNewTag("");
            setShowHideAddTagButton(false);
            setToggleDT(false);


            // Create New array
            let arr = [] as any;
            arr.push(newTag);
            let newAddedTag = newlyAddedTag.slice();
            newAddedTag.push(newTag);
            setNewlyAddedTag(newAddedTag)

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
        var filteredArray = updatedList.filter(function (e) { return e.id !== item })
        setAllTags(filteredArray)

        let deletedList = deleteTagIDS.slice();
        deletedList.push(item)
        setDeleteTagIDS(deletedList)

        // removing the datatype from datatype array
        let updatedListType = assetDataType;
        var popped = updatedListType.splice(-1);
        setAssetDataType(updatedListType);

        // remove the json item from json item array
        let updatedJSON = dtObject.slice();
        var filteredJSON = updatedJSON.filter(function (e) { return e.tagName !== item })
        setDtObject(filteredJSON)

        // delete from new array
        let newAddedTag = newlyAddedTag.slice();
        newAddedTag.splice(-1);
        setNewlyAddedTag(newAddedTag)

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

        let parentJoinKeyArr = [] as any;
        parentJoinKeyArr.push(form_values.parentJoinKey)


        const dataToSave = {
            id: allSubClassData[0]?.id,
            className: form_values.assetname,
            deleteTagId: deleteTagIDS && deleteTagIDS.length > 0 ? deleteTagIDS : [],
            addTag: dtObject
        };

        let tokenStr = access_token;
        try {
            await axios({
                method: 'PUT',
                url: `/api/updateAssets`,
                data: dataToSave,
                headers: {
                    "Authorization": `Bearer ${tokenStr}`,
                    "Content-Type": "application/json"
                }
            }).then(function (response) {
                if (response) {
                    setAllTags([]);
                    setAllTags([]);
                    setNewlyAddedTag([]);
                    setDtObject([]);
                    dispatch(editSubClassModalAction(false));
                    dispatch(successMessageAction(true))
                    let data = {
                        "type": "editSubClass",
                        "action": true
                    };
                    dispatch(successMessagAdvancedAction(data))
                }
            }).catch(function (error) {
                console.log("ERROR IN AXIOS CATCH (CREATE CLASS):", error)
            })
        } catch (err) {
            console.log("ERROR IN TRY CATCH (CREATE CLASS):", err)
        }
    }

    const handleClassNameChange = (e: any) => {
        setClassName(e.target.value)
    }

    return (
        <>
            <div className={`bg-white h-full z-[11] fixed top-0 right-0 p-5 shadow-lg ${props.show === true ? `${styles.objectContainer} ${styles.sliderShow}` : `${styles.objectContainer}`}`}>

                <div className="flex justify-between items-center w-full mb-3">
                    <h2 className="font-semibold text-lg">Edit Sub Class</h2>
                    <button onClick={closeModal} className="duration-100 outline-none transform active:scale-75 transition-transform">
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

                                    <div className={`mb-5 lg:w-full small:w-full ${styles.form__wrap}`}>
                                        <div className={`relative ${styles.form__group} font-OpenSans`}>
                                            <input
                                                type="text"
                                                id="assetname"
                                                name="assetname"
                                                className={`border border-gray-961 ${styles.form__field}`}
                                                placeholder="Enter sub class name"
                                                required
                                                onChange={handleClassNameChange}
                                                value={className}
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
                                                            {items.tagName}
                                                            <span
                                                                className="duration-100 outline-none transform active:scale-75 transition-transform rounded-full border-2 border-white h-[24px] w-[24px] inline-flex justify-center items-center ml-3 cursor-pointer"
                                                                onClick={() => removeElement(items.id)}
                                                            >
                                                                <Image
                                                                    src="/img/x-circle.svg"
                                                                    alt="close"
                                                                    height={24}
                                                                    width={24}
                                                                />
                                                            </span>
                                                        </span>
                                                    )) : null
                                            }
                                            {
                                                newlyAddedTag && newlyAddedTag.length > 0 ?
                                                    newlyAddedTag.map((items: any, index: any) => (
                                                        <span
                                                            key={index}
                                                            className="rounded-lg inline-flex justify-center items-center h-8 pl-2 pr-2 bg-[#F2F1F1] text-black text-[14px] mr-2 mb-2">
                                                            {items}
                                                            <span
                                                                className="rounded-full border-2 border-white h-[24px] w-[24px] inline-flex justify-center items-center ml-3 duration-100 outline-none transform active:scale-75 transition-transform cursor-pointer"
                                                                onClick={() => removeElement(items)}
                                                            >
                                                                <Image
                                                                    src="/img/x-circle.svg"
                                                                    alt="close"
                                                                    height={24}
                                                                    width={24}
                                                                />
                                                            </span>
                                                        </span>
                                                    ))
                                                    : null
                                            }
                                        </div>

                                        {
                                            showInput ?
                                                <span className="justify-center items-center mb-2 hidden">
                                                    <input
                                                        type="text"
                                                        placeholder="Tag Name"
                                                        className="border border-gray-951 rounded py-[3px] px-[3px] w-[100px] mr-2 h-8 text-sm"
                                                        value={newTag}
                                                        onChange={(e) => setNewTag(e.target.value)}
                                                        required
                                                    />
                                                    <button
                                                        className={`duration-100 outline-none transform active:scale-75 transition-transform text-black border border-transparent rounded inline-flex justify-center items-center text-sm h-8 px-2 ml-1 bg-yellow-951 ${dataType && (dataType != null || dataType != "") ? 'okay' : 'disabled disabled:bg-gray-300'}`}
                                                        onClick={saveNewTag}
                                                        disabled={dataType && (dataType != null || dataType != "") ? false : true}
                                                    >
                                                        Add
                                                    </button>
                                                    <button
                                                        className="text-white border border-transparent rounded inline-flex justify-center items-center text-sm h-8 px-2 ml-1 bg-red-600 duration-100 outline-none transform active:scale-75 transition-transform"
                                                        onClick={cancelAddingTag}
                                                    >
                                                        Cancel
                                                    </button>
                                                </span>
                                                : null
                                        }
                                        <input type="hidden" value={allTags} name="alltags" id="alltags" />


                                        <button
                                            className={`duration-100 outline-none transform active:scale-75 transition-transform text-black inline-flex justify-center items-center text-lg h-8 mb-2 px-2 mt-0 rounded-lg font-semibold ${showHideAddTagButton ? 'bg-gray-951' : 'bg-yellow-951'}`}
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


                                        <div
                                            className={`duration-100 outline-none transform active:scale-75 transition-transform absolute right-1 top-5 ${allTags && allTags.length > 0 ? 'hidden' : ''} cursor-pointer`}
                                            onClick={closeAddTags}
                                        >
                                            <Image
                                                src="/img/arrow-down-black.svg"
                                                alt="arrow-down"
                                                height={29}
                                                width={29}
                                            />
                                        </div>
                                    </div>

                                    {toggleDT ?
                                        <div className="rounded-lg border border-gray-500 min-h-[150px] mt-[1px] pl-2 pr-2 w-full pt-2 pb-2 bg-white absolute top-[100%] right-0 z-10">

                                            <span className="flex justify-center items-center mb-3">
                                                <input
                                                    type="text"
                                                    placeholder="Enter tag name"
                                                    className="border border-gray-951 rounded-lg py-[5px] px-[5px] w-full mr-2 h-12 text-sm"
                                                    value={newTag}
                                                    onChange={(e) => setNewTag(e.target.value)}

                                                />
                                            </span>

                                            <div className="text-sm font-bold color-black mb-2 flex items-center justify-between">
                                                <span>Select Data Type</span>
                                            </div>

                                            {
                                                allDataTypes && allDataTypes.length >= 0 ?
                                                    allDataTypes.map((item: any, index: any) => (
                                                        <div key={index}>
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
                                                        </div>
                                                    ))
                                                    :
                                                    null
                                            }

                                            <div className="flex justify-end items-center w-full">
                                                <button
                                                    className={`outline-none transform active:scale-75 transition-transform border border-black rounded-lg bg-black text-white text-md w-20 h-10 mr-5 hover:bg-yellow-951 hover:text-white hover:border-yellow-951 ease-in-out duration-300 disabled:bg-gray-951 disabled:hover:border-gray-951 disabled:border-gray-951 ${dataType && (dataType != null || dataType != "") ? 'okay' : 'disabled disabled:bg-gray-300'} `}
                                                    onClick={saveNewTag}
                                                    disabled={dataType && (dataType != null || dataType != "") ? false : true}
                                                >
                                                    <span>Save</span>
                                                </button>
                                                <button
                                                    className="border border-black rounded-lg bg-white text-black text-md w-20 h-10 hover:text-white hover:bg-yellow-951 hover:border-yellow-951 ease-in-out duration-100 outline-none transform active:scale-75 transition-transform"
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

                                    <div className={`mb-5 lg:w-full small:w-full ${styles.form__wrap}`}>
                                        <div className={`relative ${styles.form__group} font-OpenSans`}>
                                            <select
                                                id="parentJoinKey"
                                                name="parentJoinKey"
                                                className={`border border-gray-961 ${styles.form__field}`}
                                                placeholder="Parent Join Key"
                                                required
                                                onChange={(e) => (assetname.current = e.target.value)}
                                                // value={pjk}
                                                value={allSubClassData[0]?.ParentJoinKeys[0]?.tagname}
                                            // onChange={handleJoinKey}
                                            // multiple
                                            >
                                                {
                                                    allClassData && allClassData[0]?.ClassTags?.map((item: any, index: any) => (
                                                        <option key={index} value={item.id}>{item.tagName}</option>
                                                    ))
                                                }
                                            </select>
                                            <label htmlFor="parentJoinKey" className={`${styles.form__label}`}>Parent Join Key </label>
                                        </div>
                                        {/* <div className="mt-4  flex-wrap flex-col justify-start items-start hidden">
                                            <div className="flex flex-wrap justify-start items-center">
                                                <span
                                                    className="rounded-lg inline-flex justify-center items-center h-8 pl-2 pr-2 bg-[#F2F1F1] text-black text-[14px] mr-2 mb-2">
                                                    VinNo
                                                    <button
                                                        className="rounded-full border-2 border-white h-[24px] w-[24px] inline-flex justify-center items-center ml-3 duration-100 outline-none transform active:scale-75 transition-transform"
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
                                                        className="rounded-full border-2 border-white h-[24px] w-[24px] inline-flex justify-center items-center ml-3 duration-100 outline-none transform active:scale-75 transition-transform"
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
                                                        className="rounded-full border-2 border-white h-[24px] w-[24px] inline-flex justify-center items-center ml-3 duration-100 outline-none transform active:scale-75 transition-transform"
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
                                                <button className="rounded-lg border border-black flex justify-center items-center py-1 px-3 text-sm duration-100 outline-none transform active:scale-75 transition-transform">Clear All</button>
                                            </div>
                                        </div> */}
                                    </div>

                                </div>
                            </div>

                            <div className="mb-0 relative flex justify-end items-center w-full">
                                <button
                                    className="border border-black rounded-lg bg-black text-white text-lg w-20 h-12 mr-5 hover:bg-yellow-951 hover:text-white hover:border-yellow-951 ease-in-out disabled:bg-gray-951 disabled:hover:border-gray-951 disabled:border-gray-951 duration-100 outline-none transform active:scale-75 transition-transform"
                                    disabled={(allTags && allTags.length > 0) ? false : true}
                                >
                                    Save
                                </button>
                                <div
                                    className="cursor-pointer flex justify-center items-center border border-black rounded-lg bg-white text-black text-lg w-24 h-12 hover:text-white hover:bg-yellow-951 hover:border-yellow-951 ease-in-out duration-100 outline-none transform active:scale-75 transition-transform"
                                    onClick={cancelModal}
                                >
                                    Cancel
                                </div>
                            </div>

                        </div>
                    </form>
                </div>

            </div>
            {props.show === true && <div className={styles.backdrop}></div>}
        </>
    )
}