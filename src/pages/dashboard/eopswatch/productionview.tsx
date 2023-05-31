import React, { useState, useRef, useEffect } from "react";
import Layout from "../../../components/Layout";
import Template from "../template";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from 'next/router'
import axios from 'axios';
import NoDataFound from "../../../common/nodatafound";
import styles from '../../../styles/Common.module.css';

export default function ProductionView() {

    const router = useRouter();
    const parentAsset = router.query;
    const [loader, setLoader] = useState(true);
    useEffect(() => {
        setTimeout(() => {
            setLoader(false)
        }, 4000)
    }, [])
    console.log("parentAsset", parentAsset)
    return (
        <div className="flex font-OpenSans">

            <div className="w-[100%]">
                <div className="columns-2 flex justify-between items-center">
                    <p className="text-black text-lg mb-0 font-semibold">eOps Watch</p>
                </div>

                <div className="border min-h-full rounded-xl mt-3 px-4 py-4">
                    <div className="flex justify-between items-center">
                        {/* Breadcrumb */}
                        <nav className="flex" aria-label="Breadcrumb">
                            <ol className="inline-flex items-center space-x-1 md:space-x-1">
                                <li className="inline-flex items-center">
                                    <Link href="/dashboard/eopswatch"
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
                                            pathname: "/dashboard/subchildobject",
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
                                        <span className="ml-1 text-sm font-medium text-black hover:text-yellow-950 md:ml-1">Productions</span>
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
                                                                src={parentAsset?.result?.toString()}
                                                                alt="Result"
                                                                height={700}
                                                                width={500}
                                                                className="h-auto w-auto"
                                                            />
                                                            </div>
                                                        </div>
                                                        <div className="relative pl-10 w-[55%]">
                                                            <p className="mb-10 p-0 text-black text-xl font-semibold">Predictions </p>
                                                            <Image
                                                                src="/img/Component.png"
                                                                alt="Result"
                                                                height={87}
                                                                width={131}
                                                                className="mb-2 h-auto w-auto"
                                                            />
                                                        </div>
                                                    </div>

                                                    :
                                                    <div className="relative mt-0 w-full flex flex-wrap justify-start items-start">
                                                        <div className="relative w-[45%]">
                                                            <Image
                                                                src={parentAsset?.result?.toString()}
                                                                alt="Result"
                                                                height={700}
                                                                width={500}
                                                                className="h-auto w-auto"
                                                            />
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

                                                            <p className="mb-2 p-0 text-black text-xl font-semibold">Threshold Value</p>
                                                            <Image
                                                                src="/img/thresholdValue.png"
                                                                alt="Result"
                                                                height={70}
                                                                width={290}
                                                                className="mb-2 h-auto w-auto"
                                                            />

                                                            <p className="mb-4 p-0 text-black text-normal font-normal">Only show suggested objects if the probability is above the selected threshold</p>

                                                            <div className={`relative h-[160px] overflow-y-auto rounded rounded-xl ${styles.viewTableWrap}`}>
                                                                <table className={`table-auto min-w-full text-left rounded rounded-xl ${styles.viewTable}`}>
                                                                    <thead className="bg-orange-951 text-black rounded rounded-xl h-10 text-sm font-normal">
                                                                        <tr className="">
                                                                            <th>Tag</th>
                                                                            <th>Probability</th>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody className="cursor-pointer">
                                                                        <tr>
                                                                            <td className="text-black text-lg font-semibold">Crack</td>
                                                                            <td><span className="text-black rounded rounded-xl bg-yellow-951 py-1 px-3">15.5%</span></td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td className="text-black text-lg font-semibold">Crack</td>
                                                                            <td><span className="text-black rounded rounded-xl bg-yellow-951 py-1 px-3">3.7%</span></td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td className="text-black text-lg font-semibold">Crack</td>
                                                                            <td><span className="text-black rounded rounded-xl bg-yellow-951 py-1 px-3">3.3%</span></td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td className="text-black text-lg font-semibold">Crack</td>
                                                                            <td><span className="text-black rounded rounded-xl bg-yellow-951 py-1 px-3">12.7%</span></td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td className="text-black text-lg font-semibold">Crack</td>
                                                                            <td><span className="text-black rounded rounded-xl bg-yellow-951 py-1 px-3">15.5%</span></td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                            </div>
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