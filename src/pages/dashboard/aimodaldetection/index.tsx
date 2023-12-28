import React, { useState, useEffect } from "react";
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

    const toggleTab = (item: any) => {
        setTab(item)
    }
    const [disable, setDisable] = useState(0);

    // All class reducer states
    const classSelector = useSelector((state: any) => state.classReducer);
    console.log({
        // classSelector: classSelector.dataforeopswatchReducer
        classSelector: classSelector.dataforeopswatchReducer?.subClass
    })

    // Set Selected sub Object 
    useEffect(()=>{
        if(classSelector.dataforeopswatchReducer?.object!=="") {
            setSelectSubObject(classSelector.dataforeopswatchReducer?.object)
        }        
    }, [classSelector.dataforeopswatchReducer?.object])

    // Set Selected sub object 
    useEffect(()=>{
        if(classSelector.dataforeopswatchReducer?.subClass!=="") {
            setSelectSubClass(classSelector.dataforeopswatchReducer?.subClass)
        }        
    }, [classSelector.dataforeopswatchReducer?.subClass])


    useEffect(() => {
        if(Object.keys(classSelector.dataforeopswatchReducer).length !== 0 && classSelector.dataforeopswatchReducer.subClass!=="") {
            // toggleObjectLevel
            setToggleObjectLevel(true)
        }

    },  [classSelector.dataforeopswatchReducer] )

    // select class by default
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
                            return item.parentAssetName === selectClass
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

    // function to get all classes
    async function fetchClassData() {
        try {
            await axios({
                method: 'GET',
                url: `/api/getAssets`,

            }).then(function (response) {
                if (response) {
                    setGetAllClass(response.data)
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


    // Search input box on changes function
    const searchFunction = (e: any) => {
        setSearch(e.target.value)
        setDisable(2)
    }

    // On change class dropdown
    const selectClassFunction = (e: any) => {
        setSelectObject('')
        setSelectClass(e.target.value)
        setDisable(1);
        setShowObject(true);
    }

    // on changhe object dropdown
    const selectObjectFunction = (e: any) => {
        setSelectObject(e.target.value);
        setShowSubClass(true)
        setShowObjLvlButton(true)
    }

    // Reset button on click function
    const resetFunction = () => {
        setDisable(0);
        setSearch('');
        setSelectClass('');
        setShowObject(false);
        setShowSubClass(false)
        setShowObjLvlButton(false)
        setSelectObject('')
        setToggleObjectLevel(false)
    }

    // Get object data based on selected class and object
    async function getObjects() {
        try {
            await axios({
                method: 'GET',
                url: `/api/getObjects`,

            }).then(function (response) {
                if (response) {
                    let filtered = response.data.filter((item: any) => {
                        if (selectClass === 'Vehicles') {
                            return item?.subObjects?.VIN === selectObject
                        } else {
                            return item?.subObjects?.PlantID === selectObject
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
        if (selectObject !== "") {
            getObjects();
        }
    }, [selectObject])

    // Set dropdown title
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
    const selectSubClassFunction = (e: any) => {
        let val = e.target.value;
        setSelectSubClass(val);
    }

    // Select Sub Class  objects dropdown function
    const selectSubObjectsFunction = (e: any) => {
        let val = e.target.value;
        setSelectSubObject(val)
    }

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

    // Get object data based on selected class and object
    async function getSubClass() {
        try {
            await axios({
                method: 'GET',
                url: `/api/getSubAssets`,

            }).then(function (response) {
                if (response) {
                    const filtered = response.data.filter((item: any) => {
                        return item.parentAssetName === selectClass
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
    }, [selectClass])


    // selectSubObject
    // Get Sub Object bases on selection of sub class 
    async function getSubObjects() {
        try {
            await axios({
                method: 'GET',
                url: `/api/getChildObject`,

            }).then(function (response) {
                if (response) {


                    const filtered = response.data.filter((item: any) => {
                        return item.object === selectSubClass
                    })
                    setGetAllSubObject(filtered)


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
    }, [selectSubClass])



    // Get Subobject data based on selected class and object
    async function getSubObjectsData() {
        try {
            await axios({
                method: 'GET',
                url: `/api/getChildObject`,

            }).then(function (response) {
                if (response) {
                    let filtered = [] as any;
                    if (selectClass === "Vehicles") {
                        filtered = response.data.filter((item: any) => {
                            if(selectSubClass === "Battery") {
                                return (item.object === selectSubClass) && item?.tags?.SerialNo === selectSubObject
                            }else if(selectSubClass === "Tire") {
                                return (item.object === selectSubClass) && item?.tags?.SerialID === selectSubObject
                            } else {
                                return (item.object === selectSubClass) && item?.tags?.SerialNo === selectSubObject
                            }
                        })
                        setTableDataSubObject(filtered[0]?.tags)
                    } else {
                        filtered = response.data.filter((item: any) => {
                            return (item.object === selectSubClass) && item?.tags?.ID === selectSubObject
                        })
                        setTableDataSubObject(filtered[0]?.tags)
                    }
                    console.log({
                        "HERAMIT": response.data,
                        filtered: filtered
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
        if (selectSubObject !== "") {
            getSubObjectsData();
        }
    }, [selectSubObject, selectSubClass])

    console.log({
        getAllSubObject: getAllSubObject,
        selectSubObject: selectSubObject
    })


    useEffect(() => {
        if (selectSubObject !== "") {
            setShowSubClass(false)
        }
    }, [selectSubObject])


    return (
        <div className="font-OpenSans w-full">

            {/* Title */}
            <div className="w-full text-[20px] font-semibold mb-5">AI Model Detection</div>
            <div className="w-full text-md font-semibold mb-2">Find your object</div>

            {/* Search Filter */}
            <div className="border border-yellow-951 min-h-[120px] bg-white rounded rounded-lg w-full p-4 flex justify-start items-center mb-6 flex-wrap flex-row">
                <div className={`flex ${showObject ? 'justify-between' : 'justify-start'} items-center w-full`}>
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
                            className={`border border-[#A7A7A7] rounded-lg h-[56px] w-[250px] pl-10 pr-2 text-[#666666] ${disable == 1 ? 'bg-[#F2F2F2]' : 'bg-white'}`}
                            autoComplete="off"
                            value={search}
                            onChange={searchFunction}
                            disabled={disable === 1}
                        />
                    </div>

                    <div className="text-md text-[#666666] ml-5 mr-5">Or</div>

                    <div className={`${styles.form__wrap} relative`}>
                        <span className="absolute text-[14px] bg-white px-[3px] py-0 left-[15px] top-[-10px]">Class</span>
                        <select
                            name="selectClass"
                            id="selectClass"
                            className={`border border-[#A7A7A7] rounded-lg h-[56px] w-[250px] pl-2 pr-2 text-[#000000] ${disable == 2 ? 'bg-[#EEEEEE]' : 'bg-white'} ${styles.form__field} ${styles.form__field__w}`}
                            onChange={selectClassFunction}
                            value={selectClass}
                            disabled={disable == 2}
                        >
                            <option value="">Select Class</option>
                            {
                                getAllClass && getAllClass.length > 0 ?
                                    getAllClass.map((item: any, index: any) => {
                                        return (
                                            <option
                                                key={index}
                                                value={item.assetName}
                                            >
                                                {item.assetName}
                                            </option>
                                        )
                                    })
                                    : null
                            }
                        </select>
                    </div>

                    {
                        showObject &&

                        <div className={`${styles.form__wrap} relative`}>
                            <span className="absolute text-[14px] bg-white px-[3px] py-0 left-[30px] top-[-10px]">{title}</span>
                            <select
                                name="selectClass"
                                id="selectClass"
                                className={`border border-[#A7A7A7] rounded-lg h-[56px] w-[250px] pl-2 pr-2 text-[#000000] ml-4 ${styles.form__field} ${styles.form__field__w}`}
                                onChange={selectObjectFunction}
                                value={selectObject}
                            >
                                <option value="">Select {title}</option>
                                {
                                    classObject && classObject.length > 0 ?
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
                                                <option
                                                    key={index}
                                                    value={key}
                                                >
                                                    {key}
                                                </option>
                                            )
                                        })
                                        : null
                                }
                            </select>
                        </div>
                    }

                    <div className="flex justify-start items-center ml-4">
                        <Image
                            src="/img/arrow-left-black.svg"
                            alt="arrow-left"
                            height={20}
                            width={30}
                            className="mr-3"
                        />
                        <button
                            onClick={resetFunction}
                            className="text-white bg-[#404040] border border-[#666666] rounded rounded-md flex justify-center items-center h-[30px] px-3 text-sm">
                            Reset
                        </button>
                    </div>
                </div>


                {/* Object/Sub Class level */}
                {toggleObjectLevel &&
                    <div className={`flex ${showObject ? 'justify-between' : 'justify-start'} mt-4 items-center w-full`}>
                        <div className="flex relative invisible">
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
                                className={`border border-[#A7A7A7] rounded-lg h-[56px] w-[250px] pl-10 pr-2 text-[#666666] bg-white`}
                                autoComplete="off"
                            />
                        </div>

                        <div className="text-md text-[#666666] ml-5 mr-5 invisible">Or</div>

                        <div className={`${styles.form__wrap} relative`}>
                            <span className="absolute text-[14px] bg-white px-[3px] py-0 left-[15px] top-[-10px]">Sub Class</span>
                            <select
                                name="selectSubClass"
                                id="selectSubClass"
                                className={`border border-[#A7A7A7] rounded-lg h-[56px] w-[250px] pl-2 pr-2 text-[#000000] bg-white ${styles.form__field} ${styles.form__field__w}`}
                                onChange={selectSubClassFunction}
                                value={selectSubClass}
                            >
                                <option value="">Select sub class</option>
                                {
                                    getAllSubClass && getAllSubClass.length > 0 ?
                                        getAllSubClass.map((item: any, index: any) => (
                                            <option key={index} value={item.assetName}>{item.assetName}</option>

                                        ))
                                        :
                                        null
                                }
                            </select>
                        </div>

                        <div className={`${styles.form__wrap} relative`}>
                            <span className="absolute text-[14px] bg-white px-[3px] py-0 left-[30px] top-[-10px]">Objects</span>
                            <select
                                name="selectSubObject"
                                id="selectSubObject"
                                className={`border border-[#A7A7A7] rounded-lg h-[56px] w-[250px] pl-2 pr-2 text-[#000000] ml-4 ${styles.form__field} ${styles.form__field__w}`}
                                onChange={selectSubObjectsFunction}
                                value={selectSubObject}
                            >
                                <option value="">Select objects</option>
                                {
                                    getAllSubObject && getAllSubObject.length > 0 ?
                                        getAllSubObject.map((item: any, index: any) => (
                                            <option
                                                key={index}
                                                value={selectClass === "Vehicles" ? (item.object === "Tire" ? item?.tags?.SerialID : item?.tags?.SerialNo) : item?.tags?.ID}
                                            >
                                                {selectClass === "Vehicles" ? (item.object === "Tire" ? item?.tags?.SerialID : item?.tags?.SerialNo) : item?.tags?.ID}
                                            </option>

                                        ))
                                        :
                                        null
                                }
                            </select>
                        </div>


                        <div className="flex justify-start items-center ml-9">
                            <Image
                                src="/img/arrow-left-black.svg"
                                alt="arrow-left"
                                height={20}
                                width={30}
                                className="mr-3 invisible"
                            />
                            <button
                                onClick={closeObjectLevel}
                                className="bg-white border border-[#EEEEEE] rounded rounded-full flex justify-center items-center h-[40px] w-[40px] hover:bg-yellow-951 hover:border-yellow-951">
                                <Image
                                    src="/img/x.svg"
                                    alt="x"
                                    height={24}
                                    width={24}
                                />
                            </button>
                        </div>
                    </div>
                }


                {/* Table */}

                <div className="w-full mt-3">
                    {showObjLvlButton &&
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
                    }

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
                                        Object.values(selObjectData).map((item: any, index: any) => (
                                            <td key={index}>
                                                <span>{item ? item : '-'}</span>
                                            </td>
                                        ))
                                    }
                                </tr>
                            </tbody>
                        </table>
                    }

                    {
                        selectSubObject &&
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
                                    tableDataSubObject && Object.keys(tableDataSubObject).length != 0 ?
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

        </div>
    )
}

AiModelDetection.getLayout = function getLayout(page: any) {
    return (
        <Layout>{page}</Layout>
    )
}