import React, { useState, useRef, useEffect } from "react";
import styles from '../../../styles/Common.module.css';
import Layout from "../../../components/Layout";
import Image from "next/image";
import Link from "next/link";
import Router from 'next/router'

const jsonData = [
    {
        "name": "Crack Detection",
        "description": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
        "image": "crack-detection-large.svg",
        "planExpire": "08.31.2023",
        "benifits": [
            "Lorem Ipsum is simply dummy",
            "Text of the printing",
            "Typesetting industry",
            "Lorem Ipsum is simply dummy",
            "Text of the printing",
            "Typesetting industry"
        ],
        "activePlan": true
    },
    {
        "name": "Part Detection",
        "description": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
        "image": "parts-detection-large.svg",
        "planExpire": "04.25.2024",
        "benifits": [
            "Lorem Ipsum is simply dummy",
            "Text of the printing",
            "Typesetting industry",
            "Lorem Ipsum is simply dummy",
            "Text of the printing",
            "Typesetting industry"
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
    const [data, setData] = useState(jsonData[0]);
    const [clickCounter, setClickCounter] = useState(0);
    const setModelInformation = (model: any) => {
        const filterData = jsonData.filter((item: any) => {
            return item.name === model
        })
        setData(filterData[0]);
    }
    const redirectToNext = () => {
        Router.push('/dashboard/eopswatch/preview')
    }
    return (
        <div className="w-full h-full font-OpenSans">
            <p className="text-black text-lg mb-4 font-semibold text-xl">eOps Watch</p>
            {/* Breadcrumb */}
            <div className="flex relative bg-white rounded rounded-lg px-3 py-1 inline-flex border border-[#E3E3E3]">
                <ul className="flex justify-start items-center text-sm">
                    <li className="flex justify-start items-center">
                        <Link
                            href="/dashboard/eopswatch"
                            className="font-semibold"
                        >
                            TPC71810-01-012
                        </Link>
                    </li>
                    <li className="flex justify-start items-center">
                        <Image
                            src="/img/chevron-right.svg"
                            alt="chevron-right"
                            height={28}
                            width={28}
                        />
                        <span className="text-gray-967">Models</span>
                    </li>
                </ul>
            </div>

            {/* Select Your Model */}
            <div className="flex w-full h-full mt-5">
                <div className="w-[47%]">
                    <div className="flex flex-wrap flex-row">
                        <button 
                        onClick={() => setModelInformation("Crack Detection")} 
                        onDoubleClick={redirectToNext} 
                        className="flex items-center justify-between border border-yellow-951 rounded rounded-xl p-4 shadow shadow-xl h-[106px] w-[222px] bg-white mr-7 mb-7 relative text-left">
                            <span className="text-gray-967 text-md font-semibold w-[50%]">Crack Detection</span>
                            <Image
                                src="/img/crack-detection.svg"
                                alt="crack detection"
                                height={54}
                                width={54}
                            />
                        </button>
                        <button 
                        onClick={() => setModelInformation("Part Detection")}
                        onDoubleClick={redirectToNext} 
                        className="flex items-center justify-between border border-white rounded rounded-xl p-4 shadow shadow-xl h-[106px] w-[222px] bg-white mb-7 relative text-left">
                            <span className="absolute top-[-10px] left-[-10px]">
                                <Image
                                    src="/img/lock-circle-gray.svg"
                                    alt="Workplace Safety Detection"
                                    height={34}
                                    width={34}
                                />
                            </span>
                            <span className="text-gray-967 text-md font-semibold w-[50%]">Part Detection</span>
                            <Image
                                src="/img/parts-detection.svg"
                                alt="Part detection"
                                height={54}
                                width={54}
                            />
                        </button>
                    </div>
                    <div className="flex flex-wrap flex-row">
                        <button 
                        onClick={() => setModelInformation("Workplace Safety Detection")}
                        onDoubleClick={redirectToNext}  
                        className="flex items-center justify-between border border-white rounded rounded-xl p-4 shadow shadow-xl h-[106px] w-[222px] bg-white mb-7 relative text-left">
                            <span className="absolute top-[-10px] left-[-10px]">
                                <Image
                                    src="/img/lock-circle-gray.svg"
                                    alt="Workplace Safety Detection"
                                    height={34}
                                    width={34}
                                />
                            </span>
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
                <div className="w-[53%] px-7 py-9 rounded rounded-xl border border-dashed border-yellow-951 border-2 bg-white">
                    {/* Introduction */}
                    <div className="flex justify-between items-start mb-8">
                        <div className="w-[35%]">
                            <Image
                                src={`/img/${data.image}`}
                                alt="crack-detection-large"
                                height={136}
                                width={152}
                            />
                            <button className="mt-8 flex justify-center items-center rounded rounded-xl h-[44px] px-1 py-1 bg-yellow-951 border border-yellow-951">
                                <Image
                                    src="/img/activity.svg"
                                    alt="activity"
                                    height={20}
                                    width={20}
                                />
                                <span className="ml-2 text-sm">Model Performance</span>
                            </button>
                        </div>
                        <div className="w-[65%]">
                            <h3 className="font-semibold text-xl text-black mb-4">{data.name}</h3>
                            <p className="font-semibold text-md text-black mb-1">How it works</p>
                            <p className="text-[14px] text-black">{data.description}</p>
                        </div>
                    </div>
                    {/* Benifits */}
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
    )
}

Models.getLayout = function getLayout(page: any) {
    return (
        <Layout>{page}</Layout>
    )
}