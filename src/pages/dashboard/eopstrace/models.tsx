import React, { useState, useRef, useEffect } from "react";
import styles from '../../../styles/Common.module.css';
import Layout from "../../../components/Layout";
import Image from "next/image";
import Link from "next/link";
import Router from 'next/router'
import { useRouter } from 'next/router'

const jsonData = [
    {
        "name": "Crack Detection",
        "description": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
        "image": "crack-detection-large.svg",
        "planExpire": "08.31.2023",
        "benifits": [
            "Typesetting industry",
            "Text of the printing",
            "Lorem Ipsum is simply dummy",
            "Lorem Ipsum is simply dummy",
            "Typesetting industry",
            "Text of the printing"
        ],
        "activePlan": true
    },
    {
        "name": "Part Detection",
        "description": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
        "image": "parts-detection-large.svg",
        "planExpire": "04.25.2024",
        "benifits": [
            "Typesetting industry",
            "Text of the printing",
            "Lorem Ipsum is simply dummy",
            "Typesetting industry",
            "Lorem Ipsum is simply dummy",
            "Text of the printing"
        ],
        "activePlan": false
    },
    {
        "name": "Workplace Safety Detection",
        "description": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
        "image": "workplace-safert-detection-large.svg",
        "planExpire": "11.22.2024",
        "benifits": [
            "Lorem Ipsum is simply dummy",
            "Text of the printing",
            "Typesetting industry",
            "Lorem Ipsum is simply dummy",
            "Text of the printing",
            "Typesetting industry"
        ],
        "activePlan": false
    }
]

