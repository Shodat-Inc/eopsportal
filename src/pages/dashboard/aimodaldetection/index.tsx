import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from 'react-redux';
import styles from '../../../styles/Common.module.css';
import Layout from "../../../components/Layout";
import Image from "next/image";
import EopsWatch from "./eopswatch";
import EopsTrace from "./eopstrace";
import EopsWatchModel from "./eopswatchModel";
import EopsTraceModel from "./eopstracemodel";
import axios from "axios";
import { setDataForeOpsWatchAction, } from "@/store/actions/classAction";
import { dataForModalAction } from "@/store/actions/aimodaldetectionAction";
import Router from 'next/router'
import { useRouter } from 'next/router'

export default function AiModelDetection() {
    const dispatch = useDispatch<any>()
    const router = useRouter();
    const routerParams = router.query;
    const [tab, setTab] = useState(1);
    const [search, setSearch] = useState('');
    const [selectClass, setSelectClass] = useState('');
    const [showObject, setShowObject] = useState(false);
    const [showSubClass, setShowSubClass] = useState(false);
    const [showObjLvlButton, setShowObjLvlButton] = useState(false);
    const [getAllClass, setGetAllClass] = useState([] as any);
    const [classObject, setClassObject] = useState([] as any);
    const [selectSubObject, setSelectSubObject] = useState("");
    const [toggleObjectLevel, setToggleObjectLevel] = useState(false);
    const [getAllSubClass, setGetAllSubClass] = useState([] as any);
    const [getAllSubObject, setGetAllSubObject] = useState([] as any);
    const [toggleAsset, setToggleAsset] = useState(false);
    const [chooseClass, setChooseClass] = useState(0);
    const [chooseObject, setChooseObject] = useState(0)
    const [chooseSubClass, setChooseSubClass] = useState(0)
    const [chooseSubObject, setChooseSubObject] = useState(0)
    const [toggleObject, setToggleObject] = useState(false);
    const [toggleSubClass, setToggleSubClass] = useState(false);
    const [toggleSubObject, setToggleSubObject] = useState(false);
    const [toggleReset, setToggleReset] = useState(false);
    const [showSubObjTable, setShowSubObjTable] = useState(false);
    const [tableHeader, setTableHeader] = useState({} as any);
    const [objectData, setObjectData] = useState([] as any);
    const [individualObjectID, setIndividualObjectID] = useState(0)
    const [individualClassObjectID, setIndividualClassObjectID] = useState(0)

    const [tableSubObjectHeader, setSubObjectTableHeader] = useState({} as any);
    const [subObjectData, setSubObjectData] = useState([] as any);

    const [allModelData, setAllModelData] = useState([] as any);


    let access_token = "" as any;
    if (typeof window !== 'undefined') {
        access_token = localStorage.getItem('authToken')
    }

    const toggleTab = (item: any) => {
        setTab(item)
    }
    const [disable, setDisable] = useState(0);

    // All class reducer states
    const classSelector = useSelector((state: any) => state.classReducer);

    // Set Selected sub Object 
    // useEffect(() => {
    //     if (classSelector.dataforeopswatchReducer?.object !== "") {
    //         // setSelectSubObject(classSelector.dataforeopswatchReducer?.object)
    //         setChooseSubObject(classSelector.dataforeopswatchReducer?.object)
    //     }
    // }, [classSelector.dataforeopswatchReducer?.object])

    // Set Selected sub object 
    // useEffect(() => {
    //     if (classSelector.dataforeopswatchReducer?.subClass !== "") {
    //         // setSelectSubClass(classSelector.dataforeopswatchReducer?.subClass)
    //         setChooseSubClass(classSelector.dataforeopswatchReducer?.subClass)
    //     }
    // }, [classSelector.dataforeopswatchReducer?.subClass])


    // Set VIN/PlantID on page load
    // useEffect(() => {
    //     if (classSelector?.dataforeopswatchReducer?.classObject && classSelector?.dataforeopswatchReducer?.classObject !== "") {
    //         // setSelectObject(classSelector.dataforeopswatchReducer.classObject);
    //         setChooseObject(classSelector?.dataforeopswatchReducer?.classObject);
    //         setShowSubClass(true)
    //         setShowObjLvlButton(true)
    //     } else {
    //         setShowSubClass(false)
    //         setShowObjLvlButton(false)
    //     }
    // }, [classSelector?.dataforeopswatchReducer?.classObject])

    // =============== function to get all classes =============== 
    async function fetchClassData() {
        try {
            await axios({
                method: 'GET',
                url: `/api/getAssets`,
                headers: {
                    "Authorization": `Bearer ${access_token}`,
                    "Content-Type": "application/json"
                }

            }).then(function (response) {
                if (response) {
                    setGetAllClass(response?.data?.data?.rows)
                }
            }).catch(function (error) {
                console.log({
                    "ERROR IN AXIOS CATCH": error
                })
            })
        } catch (err) {
            console.log({
                "ERROR IN TRY CATCH": err
            })
        }
    }
    useEffect(() => {
        fetchClassData();
    }, [access_token])


    // Convert ID to Class Name For Class
    const showClassNameFromID = (id: any) => {
        if (id !== "Select") {
            if (getAllClass && getAllClass.length > 0) {
                let filter = getAllClass.filter((item: any) => {
                    return item.id === id
                })
                if (filter) {
                    return filter[0]?.className
                }
            }
        } else {
            return "-Select-"
        }
    }

    // Convert ID to Object Name For Class Object
    const showObjectsIDFromID = (id: any) => {
        if (id !== "Select") {
            if (classObject && classObject.length > 0) {
                let filter = classObject.filter((item: any) => {
                    return item?.ObjectValues[0]?.id === id
                })
                if (filter) {
                    // console.log({
                    //     filter: filter[0]?.ObjectValues[0]?.values
                    // })
                    return filter[0]?.ObjectValues[0]?.values
                }
            }
        } else {
            return "-Select-"
        }
    }

    // Convert ID to SUB-CLASS Name
    const showSubClassNameFromID = (id: any) => {
        if (id !== "Select") {
            if (getAllSubClass && getAllSubClass.length > 0) {
                let filter = getAllSubClass.filter((item: any) => {
                    return item.id === id
                })
                if (filter) {
                    return filter[0]?.className
                }
            }
        } else {
            return "-Select-"
        }
    }


    // Convert ID to Object Name For Class Object
    const showSubObjectsIDFromID = (id: any) => {
        if (id !== "Select") {
            if (getAllSubObject && getAllSubObject.length > 0) {
                let filter = getAllSubObject.filter((item: any) => {
                    return item?.ObjectValues[0]?.id === id
                })
                if (filter) {
                    // console.log({
                    //     filter: filter[0]?.ObjectValues[0]?.values
                    // })
                    return filter[0]?.ObjectValues[0]?.values
                }
            }
        } else {
            return "-Select-"
        }
    }


    // ========== Search input box on changes function ============
    const searchFunction = (e: any) => {
        if (e.target.value === "") {
            setDisable(0)
            setSearch('');
            return;
        }
        setSearch(e.target.value)
        setDisable(2);

    }

    // ============= Reset button on click function =============
    const resetFunction = () => {
        setDisable(0);
        setSearch('');
        setSelectClass('');
        setShowObject(false);
        setShowSubClass(false)
        setShowObjLvlButton(false)
        setToggleObjectLevel(false)
        setShowSubObjTable(false);

        setChooseClass(0);
        setChooseObject(0);
        setChooseSubClass(0);
        setChooseSubObject(0);
        setToggleReset(false);
    }

    // =============== Get object data based on selected class and object =============== 
    async function fetchClassObjectData() {
        try {
            await axios({
                method: 'GET',
                url: `/api/getObjects?id=${chooseClass}`,
                headers: {
                    "Authorization": `Bearer ${access_token}`,
                    "Content-Type": "application/json"
                }
            }).then(function (response) {
                if (response) {
                    // console.log({
                    //     "__RESPONSE__123": response?.data?.objects?.data
                    // })
                    setTableHeader(response?.data?.objects?.data?.rows[0]?.Class?.ClassTags)
                    setClassObject(response?.data?.objects?.data?.rows);
                }
            }).catch(function (error) {
                console.log({
                    "ERROR IN AXIOS CATCH": error
                })
            })
        } catch (err) {
            console.log({
                "ERROR IN TRY CATCH": err
            })
        }
    }
    useEffect(() => {
        if (chooseClass !== 0) {
            fetchClassObjectData();
        }

    }, [chooseClass, access_token])


    // ============= Set dropdown title ============= 
    const title = 'Class Objects'

    const nextDataProps = {
        objectID: chooseClass,
        industryID: chooseObject,
        id: chooseObject,
        subObject: chooseSubClass ? chooseSubClass : "Walls",
        key: chooseSubObject ? chooseSubObject : "TPC71810-01-012",
        model: "Crack Detection"
    }
    const nextData = {
        "class": chooseClass,
        "subClass": chooseSubClass,
        "object": individualClassObjectID,
        "subObject": individualObjectID,
        "model": '',
    }

    // console.log({
    //     nextDataProps: nextDataProps,
    //     nextData: nextData
    // })

    // Toggle sub class and object dropdowns
    const toggleSubClassObjectOption = () => {
        setToggleObjectLevel(!toggleObjectLevel)

    }

    // Close Sub class and Object Dropdowns
    const closeObjectLevel = () => {
        setToggleObjectLevel(false);
        setShowSubObjTable(false);
    }

    // =============== Get object data based on selected class and object ============== 
    async function fetchSubClassData() {
        try {
            await axios({
                method: 'GET',
                url: `/api/getChildAssets?id=${chooseClass}`,
                headers: {
                    "Authorization": `Bearer ${access_token}`,
                    "Content-Type": "application/json"
                }

            }).then(function (response: any) {
                if (response) {
                    setGetAllSubClass(response?.data?.data?.rows);
                }
            }).catch(function (error: any) {
                console.log({
                    "ERROR IN AXIOS CATCH": error
                })
            })
        } catch (err) {
            console.log({
                "ERROR IN TRY CATCH": err
            })
        }
    }
    useEffect(() => {
        fetchSubClassData()
    }, [chooseClass, access_token])

    // console.log({
    //     "__GET_ALL_SUB_CLASS": getAllSubClass
    // })


    // ============== Get Sub Object bases on selection of sub class ================= 

    async function fetchSubObjectData() {
        try {
            await axios({
                method: 'GET',
                url: `/api/getObjects?id=${chooseSubClass}`,
                headers: {
                    "Authorization": `Bearer ${access_token}`,
                    "Content-Type": "application/json"
                }
            }).then(function (response) {
                if (response) {
                    setSubObjectTableHeader(response?.data?.objects?.data?.rows[0]?.Class?.ClassTags)
                    setGetAllSubObject(response?.data?.objects?.data?.rows);

                }
            }).catch(function (error) {
                console.log({
                    "ERROR IN AXIOS CATCH": error
                })
            })
        } catch (err) {
            console.log({
                "ERROR IN TRY CATCH": err
            })
        }
    }
    useEffect(() => {
        if (chooseSubClass !== 0) {


            setTimeout(() => {
                fetchSubObjectData();
            }, 250)
        }
    }, [chooseSubClass, access_token])



    useEffect(() => {
        if (selectSubObject !== "") {
            setShowSubClass(false)
        }
    }, [selectSubObject])


    // =============== Clicking Outside fuinction ===============
    function useOutsideAlerter(ref: any) {
        useEffect(() => {
            function handleClickOutside(event: any) {
                if (ref.current && !ref.current.contains(event.target)) {
                    // setToggleAsset(false);
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


    // =============== Dropdown for Class  ===============
    const toggleClassDropFunction = () => {
        setToggleAsset(!toggleAsset)
    }
    const selectItemFunction = (item: any) => {
        // console.log({
        //     "__ITEM": item
        // })
        setDisable(1);
        setChooseClass(item);
        setToggleAsset(false);
        // setSelectObject('')
        setSelectClass(item)
        setShowObject(true);

        setChooseObject(0);
        setChooseSubClass(0);
        setChooseSubObject(0);
        setToggleReset(true)
    }

    // =============== Dropdown for object ===============
    const toggleObjectDropFunction = () => {
        setToggleObject(!toggleObject);
        setShowSubObjTable(false)
    }

    // Get individual object when selection of any class OBJECT
    const getIndividualObject = (id: any) => {
        if (classObject && classObject.length >= 0) {
            const filter = classObject.filter((item: any) => {
                return item?.id === id
            })
            setObjectData(filter);
        }
    }

    // Select Object Items 
    const selectObjectItemFunction = (item: any, id: any) => {
        setChooseObject(item);
        setIndividualClassObjectID(id)
        setShowSubObjTable(false)
        setToggleObject(false);
        setShowObjLvlButton(true);
        setShowSubClass(true);
        getIndividualObject(id)
    }



    // =============== Dropdown function for sub-class ===============
    const toggleSubClassDropFunction = () => {
        setToggleSubClass(!toggleSubClass);
    }
    const selectSubClassItemFunction = (item: any) => {
        setShowSubObjTable(false);
        setToggleSubClass(false);
        setChooseSubClass(item);
        setChooseSubObject(0);
        setToggleSubObject(false);
    }



    // =============== Dropdown function for sub-class ===============
    const toggleSubObjectDropFunction = () => {
        setShowSubClass(false)
        setToggleSubObject(!toggleSubObject)
    }

    // Get individual object when selection of any class OBJECT
    const getIndividualSubObject = (id: any) => {
        if (getAllSubObject && getAllSubObject.length >= 0) {
            const filter = getAllSubObject.filter((item: any) => {
                return item?.id === id
            })
            setSubObjectData(filter);
        }
    }
    const selectSubClassObjectItemFunction = (item: any, id: any) => {
        // console.log({
        //     "__ITEM": item,
        //     "__ID": id
        // })
        setShowSubClass(false);
        setChooseSubObject(item)
        setToggleSubObject(false)
        setShowSubObjTable(true);

        getIndividualSubObject(id);
        setIndividualObjectID(id)

        // let type = "";
        // if (chooseClass === "Manufacturing Plants") {
        //     type = "ID"
        // } else {
        //     if (chooseSubClass === "Battery") {
        //         type = "SerialNo"
        //     } else {
        //         type = "SerialID"
        //     }
        // }

        // Save data for redux
        let eopsData: any = {
            "class": chooseClass,
            "subClass": chooseSubClass,
            "classObject": chooseObject,
            "object": item,
            "datafor": "eopwatch",
            "type": ""
        }
        // if (Object.keys(classSelector?.dataforeopswatchReducer).length === 0) {
        dispatch(setDataForeOpsWatchAction(eopsData));
        // }
        localStorage.setItem('eopsData', eopsData);
    }


    // ============== Set Datafor (eopswatch/eopstrace) ==========
    useEffect(() => {
        if (classSelector?.dataforeopswatchReducer?.datafor === "eopstrace") {
            setTab(2)
        }
    }, [classSelector?.dataforeopswatchReducer?.datafor])


    // ============= GET ALL MODELS ==============
    async function fetchAllModels() {
        try {
            await axios({
                method: 'GET',
                url: `/api/getModel`,
                headers: {
                    "Authorization": `Bearer ${access_token}`,
                    "Content-Type": "application/json"
                }
            }).then(function (response) {
                if (response) {
                    // console.log({
                    //     "__ALL_MODELS:": response?.data?.message?.data
                    // })
                    setAllModelData(response?.data?.message?.data)
                }
            }).catch(function (error) {
                console.log({
                    "ERROR IN AXIOS CATCH": error
                })
            })
        } catch (err) {
            console.log({
                "ERROR IN TRY CATCH": err
            })
        }
    }
    useEffect(() => {
        fetchAllModels()
    }, [access_token])


    return (
        <div className="font-OpenSans w-full">

            {/* ---------------------------------- TOP AREA ------------------------------ */}
            <div className="w-full text-[20px] font-semibold mb-5">AI Model Detection</div>
            <div className="w-full text-md font-semibold mb-2">Find your object</div>

            {/* Search and all Dropdowns */}

            <div className="border border-yellow-951 min-h-[120px] bg-white rounded-lg w-full p-4 flex justify-start items-start mb-6 flex-wrap flex-row">
                {/* Searchbar */}
                <div className="w-[25%] pr-5">
                    <div className="flex relative">
                        <Image
                            src="/img/search-icon-gray.svg"
                            alt="search"
                            height={22}
                            width={22}
                            className="absolute top-[17px] left-3"
                        />
                        <input
                            type="text"
                            placeholder="Search by ID or Name"
                            id="searchobjects"
                            name="searchobjects"
                            className={`border border-[#A7A7A7] rounded-lg h-[56px] w-full pl-10 pr-2 text-[#666666] ${disable == 1 ? 'bg-[#F2F2F2]' : 'bg-white'}`}
                            autoComplete="off"
                            value={search}
                            onChange={searchFunction}
                            disabled={disable === 1}
                        />
                    </div>
                </div>

                {/* Or Selection */}
                <div className="w-[5%]"><span className="font-bold text-md text-[#666666] relative top-[16px]">Or</span></div>

                {/* Dropdowns */}
                <div className="w-[70%] flex justify-start items-center flex-wrap flex-col">

                    <div className="w-full flex justify-start items-center flex-wrap flex-row">
                        <div className="w-[85%] flex justify-start items-center">
                            {/* Class */}
                            <div className={`${styles.form__wrap} relative w-[50%] ${disable === 2 ? 'pointer-events-none' : 'pointer-events-auto'}`}>
                                <div className='w-full'>
                                    <div className="relative" ref={wrapperRef}>
                                        <div
                                            className={`border rounded-xl border-gray-969 h-[55px] pl-2 pr-5 relative flex items-center justify-start w-[95%] cursor-pointer ${disable === 2 ? 'pointer-events-none bg-[#F2F2F2]' : 'pointer-events-auto bg-[#FFFFFF]'}`}
                                            onClick={toggleClassDropFunction}
                                        >
                                            <label className={`absolute text-sm !top-[-10px] left-2 pl-2 pr-2 ${disable === 2 ? 'pointer-events-none bg-[#F2F2F2]' : 'pointer-events-auto bg-[#FFFFFF]'}`}>Choose Industry type</label>
                                            <Image
                                                src="/img/arrow-down-black.svg"
                                                alt="arrow-down"
                                                height={20}
                                                width={20}
                                                className={`absolute right-3 top-4 ${toggleAsset ? 'rotate-180' : 'rotate-0'}`}
                                            />
                                            <span className="text-lg text-black pl-2">
                                                {chooseClass === 0 ? '-Select-' : showClassNameFromID(chooseClass)}
                                            </span>
                                        </div>

                                        {toggleAsset ?
                                            <div className={`border rounded-xl border-gray-969 h-auto max-h-[250px] w-[350px]  absolute flex items-start justify-start mt-1 overflow-hidden overflow-y-auto bg-white ${styles.scroll} z-10`}>
                                                <ul className="p-0 m-0 w-full">
                                                    <li
                                                        className="px-5 py-2 bg-white cursor-pointer hover:bg-yellow-951 w-full font-normal"
                                                    >
                                                        <span>-Select-</span>
                                                    </li>
                                                    {
                                                        getAllClass && getAllClass.length > 0 ?
                                                            getAllClass.map((item: any, index: any) => {
                                                                return (
                                                                    <li
                                                                        className="px-5 py-2 bg-white cursor-pointer hover:bg-yellow-951 w-full font-normal"
                                                                        onClick={() => selectItemFunction(item.id)}
                                                                        key={index}
                                                                    >
                                                                        <span>{item.className}</span>
                                                                    </li>
                                                                )
                                                            })
                                                            : null
                                                    }
                                                </ul>
                                            </div>
                                            :
                                            null
                                        }
                                    </div>
                                </div>
                            </div>

                            {/* Class Object */}
                            {showObject &&
                                <div className={`${styles.form__wrap} relative w-[50%]`}>
                                    <div className='w-full'>
                                        <div className="relative" ref={wrapperRef}>
                                            <div
                                                className="border rounded-xl border-gray-969 h-[55px] pl-2 pr-5 relative flex items-center justify-start bg-white w-[95%] cursor-pointer"
                                                onClick={toggleObjectDropFunction}
                                            >
                                                <label className="absolute text-sm !top-[-10px] left-2 pl-2 pr-2 bg-white">{title}</label>
                                                <Image src="/img/arrow-down-black.svg" alt="arrow-down" height={20} width={20} className={`absolute right-3 top-4 ${toggleObject ? 'rotate-180' : 'rotate-0'}`} />
                                                <span className="text-lg text-black pl-2">
                                                    {/* {showObjectsIDFromID(chooseObject)} */}
                                                    {chooseObject === 0 ? '-Select-' : showObjectsIDFromID(chooseObject)}
                                                    </span>
                                            </div>

                                            {toggleObject ?
                                                <div className={`border rounded-xl border-gray-969 h-auto max-h-[250px] w-[350px] absolute flex items-start justify-start mt-1 overflow-hidden overflow-y-auto bg-white ${styles.scroll} z-10`}>
                                                    <ul className="p-0 m-0 w-full">
                                                        <li className="px-5 py-2 bg-white cursor-pointer hover:bg-yellow-951 w-full font-normal">-Select-</li>
                                                        {classObject && classObject.length > 0 ?
                                                            classObject.map((item: any, index: any) => {
                                                                let key = '';
                                                                return (
                                                                    <li
                                                                        key={index}
                                                                        value={key}
                                                                        className="px-5 py-2 bg-white cursor-pointer hover:bg-yellow-951 w-full font-normal"
                                                                        onClick={() => selectObjectItemFunction(item?.ObjectValues[0]?.id, item?.id)}
                                                                    >
                                                                        <span>{item?.ObjectValues[0]?.values}</span>
                                                                    </li>
                                                                )
                                                            }) : null
                                                        }
                                                    </ul>
                                                </div>
                                                :
                                                null
                                            }
                                        </div>
                                    </div>
                                </div>
                            }

                        </div>

                        <div className="w-[15%] flex justify-center items-center">
                            {toggleReset &&
                                <div className="flex justify-start items-center">
                                    <Image
                                        src="/img/arrow-left-black.svg"
                                        alt="arrow-left"
                                        height={15}
                                        width={24}
                                        className="mr-1"
                                    />
                                    <button
                                        onClick={resetFunction}
                                        className="text-white bg-[#404040] border border-[#666666] rounded-md flex justify-center items-center h-[30px] px-2 text-sm">
                                        Reset
                                    </button>
                                </div>
                            }
                        </div>
                    </div>

                    {toggleObjectLevel &&
                        <div className="w-full flex justify-start items-start flex-wrap flex-row mt-5">
                            <div className="w-[85%] flex justify-start items-center">
                                {/* Sub Class */}
                                <div className={`${styles.form__wrap} relative w-[50%]`}>
                                    <div className='w-full]'>
                                        <div className="relative" ref={wrapperRef}>
                                            <div
                                                className="border rounded-xl border-gray-969 h-[55px] pl-2 pr-5 relative flex items-center justify-start bg-white w-[95%] cursor-pointer"
                                                onClick={toggleSubClassDropFunction}
                                            >
                                                <label className="absolute text-sm !top-[-10px] left-2 pl-2 pr-2 bg-white">Sub Class</label>
                                                <Image src="/img/arrow-down-black.svg" alt="arrow-down" height={20} width={20} className={`absolute right-3 top-4 ${toggleSubClass ? 'rotate-180' : 'rotate-0'}`} />
                                                <span className="text-lg text-black pl-2">
                                                    {/* {showSubClassNameFromID(chooseSubClass)} */}
                                                    {chooseSubClass === 0 ? '-Select-' : showSubClassNameFromID(chooseSubClass)}
                                                    </span>
                                            </div>

                                            {toggleSubClass ?
                                                <div className={`border rounded-xl border-gray-969 h-auto max-h-[250px] w-[350px] absolute flex items-start justify-start mt-1 overflow-hidden overflow-y-auto bg-white ${styles.scroll} z-10`}>
                                                    <ul className="p-0 m-0 w-full">
                                                        {getAllSubClass && getAllSubClass.length > 0 ?
                                                            getAllSubClass.map((item: any, index: any) => (
                                                                <li
                                                                    key={index}
                                                                    className="px-5 py-2 bg-white cursor-pointer hover:bg-yellow-951 w-full font-normal"
                                                                    onClick={() => selectSubClassItemFunction(item.id)}
                                                                >
                                                                    {item.className}
                                                                </li>
                                                            )) : null
                                                        }
                                                    </ul>
                                                </div>
                                                :
                                                null
                                            }
                                        </div>
                                    </div>
                                </div>

                                {/* Sub Class Object */}
                                <div className={`${styles.form__wrap} relative w-[50%]`}>
                                    <div className='w-full'>
                                        <div className="relative" ref={wrapperRef}>
                                            <div
                                                className="border rounded-xl border-gray-969 h-[55px] pl-2 pr-5 relative flex items-center justify-start bg-white w-[95%] cursor-pointer"
                                                onClick={toggleSubObjectDropFunction}
                                            >
                                                <label className="absolute text-sm !top-[-10px] left-2 pl-2 pr-2 bg-white">Objects</label>
                                                <Image src="/img/arrow-down-black.svg" alt="arrow-down" height={20} width={20} className={`absolute right-3 top-4 ${toggleSubObject ? 'rotate-180' : 'rotate-0'}`} />
                                                <span className="text-lg text-black pl-2">
                                                    {/* {showSubObjectsIDFromID(chooseSubObject)} */}
                                                    {chooseSubObject === 0 ? '-Select-' : showSubObjectsIDFromID(chooseSubObject)}
                                                    </span>
                                            </div>

                                            {toggleSubObject ?
                                                <div className={`border rounded-xl border-gray-969 h-auto max-h-[250px] w-[350px] absolute flex items-start justify-start mt-1 overflow-hidden overflow-y-auto bg-white ${styles.scroll} z-10`}>
                                                    <ul className="p-0 m-0 w-full">
                                                        {
                                                            getAllSubObject && getAllSubObject.length > 0 ?
                                                                getAllSubObject.map((item: any, index: any) => (
                                                                    <li
                                                                        key={index}
                                                                        onClick={() => selectSubClassObjectItemFunction(item?.ObjectValues[0]?.id, item?.id)}
                                                                        className="px-5 py-2 bg-white cursor-pointer hover:bg-yellow-951 w-full font-normal"
                                                                    >
                                                                        {item?.ObjectValues[0]?.values}
                                                                    </li>

                                                                )) : null
                                                        }
                                                    </ul>
                                                </div>
                                                :
                                                null
                                            }
                                        </div>
                                    </div>
                                </div>

                            </div>

                            <div className="w-[15%] flex justify-center items-center">
                                <div className="flex justify-start items-center ml-9">
                                    <button
                                        onClick={closeObjectLevel}
                                        className="bg-white border border-[#EEEEEE] rounded-full flex justify-center items-center h-[40px] w-[40px] hover:bg-yellow-951 hover:border-yellow-951">
                                        <Image
                                            src="/img/x.svg"
                                            alt="x"
                                            height={25}
                                            width={25}
                                        />
                                    </button>
                                </div>
                            </div>
                        </div>
                    }

                    {showObjLvlButton &&
                        <div className="w-full flex justify-end items-end flex-wrap flex-row mt-5">
                            <div className="w-full flex justify-end">
                                <button
                                    className="flex justify-center items-center rounded-lg h-[35px] px-3  py-3 bg-[#404040] border border-[#404040] text-white text-sm"
                                    onClick={toggleSubClassObjectOption}
                                >
                                    <Image
                                        src="/img/plus.svg"
                                        alt="activity"
                                        height={20}
                                        width={20}
                                    />
                                    <span className="ml-2">Object level</span>
                                </button>
                            </div>
                        </div>
                    }
                </div>


                {/* Table of Information */}
                <div className="w-full flex justify-end items-end flex-wrap flex-row mt-5">
                    {showSubClass &&
                        <table className={`table-auto lg:min-w-full sm:w-full small:w-full text-left ${styles.tableV3} ${styles.tableV4}`}>
                            <thead className="text-sm font-normal">
                                <tr>
                                    <th>S.No</th>
                                    {
                                        objectData && objectData.length > 0 ?
                                            tableHeader?.map((item: any, i: any) => (
                                                <th className="capitalize" key={i}>
                                                    {item?.tagName}
                                                </th>
                                            ))
                                            : null
                                    }
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    objectData && objectData.length > 0 ?
                                        objectData.map((items: any, index: any) => (
                                            <tr key={index}>
                                                <td>{index + 1} <span className="hidden">{items?.id}</span></td>
                                                {
                                                    items?.ObjectValues?.map((item: any, i: any) => (
                                                        <td key={i}>
                                                            <span>{item.values ? item.values : '-'}</span>
                                                        </td>
                                                    ))
                                                }
                                            </tr>
                                        ))
                                        : null
                                }

                            </tbody>
                        </table>
                    }

                    {
                        showSubObjTable &&
                        <table className={`table-auto lg:min-w-full sm:w-full small:w-full text-left ${styles.tableV3} ${styles.tableV4}`}>
                            <thead className="text-sm font-normal">
                                <tr>
                                    <th>S.No</th>
                                    {
                                        subObjectData && subObjectData.length > 0 ?
                                            tableSubObjectHeader?.map((item: any, i: any) => (
                                                <th className="capitalize" key={i}>
                                                    {
                                                        item?.tagName
                                                    }
                                                </th>
                                            ))
                                            : null
                                    }
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    subObjectData && subObjectData.length > 0 ?
                                        subObjectData.map((items: any, index: any) => (
                                            <tr key={index}>
                                                <td>{index + 1}</td>
                                                {
                                                    items?.ObjectValues?.map((item: any, i: any) => (
                                                        <td key={i}>
                                                            <span>{item.values ? item.values : '-'}</span>
                                                        </td>
                                                    ))
                                                }
                                            </tr>
                                        ))
                                        : null
                                }

                            </tbody>
                        </table>
                    }
                </div>

            </div>

            {/* ---------------------------------- TOP AREA ENDS ------------------------- */}


            {/* ---------------------------------- BOTTOM AREA ------------------------------ */}
            <div className="w-full text-md font-semibold mb-2">AI Models</div>
            {/* Tabs */}
            <div className="flex justify-between items-center w-full">
                <div className="flex justify-start items-center z-[1] relative top-[1px] text-sm">
                    <button
                        onClick={() => toggleTab(1)}
                        className={`rounded-tr-xl rounded-tl-xl mr-1 h-[46px] min-w-[100px] px-4 inline-flex jsutify-center items-center font-semibold ${tab === 1 ? "bg-white border border-[#E1E1E1] border-b-0 text-black" : "bg-[#474B52] bg-opacity-100 hover:bg-opacity-50 text-white"}`}>
                        <span>eOps Watch</span>
                    </button>
                    <button
                        onClick={() => toggleTab(2)}
                        className={`rounded-tr-xl rounded-tl-xl mr-1 h-[46px] min-w-[100px] px-4 inline-flex jsutify-center items-center font-semibold ${tab === 2 || tab === 3 ? "bg-white border border-[#E1E1E1] border-b-0 " : "bg-[#474B52] bg-opacity-100 hover:bg-opacity-50 text-white"}`}>
                        <span>eOps Trace</span>
                    </button>
                </div>
            </div>

            {/* Tab Contect */}
            <div className="w-full min-h-[500px] border border-gray-957 overflow-hidden1 rounded-tr-xl rounded-br-xl rounded-bl-xl pb-16 bg-[#F2F2F2]" >
                <div className="bg-white w-full h-full rounded-tr-xl rounded-br-xl rounded-bl-xl overflow-hidden">
                    {tab === 1 &&
                        <>
                            {
                                (classSelector?.dataforeopswatchReducer && Object.keys(classSelector?.dataforeopswatchReducer).length) !== 0 || (selectClass !== "")
                                    ?
                                    <EopsWatch
                                        nextDataProps={nextDataProps}
                                        nextData={nextData}
                                        active={chooseSubObject !== 0 ? true : false}
                                        modelData={allModelData}
                                    />
                                    :
                                    <EopsWatchModel />
                            }
                        </>
                    }
                    {tab === 2 &&
                        <>
                            {
                                (classSelector?.dataforeopswatchReducer && Object.keys(classSelector?.dataforeopswatchReducer).length) !== 0 || (selectClass !== "")
                                    ?
                                    <EopsTrace
                                        nextDataProps={nextDataProps}
                                        modelData={allModelData}
                                    />
                                    :
                                    <EopsTraceModel />
                            }
                        </>
                    }
                </div>
            </div>

            {/* ---------------------------------- BOTTOM AREA ENDS ------------------------- */}

        </div>
    )
}

AiModelDetection.getLayout = function getLayout(page: any) {
    return (
        <Layout>{page}</Layout>
    )
}