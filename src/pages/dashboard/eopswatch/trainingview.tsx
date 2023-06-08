import React, { useState, useRef, useEffect } from "react";
import Layout from "../../../components/Layout";
import Template from "../template";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from 'next/router'
import axios from 'axios';
import NoDataFound from "../../../common/nodatafound";
import styles from '../../../styles/Common.module.css';

export default function TrainingView() {

    const router = useRouter();
    const parentAsset = router.query;
    const [loader, setLoader] = useState(true);
    const [data, setData] = useState([] as any);
    useEffect(() => {
        setTimeout(() => {
            setLoader(false)
        }, 4000)
    }, [])
    console.log("parentAsset", parentAsset)

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
                        console.log("HERE", filtered[0].images)
                        const filterArr = filtered[0].images.filter((item: any) => {
                            return item.imageID.toString() === parentAsset.imageID
                        })
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

    console.log("DATA =>", data)

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
                                            pathname: "/dashboard/eopswatch/trainingmodel",
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
                                                                src={data ? data[0].resultImage : parentAsset?.result?.toString()}
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

                                                            {
                                                                data ?
                                                                    <>
                                                                        <p className="mb-2 p-0 text-black text-xl font-semibold">Threshold Value</p>
                                                                        <Image
                                                                            src={data[0].threshold}
                                                                            alt="Result"
                                                                            height={70}
                                                                            width={290}
                                                                            className="mb-2 h-auto w-auto"
                                                                        />
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
                                                                                    data[0].thresholdTags.map((item: any, index: any) => (
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

TrainingView.getLayout = function getLayout(page: any) {
    return (
        <Layout>{page}</Layout>
    )
}