export default function Models() {
    const router = useRouter();
    const routerParams = router.query;


    const [data, setData] = useState(jsonData[0]);
    const setModelInformation = (model: any) => {
        const filterData = jsonData.filter((item: any) => {
            return item.name === model
        })
        setData(filterData[0]);
    }

    const redirectToNext = () => {
        Router.push({
            pathname: '/dashboard/eopstrace/preview',
            query: {
                objectID: routerParams.objectID,
                subObject: routerParams.subObject,
                key: routerParams.key,
                id: routerParams.id,
                model: data.name,
                industryID: routerParams.id
            }
        })
    }
    const hasParams = routerParams.hasOwnProperty("PlantID");
    const hasObjectParams = routerParams.hasOwnProperty("subObject")
    return (
        <div className="w-full h-full font-OpenSans">
            <p className="text-black text-lg mb-4 font-semibold text-xl">eOps Trace</p>
            {/* Breadcrumb */}
            <div className="flex relative bg-white rounded rounded-lg px-3 py-1 inline-flex border border-[#E3E3E3]">
                <ul className="flex justify-start items-center text-sm">
                    <li className="flex justify-start items-center">
                        <Link
                            href="/dashboard/eopstrace"
                            className="font-semibold"
                        >
                            Home
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
                                pathname: '/dashboard/eopstrace/',
                                query: {
                                    objectID: routerParams.objectID
                                }
                            }}
                            className="font-semibold"
                        >
                            {routerParams.objectID}
                        </Link>
                    </li>
                    <li className="flex justify-start items-center">
                        <Image
                            src="/img/chevron-right.svg"
                            alt="chevron-right"
                            height={28}
                            width={28}
                        />
                        {
                            hasParams
                                ?
                                <Link
                                    href={{
                                        pathname: '/dashboard/eopstrace/objects/',
                                        query: {
                                            objectID: routerParams.objectID,
                                            PlantID: routerParams.PlantID
                                        }
                                    }}
                                    className="font-semibold"
                                >
                                    <span className="capitalize">Plant ID : {routerParams.PlantID}</span>
                                </Link>
                                :
                                <Link
                                    href={{
                                        pathname: '/dashboard/eopstrace/objects/',
                                        query: {
                                            objectID: routerParams.objectID,
                                            VIN: routerParams.VIN
                                        }
                                    }}
                                    className="font-semibold"
                                >
                                    <span className="capitalize">VIN : {routerParams.VIN}</span>
                                </Link>
                        }
                    </li>
                    {
                        routerParams.subObject &&

                        <li className="flex justify-start items-center">
                            <Image
                                src="/img/chevron-right.svg"
                                alt="chevron-right"
                                height={28}
                                width={28}
                            />
                            <Link
                                href={{
                                    pathname: '/dashboard/eopstrace/objects/',
                                    query: {
                                        objectID: routerParams.objectID,
                                        VIN: routerParams.VIN
                                    }
                                }}
                                className="font-semibold"
                            >
                                <span>{routerParams.subObject}</span> : <span>{routerParams.key}</span>
                            </Link>
                        </li>
                    }
                    <li className="flex justify-start items-center">
                        <Image
                            src="/img/chevron-right.svg"
                            alt="chevron-right"
                            height={28}
                            width={28}
                        />
                        <span className="text-gray-967">AI Models</span>
                    </li>
                </ul>
            </div>

            {/* Select Your Model */}

            <div className="flex w-full h-full mt-5">
                <p className="text-md font-semibold">Select your model</p>
            </div>

            <div className="flex w-full h-full mt-5">
                <div className="w-[20%]">
                    <div className="flex flex-wrap flex-row">
                        <button
                            onClick={() => setModelInformation("Crack Detection")}
                            className={`relative flex items-center justify-between rounded-l-xl p-4 h-[106px] w-full bg-white relative text-left ${data.name === "Crack Detection" ? 'border-t-2 border-b-2 border-l-2 border-yellow-951 left-[2px]' : 'border-b-2 border-t-2 border-l-2 border-[#E3E3E3] left-[0px]'}`}>
                            <span className="text-gray-967 text-sm font-semibold w-full">Crack Detection</span>
                            <Image
                                src="/img/crack-detection.svg"
                                alt="crack detection"
                                height={54}
                                width={54}
                            />
                        </button>
                        <button
                            onClick={() => setModelInformation("Part Detection")}
                            className={`relative flex items-center justify-between rounded-l-xl p-4 h-[106px] w-full bg-white relative text-left ${data.name === "Part Detection" ? 'border-t-2 border-b-2 border-l-2 border-yellow-951 left-[2px]' : 'border-b-2 border-l-2 border-[#E3E3E3] left-[0px]'}`}>
                            <span className="text-gray-967 text-md font-semibold w-[50%]">Part Detection</span>
                            <Image
                                src="/img/parts-detection.svg"
                                alt="Part detection"
                                height={54}
                                width={54}
                            />
                        </button>
                        <button
                            onClick={() => setModelInformation("Workplace Safety Detection")}
                            className={`relative flex items-center justify-between rounded-l-xl p-4 h-[106px] w-full bg-white relative text-left ${data.name === "Workplace Safety Detection" ? 'border-t-2 border-b-2 border-l-2 border-yellow-951 left-[2px]' : 'border-b-2 border-l-2 border-[#E3E3E3] left-[0px]'}`}>
                            <span className="text-gray-967 text-md font-semibold">Workplace <br />Safety Detection</span>
                            <Image
                                src="/img/wortkplace-safety-detection.svg"
                                alt="Workplace Safety Detection"
                                height={54}
                                width={54}
                            />
                        </button>
                    </div>
                </div>
                <div className="w-[80%] px-8 py-5 rounded-r-xl rounded-bl-xl border border-yellow-951 border-2 bg-white min-h-[500px]">
                    <div className="flex justify-between items-start mb-8">
                        <div className="text-md font-semibold">Model Details</div>
                        {
                            data.name === "Crack Detection" &&
                            <button className="flex justify-center items-center rounded rounded-xl h-[44px] px-1 py-1 bg-black border border-black text-white">
                                <Image
                                    src="/img/activity-white.svg"
                                    alt="activity"
                                    height={20}
                                    width={20}
                                />
                                <span className="ml-2 text-sm">Model Performance</span>
                            </button>
                        }
                    </div>
                    <div className="mb-8 flex justify-start item-center">
                        <div className="relative">
                            <Image
                                src={`/img/${data.image}`}
                                alt="crack-detection-large"
                                height={136}
                                width={152}
                            />
                        </div>
                        <div className="ml-8">
                            <h3 className="font-semibold text-xl text-black mb-4">{data.name}</h3>
                            <p className="font-semibold text-md text-black mb-1">How it works</p>
                            <p className="text-[14px] text-black">{data.description}</p>
                        </div>
                    </div>
                    <div className="mb-8">
                        <button className="h-[44px] px-2 py-1 px-3 flex justify-center items-center bg-yellow-951 border border-yellow-951 text-md text-black rounded rounded-xl" onClick={redirectToNext}>Access Data</button>
                    </div>
                    <div className="">
                        <div className="flex justify-start items-start flex-wrap flex-col mb-8">
                            <p className="font-semibold text-md text-black mb-2">Benifits</p>
                            <ul className="text-sm flex flex-between items-center flex-wrap flex-row list-disc pl-5">
                                {
                                    data.benifits.map((item: any, index: any) => (
                                        <li key={index} className="w-1/2 mb-3">{item}</li>
                                    ))
                                }
                            </ul>
                        </div>
                        {data.activePlan == true ?
                            <>
                                <div className="flex justify-start items-center">
                                    <button className="h-[44px] px-2 py-1 flex justify-center items-center bg-yellow-951 border border-yellow-951 text-sm text-black rounded rounded-xl">Upgrade Plan</button>
                                    <div className="flex items-center justify-start ml-7">
                                        <p className="text-gray mr-3 text-sm">Auto renew</p>
                                        <div className={`${styles.radioWrap} relative top-[2px]`}>
                                            <input
                                                type="checkbox"
                                            />
                                            <span className={`${styles.radioFrame}`}></span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex justify-start items-start font-semibold mt-3 text-[13px] text-[#666666]">Your model will be expire on : {data.planExpire}</div>
                            </>
                            :
                            <div className="flex justify-start items-start font-semibold mt-3 text-[13px]">
                                <button className="mr-5 flex justify-center items-center rounded rounded-xl h-[44px] px-3 py-1 bg-yellow-951 border border-yellow-951">
                                    <Image
                                        src="/img/shopping-cart.svg"
                                        alt="activity"
                                        height={20}
                                        width={20}
                                    />
                                    <span className="ml-2 text-sm">Add to cart</span>
                                </button>
                                <button className="flex justify-center items-center rounded rounded-xl h-[44px] px-2 py-1 bg-black border border-black text-white">
                                    <span className="text-sm">Request a demo</span>
                                </button>
                            </div>
                        }
                    </div>
                </div>
            </div>

        </div>
    )
}

Models.getLayout = function getLayout(page: any) {
    return (
        <Layout>{page}</Layout>
    )
}