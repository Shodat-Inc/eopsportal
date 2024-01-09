import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from 'react-redux';
import styles from '../../../styles/Common.module.css';
import Layout from "../../../components/Layout";
import Image from "next/image";
import Link from "next/link";
import EopsWatch from "./eopswatch";
import EopsTrace from "./eopstrace";
import EopsWatchModel from "./eopswatchModel";
import EopsTraceModel from "./eopstracemodel";
import axios from "axios";
import { setDataForeOpsWatchAction } from "@/store/actions/classAction";
import Router from 'next/router'
import { useRouter } from 'next/router'

export default function AiModelDetection() {
    const router = useRouter();
    const routerParams = router.query;
    const [tab, setTab] = useState(1);
    const [search, setSearch] = useState('');
    const [selectClass, setSelectClass] = useState('');
    const [selectObject, setSelectObject] = useState('');
    const [showObject, setShowObject] = useState(false);
    const [showSubClass, setShowSubClass] = useState(false);
    const [showObjLvlButton, setShowObjLvlButton] = useState(false);
    const [getAllClass, setGetAllClass] = useState([] as any);
    const [classObject, setClassObject] = useState([] as any);
    const [selObjectData, setSelObjectData] = useState([] as any);
    const [selectSubClass, setSelectSubClass] = useState("");
    const [selectSubObject, setSelectSubObject] = useState("");
    const [toggleObjectLevel, setToggleObjectLevel] = useState(false);
    const [getAllSubClass, setGetAllSubClass] = useState([] as any);
    const [getAllSubObject, setGetAllSubObject] = useState([] as any);
    const [tableDataSubObject, setTableDataSubObject] = useState([] as any);
    const [toggleAsset, setToggleAsset] = useState(false);
    const [chooseClass, setChooseClass] = useState('');
    const [chooseObject, setChooseObject] = useState('Select')
    const [chooseSubClass, setChooseSubClass] = useState('Select')
    const [chooseSubObject, setChooseSubObject] = useState('Select')
    const [toggleObject, setToggleObject] = useState(false);
    const [toggleSubClass, setToggleSubClass] = useState(false);
    const [toggleSubObject, setToggleSubObject] = useState(false);
    const [toggleReset, setToggleReset] = useState(false);
    const [showSubObjTable, setShowSubObjTable] = useState(false)

    const toggleTab = (item: any) => {
        setTab(item)
    }
    const [disable, setDisable] = useState(0);

    // All class reducer states
    const classSelector = useSelector((state: any) => state.classReducer);

    // Set Selected sub Object 
    useEffect(() => {
        if (classSelector.dataforeopswatchReducer?.object !== "") {
            setSelectSubObject(classSelector.dataforeopswatchReducer?.object)
        }
    }, [classSelector.dataforeopswatchReducer?.object])

    // Set Selected sub object 
    useEffect(() => {
        if (classSelector.dataforeopswatchReducer?.subClass !== "") {
            setSelectSubClass(classSelector.dataforeopswatchReducer?.subClass)
        }
    }, [classSelector.dataforeopswatchReducer?.subClass])


    useEffect(() => {
        if (Object.keys(classSelector.dataforeopswatchReducer).length !== 0 && classSelector.dataforeopswatchReducer.subClass !== "") {
            // toggleObjectLevel
            setToggleObjectLevel(true)
        }

    }, [classSelector.dataforeopswatchReducer])

    // =========== FETCH OBJECT DATA ==============
    async function fetchObjectData() {
        try {
            await axios({
                method: 'GET',
                url: `/api/getObjects`,

            }).then(function (response) {
                if (response) {
                    if (classSelector.dataforeopswatchReducer.class && classSelector.dataforeopswatchReducer.class !== "") {
                        let filtered = response.data.filter((item: any) => {
                            return item.parentAssetName === classSelector.dataforeopswatchReducer.class
                        })
                        setClassObject(filtered)
                    } else {
                        let filtered = response.data.filter((item: any) => {
                            return item.parentAssetName === chooseClass
                        })
                        setClassObject(filtered)
                    }
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
        if (classSelector?.dataforeopswatchReducer?.class && classSelector?.dataforeopswatchReducer?.class !== "") {
            setSelectClass(classSelector.dataforeopswatchReducer.class);
            setChooseClass(classSelector.dataforeopswatchReducer.class);
            setShowObject(true);
            setDisable(1);
            fetchObjectData();
        } else {
            setShowObject(false);
        }
    }, [classSelector.dataforeopswatchReducer])

    useEffect(() => {
        fetchObjectData();
    }, [selectClass])

    // Set VIN/PlantID on page load
    useEffect(() => {
        if (classSelector.dataforeopswatchReducer.classObject && classSelector.dataforeopswatchReducer.classObject !== "") {
            setSelectObject(classSelector.dataforeopswatchReducer.classObject);
            setShowSubClass(true)
            setShowObjLvlButton(true)
        } else {
            setShowSubClass(false)
            setShowObjLvlButton(false)
        }
    }, [classSelector.dataforeopswatchReducer.classObject])

    // =============== function to get all classes =============== 
    async function fetchClassData() {
        try {
            await axios({
                method: 'GET',
                url: `/api/getAssets`,

            }).then(function (response) {
                if (response) {
                    setGetAllClass(response?.data);
                    setChooseClass(response?.data[0]?.assetName)
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

    // Get all class on page load
    useEffect(() => {
        if (classSelector.getAllClass && classSelector.getAllClass.length > 0) {
            setGetAllClass(classSelector.getAllClass)
        } else {
            fetchClassData();
        }
    }, [classSelector.getAllClass])




    // ========== Search input box on changes function ============
    const searchFunction = (e: any) => {
        setSearch(e.target.value)
        setDisable(2)
    }

    // ============= On change class dropdown =============
    // const selectClassFunction = (e: any) => {
    //     setSelectObject('')
    //     setSelectClass(e.target.value)
    //     setChooseClass(e.target.value)
    //     setDisable(1);
    //     setShowObject(true);
    // }

    // ============== On Change object dropdown ==============
    // const selectObjectFunction = (e: any) => {
    //     setSelectObject(e.target.value);
    //     setShowSubClass(true)
    //     setShowObjLvlButton(true)
    // }

    // ============= Reset button on click function =============
    const resetFunction = () => {
        setDisable(0);
        setSearch('');
        setSelectClass('');
        setShowObject(false);
        setShowSubClass(false)
        setShowObjLvlButton(false)
        setSelectObject('')
        setToggleObjectLevel(false)

        setChooseObject("Select");
        setChooseSubClass("Select");
        setChooseSubObject("Select");
        setToggleReset(false);
    }

    // =============== Get object data based on selected class and object =============== 
    async function getObjects() {
        try {
            await axios({
                method: 'GET',
                url: `/api/getObjects`,

            }).then(function (response) {
                if (response) {
                    let filtered = response.data.filter((item: any) => {
                        if (selectClass === 'Vehicles') {
                            return item?.subObjects?.VIN === chooseObject
                        } else {
                            return item?.subObjects?.PlantID === chooseObject
                        }
                    })
                    setSelObjectData(filtered[0]?.subObjects)
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
        if (chooseObject !== "") {
            getObjects();
        }
    }, [chooseObject])

    console.log({
        "__getAllClass": getAllClass,
        "___classObject": classObject,
        "__selObjectData": selObjectData
    })

    // ============= Set dropdown title ============= 
    const title = (selectClass === 'Vehicles') ? 'VIN' : 'PlantID'
    const nextDataProps = {
        objectID: selectClass,
        industryID: selectObject,
        id: selectObject,
        subObject: selectSubClass ? selectSubClass : "Walls",
        key: selectSubObject ? selectSubObject : "TPC71810-01-012",
        model: "Crack Detection"
    }

    // Select Sub Class dropdown function
    // const selectSubClassFunction = (e: any) => {
    //     let val = e.target.value;
    //     setSelectSubClass(val);
    // }

    // Select Sub Class  objects dropdown function
    // const selectSubObjectsFunction = (e: any) => {
    //     let val = e.target.value;
    //     setSelectSubObject(val)
    // }

    // Toggle sub class and object dropdowns
    const toggleSubClassObjectOption = () => {
        setToggleObjectLevel(!toggleObjectLevel)

    }

    // Close Sub class and Object Dropdowns
    const closeObjectLevel = () => {
        setToggleObjectLevel(false);
        setSelectSubClass("");
        setSelectSubObject("");
    }

    // =============== Get object data based on selected class and object ============== 
    async function getSubClass() {
        try {
            await axios({
                method: 'GET',
                url: `/api/getSubAssets`,

            }).then(function (response) {
                if (response) {
                    const filtered = response.data.filter((item: any) => {
                        return item.parentAssetName === chooseClass
                    })
                    setGetAllSubClass(filtered)
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
        getSubClass();
    }, [chooseClass])


    // ============== Get Sub Object bases on selection of sub class ================= 
    async function getSubObjects() {
        try {
            await axios({
                method: 'GET',
                url: `/api/getChildObject`,

            }).then(function (response) {
                if (response) {
                    const filtered = response.data.filter((item: any) => {
                        return item.object === chooseSubClass
                    })
                    setGetAllSubObject(filtered);
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
        getSubObjects()
    }, [chooseSubClass])



    // Get Subobject data based on selected class and object
    async function getSubObjectsData() {
        try {
            await axios({
                method: 'GET',
                url: `/api/getChildObject`,

            }).then(function (response) {
                if (response) {
                    
                    let filtered = [] as any;
                    if (chooseClass === "Vehicles") {
                        filtered = response.data.filter((item: any) => {
                            if (chooseSubClass === "Battery") {
                                return (item.object === chooseSubClass) && item?.tags?.SerialNo === chooseSubObject
                            } else if (chooseSubClass === "Tire") {
                                return (item.object === chooseSubClass) && item?.tags?.SerialID === chooseSubObject
                            } else {
                                return (item.object === chooseSubClass) && item?.tags?.SerialNo === chooseSubObject
                            }
                        })
                        setTableDataSubObject(filtered[0]?.tags)
                    } else {
                        filtered = response.data.filter((item: any) => {
                            return (item.object === chooseSubClass) && item?.tags?.ID === chooseSubObject
                        })
                        setTableDataSubObject(filtered[0]?.tags)
                    }

                    console.log({
                        "___RESPONSE":response.data,
                        "___filtered":filtered,
                        "__chooseClass":chooseClass,
                        "___chooseSubClass":chooseSubClass
                    })
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
        if (chooseSubClass !== "") {
            getSubObjectsData();
        }
    }, [chooseClass, chooseSubClass, chooseSubObject])

    console.log({
        "____tableDataSubObject" : tableDataSubObject
    })


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
        setDisable(1);
        setChooseClass(item);
        setToggleAsset(false);
        setSelectObject('')
        setSelectClass(item)
        setShowObject(true);

        setChooseObject("Select");
        setChooseSubClass("Select");
        setChooseSubObject("Select");
        setToggleReset(true)
    }

    // =============== Dropdown for object ===============
    const toggleObjectDropFunction = () => {
        setToggleObject(!toggleObject)
    }
    const selectObjectItemFunction = (item: any) => {
        setChooseObject(item);
        setSelectObject(item)
        setToggleObject(false);
        setShowObjLvlButton(true);
        setShowSubClass(true)
    }



    // =============== Dropdown function for sub-class ===============
    const toggleSubClassDropFunction = () => {
        setToggleSubClass(!toggleSubClass)
    }
    const selectSubClassItemFunction = (item: any) => {
        setToggleSubClass(false);
        setChooseSubClass(item);
        setChooseSubObject("Select");
        setToggleSubObject(false);
    }



    // =============== Dropdown function for sub-class ===============
    const toggleSubObjectDropFunction = () => {
        setToggleSubObject(!toggleSubObject)
    }
    const selectSubClassObjectItemFunction = (item: any) => {
        setChooseSubObject(item)
        setToggleSubObject(false)
        setShowSubObjTable(true);
        setShowSubClass(false)
    }




    return (
        <div className="font-OpenSans w-full">

            {/* ---------------------------------- TOP AREA ------------------------------ */}
            <div className="w-full text-[20px] font-semibold mb-5">AI Model Detection</div>
            <div className="w-full text-md font-semibold mb-2">Find your object</div>

            {/* Search and all Dropdowns */}

            <div className="border border-yellow-951 min-h-[120px] bg-white rounded rounded-lg w-full p-4 flex justify-start items-start mb-6 flex-wrap flex-row">
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
                            <div className={`${styles.form__wrap} relative w-[50%]`}>
                                <div className='w-full'>
                                    <div className="relative" ref={wrapperRef}>
                                        <div
                                            className="border rounded-xl border-gray-969 h-[55px] pl-2 pr-5 relative flex items-center justify-start bg-white w-[95%] cursor-pointer"
                                            onClick={toggleClassDropFunction}
                                        >
                                            <label className="absolute text-sm !top-[-10px] left-2 pl-2 pr-2 bg-white">Choose Industry type</label>
                                            <Image
                                                src="/img/arrow-down-black.svg"
                                                alt="arrow-down"
                                                height={20}
                                                width={20}
                                                className={`absolute right-3 top-4 ${toggleAsset ? 'rotate-180' : 'rotate-0'}`}
                                            />
                                            <span className="text-lg text-black pl-2">{chooseClass}</span>
                                        </div>

                                        {toggleAsset ?
                                            <div className={`h-52 border rounded-xl border-gray-969 h-auto max-h-[250px] w-[350px]  absolute flex items-start justify-start mt-1 overflow-hidden overflow-y-auto bg-white ${styles.scroll} z-10`}>
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
                                                                        onClick={() => selectItemFunction(item.assetName)}
                                                                        key={index}
                                                                    >
                                                                        <span>{item.assetName}</span>
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
                                                <span className="text-lg text-black pl-2">{chooseObject}</span>
                                            </div>

                                            {toggleObject ?
                                                <div className={`h-52 border rounded-xl border-gray-969 h-auto max-h-[250px] w-[350px] absolute flex items-start justify-start mt-1 overflow-hidden overflow-y-auto bg-white ${styles.scroll} z-10`}>
                                                    <ul className="p-0 m-0 w-full">
                                                        <li className="px-5 py-2 bg-white cursor-pointer hover:bg-yellow-951 w-full font-normal">Select</li>
                                                        {classObject && classObject.length > 0 ?
                                                            classObject.map((item: any, index: any) => {
                                                                let key = '';
                                                                if (classSelector.dataforeopswatchReducer.class && classSelector.dataforeopswatchReducer.class !== "") {
                                                                    if (classSelector.dataforeopswatchReducer.class === "Vehicles") {
                                                                        key = item.subObjects?.VIN
                                                                    } else {
                                                                        key = item.subObjects?.PlantID
                                                                    }
                                                                } else {
                                                                    if (selectClass === "Vehicles") {
                                                                        key = item.subObjects?.VIN
                                                                    } else {
                                                                        key = item.subObjects?.PlantID
                                                                    }
                                                                }
                                                                return (
                                                                    <li
                                                                        key={index}
                                                                        value={key}
                                                                        className="px-5 py-2 bg-white cursor-pointer hover:bg-yellow-951 w-full font-normal"
                                                                        onClick={() => selectObjectItemFunction(key)}
                                                                    >
                                                                        {key}
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
                                        className="text-white bg-[#404040] border border-[#666666] rounded rounded-md flex justify-center items-center h-[30px] px-2 text-sm">
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
                                                <span className="text-lg text-black pl-2">{chooseSubClass}</span>
                                            </div>

                                            {toggleSubClass ?
                                                <div className={`h-52 border rounded-xl border-gray-969 h-auto max-h-[250px] w-[350px] absolute flex items-start justify-start mt-1 overflow-hidden overflow-y-auto bg-white ${styles.scroll} z-10`}>
                                                    <ul className="p-0 m-0 w-full">
                                                        {getAllSubClass && getAllSubClass.length > 0 ?
                                                            getAllSubClass.map((item: any, index: any) => (
                                                                <li
                                                                    key={index}
                                                                    className="px-5 py-2 bg-white cursor-pointer hover:bg-yellow-951 w-full font-normal"
                                                                    onClick={() => selectSubClassItemFunction(item.assetName)}
                                                                >
                                                                    {item.assetName}
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
                                                <span className="text-lg text-black pl-2">{chooseSubObject}</span>
                                            </div>

                                            {toggleSubObject ?
                                                <div className={`h-52 border rounded-xl border-gray-969 h-auto max-h-[250px] w-[350px] absolute flex items-start justify-start mt-1 overflow-hidden overflow-y-auto bg-white ${styles.scroll} z-10`}>
                                                    <ul className="p-0 m-0 w-full">
                                                        {
                                                            getAllSubObject && getAllSubObject.length > 0 ?
                                                                getAllSubObject.map((item: any, index: any) => (
                                                                    <li
                                                                        key={index}
                                                                        onClick={() => selectSubClassObjectItemFunction(selectClass === "Vehicles" ? (item.object === "Tire" ? item?.tags?.SerialID : item?.tags?.SerialNo) : item?.tags?.ID)}
                                                                        className="px-5 py-2 bg-white cursor-pointer hover:bg-yellow-951 w-full font-normal"
                                                                    >
                                                                        {selectClass === "Vehicles" ? (item.object === "Tire" ? item?.tags?.SerialID : item?.tags?.SerialNo) : item?.tags?.ID}
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
                                        className="bg-white border border-[#EEEEEE] rounded rounded-full flex justify-center items-center h-[40px] w-[40px] hover:bg-yellow-951 hover:border-yellow-951">
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
                                    className="flex justify-center items-center rounded rounded-lg h-[35px] px-3  py-3 bg-[#404040] border border-[#404040] text-white text-sm mb-7"
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
                        <table className={`table-auto lg:min-w-full sm:w-full small:w-full text-left ${styles.tableV3} ${styles.tableV41}`}>
                            <thead className="text-sm font-normal">
                                <tr>
                                    {
                                        selObjectData && Object.keys(`selObjectData`).length != 0 ?
                                            Object.keys(selObjectData).map((item: any, index: any) => (
                                                <th className="capitalize" key={index}>
                                                    {
                                                        item.split(/(?=[A-Z])/).join(" ")
                                                    }
                                                </th>
                                            ))
                                            : null
                                    }
                                </tr>
                            </thead>
                            <tbody className="text-sm font-normal">
                                <tr>
                                    {
                                        selObjectData && Object.values(`selObjectData`).length != 0 ?
                                            Object.values(selObjectData).map((item: any, index: any) => (
                                                <td key={index}>
                                                    <span>{item ? item : '-'}</span>
                                                </td>
                                            )) : null
                                    }
                                </tr>
                            </tbody>
                        </table>
                    }

                    {
                        showSubObjTable &&
                        <table className={`table-auto lg:min-w-full sm:w-full small:w-full text-left ${styles.tableV3} ${styles.tableV41}`}>
                            <thead className="text-sm font-normal">
                                <tr>
                                    {
                                        tableDataSubObject && Object.keys(`tableDataSubObject`).length != 0 ?
                                            Object.keys(tableDataSubObject).map((item: any, index: any) => (
                                                <th className="capitalize" key={index}>
                                                    {
                                                        item.split(/(?=[A-Z])/).join(" ")
                                                    }
                                                </th>
                                            ))
                                            : null
                                    }
                                </tr>
                            </thead>
                            <tbody className="text-sm font-normal">
                                <tr>
                                    {
                                        tableDataSubObject && Object.values(tableDataSubObject).length != 0 ?
                                            Object.values(tableDataSubObject).map((item: any, index: any) => (
                                                <td key={index}>
                                                    <span>{item ? item : '-'}</span>
                                                </td>
                                            ))
                                            : null
                                    }
                                </tr>
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
            <div className="w-full min-h-[500px] bg-white border border-gray-957 overflow-hidden1 rounded-tr-xl rounded-br-xl rounded-bl-xl pb-16 bg-[#F2F2F2]" >
                <div className="bg-white w-full h-full rounded-tr-xl rounded-br-xl rounded-bl-xl overflow-hidden">
                    {tab === 1 &&
                        <>
                            {
                                (classSelector?.dataforeopswatchReducer && Object.keys(classSelector?.dataforeopswatchReducer).length) !== 0 || (selectClass !== "")
                                    ?
                                    <EopsWatch
                                        nextDataProps={nextDataProps}
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