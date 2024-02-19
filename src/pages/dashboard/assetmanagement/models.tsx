import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from 'react-redux';
import styles from '../../../styles/Common.module.css';
import Layout from "../../../components/Layout";
import Image from "next/image";
import Link from "next/link";
import EopsWatch from "../aimodaldetection/eopswatch";
import EopsTrace from "../aimodaldetection/eopswatch";
import EopsWatchModel from "../aimodaldetection/eopswatchModel";
import EopsTraceModel from "../aimodaldetection/eopstracemodel";
import axios from "axios";
import { setClassBreadcrumb,setDataForeOpsWatchAction } from "@/store/actions/classAction";
import Router from 'next/router'
import { useRouter } from 'next/router'

export default function Models() {
    const dispatch = useDispatch<any>()
    const router = useRouter();
    const routerParams = router.query;
    const [selectClass, setSelectClass] = useState('');
    const [nav, setNav] = useState({} as any)
    const [tab, setTab] = useState(1);
    const [chooseSubObject, setChooseSubObject] = useState('Select')
    const toggleTab = (item: any) => {
        setTab(item)
    }
    const getSelClass = useSelector((state: any) => state.classReducer);
    useEffect(() => {
        setNav(getSelClass.classBreadcrumbs)
    }, [getSelClass.classBreadcrumbs])
    // All class reducer states
    const classSelector = useSelector((state: any) => state.classReducer);

    const nextDataProps = {
        objectID: "",
        industryID: "",
        id: "",
        subObject: "",
        key: "",
        model: "Crack Detection"
    }

    const goBacktoHome = () => {

        let abc = {
            "flow": "Object Management",
            "class": classSelector?.classBreadcrumbs?.class,
            "classObjKey": classSelector?.classBreadcrumbs?.classObjKey,
            "classObjValue": classSelector?.classBreadcrumbs?.classObjValue,
            "subClass": classSelector?.classBreadcrumbs?.subClass,
            "subClassObjKey": "",
            "subClassObjValue": "",
            "tab":2,
            "parentTab":0
        }
        dispatch(setClassBreadcrumb(abc))
        dispatch(setDataForeOpsWatchAction(abc))
        
        setTimeout(() => {
            router.push('/dashboard/assetmanagement');
        }, 100)
    }

    const backtoObjectManagementLevel = () => {
        let abc = {
            "flow": "Object Management",
            "class": classSelector?.classBreadcrumbs?.class,
            "classObjKey": classSelector?.classBreadcrumbs?.classObjKey,
            "classObjValue": classSelector?.classBreadcrumbs?.classObjValue,
            "subClass": classSelector?.classBreadcrumbs?.subClass,
            "subClassObjKey": "",
            "subClassObjValue": "",
            "tab":2,
            "parentTab":0
        }
        dispatch(setClassBreadcrumb(abc))
        dispatch(setDataForeOpsWatchAction(abc))
        setTimeout(() => {
            router.push('/dashboard/assetmanagement');
        }, 100)
    }
    
    const backtoSubObjectManagementLevel = () => {
        let abc = {
            "flow": "Object Management",
            "class": classSelector?.classBreadcrumbs?.class,
            "classObjKey": classSelector?.classBreadcrumbs?.classObjKey,
            "classObjValue": classSelector?.classBreadcrumbs?.classObjValue,
            "subClass": classSelector?.classBreadcrumbs?.subClass,
            "subClassObjKey": "",
            "subClassObjValue": "",
            "tab":3,
            "parentTab":2
        }
        dispatch(setClassBreadcrumb(abc))
        dispatch(setDataForeOpsWatchAction(abc))
        setTimeout(() => {
            router.push('/dashboard/assetmanagement');
        }, 100)
    }

    return (
        <div className="font-OpenSans w-full">

            {/* Breadcrumb */}
            {nav ?
                <div className="relative bg-white rounded-lg px-3 py-1 inline-flex border border-[#E3E3E3] mb-5">
                    <ul className="flex justify-start items-center text-sm">
                        <li className="flex justify-start items-center">
                            <Link
                                href="/dashboard/assetmanagement"
                                className="font-semibold"
                            >
                                {nav.flow}
                            </Link>
                        </li>

                        <li className="flex justify-start items-center">
                            <Image
                                src="/img/chevron-right.svg"
                                alt="chevron-right"
                                height={28}
                                width={28}
                            />
                            <button
                                // onClick={() => toggleTab(2)}
                                onClick={goBacktoHome}
                                className="font-semibold"
                            >
                                <span>Class name: {nav.class}</span>
                            </button>
                        </li>

                        <li className="flex justify-start items-center">
                            <Image
                                src="/img/chevron-right.svg"
                                alt="chevron-right"
                                height={28}
                                width={28}
                            />
                            <button
                                // onClick={() => toggleTab(2)}
                                onClick={backtoObjectManagementLevel}
                                className="font-semibold"
                            >
                                <span>{nav.classObjKey}: {nav.classObjValue}</span>
                            </button>
                        </li>

                        <li className="flex justify-start items-center">
                            <Image
                                src="/img/chevron-right.svg"
                                alt="chevron-right"
                                height={28}
                                width={28}
                            />
                            <button
                                // onClick={() => toggleTab(2)}
                                onClick={backtoSubObjectManagementLevel}
                                className="font-semibold"
                            >
                                <span>
                                    Sub Class: {nav.subClass}
                                </span>
                            </button>
                        </li>

                        <li className="flex justify-start items-center">
                            <Image
                                src="/img/chevron-right.svg"
                                alt="chevron-right"
                                height={28}
                                width={28}
                            />
                            <button
                                // onClick={() => toggleTab(2)}
                                onClick={backtoSubObjectManagementLevel}
                                className="font-semibold"
                            >
                                <span>{nav.subClassObjKey}: {nav.subClassObjValue}</span>
                            </button>
                        </li>

                    </ul>
                </div>
                : null
            }

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
            <div className="w-full min-h-[500px]  border border-gray-957 overflow-hidden1 rounded-tr-xl rounded-br-xl rounded-bl-xl pb-16 bg-[#F2F2F2]" >
                <div className="bg-white w-full h-full rounded-tr-xl rounded-br-xl rounded-bl-xl overflow-hidden">
                    {tab === 1 &&
                        <>
                            {
                                (classSelector?.dataforeopswatchReducer && Object.keys(classSelector?.dataforeopswatchReducer).length) !== 0 || (selectClass !== "")
                                    ?
                                    <EopsWatch
                                        nextDataProps={nextDataProps}
                                        active={chooseSubObject !== "Select" ? true : false}
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

Models.getLayout = function getLayout(page: any) {
    return (
        <Layout>{page}</Layout>
    )
}