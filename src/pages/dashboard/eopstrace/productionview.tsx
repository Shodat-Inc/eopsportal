import React, { useState, useRef, useEffect } from "react";
import Layout from "../../../components/Layout";
import Template from "../template";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from 'next/router'
import axios from 'axios';
import NoDataFound from "../../../common/nodatafound";

export default function ProductionView() {

    const router = useRouter();
    const parentAsset = router.query;

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
                                    <Link href="/dashboard/eopstrace"
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
                                    <div className="flex items-center">
                                        <Image
                                            src="/img/arrow-right.svg"
                                            alt="arrow-right"
                                            className="h-6"
                                            height={24}
                                            width={24}
                                        />
                                        <span className="ml-1 text-sm text-black hover:text-yellow-950 md:ml-1 font-bold">{parentAsset.key}</span>
                                    </div>
                                </li>
                                <li>
                                    <Link
                                        href={{
                                            pathname: "/dashboard/eopstrace/tracemodel",
                                            query: {
                                                objectID: parentAsset.objectID,
                                                key: parentAsset.key
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
                                            pathname: "/dashboard/eopstrace/productionmodel",
                                            query: {
                                                objectID: parentAsset.objectID,
                                                key: parentAsset.key,
                                                model: parentAsset.model
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
                    <div className="relative mt-10 rounded overflow-hidden rounded-xl">
                        {parentAsset.result ?
                            <Image
                                src={parentAsset?.result?.toString()}
                                alt="result image"
                                height={600}
                                width={600}
                                className="h-full w-full"
                            />
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