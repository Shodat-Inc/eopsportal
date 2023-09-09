<<<<<<< HEAD
import React, { useState, useRef, useEffect } from "react";
=======
import React from "react";
>>>>>>> b0579d24bbe05fbed9660d886b2fc1aeecd70b1d
import styles from '../../../styles/Common.module.css';
import Layout from "../../../components/Layout";
import Template from "../template";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from 'next/router'

export default function ModelPerformance() {
    const router = useRouter();
    const parentAsset = router.query;
    return (
        <div className="flex font-OpenSans">

            <div className="w-[100%]">
                <div className="columns-2 flex justify-between items-center">
                    <p className="text-black text-lg mb-0 font-semibold">eOps Watch</p>
                </div>

                <div className="border min-h-full rounded-xl mt-3 px-4 py-4 border border-gray-957 bg-gray-953">
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
                                        <span className="text-black ml-2">Model Performance</span>
                                    </Link>
                                </li>
                            </ol>
                        </nav>
                    </div>

                    {/* Content Goes Here */}
                    <div className="mt-8">
<<<<<<< HEAD
                        <p className="text-sm mb-4">Finished training on: <span className="font-semibold">1/9/2022, 7:14:18 AM using General domain</span></p>
=======
                        <p className="text-sm mb-4">Finished training on: <span className="font-semibold">02/08/2023, 8:14:18 AM using General domain</span></p>
>>>>>>> b0579d24bbe05fbed9660d886b2fc1aeecd70b1d

                        <p className="text-sm">Iteration id: <span className="font-semibold">3e932594-1df9-465f-b9a6-a5dce3e587d8</span></p>

                        <div className="relative mt-10 flex items-center justify-center">
                            <Image
                                src="/img/modalPerf.svg"
                                alt="Model Performance"
                                height={225}
                                width={780}
                                className="h-auto w-auto"
                            />
                        </div>

                        <div className="mt-12">
                            <p className="text-black text-md mb-3 font-semibold">Performance Per Tag</p>
                            <div className="lg:overflow-hidden md:overflow-x-scroll sm:overflow-x-scroll border border-gray-958 rounded-xl lg:w-full md:w-full lg:w-full sm:w-full small:w-full small:overflow-x-scroll bg-white">
                                <table className={`table-auto lg:min-w-full sm:w-full small:w-full text-left ${styles.table} ${styles.tableTab}`}>
                                    <thead className="bg-black text-white rounded-xl h-10 text-[14px] font-light">
                                        <tr>
                                            <th>Tag</th>
                                            <th>Precision</th>
                                            <th>Recall</th>
                                            <th>A.P</th>
                                            <th>Image Count</th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-sm cursor-pointer">
                                        <tr className="hover:bg-yellow-950 text-sm border boder-gray-958 last:border-none">
                                            <td>Vehicle</td>
                                            <td>100.0%</td>
                                            <td>40.0%</td>
                                            <td>65.3%</td>
                                            <td>23</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            <div className="w-[16%] pl-5 hidden">
                <Template />
            </div>

        </div>
    )
}

ModelPerformance.getLayout = function getLayout(page: any) {
    return (
        <Layout>{page}</Layout>
    )
}