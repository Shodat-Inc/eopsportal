import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from '../../../styles/Common.module.css';
import Image from "next/image";
import CustomDrop from '@/common/customdrop';
import axios from 'axios';
import Link from 'next/dist/client/link';
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
export default function EopsWatch(props: any) {
    const [data, setData] = useState(jsonData[0]);
    const setModelInformation = (model: any) => {
        const filterData = jsonData.filter((item: any) => {
            return item.name === model
        })
        setData(filterData[0]);
    }
    return (
        <div className="flex w-full h-full mt-1">
            <div className="w-[20%] bg-[#F2F2F2]">
                <div className="flex flex-wrap flex-row">
                    <button
                        onClick={() => setModelInformation("Crack Detection")}
                        className={`relative flex items-center justify-between rounded-l-xl-1 p-4 h-[106px] w-full bg-white relative text-left ${data.name === "Crack Detection" ? 'border-t-0 border-b-2 border-l-0 border-[#E3E3E3] left-[2px]' : 'border-b-2 border-t-2 border-l-0 border-[#E3E3E3] left-[0px]'}`}>
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
                        className={`relative flex items-center justify-between rounded-l-xl-1 p-4 h-[106px] w-full bg-white relative text-left ${data.name === "Part Detection" ? 'border-t-0 border-b-2 border-l-0 border-[#E3E3E3] left-[2px]' : 'border-b-2 border-l-0 border-[#E3E3E3] left-[0px]'}`}>
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
                        className={`relative flex items-center justify-between rounded-l-xl-1 p-4 h-[106px] w-full bg-white relative text-left ${data.name === "Workplace Safety Detection" ? 'border-t-0 border-b-2 border-l-0 border-[#E3E3E3] left-[2px]' : 'border-b-2 border-l-0 border-[#E3E3E3] left-[0px]'}`}>
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
            <div className="w-[80%] px-8 py-5 rounded-r-xl rounded-bl-xl border border-[#E3E3E3] border-l-2 border-t-0 border-b-2 border-r-0 bg-white min-h-[500px]">
                <div className='relative'>
                    <div className="flex justify-start items-start mb-4">
                        <button
                            className="h-[44px] px-2 py-1 px-3 flex justify-center items-center bg-yellow-951 border border-yellow-951 text-sm text-black rounded rounded-xl mr-6"
                        >
                            <span>Run this model</span>
                        </button>
                        <button className="flex justify-center items-center rounded rounded-xl h-[44px] px-1 py-1 bg-[#404040] border border-[#404040] text-white text-sm">
                            <Image
                                src="/img/activity-white.svg"
                                alt="activity"
                                height={20}
                                width={20}
                            />
                            <span className="ml-2">Model Performance</span>
                        </button>
                    </div>
                    <div className="text-md font-semibold mb-4">Model Details</div>
                    <div className="mb-10 flex justify-start item-center">
                        <div className="ml-0">
                            <h3 className="font-semibold text-xl text-[#666666] mb-4">{data.name}</h3>
                            <p className="font-semibold text-md text-[#666666] mb-1">How it works</p>
                            <p className="text-[14px] text-[#666666]">{data.description}</p>
                        </div>
                    </div>
                    <div className="relative">
                        <div className="flex justify-start items-center">
                            <div className="relative">
                                <Image
                                    src={`/img/${data.image}`}
                                    alt="crack-detection-large"
                                    height={136}
                                    width={152}
                                />
                            </div>
                            <div className='ml-10'>
                                <p className="font-semibold text-md text-black mb-2">Benifits</p>
                                <ul className="text-sm flex flex-between items-center flex-wrap flex-row list-disc pl-5">
                                    {
                                        data.benifits.map((item: any, index: any) => (
                                            <li key={index} className="w-1/2 mb-3">{item}</li>
                                        ))
                                    }
                                </ul>
                            </div>
                        </div>
                    </div>
                    {data.activePlan == true ?
                        <div className='bg-[#F2F2F2] w-[290px] h-[104px] flex justify-start items-center p-3 flex-wrap flex-row rounded rounded-lg absolute top-[-12px] right-[-20px]'>
                            <div className="flex justify-end items-center w-full">
                                <div className="flex justify-end items-center w-full">
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
                        </div>
                        :
                        <div className="flex justify-start items-start font-semibold mt-3 text-[13px] bg-[#F2F2F2] min-w-[290px] h-[104px] flex justify-start items-center p-3 flex-wrap flex-row rounded rounded-lg absolute top-[-12px] right-[-20px]">
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