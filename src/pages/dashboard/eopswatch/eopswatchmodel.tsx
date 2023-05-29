import React, { useState, useRef, useEffect } from "react";
import styles from '../../../styles/Common.module.css';
import Layout from "../../../components/Layout";
import Template from "../template";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from 'next/router'

export default function EopsWatchModel() {

    const router = useRouter();
    const parentAsset = router.query;

    const [chooseAsset, setChooseAsset] = useState(parentAsset.model);
    const [toggleAsset, setToggleAsset] = useState(false);

    // Show Choose Asset List
    const showChooseAssetList = () => {
        setToggleAsset(!toggleAsset)
    }
    const selectAsset = (item: any) => {
        setChooseAsset(item);
        setToggleAsset(false)
    }
    return (
        <div className="flex font-OpenSans">

            <div className="w-[100%]">
                <div className="columns-2 flex justify-between items-center">
                    <p className="text-black text-lg mb-0 font-semibold">eOps Watch</p>
                </div>

                <div className="border min-h-full rounded-xl mt-3 px-4 py-4">
                    <div className="flex justify-start items-start">
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
                                    <div className="flex items-center">
                                        <Image
                                            src="/img/arrow-right.svg"
                                            alt="arrow-right"
                                            className="h-6"
                                            height={24}
                                            width={24}
                                        />
                                        <span className="ml-1 text-sm font-medium text-black hover:text-yellow-950 md:ml-1">{parentAsset.key}</span>
                                    </div>
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
                                        <span className="ml-1 text-sm font-medium text-black hover:text-yellow-950 md:ml-1">Crack Detection</span>
                                    </div>
                                </li>
                            </ol>
                        </nav>
                    </div>


                    <div className="flex items-end justify-end mt-[-32px]">
                        <Link
                            className="flex justify-center items-center text-black bg-yellow-951 rounded rounded-xl h-12 px-4 transition-opacity duration-300 mr-5"
                            href="/dashboard/eopswatch/modelperformance"
                        >
                            <Image
                                src="/img/activity.svg"
                                alt="activity"
                                height={19}
                                width={19}
                                className="mr-2"
                            />
                            <span>Model Performance</span>
                        </Link>

                        <Link
                            href="/dashboard/eopswatch/eopswatchalerts"
                            className="flex justify-center items-center text-black bg-yellow-951 rounded rounded-xl h-12 px-4 transition-opacity duration-300"
                        >
                            <Image
                                src="/img/message-square.svg"
                                alt="activity"
                                height={19}
                                width={19}
                                className="mr-2"
                            />
                            <span>Alerts</span>
                        </Link>

                    </div>

                    <div className="flex items-center justify-between mt-10">
                        {/* Image */}
                        <div className="relative w-[46%]">
                            <div className="rounded rounded-xl bg-gray-956 border border-gray-951 h-[300px] w-full overflow-hidden">
                                <div className="relative flex items-center justify-center h-full">
                                    <Image
                                        src="/img/training-model.png"
                                        alt="trainingModel"
                                        height={250}
                                        width={250}
                                        className="display-inline"
                                    />
                                </div>

                            </div>
                        </div>

                        {/* Model */}
                        <div className="relative w-[46%]">
                            <div className="w-[400px] relative">
                                <div
                                    className="border rounded-xl border-gray-500 h-[55px] w-[400px] pl-2 pr-5 relative flex items-center justify-start"
                                    onClick={showChooseAssetList}
                                >
                                    <label className="absolute text-sm top-[-10px] left-2 pl-2 pr-2 bg-white">Model</label>
                                    <Image
                                        src="/img/arrow-down-black.svg"
                                        alt="arrow-down"
                                        height={20}
                                        width={20}
                                        className="absolute right-3 top-4"
                                    />
                                    <span className="text-md text-black pl-2">{chooseAsset}</span>
                                </div>
                                {toggleAsset ?
                                    <div className={`h-52 border rounded-xl border-gray-500 h-[250px] w-[400px]  flex items-start justify-start mt-1 overflow-hidden overflow-y-scroll absolute top-[100%] left-0 z-10 ${styles.scroll}`}>
                                        <ul className="p-0 m-0 w-full z-5">
                                            <li className="bg-white"><span className="font-bold mb-2 pl-5 mt-4 w-full block">Vehicle Class</span></li>
                                            <li
                                                className="px-5 py-4 bg-white cursor-pointer hover:bg-yellow-951 w-full font-normal"
                                                onClick={() => selectAsset('Crack Detection')}
                                            >
                                                <span>Crack Detection</span>
                                            </li>
                                            <li
                                                className="px-5 py-4 bg-white cursor-pointer hover:bg-yellow-951 w-full font-normal"
                                                onClick={() => selectAsset('Tire Wear Detection')}
                                            >
                                                <span>Tire Wear Detection</span>
                                            </li>
                                            <li
                                                className="px-5 py-4 bg-white cursor-pointer hover:bg-yellow-951 w-full font-normal"
                                                onClick={() => selectAsset('Crystallization Detection')}
                                            >
                                                <span>Crystallization Detection</span>
                                            </li>
                                            <li
                                                className="px-5 py-4 bg-white cursor-pointer hover:bg-yellow-951 w-full font-normal"
                                                onClick={() => selectAsset('Parts Detection')}
                                            >
                                                <span>Parts Detection</span>
                                            </li>
                                            <li
                                                className="px-5 py-4 bg-white cursor-pointer hover:bg-yellow-951 w-full font-normal"
                                                onClick={() => selectAsset('Battery Life Prediction')}
                                            >
                                                <span>Battery Life Prediction</span>
                                            </li>
                                            <li className="bg-white py-5"><span className="font-bold mb-2 pl-5 mt-4 w-full block">Manufacturing Plant Class</span></li>
                                            <li
                                                className="px-5 py-4 bg-white cursor-pointer hover:bg-yellow-951 w-full font-normal"
                                                onClick={() => selectAsset('Crack Detection')}
                                            >
                                                <span>Crack Detection</span>
                                            </li>
                                            <li
                                                className="px-5 py-4 bg-white cursor-pointer hover:bg-yellow-951 w-full font-normal"
                                                onClick={() => selectAsset('Parts Detection')}
                                            >
                                                <span>Parts Detection</span>
                                            </li>
                                            <li
                                                className="px-5 py-4 bg-white cursor-pointer hover:bg-yellow-951 w-full font-normal"
                                                onClick={() => selectAsset('Workplace Safety Detection')}
                                            >
                                                <span>Workplace Safety Detection</span>
                                            </li>
                                        </ul>
                                    </div>
                                    : null}
                            </div>

                            <div className="flex mt-10">
                                <Link
                                    href={{
                                        pathname: "/dashboard/eopswatch/trainingmodel",
                                        query: {
                                            objectID: parentAsset.objectID,
                                            key: parentAsset.key,
                                            model: 'Crack Detection'
                                        }
                                    }}
                                    className="relative mr-16"
                                >
                                    <Image
                                        src="/img/folder.svg"
                                        alt="folder"
                                        height={130}
                                        width={130}
                                    />
                                    <span className="absolute top-[65px] left-[45px] text-lg font-semibold">Test</span>
                                </Link>

                                <Link
                                    href={{
                                        pathname: "/dashboard/eopswatch/productionmodel",
                                        query: {
                                            objectID: parentAsset.objectID,
                                            key: parentAsset.key,
                                            model: 'Crack Detection'
                                        }
                                    }}
                                    className="relative mr-16"
                                >
                                    <Image
                                        src="/img/folder.svg"
                                        alt="folder"
                                        height={130}
                                        width={130}
                                    />
                                    <span className="absolute top-[50%] left-[15%] text-lg font-semibold">Production</span>
                                </Link>
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

EopsWatchModel.getLayout = function getLayout(page: any) {
    return (
        <Layout>{page}</Layout>
    )
}