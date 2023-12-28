import React, { useState, useRef, useEffect } from "react";
import Layout from "../../../components/Layout";
import Template from "../template";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from 'next/router'
import axios from 'axios';
import styles from '../../../styles/Common.module.css';

export default function ProductionView() {

    const router = useRouter();
    const parentAsset = router.query;
    const [loader, setLoader] = useState(true);
    const [data, setData] = useState([] as any);
    useEffect(() => {
        setTimeout(() => {
            setLoader(false)
        }, 4000)
    }, [])
    const [value, setValue] = useState(0);


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
        console.log({
            "T-VALUE": e.target.value,
            "filter":filtered,
            plots:plots
        })
    }

    useEffect(() => {
        if (value !== 0) {
            const filter = plots.filter((item: any) => {
                return item.performance >= value
            })
            setPlotData(filter)
        }

    }, [value])

    // console.log({
    //     "VALUE": value,
    //     plotData: plotData
    // })

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

    // const handleRange = (e: any) => {
    //     setValue(e.target.value)
    // }

    return (
        <div className="flex font-OpenSans">

            <div className="w-[100%]">
                <div className="columns-2 flex justify-between items-center">
                    <p className="text-black text-lg mb-0 font-semibold">eOps Watch</p>
                </div>

                <div className="border min-h-full rounded-xl mt-3 px-4 py-4">
                    <div className="flex justify-between items-center">
                        {/* Breadcrumb */}
                        {
                            parentAsset.from === "eopswatch" ?
                                <div className="flex relative bg-white rounded rounded-lg px-3 py-1 inline-flex border border-[#E3E3E3]">
                                    <ul className="flex justify-start items-center text-sm">
                                        <li className="flex justify-start items-center">
                                            <Link
                                                href="/dashboard/eopswatch"
                                                className="font-semibold"
                                            >
                                                {parentAsset.key}
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
                                                    pathname: '/dashboard/eopswatch/models',
                                                    query: {
                                                        objectID: parentAsset.objectID,
                                                        subObject: parentAsset.subObject,
                                                        key: parentAsset.key,
                                                        id: parentAsset.id,
                                                    }
                                                }}
                                                className="font-semibold"
                                            >
                                                Models
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
                                                    pathname: '/dashboard/eopswatch/models',
                                                    query: {
                                                        objectID: parentAsset.objectID,
                                                        subObject: parentAsset.subObject,
                                                        key: parentAsset.key,
                                                        id: parentAsset.id,
                                                    }
                                                }}
                                                className="font-semibold"
                                            >
                                                {parentAsset.model}
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
                                                    pathname: '/dashboard/eopswatch/preview',
                                                    query: {
                                                        objectID: parentAsset.objectID,
                                                        subObject: parentAsset.subObject,
                                                        key: parentAsset.key,
                                                        id: parentAsset.id,
                                                        model: parentAsset.model
                                                    }
                                                }}
                                                className="font-semibold"
                                            >
                                                Production
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
                                :
                                <nav className="flex" aria-label="Breadcrumb">
                                    <ol className="inline-flex items-center space-x-1 md:space-x-1">
                                        <li className="inline-flex items-center">
                                            <Link href="/dashboard/assetmanagement"
                                                className="inline-flex items-center text-sm font-medium text-black hover:text-yellow-950">
                                                <Image
                                                    src="/img/home.svg"
                                                    alt="home"
                                                    className="h-6"
                                                    height={24}
                                                    width={24}
                                                />
                                            </Link>
                                        </li>
                                        <li>
                                            <Link
                                                href={{
                                                    pathname: "/dashboard/assetmanagement/subchildobject",
                                                    query: {
                                                        class: parentAsset.objectID,
                                                        object: parentAsset.id,
                                                        id: parentAsset.key,
                                                        subObject: parentAsset.subObject,
                                                    }
                                                }}
                                                className="flex items-center">
                                                <Image
                                                    src="/img/arrow-right.svg"
                                                    alt="arrow-right"
                                                    className="h-6"
                                                    height={24}
                                                    width={24}
                                                />
                                                <span className="ml-1 text-sm font-medium text-black hover:text-yellow-950 md:ml-1">{parentAsset.key}</span>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link
                                                href={{
                                                    pathname: "/dashboard/eopswatch/eopswatchmodel",
                                                    query: {
                                                        objectID: parentAsset.objectID,
                                                        key: parentAsset.key,
                                                        id: parentAsset.id,
                                                        subObject: parentAsset.subObject,
                                                    }
                                                }}
                                                className="flex items-center"
                                            >
                                                <Image
                                                    src="/img/arrow-right.svg"
                                                    alt="arrow-right"
                                                    className="h-6"
                                                    height={24}
                                                    width={24}
                                                />
                                                <span className="ml-1 text-sm font-medium text-black hover:text-yellow-950 md:ml-1">{parentAsset.model}</span>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link
                                                href={{
                                                    pathname: "/dashboard/eopswatch/productionmodel",
                                                    query: {
                                                        objectID: parentAsset.objectID,
                                                        key: parentAsset.key,
                                                        id: parentAsset.id,
                                                        subObject: parentAsset.subObject,
                                                        model: parentAsset.model,
                                                    }
                                                }}
                                                className="flex items-center"
                                            >
                                                <Image
                                                    src="/img/arrow-right.svg"
                                                    alt="arrow-right"
                                                    className="h-6"
                                                    height={24}
                                                    width={24}
                                                />
                                                <span className="ml-1 text-sm font-medium text-black hover:text-yellow-950 md:ml-1">Production</span>
                                            </Link>
                                        </li>
                                        <li>
                                            <div className="flex items-center">
                                                <Image
                                                    src="/img/arrow-right.svg"
                                                    alt="arrow-right"
                                                    className="h-6"
                                                    height={24}
                                                    width={24}
                                                />
                                                <span className="ml-1 text-sm font-medium text-black md:ml-1">Result</span>
                                            </div>
                                        </li>
                                    </ol>
                                </nav>
                        }

                        <div className="flex justify-center items-center">
                            <button className="bg-yellow-951 text-black rounded rounded-xl border b order-yellow-951 flex justify-center items-center px-3 h-[44px] ml-2 transition-all duration-[400ms] mr-3 transition-opacity duration-300 outline-none transform active:scale-75 transition-transform">Generate RCA</button>
                            <button className="bg-yellow-951 text-black rounded rounded-xl border b order-yellow-951 flex justify-center items-center px-3 h-[44px] ml-2 transition-all duration-[400ms] mr-3 transition-opacity duration-300 outline-none transform active:scale-75 transition-transform">Track Issue</button>
                        </div>
                    </div>


                    {/* Images */}

                    {
                        loader ?
                            <div className="relative w-full flex justify-center items-center h-96">
                                <Image
                                    src="/img/loading-gif.gif"
                                    alt="loader"
                                    height={124}
                                    width={124}
                                    className=""
                                />
                            </div>
                            :
                            <div className="relative mt-10 rounded overflow-hidden rounded-xl">
                                {
                                    parentAsset.result ?
                                        <div>
                                            {
                                                parentAsset.objectID && parentAsset.model === "Tire Wear Detection" && parentAsset.subObject === "Tire" ?
                                                    <div className="relative mt-0 w-full flex flex-wrap justify-start items-start">
                                                        <div className="relative w-[45%]">
                                                            <div className="bg-gray-951 flex justify-center items-center rounded rounded-xl overflow-hidden">
                                                                <Image
                                                                    src={data ? data[0].resultImage : parentAsset?.result?.toString()}
                                                                    alt="Result"
                                                                    height={700}
                                                                    width={500}
                                                                    className="h-auto w-auto"
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="relative pl-10 w-[55%]">
                                                            <p className="mb-2 p-0 text-black text-xl font-semibold">Predictions </p>
                                                            {
                                                                data ?
                                                                    <>
                                                                        <Image
                                                                            src={data[0].threshold}
                                                                            alt="Result"
                                                                            height={300}
                                                                            width={300}
                                                                        // className="mb-2 h-auto w-auto"
                                                                        />
                                                                    </>
                                                                    : null
                                                            }
                                                        </div>
                                                    </div>

                                                    :
                                                    <div className="relative mt-0 w-full flex flex-wrap justify-start items-start">
                                                        <div className="relative w-[45%]">
                                                            <Image
                                                                // src="/img/CrackDetection/TPC3305-01-011/Test/PipeTest2ResultNew.png"
                                                                src={data ? data[0]?.resultImage : parentAsset?.result?.toString()}
                                                                alt="Result"
                                                                height={700}
                                                                width={500}
                                                                className="h-auto w-auto"
                                                            />
                                                            <div className="absolute h-full w-full top-0 left-0">
                                                                {
                                                                    plotData.map((item: any, index: any) => (
                                                                        <svg
                                                                            width={item.w + 30}
                                                                            height={item.h + 30}
                                                                            key={index}
                                                                            className={`${styles.svgRect}`}
                                                                        >
                                                                            <rect
                                                                                x={item.x}
                                                                                y={item.y}
                                                                                width={item.w}
                                                                                height={item.h}
                                                                            />
                                                                        </svg>
                                                                    ))
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

                                                                            <div className={`${styles.rangeSlider}`}>
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
                                                                            </div>
                                                                        </div>

                                                                        {/* <Image
                                                                            src={data[0].threshold}
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
                                                                    <div className={`relative h-[160px] overflow-y-auto rounded rounded-xl ${styles.viewTableWrap}`}>
                                                                        <table className={`table-auto min-w-full text-left rounded rounded-xl ${styles.viewTable}`}>
                                                                            <thead className="bg-orange-951 text-black rounded rounded-xl h-10 text-sm font-normal">
                                                                                <tr className="">
                                                                                    <th>Tag</th>
                                                                                    <th>Probability</th>
                                                                                </tr>
                                                                            </thead>
                                                                            <tbody className="cursor-pointer">
                                                                                {
                                                                                    data[0]?.thresholdTags.map((item: any, index: any) => (
                                                                                        <tr>
                                                                                            <td className="text-black text-lg font-semibold">Crack</td>
                                                                                            <td><span className="text-black rounded rounded-xl bg-yellow-951 py-1 px-3">{item.Crack}%</span></td>
                                                                                        </tr>
                                                                                    ))
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
                                        :
                                        <div className="text-xl font-semibold w-full text-center flex flex-wrap flex-col items-center justify-center">
                                            <Image
                                                src="/img/no_image_icon.svg"
                                                alt="no image"
                                                height={100}
                                                width={100}
                                                className="inline-block"
                                            />
                                            <span className="mt-3">No Image Found!! </span>
                                        </div>
                                }
                            </div>
                    }

                </div>
            </div>

            <div className="w-[16%] pl-5 hidden">
                <Template />
            </div>

        </div>
    )
}

ProductionView.getLayout = function getLayout(page: any) {
    return (
        <Layout>{page}</Layout>
    )
}