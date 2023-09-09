import React, { useState, useRef, useEffect } from "react";
import Layout from "../../../components/Layout";
import Template from "../template";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from 'next/router'
import axios from 'axios';
import NoDataFound from "../../../common/nodatafound";
import styles from '../../../styles/Common.module.css';
import AlertTable from "./alerttable";

export default function Alerts() {

    const router = useRouter();
    const parentAsset = router.query;
    const [deleteModal, setDeleteModal] = useState(false);
    const [raisedAlert, setRaisedAlert] = useState(false);
    const [data, setData] = useState([] as any);
    const [sortIcon, setSortIcon] = useState(false)

    // Fetch the JSON data of sub Asset
    const fetchClassData = () => {
        axios.get("/api/getAlerts").then((response) => {
            if (response.data) {
                // setData(response.data);
                let filterData = response.data.filter((item: any) => {
                    return item.model === parentAsset.model
                })
                setData(filterData);
            }
        });
    };
    useEffect(() => {
        fetchClassData();
        if (fetchClassData.length) return;
    }, [])



    const sortData = () => {
        setSortIcon(!sortIcon)
        console.log({
            data: data
        })

        let newArr = sortIcon === false ? data.sort((a: any, b: any) => a.alertName.localeCompare(b.alertName)) : data.sort((a: any, b: any) => b.alertName.localeCompare(a.alertName))
        setData(newArr);
    }

    console.log({
        parentAsset: parentAsset,
        data: data
    })
    return (
        <div className="flex font-OpenSans">

            <div className="w-[100%]">
                <div className="columns-2 flex justify-between items-center">
                    <p className="text-black text-lg mb-0 font-semibold">eOps Watch</p>
                </div>

                <div className="border border-gray-957 bg-gray-953 min-h-full rounded-xl mt-3 px-4 py-4">
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
                                        <span className="ml-1 text-sm font-medium text-black hover:text-yellow-950 md:ml-1">Production</span>
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
                                        <span className="ml-1 text-sm font-medium text-black md:ml-1">Alerts</span>
                                    </div>
                                </li>
                            </ol>
                        </nav>

                        <div className="relative flex">
                            <Link
                                href={{
                                    pathname: "/dashboard/eopswatch/raisedalerts",
                                    query: {
                                        objectID: parentAsset.objectID,
                                        key: parentAsset.key,
                                        id: parentAsset.id,
                                        subObject: parentAsset.subObject,
                                        model: parentAsset.model,
                                    }
                                }}
                                className="flex justify-center items-center text-black bg-yellow-951 rounded rounded-xl h-12 px-4 transition-opacity duration-300 mr-5 outline-none transform active:scale-75 transition-transform"
                            // onClick={() => setRaisedAlert(true)}
                            >
                                <Image
                                    src="/img/announcement.svg"
                                    alt="activity"
                                    height={24}
                                    width={24}
                                    className="mr-2"
                                />
                                <span>Raised Alerts</span>
                            </Link>
                            <Link
                                className="flex justify-center items-center text-black bg-yellow-951 rounded rounded-xl h-12 px-4 transition-opacity duration-300 outline-none transform active:scale-75 transition-transform"
                                href={{
                                    pathname: "/dashboard/eopswatch/addalerts",
                                    query: {
                                        objectID: parentAsset.objectID,
                                        key: parentAsset.key,
                                        id: parentAsset.id,
                                        subObject: parentAsset.subObject,
                                        model: parentAsset.model,
                                    }
                                }}
                            >
                                <Image
                                    src="/img/plus-black.svg"
                                    alt="activity"
                                    height={24}
                                    width={24}
                                    className="mr-2"
                                />
                                <span>Add Alerts</span>
                            </Link>
                        </div>
                    </div>

                    <div className="relative mt-10 rounded overflow-hidden">
                        <div className="overflow-hidden w-full">
                            <AlertTable 
                                model={parentAsset.model}
                                objectID={parentAsset.objectID}
                                keys={parentAsset.key}
                                id={parentAsset.id}
                                subObject={parentAsset.subObject}
                            />
                            
                        </div>


                    </div>
                </div>

            </div>


            {/* ===== Delete Modal starts ===== */}
            {deleteModal ?
                <>
                    <div
                        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                    >
                        <div className="relative my-6 w-[580px]">
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                {/*header*/}
                                <div className="flex items-start justify-between p-2">
                                    <h3 className="text-lg font-medium"></h3>
                                    <button
                                        className="p-1 ml-auto bg-transparent border-0 text-black float-right leading-none font-semibold outline-none focus:outline-none"
                                        onClick={() => setDeleteModal(false)}
                                    >
                                        <Image
                                            src="/img/close.svg"
                                            alt="close"
                                            className="h-6"
                                            height={24}
                                            width={24}
                                        />
                                    </button>
                                </div>
                                {/*body*/}
                                <div className="relative pt-2 pb-8 flex-auto">
                                    <div className="flex justify-start items-center flex-wrap flex-col">
                                        <p className="flex justify-center items-center text-lg">Are you sure want to delete this alert?</p>
                                        <div className="mt-10 relative flex justify-center items-center w-full">
                                            <button
                                                className="border border-black rounded-lg bg-black text-white text-lg w-[70px] h-[47px] mr-5 hover:bg-yellow-951 hover:text-white hover:border-yellow-951 ease-in-out duration-300 disabled:bg-gray-951 disabled:hover:border-gray-951 disabled:border-gray-951"
                                                onClick={() => { setDeleteModal(false); }}
                                            >
                                                Yes
                                            </button>
                                            <button
                                                className="border border-black rounded-lg bg-white text-black text-lg w-[70px] h-[47px] hover:text-white hover:bg-yellow-951 hover:border-yellow-951 ease-in-out duration-300"
                                                onClick={() => { setDeleteModal(false); }}
                                            >
                                                No
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="opacity-75 fixed inset-0 z-40 bg-black"></div>
                </>
                : null}

            {/* ===== Delete Modal Ends ===== */}



            {/* ===== Raised Alert Modal starts ===== */}
            {raisedAlert ?
                <>
                    <div
                        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                    >
                        <div className="relative my-6 w-[1190px]">
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                {/*header*/}
                                <div className="flex items-start justify-between p-3 pt-4 mb-0">
                                    <h3 className="text-lg font-medium">Raised Alerts</h3>
                                    <button
                                        className="p-1 ml-auto bg-transparent border-0 text-black float-right leading-none font-semibold outline-none focus:outline-none"
                                        onClick={() => setRaisedAlert(false)}
                                    >
                                        <Image
                                            src="/img/close.svg"
                                            alt="close"
                                            className="h-6"
                                            height={24}
                                            width={24}
                                        />
                                    </button>
                                </div>
                                {/*body*/}
                                <div className="relative pt-2 pb-8 pl-3 pr-3 flex-auto">
                                    <div className={`rounded rounded-xl shadow-xl px-6 py-3 border-gray-956 border h-20 flex items-center justify-start ${styles.filters} mb-0`}>
                                        <div className="relative flex justify-start items-center mr-8 w-[180px]">
                                            <Image
                                                src="/img/sort.svg"
                                                alt="sort"
                                                height={16}
                                                width={16}
                                                className="mr-2"
                                            />
                                            <select name="sort" id="sort" className="text-sm outline-none">
                                                <option value="sort-by-impact">Sort by Impact</option>
                                                <option value="sort-by-incidence">Sort by Incidence</option>
                                                <option value="sort-by-Time">Sort by Time</option>
                                            </select>
                                        </div>

                                        <div className="relative flex justify-start items-center mr-8 w-[180px]">
                                            <Image
                                                src="/img/calendar.svg"
                                                alt="calendar"
                                                height={16}
                                                width={16}
                                                className="mr-2"
                                            />
                                            <input
                                                type="text"
                                                placeholder="Any Date"
                                                className="outline-none border-0 text-sm color-black"
                                            />
                                        </div>

                                        <div className="relative flex justify-start items-center mr-8 w-[180px]">
                                            <Image
                                                src="/img/search.svg"
                                                alt="search"
                                                height={16}
                                                width={16}
                                                className="mr-2"
                                            />
                                            <input
                                                type="text"
                                                name="search"
                                                placeholder="Search"
                                                className="outline-none border-0 text-sm color-black"
                                            />
                                        </div>

                                    </div>

                                    <div className="relative px-4 py-0 mt-4 pb-10">
                                        <div className={`lg:overflow-x-auto md:overflow-x-scroll sm:overflow-x-scroll rounded-xl lg:w-full md:w-full lg:w-full sm:w-full small:w-full small:overflow-x-scroll max-h-[300px] ${styles.proTableWrap}`}>
                                            <table className={`table-auto lg:min-w-full sm:w-full small:w-full text-left ${styles.proSenseTable}`}>
                                                <thead className="text-sm font-normal">
                                                    <tr>
                                                        <th>Image</th>
                                                        <th>ObjectID</th>
                                                        <th className="relative cursor-pointer" onClick={sortData}>
                                                            <Image
                                                                src="/img/arrow-up.svg"
                                                                alt="arrow up"
                                                                height={16}
                                                                width={16}
                                                                className={`absolute left-[-12px] top-[12px] ${sortIcon ? 'rotate-180' : 'rotate-0'}`}
                                                            />
                                                            <span className="pl-1">Threshold Value</span>
                                                        </th>
                                                        <th>Tags</th>
                                                        <th className="relative cursor-pointer" onClick={sortData}>
                                                            <Image
                                                                src="/img/arrow-up.svg"
                                                                alt="arrow up"
                                                                height={16}
                                                                width={16}
                                                                className={`absolute left-[-12px] top-[12px] ${sortIcon ? 'rotate-180' : 'rotate-0'}`}
                                                            />
                                                            <span className="pl-1">Impact</span>
                                                        </th>
                                                        <th className="relative cursor-pointer" onClick={sortData}>
                                                            <Image
                                                                src="/img/arrow-up.svg"
                                                                alt="arrow up"
                                                                height={16}
                                                                width={16}
                                                                className={`absolute left-[-12px] top-[12px] ${sortIcon ? 'rotate-180' : 'rotate-0'}`}
                                                            />
                                                            <span className="pl-1">Date</span>
                                                        </th>
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
                                                        <td>20%</td>
                                                        <td>Crack</td>
                                                        <td><span className="text-white bg-red-960 inline-flex justify-center items-center rounded rounded-md py-1 px-2 text-sm">High</span></td>
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
                                                        <td>15%</td>
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
                                                        <td>15%</td>
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
                                                        <td>112233445569</td>
                                                        <td>5%</td>
                                                        <td>Crack</td>
                                                        <td><span className="text-white bg-blue-960 inline-flex justify-center items-center rounded rounded-md p-1 text-sm">Low</span></td>
                                                        <td><span className="text-gray-951">14-06-2023</span></td>
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
                    </div>
                    <div className="opacity-75 fixed inset-0 z-40 bg-black"></div>
                </>
                : null}

            {/* ===== Raised Alerts Modal Ends ===== */}

        </div>
    )
}

Alerts.getLayout = function getLayout(page: any) {
    return (
        <Layout>{page}</Layout>
    )
}