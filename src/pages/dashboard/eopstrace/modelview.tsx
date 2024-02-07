import React, { useState, useRef, useEffect } from "react";
import Layout from "../../../components/Layout";
import Template from "../template";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from 'next/router'
import axios from 'axios';

export default function ModelView() {

    const router = useRouter();
    const parentAsset = router.query;
    const [loader, setLoader] = useState(true);
    const [data, setData] = useState([] as any);
    useEffect(() => {
        setTimeout(() => {
            setLoader(false)
        }, 3000)
    }, [])

    const fetchObjectData = () => {
        axios.get("/api/getBattery").then((response) => {
            if (response.data) {
                const filtered = response.data.filter((item: any) => {
                    if (item.className === parentAsset.objectID && item.SerialNo === parentAsset.key) {
                        return item;
                    }
                });
                if (filtered && filtered.length > 0) {
                    const arr = filtered[0].subData.filter((item: any) => {
                        if (item.ID.toString() === parentAsset.pid) {
                            return item
                        }
                    })
                    setData(arr);
                }
            }
        });
    }
    useEffect(() => {
        fetchObjectData();
        if (fetchObjectData.length) return;
    }, [parentAsset])

    // console.log("DATA =>", data[0])

    return (
        <div className="flex font-OpenSans">

            <div className="w-[100%]">
                <div className="columns-2 flex justify-between items-center">
                    <p className="text-black text-lg mb-0 font-semibold">eOps Trace</p>
                </div>

                <div className="border min-h-full rounded-xl mt-3 px-4 py-4">
                    <div className="flex justify-between items-center">
                        {/* Breadcrumb */}
                        <nav className="flex" aria-label="Breadcrumb">
                            <ol className="inline-flex items-center space-x-1 md:space-x-1">
                                <li className="inline-flex items-center">
                                    <Link href="/dashboard/aimodaldetection"
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
                                            pathname: "/dashboard/aimodaldetection",
                                            query: {
                                                objectID: parentAsset.objectID,
                                                key: parentAsset.key,
                                                id: parentAsset.id,
                                                subObject: parentAsset.subObject,
                                                model: parentAsset.model
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
                                        <span className="ml-1 text-sm text-black hover:text-yellow-950 md:ml-1 font-bold">{parentAsset.key}</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        // http://localhost:3000/dashboard/eopstrace/testmodel?objectID=Vehicles&subObject=Battery&key=LI7481&id=5PVBE7AJ8R5T50001&model=Battery+Life+Prediction&industryID=5PVBE7AJ8R5T50001&from=eopstrace
                                        href={{
                                            pathname: "/dashboard/eopstrace/testmodel",
                                            query: {
                                                objectID: parentAsset.objectID,
                                                key: parentAsset.key,
                                                id: parentAsset.id,
                                                industryID: parentAsset.id,
                                                subObject: parentAsset.subObject,
                                                model: parentAsset.model,
                                                from: "eopstrace"
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
                                            pathname: "/dashboard/eopstrace/testmodel",
                                            query: {
                                                objectID: parentAsset.objectID,
                                                key: parentAsset.key,
                                                id: parentAsset.id,
                                                industryID: parentAsset.id,
                                                subObject: parentAsset.subObject,
                                                model: parentAsset.model,
                                                from: "eopstrace"
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
                                        <span className="ml-1 text-sm font-medium text-black hover:text-yellow-950 md:ml-1">Test</span>
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

                        <div className="flex justify-center items-center">
                            <button className="bg-yellow-951 text-black rounded-xl border b order-yellow-951 flex justify-center items-center px-3 h-[44px] ml-2  mr-3  duration-300 outline-none transform active:scale-75 transition-transform">Generate RCA</button>
                            <button className="bg-yellow-951 text-black rounded-xl border b order-yellow-951 flex justify-center items-center px-3 h-[44px] ml-2  mr-3  duration-300 outline-none transform active:scale-75 transition-transform">Track Issue</button>
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
                            <>
                                {
                                    data ?
                                        <div className="relative mt-10 overflow-hidden rounded-xl text-center flex flex-wrap flex-rpw items-center justify-around">

                                            <div className="border border-gray-951 rounded-xl p-4 w-56 h-48 flex items-center justify-center flex-wrap flex-col">
                                                <p className="text-black font-bold mb-2">{data[0]?.result.batteryUtilization}</p>
                                                <Image
                                                    src="/img/BatteryUtilization.svg"
                                                    alt="no image"
                                                    height={60}
                                                    width={75}
                                                    className="h-auto w-auto inline-block mb-2"
                                                />
                                                <p className="text-black font-semibold mb-10">Battery Utilization</p>
                                            </div>

                                            <div className="border border-gray-951 rounded-xl p-4 w-56 h-48 flex items-center justify-center flex-wrap flex-col">
                                                <p className="text-black font-bold mb-2">{data[0]?.result.remainingCyclesLeft}</p>
                                                <Image
                                                    src="/img/RemainingCycle.svg"
                                                    alt="no image"
                                                    height={60}
                                                    width={75}
                                                    className="h-auto w-auto inline-block mb-2"
                                                />
                                                <p className="text-black font-semibold mb-10">Remaining cycles left</p>
                                            </div>

                                            <div className="border border-gray-951 rounded-xl p-4 w-56 h-48 flex items-center justify-center flex-wrap flex-col">
                                                <p className="text-black font-bold mb-2">{data[0]?.result.estTotalCycle}</p>
                                                <Image
                                                    src="/img/totalCycle.svg"
                                                    alt="no image"
                                                    height={75}
                                                    width={75}
                                                    className="h-auto w-auto inline-block mb-2"
                                                />
                                                <p className="text-black font-semibold mb-10">Est. total cycle</p>
                                            </div>
                                        </div>
                                        : null
                                }
                            </>
                    }

                </div>
            </div>

            <div className="w-[16%] pl-5 hidden">
                <Template />
            </div>

        </div>
    )
}

ModelView.getLayout = function getLayout(page: any) {
    return (
        <Layout>{page}</Layout>
    )
}