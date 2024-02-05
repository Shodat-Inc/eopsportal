import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from '../../../styles/Common.module.css';
import Image from "next/image";
import CustomDrop from '@/common/customdrop';
import axios from 'axios';
import Link from 'next/dist/client/link';
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
    },
    {
        "name": "Crystallization Detection",
        "description": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
        "image": "crystallizatiod-detection.png",
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
        "name": "Battery Life Prediction",
        "description": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
        "image": "Battery-Life-Prediction.png",
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
        "name": "Tire Wear Detection",
        "description": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
        "image": "tyre-wear-modal-catalog.png",
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

const jsonDataVehicles = [
    {
        "name": "Crystallization Detection",
        "description": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
        "image": "crystallizatiod-detection.png",
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
        "name": "Battery Life Prediction",
        "description": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
        "image": "Battery-Life-Prediction.png",
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
        "name": "Tire Wear Detection",
        "description": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
        "image": "tyre-wear-modal-catalog.png",
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
    },
    {
        "name": "Parts Detection",
        "description": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
        "image": "Parts-Detection.png",
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

const modelLogo = [
    {
        "model": "Workplace Safety Detection",
        "logo": "/img/parts-detection.svg"
    },
    {
        "model": "Crystallization Detection",
        "logo": "/img/wortkplace-safety-detection.svg"
    },
    {
        "model": "Crack Detection",
        "logo": "/img/crack-detection.svg"
    }
]
export default function EopsWatch(props: any) {
    console.log({
        "__PROPS_EOPSWATCH": props?.modelData
    })
    const router = useRouter();
    const routerParams = router.query;
    const [data, setData] = useState([] as any);
    const [singleModel, setSingleModel] = useState([] as any);
    const [selectedModel, setSelectedModel] = useState('');

    // ===== Setting initial values based on props =====
    useEffect(() => {
        if (props?.modelData && props?.modelData.length > 0) {

            let dta = JSON.parse(props?.modelData[0]?.benefits);
            let arr = [] as any;
            Object.values(dta).map((item: any, index: any) => {
                arr.push(item)
            })
            setSingleModel(arr);
        }
    }, [props?.modelData])


    // ===== Update state based on selection of modal =====
    const setModelInformation = (model: any) => {
        const filterData = props?.modelData.filter((item: any) => {
            return item.modelName === model
        })
        if (filterData && filterData.length > 0) {
            setData(filterData[0]);
            let dta = JSON.parse(filterData[0]?.benefits);
            let arr = [] as any;
            Object.values(dta).map((item: any, index: any) => {
                arr.push(item)
            })
            setSingleModel(arr)
            setSelectedModel(model)
        }
    }

    // ===== Initial loading of data =====
    useEffect(() => {
        setSelectedModel(props?.modelData[0]?.modelName)
        setData(props?.modelData[0])
    }, [props?.modelDatal])


    const redirectToNext = () => {
        Router.push({
            pathname: '/dashboard/eopswatch/preview',
            query: {
                objectID: props?.nextDataProps?.objectID,
                subObject: props?.nextDataProps?.subObject,
                key: props?.nextDataProps?.key,
                id: props?.nextDataProps?.id,
                model: data?.name ? data?.name : props?.nextDataProps?.model,
                industryID: props?.nextDataProps?.industryID
            }
        })
    }

    console.log({
        "__DATA": singleModel
    })

    return (
        <div className="flex w-full h-full mt-1">
            <div className="w-[20%] bg-[#F2F2F2]">

                <div className="flex flex-wrap flex-row">
                    {
                        props?.modelData && props?.modelData.length > 0 ?
                            props?.modelData?.map((item: any, index: any) => {
                                let logo = '';
                                let obj = modelLogo.find(o => o.model === item?.modelName);
                                if (obj) {
                                    logo = obj?.logo
                                }
                                return (
                                    <>
                                        <button
                                            key={index}
                                            onClick={() => setModelInformation(item?.modelName)}
                                            className={`flex items-center justify-between rounded-l-xl-1 p-4 h-[106px] w-full bg-white relative text-left ${item?.modelName === selectedModel ? 'border-t-0 border-b-2 border-l-0 border-[#E3E3E3] left-[2px]' : 'border-b-2 border-t-2 border-l-0 border-[#E3E3E3] left-[0px]'}`}>
                                            <span className="text-gray-967 text-sm font-semibold w-full">
                                                {
                                                    item?.modelName
                                                }
                                            </span>
                                            <Image
                                                src={logo}
                                                alt={item?.modelName}
                                                height={54}
                                                width={54}
                                            />
                                        </button>
                                    </>
                                )
                            })
                            :
                            null
                    }
                </div>

                {/* <div className="flex-1 flex-wrap flex-row hidden">
                    {
                        props?.nextDataProps?.objectID && props?.nextDataProps?.objectID === "Manufacturing Plants"
                            ?
                            <>
                                <button
                                    onClick={() => setModelInformation("Crack Detection")}
                                    className={`flex items-center justify-between rounded-l-xl-1 p-4 h-[106px] w-full bg-white relative text-left ${data.name === "Crack Detection" ? 'border-t-0 border-b-2 border-l-0 border-[#E3E3E3] left-[2px]' : 'border-b-2 border-t-2 border-l-0 border-[#E3E3E3] left-[0px]'}`}>
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
                                    className={`flex items-center justify-between rounded-l-xl-1 p-4 h-[106px] w-full bg-white relative text-left ${data.name === "Part Detection" ? 'border-t-0 border-b-2 border-l-0 border-[#E3E3E3] left-[2px]' : 'border-b-2 border-l-0 border-[#E3E3E3] left-[0px]'}`}>
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
                                    className={`flex items-center justify-between rounded-l-xl-1 p-4 h-[106px] w-full bg-white relative text-left ${data.name === "Workplace Safety Detection" ? 'border-t-0 border-b-2 border-l-0 border-[#E3E3E3] left-[2px]' : 'border-b-2 border-l-0 border-[#E3E3E3] left-[0px]'}`}>
                                    <span className="text-gray-967 text-md font-semibold">Workplace <br />Safety Detection</span>
                                    <Image
                                        src="/img/wortkplace-safety-detection.svg"
                                        alt="Workplace Safety Detection"
                                        height={54}
                                        width={54}
                                    />
                                </button>
                            </>
                            :
                            <>
                                <button
                                    onClick={() => setModelInformation("Crystallization Detection")}
                                    className={`flex items-center justify-between rounded-l-xl-1 p-4 h-[106px] w-full bg-white relative text-left ${data.name === "Crystallization Detection" ? 'border-t-0 border-b-2 border-l-0 border-[#E3E3E3] left-[2px]' : 'border-b-2 border-t-2 border-l-0 border-[#E3E3E3] left-[0px]'}`}>
                                    <span className="text-gray-967 text-sm font-semibold w-full">Crystallization Detection</span>
                                    <Image
                                        src="/img/crack-detection.svg"
                                        alt="Crystallization Detection"
                                        height={54}
                                        width={54}
                                    />
                                </button>
                                <button
                                    onClick={() => setModelInformation("Battery Life Prediction")}
                                    className={`flex items-center justify-between rounded-l-xl-1 p-4 h-[106px] w-full bg-white relative text-left ${data.name === "Battery Life Prediction" ? 'border-t-0 border-b-2 border-l-0 border-[#E3E3E3] left-[2px]' : 'border-b-2 border-l-0 border-[#E3E3E3] left-[0px]'}`}>
                                    <span className="text-gray-967 text-md font-semibold w-[50%]">Battery Life Prediction</span>
                                    <Image
                                        src="/img/parts-detection.svg"
                                        alt="Battery Life Prediction"
                                        height={54}
                                        width={54}
                                    />
                                </button>
                                <button
                                    onClick={() => setModelInformation("Tire Wear Detection")}
                                    className={`flex items-center justify-between rounded-l-xl-1 p-4 h-[106px] w-full bg-white relative text-left ${data.name === "Tire Wear Detection" ? 'border-t-0 border-b-2 border-l-0 border-[#E3E3E3] left-[2px]' : 'border-b-2 border-l-0 border-[#E3E3E3] left-[0px]'}`}>
                                    <span className="text-gray-967 text-md font-semibold">Tire Wear Detection</span>
                                    <Image
                                        src="/img/wortkplace-safety-detection.svg"
                                        alt="Tire Wear Detection"
                                        height={54}
                                        width={54}
                                    />
                                </button>
                            </>
                    }

                </div> */}
            </div>
            <div className="w-[80%] px-8 py-5 rounded-r-xl rounded-bl-xl border border-[#E3E3E3] border-l-2 border-t-0 border-b-2 border-r-0 bg-white min-h-[500px]">
                <div className='relative'>
                    <div className="flex justify-start items-start mb-4">
                        <button
                            className="h-[44px] py-1 px-3 flex justify-center items-center bg-yellow-951 border border-yellow-951 text-sm text-black rounded-xl mr-6"
                            onClick={redirectToNext}
                        >
                            <span>Run this model</span>
                        </button>
                        <button className="flex justify-center items-center rounded-xl h-[44px] px-1 py-1 bg-[#404040] border border-[#404040] text-white text-sm">
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
                            <h3 className="font-semibold text-xl text-[#666666] mb-4">{data?.modelName}</h3>
                            <p className="font-semibold text-md text-[#666666] mb-1">How it works</p>
                            <p className="text-[14px] text-[#666666]">{data?.howItWorks}</p>
                        </div>
                    </div>
                    <div className="relative">
                        <div className="flex justify-start items-center">
                            <div className="relative">
                                <Image
                                    src={`/img/crack-detection-large.svg`}
                                    alt="crack-detection-large"
                                    height={136}
                                    width={152}
                                />
                            </div>
                            <div className='ml-10 w-[60%]'>
                                <p className="font-semibold text-md text-black mb-2">Benifits</p>
                                <ul className="text-sm flex flex-between items-center flex-wrap flex-row list-disc pl-5">
                                    {
                                        singleModel?.map((item: any, index: any) => (
                                            <li key={index} className="w-1/2 mb-3">{item}</li>
                                        ))
                                    }
                                </ul>
                            </div>
                        </div>
                    </div>
                    {data?.activePlan == true ?
                        <div className='bg-[#F2F2F2] w-[290px] h-[104px] flex justify-start items-center p-3 flex-wrap flex-row rounded-lg absolute top-[-12px] right-[-20px]'>
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

                            <div className="flex justify-start items-start font-semibold mt-3 text-[13px] text-[#666666]">Your model will be expire on : {data?.planExpire}</div>
                        </div>
                        :
                        <div className="font-semibold mt-3 text-[13px] bg-[#F2F2F2] min-w-[290px] h-[104px] flex justify-start items-center p-3 flex-wrap flex-row rounded-lg absolute top-[-12px] right-[-20px]">
                            <button className="mr-5 flex justify-center items-center rounded-xl h-[44px] px-3 py-1 bg-yellow-951 border border-yellow-951">
                                <Image
                                    src="/img/shopping-cart.svg"
                                    alt="activity"
                                    height={20}
                                    width={20}
                                />
                                <span className="ml-2 text-sm">Add to cart</span>
                            </button>
                            <button className="flex justify-center items-center rounded-xl h-[44px] px-2 py-1 bg-black border border-black text-white">
                                <span className="text-sm">Request a demo</span>
                            </button>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}