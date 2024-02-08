import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from '../../../styles/Common.module.css';
import Image from "next/image";
import Router from 'next/router'
import { useRouter } from 'next/router'
import { dataForModalAction } from '@/store/actions/aimodaldetectionAction';

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
    // console.log({
    //     "__PROPS_EOPSWATCH": props
    // })
    const dispatch = useDispatch<any>()
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
        // SubClassObject is also named as key
        const sendData = {
            objectID: props?.nextDataProps?.objectID,
            subObject: props?.nextDataProps?.subObject,
            key: props?.nextDataProps?.key,
            id: props?.nextDataProps?.id,
            model: selectedModel,
            industryID: props?.nextDataProps?.industryID
        }
        const nextData = {
            "class": props?.nextData?.class,
            "classObject": props?.nextData?.object,
            "subClass": props?.nextData?.subClass,
            "subClassObject": props?.nextData?.subObject,
            "Model": selectedModel
        }

        console.log({
            sendData: sendData,
            selectedModel: selectedModel,
            nextData: nextData
        })

        dispatch(dataForModalAction(nextData))

        setTimeout(() => {
            Router.push({
                pathname: '/dashboard/aimodaldetection/preview',
            })
        }, 50)
    }
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