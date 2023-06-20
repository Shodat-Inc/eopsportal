import React, { useState, useRef, useEffect } from "react";
import Layout from "../../../components/Layout";
import styles from '../../../styles/Common.module.css';
import Template from "../template";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from 'next/router'

export default function EopsWatchAlert() {
    const router = useRouter();
    const parentAsset = router.query;
    const [toggleText, setToggleText] = useState(false)
    const toggleChecked = () => {
        setToggleText(!toggleText)
    }
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
                                        <span className="text-black ml-2">Alerts</span>
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
                    <div className="mt-5 mb-7 p-5 rounded rounded-xl border border-gray-965 bg-gray-966 min-h-[150px] w-full">
                        <ul className="text-sm flex items-center justify-start mb-3">
                            <li>Rules</li>
                            <li className="flex items-center justify-start">
                                <Image
                                    src="/img/arrow-right.svg"
                                    alt="arrow-right"
                                    height={22}
                                    width={22}
                                />
                                <span className="font-semibold">Low Battery Life Alert</span>
                            </li>
                        </ul>
                        <div className="border border-gray-954 rounded rounded-xl h-[56px] w-full px-5 py-2 flex items-center justify-start bg-white">
                            <span>Low Battery Life Alert</span>
                        </div>
                        <div className="relative flex items-center justify-start mt-4">
                            <span className="w-[70px] text-black mr-3">{toggleText ? "Enabled" : "Disabled"}</span>
                            <div className={`${styles.radioWrap}`}>
                                <input
                                    type="checkbox"
                                    onClick={toggleChecked}
                                />
                                <span className={`${styles.radioFrame}`}></span>
                            </div>
                        </div>
                    </div>

                    <div className="mt-5 mb-7 p-5 rounded rounded-xl border border-gray-965 bg-gray-966 min-h-[150px] w-full">
                        <p className="mb-1 font-semibold text-lg">Target Device</p>
                        <p className="mb-4">Select the device template your rule will use. If you need to narrow the rules scope, add filters.</p>
                        <div className={`mb-2 lg:w-[380px] small:w-full small:w-full ${styles.form__wrap}`}>
                            <div className={`relative ${styles.form__group} ${styles.form__group__bg} font-OpenSans`}>
                                <input
                                    type="text"
                                    id="deviceTemplate"
                                    name="deviceTemplate"
                                    className={`border bg-white border-gray-961 ${styles.form__field}`}
                                    placeholder="Device Template"
                                    value={"Logistics Geteway"}
                                />
                                <label htmlFor="deviceTemplate" className={`${styles.form__label}`}>Device Template</label>
                            </div>
                        </div>
                        <div className="mt-5">
                            <button
                                className="rounded-xl bg-yellow-951 border-[2px] border-yellow-951 text-black flex h-12 justify-center items-center pl-2 pr-2 hover:bg-white hover:text-black hover:border-black transition-all duration-[400ms] mr-3"
                            >
                                <Image
                                    src="/img/plus-black.svg"
                                    alt="Create New Asset"
                                    className="mr-2"
                                    height={24}
                                    width={24}
                                />
                                Filter
                            </button>

                        </div>
                    </div>

                    <div className="mt-5 mb-7 p-5 rounded rounded-xl border border-gray-965 bg-gray-966 min-h-[150px] w-full">
                        <p className="mb-1 font-semibold text-lg">Conditions</p>
                        <p className="mb-4">Conditions define when your rule is triggered. Aggregation is optional use it to cluster your data and trigger rules based on a time window.</p>
                        <div className="flex justify-between items-center">
                            <div className={`mb-2 lg:w-[380px] small:w-full small:w-full ${styles.form__wrap}`}>
                                <div className={`relative ${styles.form__group} ${styles.form__group__bg} font-OpenSans`}>
                                    <input
                                        type="text"
                                        id="deviceTemplate"
                                        name="deviceTemplate"
                                        className={`border bg-white border-gray-961 ${styles.form__field}`}
                                        placeholder="Trigger the rule if"
                                        value={"Logistics Geteway"}
                                    />
                                    <label htmlFor="deviceTemplate" className={`${styles.form__label}`}>Trigger the rule if</label>
                                </div>
                            </div>
                            <div className="relative flex justify-start items-center">
                                <div className="relative flex items-center justify-start mr-5 mt-1">
                                    <span className="w-[30px] text-black mr-3">{toggleText ? "On" : "Off"}</span>
                                    <div className={`${styles.radioWrap}`}>
                                        <input
                                            type="checkbox"
                                            onClick={toggleChecked}
                                        />
                                        <span className={`${styles.radioFrame}`}></span>
                                    </div>
                                </div>

                                <div className="mt-1">
                                    <button
                                        className="rounded-xl bg-yellow-951 border-[2px] border-yellow-951 text-black flex h-12 justify-center items-center pl-2 pr-2 hover:bg-white hover:text-black hover:border-black transition-all duration-[400ms] mr-3"
                                    >
                                        <Image
                                            src="/img/plus-black.svg"
                                            alt="Create New Asset"
                                            className="mr-2"
                                            height={24}
                                            width={24}
                                        />
                                        Set a time window
                                    </button>

                                </div>
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

EopsWatchAlert.getLayout = function getLayout(page: any) {
    return (
        <Layout>{page}</Layout>
    )
}