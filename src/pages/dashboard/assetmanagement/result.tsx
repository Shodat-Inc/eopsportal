import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import Layout from "../../../components/Layout";
import Template from "../template";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from 'next/router'
import axios from 'axios';
import styles from '../../../styles/Common.module.css';
import {
    getClassNameFromClassID,
    getSubClassNameFromClassID,
    getObjectValueFromObjectID,
    getSubObjectValueFromObjectID
} from "@/store/actions/aimodaldetectionAction";

export default function Result() {

    const router = useRouter();
    const routerParams = router.query;
    const dispatch = useDispatch<any>()
    const parentAsset = router.query;
    const [loader, setLoader] = useState(true);
    const [data, setData] = useState([] as any);
    const [alldata, setAllData] = useState([] as any);
    const classSelector = useSelector((state: any) => state.classReducer);
    const aimodaldetectionReducer = useSelector((state: any) => state.aimodaldetectionReducer);
    let navData = aimodaldetectionReducer?.dataForModalReducer

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

    // console.log({
    //     classSelector: classSelector,
    //     aimodaldetectionReducer: aimodaldetectionReducer,
    //     navData: navData
    // })

    useEffect(() => {
        setTimeout(() => {
            setLoader(false)
        }, 100)
    }, [])
    const [value, setValue] = useState(0);

    const fetchObjectData = () => {
        axios.get("/api/geteopsWatch").then((response) => {
            if (response.data) {
                const filtered = response.data.filter((item: any) => {
                    if (item.class === parentAsset.objectID && item.ID === parentAsset.key && item.modal === parentAsset.model) {
                        return item;
                    }
                });
                if (filtered && filtered.length > 0) {
                    if (filtered[0].images) {
                        const filterArr = filtered[0].images.filter((item: any) => {
                            return item.imageID.toString() === parentAsset.imageID
                        })
                        setValue(filterArr[0].thresholdValue)
                        setData(filterArr);
                    }
                }
            }
        });
    }
    useEffect(() => {
        fetchObjectData();
        if (fetchObjectData.length) return;
    }, [parentAsset])

    const plots = [
        {
            "performance": 5,
            "x": 30,
            "y": 20,
            "h": 110,
            "w": 250,
        },
        {
            "performance": 15,
            "x": 140,
            "y": 140,
            "h": 110,
            "w": 120,
        },
        {
            "performance": 25,
            "x": 160,
            "y": 250,
            "h": 80,
            "w": 130,
        },
        {
            "performance": 35,
            "x": 70,
            "y": 90,
            "h": 100,
            "w": 100,
        },
        {
            "performance": 55,
            "x": 90,
            "y": 120,
            "h": 100,
            "w": 100,
        },
        {
            "performance": 75,
            "x": 130,
            "y": 220,
            "h": 100,
            "w": 100,
        },
        {
            "performance": 85,
            "x": 99,
            "y": 145,
            "h": 100,
            "w": 100,
        },
    ]
    const [plotData, setPlotData] = useState(plots)

    const handleRange = (e: any) => {
        setValue(e.target.value);

        const filtered = plots.filter((item: any) => {
            return parseInt(item.performance) >= parseInt(e.target.value)
        })
        setPlotData(filtered)

    }

    useEffect(() => {
        if (value !== 0) {
            const filter = plots.filter((item: any) => {
                return item.performance >= value
            })
            setPlotData(filter)
        }

    }, [value])

    // GET DATA FROM modelObjectImageId
    const getImageUrl = async () => {
        let access_token = "" as any;
        if (typeof window !== 'undefined') {
            access_token = localStorage.getItem('authToken')
        }
        let modelID = aimodaldetectionReducer?.saveResponseFromTestReducer?.modelObjectImageId
        console.log({
            "modelID": modelID
        })
        try {
            await axios({
                method: 'GET',
                url: `/api/getImageUrl?type=test&modelId=${modelID}`,
                headers: {
                    "Authorization": `Bearer ${access_token}`,
                    "Content-Type": "application/json"
                }
            }).then(function (response) {

                console.log({
                    "response in getmodal": response?.data
                })

                if(response) {
                    const filtered = response?.data?.data?.rows?.filter((item:any)=>{
                        return item.modelObjectImageId === modelID
                    })

                    console.log({
                        filtered:filtered
                    })

                    setAllData(filtered[0])
                }                

            }).catch(function (error) {
                console.log({
                    "ERROR": error
                })
            })
        } catch (err) {
            console.log("err in action:", err)
        }
    }
    useEffect(()=>{
        getImageUrl()
    }, [aimodaldetectionReducer?.saveResponseFromTestReducer])


    console.log({
        "saveResponseFromTestReducer":aimodaldetectionReducer?.saveResponseFromTestReducer
    })

    return (
        <div className="flex font-OpenSans">

            <div className="w-[100%]">
                <div className="columns-2 flex justify-between items-center">
                    <p className="text-black text-lg mb-0 font-semibold">eOps Watch</p>
                </div>

                <div className="border min-h-full rounded-xl mt-3 px-4 py-4">
                    <div className="flex justify-between items-center">
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
                                    <Link
                                        href={{
                                            pathname: '/dashboard/assetmanagement/preview',
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
                                        Test
                                    </Link>
                                </li>
                                <li className="flex justify-start items-center">
                                    <Image
                                        src="/img/chevron-right.svg"
                                        alt="chevron-right"
                                        height={28}
                                        width={28}
                                    />
                                    <span className="text-gray-967 capitalize">Result</span>
                                </li>
                            </ul>
                        </div>

                        <div className="flex justify-center items-center">
                            <button className="bg-yellow-951 text-black rounded-xl border b order-yellow-951 flex justify-center items-center px-3 h-[44px] ml-2 mr-3 duration-300 outline-none transform active:scale-75 transition-transform">Generate RCA</button>
                            <button className="bg-yellow-951 text-black rounded-xl border b order-yellow-951 flex justify-center items-center px-3 h-[44px] ml-2  mr-3 duration-300 outline-none transform active:scale-75 transition-transform">Track Issue</button>
                        </div>
                    </div>


                    {/* Images */}


                    <div className="relative mt-10 overflow-hidden rounded-xl">
                        {
                            <div className="relative mt-0 w-full flex flex-wrap justify-start items-start">
                                <div className="relative w-[45%]">
                                    <Image
                                        // src="/img/CrackDetection/TPC3305-01-011/Test/PipeTest2ResultNew.png"
                                        src={alldata ? alldata?.url : '/img/CrackDetection/TPC3305-01-011/Test/PipeTest2ResultNew.png'}
                                        alt="Result"
                                        height={700}
                                        width={500}
                                        className="h-auto w-auto"
                                    />
                                    <div className="absolute h-full w-full top-0 left-0">
                                        {
                                            // plotData.map((item: any, index: any) => (
                                            //     <svg
                                            //         width={item.w + 30}
                                            //         height={item.h + 30}
                                            //         key={index}
                                            //         className={`${styles.svgRect}`}
                                            //     >
                                            //         <rect
                                            //             x={item.x}
                                            //             y={item.y}
                                            //             width={item.w}
                                            //             height={item.h}
                                            //         />
                                            //     </svg>
                                            // ))
                                        }
                                    </div>
                                </div>
                                <div className="relative pl-10 w-[55%]">
                                    <p className="mb-2 p-0 text-black text-xl font-semibold">My Objects</p>
                                    <Image
                                        src="/img/Crop.png"
                                        alt="Result"
                                        height={87}
                                        width={131}
                                        className="mb-2"
                                    />
                                    <p className="mb-4 p-0 text-black text-normal font-normal">To create an object, hover and select the region in the image</p>

                                    <p className="mb-0 p-0 text-black text-xl font-semibold">Predictions </p>
                                    <p className="mb-4 p-0 text-normal font-normal"><span className="text-gray-951">Predictions are shown in </span><span className="text-red-500">red</span></p>

                                    {
                                        data ?
                                            <>
                                                <p className="mb-2 p-0 text-black text-xl font-semibold">Threshold Value</p>

                                                <div className="mb-3">
                                                    <div className="relative mb-1 h-[20px] w-[380px] inline-block">
                                                        <span className={`absolute left-0 top-0 font-bold text-xl`}>{value}%</span>
                                                    </div>

                                                    {/*<div className={`${styles.rangeSlider}`}>
                                                        <input
                                                            type="range"
                                                            max={100}
                                                            min={0}
                                                            step={1}
                                                            value={value}
                                                            defaultValue={data[0]?.thresholdValue}
                                                            onChange={handleRange}
                                                            title={data[0]?.thresholdValue.toString()}
                                                        />
                                                    </div>*/}

                                                </div>

                                                {/* <Image
                                                    src={data[0]?.threshold}
                                                    alt="Result"
                                                    height={70}
                                                    width={290}
                                                    className="mb-2 h-auto w-auto"
                                                /> */}
                                            </>
                                            : null
                                    }

                                    <p className="mb-4 p-0 text-black text-normal font-normal">Only show suggested objects if the probability is above the selected threshold</p>

                                    {
                                        data ?
                                            <div className={`relative h-[160px] overflow-y-auto rounded-xl ${styles.viewTableWrap}`}>
                                                <table className={`table-auto min-w-full text-left rounded-xl ${styles.viewTable}`}>
                                                    <thead className="bg-orange-951 text-black rounded-xl h-10 text-sm font-normal">
                                                        <tr className="">
                                                            <th>Tag</th>
                                                            <th>Probability</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody className="cursor-pointer">
                                                        {
                                                            // data[0]?.thresholdTags.map((item: any, index: any) => (
                                                            //     <tr>
                                                            //         <td className="text-black text-lg font-semibold">Crack</td>
                                                            //         <td><span className="text-black rounded-xl bg-yellow-951 py-1 px-3">{item.Crack}%</span></td>
                                                            //     </tr>
                                                            // ))
                                                        }

                                                    </tbody>
                                                </table>
                                            </div>
                                            : null
                                    }
                                </div>

                            </div>
                        }
                    </div>


                </div>
            </div>

        </div>
    )
}

Result.getLayout = function getLayout(page: any) {
    return (
        <Layout>{page}</Layout>
    )
}