import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import styles from '../../../styles/Common.module.css';
import Layout from "../../../components/Layout";
import Image from "next/image";
import Link from "next/link";
import Test from "./test";
import Production from "./production";
import { useRouter } from 'next/router'
import axios from "axios";
import ImageConfig from "./imageconfig";
import PreviewFilter from "./previewfilter";
import {
    getClassNameFromClassID,
    getSubClassNameFromClassID,
    getObjectValueFromObjectID,
    getSubObjectValueFromObjectID
} from "@/store/actions/aimodaldetectionAction";

export default function Preview() {
    const router = useRouter();
    const routerParams = router.query;
    const dispatch = useDispatch<any>()
    const [defaultTab, setDefaultTab] = useState("Test");
    const [toggleDrop, setToggleDrop] = useState(false);
    const [data, setData] = useState([] as any);
    const [enabled, setEnabled] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const classSelector = useSelector((state: any) => state.classReducer);
    const aimodaldetectionReducer = useSelector((state: any) => state.aimodaldetectionReducer);
    let navData = aimodaldetectionReducer?.dataForModalReducer

    // console.log({
    //     navData:navData, 
    //     aimodaldetectionReducer:aimodaldetectionReducer
    // })

    useEffect(() => {
        dispatch(getClassNameFromClassID(navData?.class))
    }, [navData?.class])

    useEffect(() => {
        dispatch(getSubClassNameFromClassID(navData?.subClass, navData?.class))
    }, [navData?.class, navData?.subClass])

    useEffect(() => {
        dispatch(getObjectValueFromObjectID(navData?.classObject, navData?.class))
    }, [navData?.classObject, navData?.class])

    useEffect(() => {
        dispatch(getSubObjectValueFromObjectID(navData?.subClassObject, navData?.subClass))
    }, [navData?.subClassObject, navData?.subClass])

    console.log({
        classSelector: classSelector,
        aimodaldetectionReducer: aimodaldetectionReducer,
        navData: navData
    })

    const toggleTabFunction = (preview: any) => {
        setDefaultTab(preview)
    }

    const toggleDropFunction = () => {
        setToggleDrop(!toggleDrop);
    }

    const filteredDataTest = data.filter((item: any) => {
        return item.folder === "Test"
    })
    const filteredDataProduction = data.filter((item: any) => {
        return item.folder === "Production"
    })

    const checkboxFunction = (event: any) => {
        if (event.currentTarget.checked) {
            setEnabled(true)
        } else {
            setEnabled(false)
        }
    }

    // Data from child comp to parent
    const handleClose = (item: any) => {
        setShowModal(false)
    }
    const handleFilter = (filterData: any) => {
        console.log({
            "FILTERDATA": filterData
        })
    }

    return (
        <div className="w-full h-full font-OpenSans">
            <p className="text-black mb-4 font-semibold text-xl">eOps Watch</p>
            {/* Breadcrumb */}
            <div className="relative bg-white rounded-lg px-3 py-1 inline-flex border border-[#E3E3E3]">
                <ul className="flex justify-start items-center text-sm">
                    <li className="flex justify-start items-center">
                        <Link
                            href="/dashboard/assetmanagement"
                            className="font-semibold"
                        >
                            Object Management
                        </Link>
                    </li>
                    <li className="flex justify-start items-center">
                        <Image
                            src="/img/chevron-right.svg"
                            alt="chevron-right"
                            height={28}
                            width={28}
                        />
                        <Link
                            href={{
                                pathname: '/dashboard/assetmanagement',
                                // query:{
                                //     objectID:routerParams.objectID
                                // }
                            }}
                            className="font-semibold"
                        >
                            {/* {navData.class} */}
                            {aimodaldetectionReducer?.getClassNameFromIDReducer}
                        </Link>
                    </li>
                    <li className="flex justify-start items-center">
                        <Image
                            src="/img/chevron-right.svg"
                            alt="chevron-right"
                            height={28}
                            width={28}
                        />
                        <Link
                            href={{
                                pathname: '/dashboard/assetmanagement',
                            }}
                            className="font-semibold"
                        >
                            {/* {
                                routerParams.objectID === "Manufacturing Plants"
                                ?
                                <span>Plant ID : {routerParams.id}</span>
                                :
                                <span>VIN : {routerParams.id}</span>
                            } */}

                            {/* {navData?.classObject} */}
                            {aimodaldetectionReducer?.getObjetValueFromIDReducer}

                        </Link>
                    </li>
                    <li className="flex justify-start items-center">
                        <Image
                            src="/img/chevron-right.svg"
                            alt="chevron-right"
                            height={28}
                            width={28}
                        />
                        <Link
                            href={{
                                pathname: '/dashboard/assetmanagement',
                                // query: {
                                //     objectID: routerParams.objectID,
                                //     subObject: routerParams.subObject,
                                //     key: routerParams.key,
                                //     id: routerParams.id,
                                //     industryID:routerParams.industryID
                                // }
                            }}
                            className="font-semibold"
                        >
                            <span>{aimodaldetectionReducer?.getSubClassNameFromIDReducer}</span> : <span>{aimodaldetectionReducer?.getSubObjectValueFromIDReducer}</span>
                        </Link>
                    </li>
                    <li className="flex justify-start items-center">
                        <Image
                            src="/img/chevron-right.svg"
                            alt="chevron-right"
                            height={28}
                            width={28}
                        />
                        <Link
                            href={{
                                pathname: '/dashboard/assetmanagement/aimodalsdetection',
                                // query: {
                                //     objectID: routerParams.objectID,
                                //     subObject: routerParams.subObject,
                                //     key: routerParams.key,
                                //     id: routerParams.id,
                                //     industryID:routerParams.industryID
                                // }
                            }}
                            className="font-semibold"
                        >
                            {navData?.model}
                        </Link>
                    </li>
                    <li className="flex justify-start items-center">
                        <Image
                            src="/img/chevron-right.svg"
                            alt="chevron-right"
                            height={28}
                            width={28}
                        />
                        <span className="text-gray-967 capitalize">{defaultTab}</span>
                    </li>
                </ul>
            </div>

            {/* content */}
            <div className="flex relative justify-start items-start h-[54px] mt-5">
                <button
                    onClick={() => toggleTabFunction("Test")}
                    className={`h-[54px] w-[70px] rounded-tl-lg rounded-tr-lg flex justify-center items-center ${defaultTab === "Test" ? "bg-white" : "bg-yellow-951 bg-opacity-50 hover:bg-opacity-100"}`}>
                    <span className="font-semibold">Test</span>
                </button>
                <button
                    onClick={() => toggleTabFunction("Production")}
                    className={`h-[54px] w-[120px] rounded-tl-lg rounded-tr-lg flex justify-center items-center ${defaultTab === "Production" ? "bg-white" : "bg-yellow-951 bg-opacity-50 hover:bg-opacity-100"}`}>
                    <span className="font-semibold">Production</span>
                </button>
            </div>
            <div className="flex flex-wrap flex-col justify-start items-start bg-white rounded-r-lg rounded-bl-xl overflow-hidden1 min-h-[600px]">
                {/*  Tab buttons and filters */}
                <div className="flex justify-between items-center w-full h-[65px]">
                    <div className="flex relative justify-start items-center h-[65px]">
                        <p className="text-md font-semibold px-3 py-2">Images</p>
                    </div>
                    <div className="flex justify-start items-center relative pr-3 h-[65px]">
                        {defaultTab === "Production" && <>
                            <div className="flex items-center justify-start ml-7">
                                <p className="text-gray mr-3 text-sm font-semibold">{enabled ? "Enabled" : "Disabled"}</p>
                                <div className={`${styles.radioWrap} relative top-[2px]`}>
                                    <input
                                        type="checkbox"
                                        onChange={checkboxFunction}
                                    />
                                    <span className={`${styles.radioFrame}`}></span>
                                </div>
                            </div>
                            <Link
                                href="/dashboard/eopswatch/raisedalerts"
                                className={`border-2 rounded-lg border-gray-969 h-[44px] px-2 py-1 flex justify-center items-center mr-4`}
                            >
                                <Image
                                    src="/img/message-square.svg"
                                    alt="Upload"
                                    height={24}
                                    width={24}
                                />
                                <span className="text-sm ml-2 mr-2 font-semibold">Alerts</span>
                            </Link>
                        </>}

                        {/* IMAGE CONFIG DROPDOWN */}
                        <div className="relative">
                            <button
                                onClick={toggleDropFunction}
                                className={`border-2 rounded-lg border-gray-969 h-[44px] px-2 py-1 flex justify-center items-center mr-4 relative ${toggleDrop ? 'bg-gray-969' : 'bg-white'}`}
                            >
                                <Image
                                    src="/img/upload-black.svg"
                                    alt="Upload"
                                    height={24}
                                    width={24}
                                />
                                <span className="text-sm ml-2 mr-2 font-semibold">Images Config</span>
                                <Image
                                    src="/img/more-vertical.svg"
                                    alt="more"
                                    height={24}
                                    width={24}
                                />
                            </button>
                            {toggleDrop &&
                                <div className="bg-black text-white border overflow-hidden border-black rounded-xl w-56 flex flex-col flex-wrap items-start justify-start shadow-sm absolute top-[50px] right-[14px] z-[1]">
                                    <button
                                        onClick={() => { setShowModal(true); setToggleDrop(false) }}
                                        className="text-white text-sm hover:bg-white hover:text-black h-[40px] px-4 border-b border-gray-900 w-full text-left">
                                        <span>API Configuration</span>
                                    </button>
                                    <button
                                        onClick={() => setToggleDrop(false)}
                                        className="text-white text-sm hover:bg-white hover:text-black h-[40px] px-4 border-b border-gray-900 w-full text-left">
                                        <span>Upload Images</span>
                                    </button>
                                </div>
                            }
                        </div>

                        {/* ========FILTERS============ */}
                        <PreviewFilter handleFilter={handleFilter} />
                        {/* ========FILTERS ENDS============ */}

                    </div>
                </div>

                {/* Tab Contents */}
                <>
                    {defaultTab === "Test" && <Test data={aimodaldetectionReducer?.dataForModalReducer} tab={"test"} />}
                    {defaultTab === "Production" && <Production data={aimodaldetectionReducer?.dataForModalReducer} tab={"production"} />}
                </>

            </div>
            {/* Content Ends */}

            {/* ======= IMAGE CONFIG MODEL HERE===== */}
            {showModal && <ImageConfig handleClose={handleClose} />}

        </div>
    )
}

Preview.getLayout = function getLayout(page: any) {
    return (
        <Layout>{page}</Layout>
    )
}