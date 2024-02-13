import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import styles from '../../../styles/Common.module.css';
import Layout from "../../../components/Layout";
import Image from "next/image";
import Link from "next/link";
import Test from "./test";
import Production from "./production";
import { useRouter } from 'next/router'
import ImageConfig from "./imageconfig";
import Filter from "./filter";
import { getClassFromIDAction, getSubClassFromIDAction, getObjectFromIDAction, getSubObjectFromIDAction } from "@/store/actions/aimodaldetectionAction"; 

export default function Preview() {
    const router = useRouter();
    const dispatch = useDispatch<any>()
    const routerParams = router.query;
    const [defaultTab, setDefaultTab] = useState("Test")
    const [data, setData] = useState([] as any);
    let access_token = "" as any;
    if (typeof window !== 'undefined') {
        access_token = localStorage.getItem('authToken')
    }
    const aimodaldetectionReducer = useSelector((state: any) => state.aimodaldetectionReducer);
    
    const toggleTabFunction = (preview: any) => {
        setDefaultTab(preview)
    }
    useEffect(()=>{
        dispatch(getClassFromIDAction(1));
        let subClassID = 5;
        let ParentClassID = 1;
        let objectID = 2;
        let subObject = 17;
        dispatch(getSubClassFromIDAction(subClassID, ParentClassID));
        dispatch(getObjectFromIDAction(objectID, ParentClassID));
        dispatch(getSubObjectFromIDAction(subObject, subClassID))
    }, [access_token])


    // class(pin):1
    // classObject(pin):1
    // subClass(pin):5
    // subClassObject(pin):106
    // Model(pin):"Crack Detection"

    console.log({
        aimodaldetectionReducer: aimodaldetectionReducer,
        "OBJECT":aimodaldetectionReducer?.getObjectFromIDReducer[0]?.ObjectValues[0]?.values

    })

    return (
        <div className="w-full h-full font-OpenSans">
            <p className="text-black mb-4 font-semibold text-xl">eOps Watch</p>

            {/* Breadcrumb */}
            <div className="relative bg-white rounded-lg px-3 py-1 inline-flex border border-[#E3E3E3]">
                <ul className="flex justify-start items-center text-sm">
                    <li className="flex justify-start items-center">
                        <Link
                            href="/dashboard/aimodaldetection"
                            className="font-semibold"
                        >
                            <span>Home</span>
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
                                pathname: '/dashboard/aimodaldetection/',
                            }}
                            className="font-semibold"
                        >
                            {/* <span>Manufacturing Plants</span> */}
                            <span>{aimodaldetectionReducer?.getClassFromIDReducer && aimodaldetectionReducer?.getClassFromIDReducer[0]?.className}</span>
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
                                pathname: '/dashboard/aimodaldetection/',
                            }}
                            className="font-semibold"
                        >
                            {/* VIN / PlantID */}
                            {/* <span>TPC3305-01</span> */}
                            {aimodaldetectionReducer?.getObjectFromIDReducer &&
                            <span> {aimodaldetectionReducer?.getObjectFromIDReducer[0]?.Class?.ClassTags[0]?.tagName} : </span>
                            }
                            <span>{aimodaldetectionReducer?.getObjectFromIDReducer && aimodaldetectionReducer?.getObjectFromIDReducer[0]?.ObjectValues[0]?.values}</span>
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
                                pathname: '/dashboard/aimodaldetection',
                            }}
                            className="font-semibold"
                        >
                            {/* <span>Wall </span>  */}
                            <span>{aimodaldetectionReducer?.getSubClassFromIDReducer && aimodaldetectionReducer?.getSubClassFromIDReducer[0]?.className}</span>
                            <span> : </span> 
                            {/* <span>TPC71810-01-011</span> */}
                            <span>{aimodaldetectionReducer?.getSubObjectFromIDReducer && aimodaldetectionReducer?.getSubObjectFromIDReducer[0]?.ObjectValues[0]?.values}</span>
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
                                pathname: '/dashboard/aimodaldetection',
                            }}
                            className="font-semibold"
                        >
                            <span>Crack Detection</span>
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

            {/* content TABS */}
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

                        <ImageConfig />

                        <Filter />

                    </div>
                </div>

                {/* Tab Contents */}
                <>
                    {
                        defaultTab === "Test" &&
                        <Test
                            data={aimodaldetectionReducer?.dataForModalReducer}
                            routerParams={routerParams}
                            type="test"
                        />
                    }
                    {
                        defaultTab === "Production" &&
                        <Production
                            data={aimodaldetectionReducer?.dataForModalReducer}
                            routerParams={routerParams}
                            type="production"
                        />
                    }
                </>

            </div>
            {/* Content Ends */}


        </div>
    )
}

Preview.getLayout = function getLayout(page: any) {
    return (
        <Layout>{page}</Layout>
    )
}