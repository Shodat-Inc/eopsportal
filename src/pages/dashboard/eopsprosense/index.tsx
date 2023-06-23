import React, { useState, useRef, useEffect } from "react";
import styles from '../../../styles/Common.module.css';
import Layout from "../../../components/Layout";
import Template from "../template";
import Image from "next/image";
import Link from "next/link";
import { getAssetsData } from "@/lib/getassets";

export async function getServerSideProps() {
    const assetData = await getAssetsData()
    return {
        props: {
            assetData,
        },
    }
}

export default function EopsProsense(props: any) {
    const [chooseAsset, setChooseAsset] = useState(props.assetData && props.assetData.length > 0 ? props.assetData[0].assetName : '');
    const [toggleAsset, setToggleAsset] = useState(false);
    const [classData, setClassData] = useState(props.assetData);
    const [showHideTab, setShowHideTab] = useState(true);

    // Show Choose Asset List
    const showChooseAssetList = () => {
        setToggleAsset(!toggleAsset)
    }

    const selectAsset = (item: any) => {
        setChooseAsset(item);
        setToggleAsset(false);
    }

    return (
        <div className="flex font-OpenSans">

            <div className="w-[100%]">
                <div className="columns-2 flex justify-between items-center">
                    <p className="text-black text-lg mb-0 font-semibold">eOPS Prosense</p>
                </div>

                <div className="border border-gray-957 bg-gray-953 min-h-[450px] rounded-xl mt-3 px-4 py-4">
                    <div className="flex justify-start items-start">
                        <nav className="flex" aria-label="Breadcrumb">
                            <ol className="inline-flex items-center space-x-1 md:space-x-1">
                                <li className="inline-flex items-center">
                                    <Link href="/dashboard/assetmanagement"
                                        className="inline-flex items-center justify-start text-sm font-medium text-black hover:text-yellow-950">
                                        <Image
                                            src="/img/home.svg"
                                            alt="home"
                                            className="h-6"
                                            height={24}
                                            width={24}
                                        />
                                        <span className="font-semibold text-md ml-3">Alerts</span>
                                    </Link>
                                </li>
                            </ol>
                        </nav>
                    </div>

                    {/* Content Goes Here */}
                    <div className="mb-10">
                        <div className="flex w-full justify-between items-start mt-8 lg:w-[900px]">
                            <div className="flex relative w-[380px] flex-wrap">
                                <input
                                    type="text"
                                    placeholder="Search"
                                    id="searchobjects"
                                    name="searchobjects"
                                    className="rounded rounded-lg border border-gray-962 pl-10 pr-2 w-[380px] h-14"
                                />
                                <Image
                                    src="/img/search.svg"
                                    alt="search"
                                    height={18}
                                    width={18}
                                    className="absolute left-3 top-[18px]"
                                />
                            </div>
                            <div className="flex items-center justify-start flex-wrap">
                                <div className="relative border border-gray-962 rounded rounded-md h-14 w-[140px] mr-7">
                                    <input
                                        type="text"
                                        className="w-full h-full rounded rounded-md pr-8 pl-2"
                                        placeholder="From"
                                    />
                                    <Image
                                        src="/img/calendar.svg"
                                        alt="calendar"
                                        height={20}
                                        width={20}
                                        className="absolute top-[12px] right-[9px]"
                                    />
                                </div>
                                <div className="relative border border-gray-962 rounded rounded-md h-14 w-[140px] mr-7">
                                    <input
                                        type="text"
                                        className="w-full h-full rounded rounded-md pr-8 pl-2"
                                        placeholder="To"
                                    />
                                    <Image
                                        src="/img/calendar.svg"
                                        alt="calendar"
                                        height={20}
                                        width={20}
                                        className="absolute top-[12px] right-[9px]"
                                    />
                                </div>
                                <div className="relative">
                                    <button
                                        className="h-14 border w-[46px] bg-black text-white rounded rounded-lg flex justify-center items-center"
                                    >
                                        <Image
                                            src="/img/arrow-right-white.svg"
                                            alt="calendar"
                                            height={28}
                                            width={28}
                                        />
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="flex w-full justify-start items-center mt-5 lg:w-[900px]">
                            <Image
                                src="/img/info-gray.svg"
                                alt="info"
                                height={32}
                                width={32}
                                className="pr-3"
                            />
                            <p className="text-[#666666]">You can select and change the below class and models from the dropdowns to view more alerts.</p>
                        </div>

                        <div className="flex w-full justify-between items-start mt-8 lg:w-[900px]">
                            <div className="w-[380px]">
                                <div
                                    className="border rounded-xl border-gray-500 h-[55px] w-[380px] pl-2 pr-5 relative flex items-center justify-start bg-white"
                                    onClick={showChooseAssetList}
                                >
                                    <label className="absolute text-sm top-[-10px] left-2 pl-2 pr-2 bg-white">Class</label>
                                    <Image
                                        src="/img/arrow-down-black.svg"
                                        alt="arrow-down"
                                        height={20}
                                        width={20}
                                        className="absolute right-3 top-4"
                                    />
                                    <span className="text-lg text-black pl-2">{chooseAsset}</span>
                                </div>

                                {toggleAsset ?
                                    <div className={`h-52 border rounded-xl border-gray-500 h-auto max-h-[250px] w-[380px]  absolute flex items-start justify-start mt-1 overflow-hidden overflow-y-auto bg-white ${styles.scroll} z-10`}>
                                        <ul className="p-0 m-0 w-full">
                                            {
                                                classData.map((item: any, index: any) => (
                                                    <li
                                                        className="px-5 py-4 bg-white cursor-pointer hover:bg-yellow-951 w-full font-normal"
                                                        onClick={() => selectAsset(item.assetName)}
                                                        key={index}
                                                    >
                                                        <span>{item.assetName}</span>
                                                    </li>
                                                ))
                                            }
                                        </ul>
                                    </div>
                                    : null}
                            </div>

                            <div className="w-[380px]">
                                <div
                                    className="border rounded-xl border-gray-500 h-[55px] w-[380px] pl-2 pr-5 relative flex items-center justify-start bg-white"
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
                                    <span className="text-lg text-black pl-2">{"Crack Deduction"}</span>
                                </div>
                                {toggleAsset ?
                                    <div className={`h-52 border rounded-xl border-gray-500 h-auto max-h-[250px] w-[380px]  absolute flex items-start justify-start mt-1 overflow-hidden overflow-y-auto bg-white ${styles.scroll} z-10`}>
                                        <ul className="p-0 m-0 w-full">
                                            {
                                                classData.map((item: any, index: any) => (
                                                    <li
                                                        className="px-5 py-4 bg-white cursor-pointer hover:bg-yellow-951 w-full font-normal"
                                                        onClick={() => selectAsset(item.assetName)}
                                                        key={index}
                                                    >
                                                        <span>{item.assetName}</span>
                                                    </li>
                                                ))
                                            }
                                        </ul>
                                    </div>
                                    : null}
                            </div>
                        </div>

                        <div className="flex w-full justify-between items-start mt-8 lg:w-full">
                            <div className={`lg:overflow-x-auto md:overflow-x-scroll sm:overflow-x-scroll rounded-xl lg:w-full md:w-full lg:w-full sm:w-full small:w-full small:overflow-x-scroll max-h-[300px] ${styles.proTableWrap}`}>
                                <table className={`table-auto lg:min-w-full sm:w-full small:w-full text-left ${styles.proSenseTable}`}>
                                    <thead className="text-sm font-normal">
                                        <tr>
                                            <th>Image</th>
                                            <th>ID</th>
                                            <th>Tags</th>
                                            <th>Impact</th>
                                            <th>Date</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>
                                                <span>
                                                    <Image
                                                        src="/img/pro-1.png"
                                                        alt="home"
                                                        height={60}
                                                        width={80}
                                                    />
                                                </span>
                                            </td>
                                            <td>112233445566</td>
                                            <td>Crack</td>
                                            <td><span className="text-white bg-red-960 inline-flex justify-center items-center rounded rounded-md p-1 text-sm">High</span></td>
                                            <td><span className="text-gray-951">16-06-2023</span></td>
                                            <td>
                                                <button className="flex justify-center items-center bg-yellow-951 text-black text-sm h-[40px] p-1 rounded rounded-lg min-w-[90px]">
                                                    <Image
                                                        src="/img/prosense-action-icon.svg"
                                                        alt="home"
                                                        className="mr-2"
                                                        height={18}
                                                        width={18}
                                                    />
                                                    <span>Result</span>
                                                </button>
                                            </td>
                                        </tr>

                                        <tr>
                                            <td>
                                                <span>
                                                    <Image
                                                        src="/img/pro-2.png"
                                                        alt="home"
                                                        height={60}
                                                        width={80}
                                                    />
                                                </span>
                                            </td>
                                            <td>112233445567</td>
                                            <td>Crack</td>
                                            <td><span className="text-white bg-orange-952 inline-flex justify-center items-center rounded rounded-md p-1 text-sm">Medium</span></td>
                                            <td><span className="text-gray-951">16-06-2023</span></td>
                                            <td>
                                                <button className="flex justify-center items-center bg-yellow-951 text-black text-sm h-[40px] p-1 rounded rounded-lg min-w-[90px]">
                                                    <Image
                                                        src="/img/prosense-action-icon.svg"
                                                        alt="home"
                                                        className="mr-2"
                                                        height={18}
                                                        width={18}
                                                    />
                                                    <span>Result</span>
                                                </button>
                                            </td>
                                        </tr>

                                        <tr>
                                            <td>
                                                <span>
                                                    <Image
                                                        src="/img/pro-3.png"
                                                        alt="home"
                                                        height={60}
                                                        width={80}
                                                    />
                                                </span>
                                            </td>
                                            <td>112233445568</td>
                                            <td>Crack</td>
                                            <td><span className="text-white bg-orange-952 inline-flex justify-center items-center rounded rounded-md p-1 text-sm">Medium</span></td>
                                            <td><span className="text-gray-951">15-06-2023</span></td>
                                            <td>
                                                <button className="flex justify-center items-center bg-yellow-951 text-black text-sm h-[40px] p-1 rounded rounded-lg min-w-[90px]">
                                                    <Image
                                                        src="/img/prosense-action-icon.svg"
                                                        alt="home"
                                                        className="mr-2"
                                                        height={18}
                                                        width={18}
                                                    />
                                                    <span>Result</span>
                                                </button>
                                            </td>
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

EopsProsense.getLayout = function getLayout(page: any) {
    return (
        <Layout>{page}</Layout>
    )
}