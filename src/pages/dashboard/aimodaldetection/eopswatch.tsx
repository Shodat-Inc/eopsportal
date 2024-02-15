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
        "description": "",
        "image": "crack-detection-large.svg",
        "planExpire": "08.31.2023",
        "benifits": [
            "Camera based image processing techniques",
            "IR-based image processing techniques",
            "Ultrasonic image based processing techniques",
            "Laser image based processing technique",
            "TOFD image based processing techniques",
            "Electroluminescence image",
            "UAV camera image",
            "Data set based analysis"
        ],
        "activePlan": true
    },
    {
        "name": "Part Detection",
        "description": "",
        "image": "parts-detection-large.svg",
        "planExpire": "04.25.2024",
        "benifits": [

        ],
        "activePlan": false
    },
    {
        "name": "Workplace Safety Detection",
        "description": "",
        "image": "workplace-safert-detection-large.svg",
        "planExpire": "11.22.2024",
        "benifits": [

        ],
        "activePlan": false
    },
    {
        "name": "Crystallization Detection",
        "description": "",
        "image": "crystallizatiod-detection.png",
        "planExpire": "08.31.2023",
        "benifits": [
            "Low temperature rise at low power input",
            "Baffling allows slurry density control",
            "Growing crystals are brought to the boiling surface where supersaturation is most intense, and growth is most rapid",
            "The baffle permits separation of unwanted fine crystals from the suspension of growing crystals, thereby affecting control of the product size",
            "Sufficient seed surface is maintained at the boiling surface to minimize harmful salt deposits on the equipment surfaces.",
            "Low head loss in the internal circulation paths makes large flows at low power requirements feasible"
        ],
        "activePlan": true
    },
    {
        "name": "Battery Life Prediction",
        "description": "",
        "image": "Battery-Life-Prediction.png",
        "planExpire": "04.25.2024",
        "benifits": [
            "Cloud platform-based in-situ prediction of battery life",
            "Data generation",
            "Feature extraction",
            "Regression algorithm",
            "Remaining useful life prediction"
        ],
        "activePlan": false
    },
    {
        "name": "Tire Wear Detection",
        "description": "",
        "image": "tyre-wear-modal-catalog.png",
        "planExpire": "11.22.2024",
        "benifits": [
            "Rough/abrasive road surface",
            "Paved road",
            "Straight road",
            "Broken up roads",
            "Hilly windings roads",
            "Unmade country roads"
        ],
        "activePlan": false
    }
]

const jsonDataVehicles = [
    {
        "name": "Crystallization Detection",
        "description": "",
        "image": "crystallizatiod-detection.png",
        "planExpire": "08.31.2023",
        "benifits": [

        ],
        "activePlan": true
    },
    {
        "name": "Battery Life Prediction",
        "description": "",
        "image": "Battery-Life-Prediction.png",
        "planExpire": "04.25.2024",
        "benifits": [

        ],
        "activePlan": false
    },
    {
        "name": "Tire Wear Detection",
        "description": "",
        "image": "tyre-wear-modal-catalog.png",
        "planExpire": "11.22.2024",
        "benifits": [

        ],
        "activePlan": false
    },
    {
        "name": "Parts Detection",
        "description": "",
        "image": "Parts-Detection.png",
        "planExpire": "11.22.2024",
        "benifits": [

        ],
        "activePlan": false
    }
]
export default function EopsWatch(props: any) {
    const router = useRouter();
    const routerParams = router.query;
    const [data, setData] = useState(jsonData[0]);
    const setModelInformation = (model: any) => {
        const filterData = jsonData.filter((item: any) => {
            return item.name === model
        })
        setData(filterData[0]);
    }

    useEffect(() => {
        if (props.nextDataProps && props.nextDataProps.objectID === "Manufacturing Plants") {
            setData(jsonData[0]);
        } else {
            setData(jsonDataVehicles[0]);
        }

    }, [props.nextDataProps])


    const redirectToNext = () => {
        Router.push({
            pathname: '/dashboard/eopswatch/preview',
            query: {
                objectID: props?.nextDataProps?.objectID,
                subObject: props?.nextDataProps?.subObject,
                key: props?.nextDataProps?.key,
                id: props?.nextDataProps?.id,
                model: data.name ? data.name : props?.nextDataProps?.model,
                industryID: props?.nextDataProps?.industryID,
                from: "eopswatch"
            }
        })
    }

    return (
        <div className="flex w-full h-full mt-1">
            <div className="w-[20%] bg-[#F2F2F2]">
                <div className="flex flex-wrap flex-row">
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

                </div>
            </div>
            <div className="w-[80%] px-8 py-5 rounded-r-xl rounded-bl-xl border border-[#E3E3E3] border-l-2 border-t-0 border-b-2 border-r-0 bg-white min-h-[500px]">
                <div className='relative'>
                    <div className="flex justify-start items-start mb-4">
                        {
                            props.active ?

                                <button
                                    className="h-[44px]  py-1 px-3 flex justify-center items-center bg-yellow-951 border border-yellow-951 text-sm text-black rounded-xl mr-6"
                                    onClick={redirectToNext}
                                >
                                    <span>Run this model</span>
                                </button>
                                :
                                <button
                                    className="h-[44px]  py-1 px-3 flex justify-center items-center bg-[#474B52] border border-[#474B52] text-sm text-white rounded-xl mr-6"
                                >
                                    <span>Run this model</span>
                                </button>
                        }

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

                            <div className="flex justify-start items-start font-semibold mt-3 text-[13px] text-[#666666]">Your model will be expire on : {data.planExpire}</div>
                        </div>
                        :
                        <div className="ffont-semibold mt-3 text-[13px] bg-[#F2F2F2] min-w-[290px] h-[104px] flex justify-start items-center p-3 flex-wrap flex-row rounded-lg absolute top-[-12px] right-[-20px]">
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