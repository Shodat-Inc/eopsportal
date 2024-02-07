import React, { useState, useRef, useEffect } from "react";
import styles from '../../../styles/Common.module.css';
import Layout from "../../../components/Layout";
import Image from "next/image";
import Link from "next/link";
import Test from "./test";
import { useRouter } from 'next/router'

export default function RaisedAlerts() {
    const router = useRouter();
    const routerParams = router.query;
    const [toggleSort, setToggleSort] = useState(false);
    const [toggleDrop, setToggleDrop] = useState(false);
    const [selectedOption, setSelectedOption] = useState(1)
    const sortByID = () => {
        setToggleSort(!toggleSort)
    }
    const toggleDropFunction = (item: any) => {
        setToggleDrop(!toggleDrop);
        setSelectedOption(item)
    }
    return (
        <div className="w-full h-full font-OpenSans">
            <p className="text-black mb-4 font-semibold text-xl">eOps Watch</p>
            {/* Breadcrumb */}
            <div className="relative bg-white rounded-lg px-3 py-1 inline-flex border border-[#E3E3E3]">
                <ul className="flex justify-start items-center text-sm">
                    <li className="flex justify-start items-center">
                        <Link
                            href="/dashboard/aimodaldetection"
                            className="font-semibold"
                        >
                            TPC71810-01-012
                        </Link>
                    </li>
                    <li className="flex justify-start items-center">
                        <Image
                            src="/img/chevron-right.svg"
                            alt="chevron-right"
                            height={28}
                            width={28}
                        />
                        <Link
                            href="/dashboard/aimodaldetection"
                            className="font-semibold"
                        >
                            Models
                        </Link>
                    </li>
                    <li className="flex justify-start items-center">
                        <Image
                            src="/img/chevron-right.svg"
                            alt="chevron-right"
                            height={28}
                            width={28}
                        />
                        <Link
                            href="/dashboard/aimodaldetection"
                            className="font-semibold"
                        >
                            Crack Detection
                        </Link>
                    </li>
                    <li className="flex justify-start items-center">
                        <Image
                            src="/img/chevron-right.svg"
                            alt="chevron-right"
                            height={28}
                            width={28}
                        />
                        {/* http://localhost:3000/dashboard/eopswatch/alerts?objectID=Vehicles&key=NEC1TT01522&model=Tire+Wear+Detection&id=5PVBE7AJ8R5T50001&subObject=Tire */}
                        <Link
                             href={{
                                pathname: '/dashboard/eopswatch/alerts',
                                query: {
                                    objectID: routerParams.objectID,
                                    key: routerParams.key,
                                    model:routerParams.model,
                                    id: routerParams.id,
                                    subObject: routerParams.subObject
                                }
                            }}
                            className="font-semibold"
                        >
                            Alerts
                        </Link>
                    </li>
                    <li className="flex justify-start items-center">
                        <Image
                            src="/img/chevron-right.svg"
                            alt="chevron-right"
                            height={28}
                            width={28}
                        />
                        <span className="text-gray-967 capitalize">Raised Alert</span>
                    </li>
                </ul>
            </div>

            {/* content */}
            <div className="flex flex-wrap flex-col justify-start items-start mt-5 bg-white rounded-lg overflow-hidden1 min-h-[600px] p-3">
                <table className={`table-auto lg:min-w-full sm:w-full small:w-full text-left ${styles.tableV3}`}>
                    <thead className="text-sm font-normal">
                        <tr>
                            <th>Image</th>
                            <th>Object ID</th>
                            <th>
                                <button className="flex" onClick={sortByID}>
                                    <Image src="/img/arrow-up-gray.svg" alt="sort" height={20} width={20} className={`${toggleSort === true ? 'rotate-180' : 'rotate-0'}`} />
                                    <span>Threshold Value</span>
                                </button>
                            </th>
                            <th>Tags</th>
                            <th>Date</th>
                            <th>Impact</th>
                            <th>Track Issue</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <span className="h-[60px] w-[80px] inline-block bg-gray-962 rounded-xl"></span>
                            </td>
                            <td>112233445566</td>
                            <td>20%</td>
                            <td>Crack</td>
                            <td>16-06-2023</td>
                            <td>
                                <span className="bg-[#D80000] h-[29px] w-[60px] text-sm flex justify-center items-center rounded-lg text-white">High</span>
                            </td>
                            <td>
                                <div className="flex justify-start items-center relative">
                                    <span className="w-[90px]">
                                        <span className="bg-[#00AEEF] h-3 w-3 rounded-full inline-block mr-2"></span>
                                        <span className="text-sm">New</span>
                                    </span>
                                    <button className="ml-5" onClick={() => toggleDropFunction(1)}>
                                        <Image
                                            src="/img/more-vertical.svg"
                                            alt="more"
                                            height={24}
                                            width={24}
                                        />
                                    </button>
                                    {(toggleDrop && selectedOption === 1) &&
                                        <div className="bg-black text-white border overflow-hidden border-black rounded-xl w-30 flex flex-col flex-wrap items-start justify-start shadow-sm absolute top-[30px] left-[40px] z-[1]">
                                            <button
                                                onClick={() => setToggleDrop(false)}
                                                className="text-white text-sm hover:bg-white hover:text-black h-[35px] px-4 border-b border-gray-900 w-full text-left">
                                                <span>Result</span>
                                            </button>
                                            <button
                                                onClick={() => setToggleDrop(false)}
                                                className="text-white text-sm hover:bg-white hover:text-black h-[35px] px-4 border-b border-gray-900 w-full text-left">
                                                <span>View Issue</span>
                                            </button>
                                        </div>
                                    }
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <span className="h-[60px] w-[80px] inline-block bg-gray-962 rounded-xl"></span>
                            </td>
                            <td>112233445567</td>
                            <td>20%</td>
                            <td>Crack</td>
                            <td>16-06-2023</td>
                            <td>
                                <span className="bg-[#FF6D03] h-[29px] w-[60px] text-sm flex justify-center items-center rounded-lg text-white">Medium</span>
                            </td>
                            <td>
                                <div className="flex justify-start items-center relative">
                                    <span className="w-[90px]">
                                        <span className="bg-[#FF6D03] h-3 w-3 rounded-full inline-block mr-2"></span>
                                        <span className="text-sm">In Process</span>
                                    </span>
                                    <button className="ml-5" onClick={() => toggleDropFunction(2)}>
                                        <Image
                                            src="/img/more-vertical.svg"
                                            alt="more"
                                            height={24}
                                            width={24}
                                        />
                                    </button>
                                    {(toggleDrop && selectedOption === 2) &&
                                        <div className="bg-black text-white border overflow-hidden border-black rounded-xl w-30 flex flex-col flex-wrap items-start justify-start shadow-sm absolute top-[30px] left-[40px] z-[1]">
                                            <button
                                                onClick={() => setToggleDrop(false)}
                                                className="text-white text-sm hover:bg-white hover:text-black h-[35px] px-4 border-b border-gray-900 w-full text-left">
                                                <span>Result</span>
                                            </button>
                                            <button
                                                onClick={() => setToggleDrop(false)}
                                                className="text-white text-sm hover:bg-white hover:text-black h-[35px] px-4 border-b border-gray-900 w-full text-left">
                                                <span>View Issue</span>
                                            </button>
                                        </div>
                                    }
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <span className="h-[60px] w-[80px] inline-block bg-gray-962 rounded-xl"></span>
                            </td>
                            <td>112233445568</td>
                            <td>15%</td>
                            <td>Crack</td>
                            <td>16-06-2023</td>
                            <td>
                                <span className="bg-[#FF6D03] h-[29px] w-[60px] text-sm flex justify-center items-center rounded-lg text-white">Medium</span>
                            </td>
                            <td>
                                <div className="flex justify-start items-center relative">
                                    <span className="w-[90px]">
                                        <span className="bg-[#FF6D03] h-3 w-3 rounded-full inline-block mr-2"></span>
                                        <span className="text-sm">In Process</span>
                                    </span>
                                    <button className="ml-5" onClick={() => toggleDropFunction(3)}>
                                        <Image
                                            src="/img/more-vertical.svg"
                                            alt="more"
                                            height={24}
                                            width={24}
                                        />
                                    </button>
                                    {(toggleDrop && selectedOption === 3) &&
                                        <div className="bg-black text-white border overflow-hidden border-black rounded-xl w-30 flex flex-col flex-wrap items-start justify-start shadow-sm absolute top-[30px] left-[40px] z-[1]">
                                            <button
                                                onClick={() => setToggleDrop(false)}
                                                className="text-white text-sm hover:bg-white hover:text-black h-[35px] px-4 border-b border-gray-900 w-full text-left">
                                                <span>Result</span>
                                            </button>
                                            <button
                                                onClick={() => setToggleDrop(false)}
                                                className="text-white text-sm hover:bg-white hover:text-black h-[35px] px-4 border-b border-gray-900 w-full text-left">
                                                <span>View Issue</span>
                                            </button>
                                        </div>
                                    }
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <span className="h-[60px] w-[80px] inline-block bg-gray-962 rounded-xl"></span>
                            </td>
                            <td>112233445569</td>
                            <td>20%</td>
                            <td>Crack</td>
                            <td>16-06-2023</td>
                            <td>
                                <span className="bg-[#378EDE] h-[29px] w-[60px] text-sm flex justify-center items-center rounded-lg text-white">Low</span>
                            </td>
                            <td>
                                <div className="flex justify-start items-center relative">
                                    <span className="w-[90px]">
                                        <span className="bg-[#54C104] h-3 w-3 rounded-full inline-block mr-2"></span>
                                        <span className="text-sm">Resolved</span>
                                    </span>
                                    <button className="ml-5" onClick={() => toggleDropFunction(4)}>
                                        <Image
                                            src="/img/more-vertical.svg"
                                            alt="more"
                                            height={24}
                                            width={24}
                                        />
                                    </button>
                                    {(toggleDrop && selectedOption === 4) &&
                                        <div className="bg-black text-white border overflow-hidden border-black rounded-xl w-30 flex flex-col flex-wrap items-start justify-start shadow-sm absolute top-[30px] left-[40px] z-[1]">
                                            <button
                                                onClick={() => setToggleDrop(false)}
                                                className="text-white text-sm hover:bg-white hover:text-black h-[35px] px-4 border-b border-gray-900 w-full text-left">
                                                <span>Result</span>
                                            </button>
                                            <button
                                                onClick={() => setToggleDrop(false)}
                                                className="text-white text-sm hover:bg-white hover:text-black h-[35px] px-4 border-b border-gray-900 w-full text-left">
                                                <span>View Issue</span>
                                            </button>
                                        </div>
                                    }
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <span className="h-[60px] w-[80px] inline-block bg-gray-962 rounded-xl"></span>
                            </td>
                            <td>112233445570</td>
                            <td>20%</td>
                            <td>Crack</td>
                            <td>16-06-2023</td>
                            <td>
                                <span className="bg-[#D80000] h-[29px] w-[60px] text-sm flex justify-center items-center rounded-lg text-white">High</span>
                            </td>
                            <td>
                                <div className="flex justify-start items-center relative">
                                    <span className="w-[90px]">
                                        <span className="bg-[#00AEEF] h-3 w-3 rounded-full inline-block mr-2"></span>
                                        <span className="text-sm">New</span>
                                    </span>
                                    <button className="ml-5" onClick={() => toggleDropFunction(5)}>
                                        <Image
                                            src="/img/more-vertical.svg"
                                            alt="more"
                                            height={24}
                                            width={24}
                                        />
                                    </button>
                                    {(toggleDrop && selectedOption === 5) &&
                                        <div className="bg-black text-white border overflow-hidden border-black rounded-xl w-30 flex flex-col flex-wrap items-start justify-start shadow-sm absolute top-[30px] left-[40px] z-[1]">
                                            <button
                                                onClick={() => setToggleDrop(false)}
                                                className="text-white text-sm hover:bg-white hover:text-black h-[35px] px-4 border-b border-gray-900 w-full text-left">
                                                <span>Result</span>
                                            </button>
                                            <button
                                                onClick={() => setToggleDrop(false)}
                                                className="text-white text-sm hover:bg-white hover:text-black h-[35px] px-4 border-b border-gray-900 w-full text-left">
                                                <span>View Issue</span>
                                            </button>
                                        </div>
                                    }
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            {/* Content Ends */}

        </div>
    )
}

RaisedAlerts.getLayout = function getLayout(page: any) {
    return (
        <Layout>{page}</Layout>
    )
}