import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import styles from '../../../styles/Common.module.css';
import Layout from "../../../components/Layout";
import Image from "next/image";
import Link from "next/link";
import EopsWatch from "./eopswatch";
import EopsTrace from "./eopstrace";
import axios from "axios";
import { setDataForeOpsWatchAction } from "@/store/actions/classAction";

export default function AiModelDetection() {
    const [tab, setTab] = useState(1);
    const [search, setSearch] = useState('');
    const [selectClass, setSelectClass] = useState('');
    const [selectObject, setSelectObject] = useState('');
    const [showObject, setShowObject] = useState(false);
    const [showSubClass, setShowSubClass] = useState(false);
    const [getAllClass, setGetAllClass] = useState([] as any);
    const [classObject, setClassObject] = useState([] as any);
    const toggleTab = (item: any) => {
        setTab(item)
    }
    const [disable, setDisable] = useState(0);

    // All class reducer states
    const classSelector = useSelector((state: any) => state.classReducer);
    console.log({
        classSelector: classSelector.dataforeopswatchReducer
    })

    // select class by default
    async function fetchObjectData() {
        try {
            await axios({
                method: 'GET',
                url: `/api/getObjects`,

            }).then(function (response) {
                if (response) {
                    let filtered = response.data.filter((item: any) => {
                        return item.parentAssetName === classSelector.dataforeopswatchReducer.class
                    })
                    setClassObject(filtered)
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
        setSelectClass(classSelector.dataforeopswatchReducer.class)
        if (classSelector.dataforeopswatchReducer.class != "") {
            setShowObject(true);
            setDisable(1);
            fetchObjectData();
        }
    }, [classSelector.dataforeopswatchReducer.class])

    // Set VIN/PlantID on page load
    useEffect(() => {
        setSelectObject(classSelector.dataforeopswatchReducer.classObject)
        if(classSelector.dataforeopswatchReducer.classObject !== "") {
            setShowSubClass(true)
        }
    }, [classSelector.dataforeopswatchReducer.classObject])

    // Get all class on page load
    useEffect(() => {
        setGetAllClass(classSelector.getAllClass)
    }, [classSelector.getAllClass])

    const handleInputFunction = (e: any) => {
        setSearch(e.target.value)
        setDisable(2)
    }
    const handleSelectFunction = (e: any) => {
        setSelectClass(e.target.value)
        setDisable(1);
        setShowObject(true)
    }
    const resetFunction = () => {
        setDisable(0);
        setSearch('');
        setSelectClass('');
        setShowObject(false);
        setShowSubClass(false)
        setSelectObject('')
    }
    const handleObjectFunction = (e: any) => {
        setSelectObject(e.target.value);
        setShowSubClass(true)
    }

    console.log({
        getAllClass: getAllClass,
        classObject: classObject
    })

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
                            className={`border border-gray-[#A7A7A7] rounded-lg h-[56px] w-[250px] pl-10 pr-2 text-[#666666] ${disable == 1 ? 'bg-[#EEEEEE]' : 'bg-white'}`}
                            autoComplete="off"
                            value={search}
                            onChange={handleInputFunction}
                            disabled={disable === 1}
                        />
                    </div>

                    <div className="text-md text-[#666666] ml-5 mr-5">Or</div>
                    <select
                        name="selectClass"
                        id="selectClass"
                        className={`border border-gray-[#A7A7A7] rounded-lg h-[56px] w-[250px] pl-2 pr-2 text-[#000000] ${disable == 2 ? 'bg-[#EEEEEE]' : 'bg-white'}`}
                        onChange={handleSelectFunction}
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

                    {
                        showObject &&
                        <select
                            name="selectClass"
                            id="selectClass"
                            className={`border border-gray-[#A7A7A7] rounded-lg h-[56px] w-[250px] pl-2 pr-2 text-[#000000] ml-4`}
                            onChange={handleObjectFunction}
                            value={selectObject}
                        >
                            <option value="">Select {classSelector.dataforeopswatchReducer.class === "Vehicles" ? "VIN" : "PlantID"}</option>
                            {
                            classObject && classObject.length > 0 ?
                                classObject.map((item: any, index: any) => {
                                    let key = classSelector.dataforeopswatchReducer.class === "Vehicles" ? item.subObjects?.VIN : item.subObjects?.PlantID;
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


                {/* Table */}
                {showSubClass &&
                    <div className="w-full mt-3">
                        <div className="w-full flex justify-end">
                            <button className="flex justify-center items-center rounded rounded-xl h-[35px] px-1 py-1 bg-[#404040] border border-[#404040] text-white text-sm mb-7">
                                <Image
                                    src="/img/plus.svg"
                                    alt="activity"
                                    height={20}
                                    width={20}
                                />
                                <span className="ml-2">Object level</span>
                            </button>
                        </div>
                        <table className={`table-auto lg:min-w-full sm:w-full small:w-full text-left ${styles.tableV3} ${styles.tableV4}`}>
                            <thead className="text-sm font-normal">
                                <tr>
                                    <th>VIN No</th>
                                    <th>Mfd Date</th>
                                    <th>Model</th>
                                    <th>Assembly Plant</th>
                                    <th>Lot No</th>
                                    <th>Model Year</th>
                                    <th>Type</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>5PVBE7AJ8R5T50007</td>
                                    <td>06/03/2022</td>
                                    <td>Mineral Wells</td>
                                    <td>GS450</td>
                                    <td>104CY5209</td>
                                    <td>2022</td>
                                    <td>ICE</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                }

            </div>

            <div className="w-full text-md font-semibold mb-2">AI Models</div>
            {/* Tabs */}
            <div className="flex justify-between items-center w-full">
                <div className="flex justify-start items-center z-[1] relative top-[1px] text-sm">
                    <button
                        onClick={() => toggleTab(1)}
                        className={`rounded-tr-xl rounded-tl-xl mr-1 h-[46px] min-w-[100px] px-4 inline-flex jsutify-center items-center font-semibold ${tab === 1 ? "bg-white border border-[#E1E1E1] border-b-0" : "bg-[#404040] bg-opacity-50 hover:bg-opacity-100"}`}>
                        <span>eOps Watch</span>
                    </button>
                    <button
                        onClick={() => toggleTab(2)}
                        className={`rounded-tr-xl rounded-tl-xl mr-1 h-[46px] min-w-[100px] px-4 inline-flex jsutify-center items-center font-semibold ${tab === 2 || tab === 3 ? "bg-white border border-[#E1E1E1] border-b-0" : "bg-[#404040] bg-opacity-50 hover:bg-opacity-100"}`}>
                        <span>eOps Trace</span>
                    </button>
                </div>
            </div>

            {/* Tab Contect */}
            <div className="w-full min-h-[500px] bg-white border border-gray-957 overflow-hidden1 rounded-tr-xl rounded-br-xl rounded-bl-xl pb-32 bg-[#F2F2F2]" >
                <div className="bg-white w-full h-full rounded-tr-xl rounded-br-xl rounded-bl-xl overflow-hidden">
                    {tab === 1 &&
                        <EopsWatch />
                    }
                    {tab === 2 &&
                        <EopsTrace />
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