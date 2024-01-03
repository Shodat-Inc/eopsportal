import React, { useState, useRef, useEffect } from "react";
import Layout from "../../../components/Layout";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from 'next/router'
import axios from 'axios';
import styles from '../../../styles/Common.module.css';

export default function Result() {

    const router = useRouter();
    const parentAsset = router.query;
    const [loader, setLoader] = useState(true);
    const [data, setData] = useState([] as any);
    useEffect(() => {
        setTimeout(() => {
            setLoader(false)
        }, 4000)
    }, [])

    const fetchObjectData = () => {
        axios.get("/api/getWatchAlerts").then((response) => {
            if (response.data) {
                console.log(response.data)
                const filtered = response.data.filter((item: any) => {
                    if (item.ObjectID == parentAsset.selectedID) {
                        return item;
                    }
                });
                if (filtered && filtered.length > 0) {
                    setData(filtered[0]);
                }
            }
        });
    }
    useEffect(() => {
        fetchObjectData();
        // if (fetchObjectData.length) return;
    }, [parentAsset])

    console.log({
        data: data,
        parentAsset: parentAsset
    })

    return (
        <div className="flex font-OpenSans">

            <div className="w-full">
                <div className="columns-2 flex justify-between items-center">
                    <p className="text-black text-lg mb-0 font-semibold">eOps Watch</p>
                </div>

                <div className="border min-h-full rounded-xl mt-3 px-4 py-4">
                    <div className="flex justify-between items-center">
                        {/* Breadcrumb */}
                        <nav className="flex" aria-label="Breadcrumb">
                            <ol className="inline-flex items-center space-x-1 md:space-x-1">
                                <li className="inline-flex items-center">
                                    <Link
                                        href={{
                                            pathname: "/dashboard/eopswatch/raisedalerts",
                                            query: {
                                                objectID: parentAsset.objectID,
                                                key: parentAsset.key,
                                                id: parentAsset.id,
                                                subObject: parentAsset.subObject,
                                                model: parentAsset.model
                                            }
                                        }}

                                        className="inline-flex items-center text-sm font-medium text-black hover:text-yellow-950">
                                        <Image
                                            src="/img/arrow-left.svg"
                                            alt="home"
                                            className="h-6"
                                            height={24}
                                            width={24}
                                        />
                                        <span className="text-black ml-2">Back</span>
                                    </Link>
                                </li>
                            </ol>
                        </nav>

                        <div className="flex justify-center items-center">
                            <button className="bg-yellow-951 text-black rounded rounded-xl border b order-yellow-951 flex justify-center items-center px-3 h-[44px] ml-2 transition-all duration-[400ms] mr-3 transition-opacity duration-300 outline-none transform active:scale-75 transition-transform">Generate RCA</button>
                            <button className="bg-yellow-951 text-black rounded rounded-xl border b order-yellow-951 flex justify-center items-center px-3 h-[44px] ml-2 transition-all duration-[400ms] mr-3 transition-opacity duration-300 outline-none transform active:scale-75 transition-transform">Track Issue</button>
                        </div>
                    </div>


                    {/* Images */}

                    <div className="relative mt-10 rounded overflow-hidden rounded-xl">
                        {
                            parentAsset.selectedID ?
                                <div>
                                    {
                                        parentAsset.objectID && parentAsset.model === "Tire Wear Detection" && parentAsset.subObject === "Tire" ?
                                            <div className="relative mt-0 w-full flex flex-wrap justify-start items-start">
                                                <div className="relative w-[45%]">
                                                    <div className="bg-gray-951 flex justify-center items-center rounded rounded-xl overflow-hidden">
                                                        {
                                                            data ?
                                                                <>
                                                                    <Image
                                                                        src={`/img/TireWearPrediction/NEC1TT01522/Test/${data.resultImage}`}
                                                                        alt="Result"
                                                                        height={700}
                                                                        width={500}
                                                                        className="h-auto w-auto"
                                                                    />
                                                                </>
                                                                : null
                                                        }
                                                    </div>
                                                </div>
                                                <div className="relative pl-10 w-[55%]">
                                                    <p className="mb-5 p-0 text-black text-md font-semibold">Object ID: <span className="text-yellow-951">{data.ObjectID}</span> </p>
                                                    <p className="mb-2 p-0 text-black text-xl font-semibold">Predictions </p>
                                                    {
                                                        data ?
                                                            <>
                                                                <Image
                                                                    src={`/img/TireWearPrediction/${parentAsset.key}/Test/${data.image}`}
                                                                    alt="Result"
                                                                    height={300}
                                                                    width={300}
                                                                />
                                                            </>
                                                            : null
                                                    }
                                                </div>
                                            </div>
                                            :
                                            null
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