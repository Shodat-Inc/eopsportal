import React, { useState, useRef, useEffect } from "react";
import styles from '../../styles/Common.module.css';
import Layout from "../../../components/Layout";
import Template from "../template";
import Image from "next/image";
import Link from "next/link";

export default function ModelPerformance() {
    return (
        <div className="flex font-OpenSans">

            <div className="w-[100%]">
                <div className="columns-2 flex justify-between items-center">
                    <p className="text-black text-lg mb-0 font-semibold">Model Performance</p>
                </div>

                <div className="border min-h-full rounded-xl mt-3 px-4 py-4">
                    <div className="flex justify-start items-start">
                        <nav className="flex" aria-label="Breadcrumb">
                            <ol className="inline-flex items-center space-x-1 md:space-x-1">
                                <li className="inline-flex items-center">
                                    <Link href="/dashboard/eopswatch/eopswatchmodel"
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
                    <div className="relative mt-10">
                        <Image
                        src="/img/ModelPerformance.png"
                        alt="Model Performance"
                        height={500}
                        width={500}
                        className="h-full w-full"
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

ModelPerformance.getLayout = function getLayout(page: any) {
    return (
        <Layout>{page}</Layout>
    )
}