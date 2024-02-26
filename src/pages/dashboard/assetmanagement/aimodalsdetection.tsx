import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from 'react-redux';
import Image from "next/image";
import Link from "next/link";
import EopsWatch from "./eopswatch";
import Layout from "../../../components/Layout";
import EopsTrace from "./eopstrace";
import { getAllModelAction } from "@/store/actions/aimodaldetectionAction";
import Breadcrumb from "./breadcrumb";

export default function AiModelDetection() {
    const dispatch = useDispatch<any>()
    const [tab, setTab] = useState(1);
    const [nav, setNav] = useState({} as any)

    // Get all state of store
    const aimodaldetectionReducer = useSelector((state: any) => state.aimodaldetectionReducer);
    const getSelClass = useSelector((state: any) => state.classReducer);

    console.log({
        aimodaldetectionReducer: aimodaldetectionReducer,
        getSelClass:getSelClass?.dataforeopswatchReducer
        
        
    })

    // Calling the get all modal api
    useEffect(() => {
        dispatch(getAllModelAction())
    }, [dispatch])

    // Toggle tabs between eops-watch and eops-trace function
    const toggleTab = (item: any) => {
        setTab(item)
    }

    // Setting breadcrumbs
    useEffect(() => {
        setNav(getSelClass?.classBreadcrumbs)
    }, [getSelClass?.classBreadcrumbs])

    // https://eops.vercel.app/dashboard/eopswatch/preview?objectID=Manufacturing+Plants&subObject=Walls&key=TPC71810-01-012&id=TPC3305-02&model=Crack+Detection&industryID=TPC3305-02&from=eopswatch

    // Sending data to next page
    const nextDataProps = {
        objectID: "",
        industryID: "",
        id: "",
        subObject: "",
        key: "",
        model: ""
    }
    const nextData = {
        "class": getSelClass?.dataforeopswatchReducer?.class,
        "subClass": getSelClass?.dataforeopswatchReducer?.subClass,
        "object": getSelClass?.dataforeopswatchReducer?.object,
        "subObject": getSelClass?.dataforeopswatchReducer?.classObject,
        "model": '',
    }

    return (
        <div className="font-OpenSans w-full">


            {/* ---------------------------------- TOP AREA ------------------------------ */}
            {/* Breadcrumb */}
            {/* {nav ?
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
                                className="font-semibold"
                            >
                                <span>{nav.class}</span>
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
                                className="font-semibold"
                            >
                                {
                                    nav.classObjKey ?
                                        <span>{nav.classObjKey}: {nav.classObjValue}</span>
                                        :
                                        <span>{nav.classObjValue}</span>
                                }
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
                                className="font-semibold"
                            >
                                <span>{nav.subClass}</span>
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
                                className="font-semibold"
                            >
                                <span>{nav.subClassObjValue}</span>
                            </button>
                        </li>

                        <li className="flex justify-start items-center">
                            <Image
                                src="/img/chevron-right.svg"
                                alt="chevron-right"
                                height={28}
                                width={28}
                            />
                            <span className="text-gray-967 capitalize">
                                Models
                            </span>
                        </li>

                    </ul>
                </div>
                : null
            } */}
            <Breadcrumb
                breadcrumbs={nav}
                current={"Modals"}
            />

            {/* ---------------------------------- BOTTOM AREA ------------------------------ */}
            <div className="w-full text-[20px] font-semibold mb-5">AI Model Detection</div>
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
                            <EopsWatch
                                modelData={aimodaldetectionReducer?.getAllModelsReducer || []}
                                nextDataProps={nextDataProps}
                                nextData={nextData}
                                active={true}
                            />
                        </>
                    }
                    {tab === 2 &&
                        <>
                            <EopsTrace
                                modelData={aimodaldetectionReducer?.getAllModelsReducer || []}
                                nextDataProps={nextDataProps}
                                nextData={nextData}
                                active={true}
                            />
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