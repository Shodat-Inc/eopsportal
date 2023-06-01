import React, { useState, useRef, useEffect } from "react";
import Layout from "../../../components/Layout";
import Template from "../template";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from 'next/router'

export default function EopsWatchAlert() {
    const router = useRouter();
    const parentAsset = router.query;
    return (
        <div className="flex font-OpenSans">

            <div className="w-[100%]">
                <div className="columns-2 flex justify-between items-center">
                    <p className="text-black text-lg mb-0 font-semibold">Alerts</p>
                </div>

                <div className="border min-h-full rounded-xl mt-3 px-4 py-4">
                    <div className="flex justify-start items-start">
                        <nav className="flex" aria-label="Breadcrumb">
                            <ol className="inline-flex items-center space-x-1 md:space-x-1">
                                <li className="inline-flex items-center">
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
                    </div>

                    <div className="flex items-end justify-end mt-[-32px]">
                        <button
                            className="flex justify-center items-center text-black bg-yellow-951 rounded rounded-xl h-12 px-4 transition-opacity duration-300"
                        >
                            <Image
                                src="/img/settings.svg"
                                alt="activity"
                                height={19}
                                width={19}
                                className="mr-2"
                            />
                            <span>Configure Alerts</span>
                        </button>

                    </div>

                    {/* Content Goes Here */}
                    <div className="flex h-96 w-full justify-center items-center">
                        <p className="text-4xl text-gray-951">No alert configured!  </p>
                    </div>
                    <div className="flex flex-wrap mt-5 hidden">
                        <Image
                            src="/img/alerts/Alerts1.png"
                            alt="Alert 1"
                            height={186}
                            width={740}
                            className="w-full h-full"
                        />
                        <Image
                            src="/img/alerts/Alerts2.png"
                            alt="Alert 1"
                            height={186}
                            width={740}
                            className="w-full h-full"
                        />
                        <Image
                            src="/img/alerts/Alerts3.png"
                            alt="Alert 1"
                            height={186}
                            width={740}
                            className="w-full h-full"
                        />
                        <Image
                            src="/img/alerts/Alerts4.png"
                            alt="Alert 1"
                            height={186}
                            width={740}
                            className="w-full h-full"
                        />
                    </div>

                </div>
            </div>

            <div className="w-[16%] pl-5 hidden">
                <Template />
            </div>

        </div>
    )
}

EopsWatchAlert.getLayout = function getLayout(page: any) {
    return (
        <Layout>{page}</Layout>
    )
}