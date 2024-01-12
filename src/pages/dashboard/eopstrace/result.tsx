import React, { useState, useEffect } from "react";
import Layout from "../../../components/Layout";
import Image from "next/image";
import Link from "next/link";
import Router from 'next/router'
import { useRouter } from 'next/router';

export default function Result() {    

    const batteryData = [
        {
            "ID": 1,
            "ObjectID": "112233445573",
            "batteryUtilization": "80%",
            "remainingCyclesLeft": "35",
            "estTotalCycle": "168"
        },
        {
            "ID": 2,
            "ObjectID": "112233445574",
            "batteryUtilization": "60%",
            "remainingCyclesLeft": "45",
            "estTotalCycle": "168"
        }
    ]

    const router = useRouter();
    const parentAsset = router.query;
    const routerParams = router.query;
    const [loader, setLoader] = useState(true);
    const [data, setData] = useState([] as any);
    useEffect(() => {
        setTimeout(() => {
            setLoader(false)
        }, 1)
    }, [])

    useEffect(() => {
        const filtered = batteryData.filter((item: any) => {
            return item.ObjectID == parentAsset.selectedID
        })
        setData(filtered)
    }, [parentAsset])

    const clickOnBreadcrumb = () => {
        setTimeout(() => {
            Router.push({
                pathname: '/dashboard/eopstrace/raisedalerts',
                query: {
                    objectID: routerParams?.objectID,
                    subObject: routerParams?.subObject,
                    key: routerParams?.key,
                    id: routerParams?.id,
                    model: routerParams?.model,
                    industryID: routerParams?.industryID,
                    from: "Production"
                }
            })
        }, 100)
    }

    return (
        <div className="flex font-OpenSans">

            <div className="w-full">
                <div className="columns-2 flex justify-between items-center">
                    <p className="text-black text-lg mb-0 font-semibold">eOps Trace</p>
                </div>

                <div className="border min-h-full rounded-xl mt-3 px-4 py-4">

                    {/* Breadcrumb */}
                    <div className="flex justify-between items-center">
                        <nav className="flex" aria-label="Breadcrumb">
                            <ol className="inline-flex items-center space-x-1 md:space-x-1">
                                <li className="inline-flex items-center">
                                    <button
                                        // href={{
                                        //     pathname: "/dashboard/eopstrace/raisedalerts",
                                        //     query: {
                                        //         objectID: parentAsset.objectID,
                                        //         key: parentAsset.key,
                                        //         id: parentAsset.id,
                                        //         subObject: parentAsset.subObject,
                                        //         model: parentAsset.model
                                        //     }
                                        // }}
                                        onClick={clickOnBreadcrumb}

                                        className="inline-flex items-center text-sm font-medium text-black hover:text-yellow-950">
                                        <Image
                                            src="/img/arrow-left.svg"
                                            alt="home"
                                            className="h-6"
                                            height={24}
                                            width={24}
                                        />
                                        <span className="text-black ml-2">Back</span>
                                    </button>
                                </li>
                            </ol>
                        </nav>

                        <div className="flex justify-center items-center">
                            <button className="bg-yellow-951 text-black rounded rounded-xl border b order-yellow-951 flex justify-center items-center px-3 h-[44px] ml-2   transition-all duration-[400ms] mr-3 transition-opacity duration-300 outline-none transform active:scale-75 transition-transform">Generate RCA</button>
                            <button className="bg-yellow-951 text-black rounded rounded-xl border b order-yellow-951 flex justify-center items-center px-3 h-[44px] ml-2 transition-all duration-[400ms] mr-3 transition-opacity duration-300 outline-none transform active:scale-75 transition-transform">Track Issue</button>
                        </div>
                        
                    </div>

                    {/* Results Images */}
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
                                        <div className="relative mt-10 rounded overflow-hidden rounded-xl text-center flex flex-wrap flex-rpw items-center justify-around">

                                            <div className="border border-gray-951 rounded rounded-xl p-4 w-56 h-48 flex items-center justify-center flex-wrap flex-col">
                                                <p className="text-black font-bold mb-2">{data[0]?.batteryUtilization}</p>
                                                <Image
                                                    src="/img/BatteryUtilization.svg"
                                                    alt="no image"
                                                    height={60}
                                                    width={75}
                                                    className="h-auto w-auto inline-block mb-2"
                                                />
                                                <p className="text-black font-semibold mb-10">Battery Utilization</p>
                                            </div>

                                            <div className="border border-gray-951 rounded rounded-xl p-4 w-56 h-48 flex items-center justify-center flex-wrap flex-col">
                                                <p className="text-black font-bold mb-2">{data[0]?.remainingCyclesLeft}</p>
                                                <Image
                                                    src="/img/RemainingCycle.svg"
                                                    alt="no image"
                                                    height={60}
                                                    width={75}
                                                    className="h-auto w-auto inline-block mb-2"
                                                />
                                                <p className="text-black font-semibold mb-10">Remaining cycles left</p>
                                            </div>

                                            <div className="border border-gray-951 rounded rounded-xl p-4 w-56 h-48 flex items-center justify-center flex-wrap flex-col">
                                                <p className="text-black font-bold mb-2">{data[0]?.estTotalCycle}</p>
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

        </div>
    )
}

Result.getLayout = function getLayout(page: any) {
    return (
        <Layout>{page}</Layout>
    )
}