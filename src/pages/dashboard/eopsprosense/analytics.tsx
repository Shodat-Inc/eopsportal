import React, { useState, useRef, useEffect } from "react";
import styles from '../../../styles/Common.module.css';
import Layout from "../../../components/Layout";
import Image from "next/image";
import Link from "next/link";
import {Line, Pie} from 'react-chartjs-2';
const data = {
	labels: [
		'Red',
		'Blue',
		'Yellow'
	],
	datasets: [{
		data: [300, 50, 100],
		backgroundColor: [
		'#FF6384',
		'#36A2EB',
		'#FFCE56'
		],
		hoverBackgroundColor: [
		'#FF6384',
		'#36A2EB',
		'#FFCE56'
		]
	}]
};


const alertsTypes = ["Weekly alerts", "Daily alerts", "Monthly alerts", "Yearly alerts"];
export default function Analytics() {
    const [chooseAlertDrop, setChooseAlertDrop] = useState(false);
    const [selectedAlert, setSelectedAlert] = useState(alertsTypes[0]);
    const chooseAlertFunction = () => {
        setChooseAlertDrop(!chooseAlertDrop)
    }
    const selectedAlertFunction = (item: any) => {
        setSelectedAlert(item);
        setChooseAlertDrop(false);
    }

    return (
        <div className="w-full h-full font-OpenSans">
            <p className="text-black text-lg mb-4 font-semibold text-xl">eOps Prosense</p>
            {/* Breadcrumb */}
            <div className="hidden1 flex relative bg-white rounded rounded-lg px-3 py-1 inline-flex border border-[#E3E3E3]">
                <ul className="flex justify-start items-center text-sm">
                    <li className="flex justify-start items-center">
                        <Link
                            href="/dashboard/eopswatch"
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
                        <Link
                            href="/dashboard/eopswatch/models"
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
                        <span className="text-gray-967 capitalize">Analytics</span>
                    </li>
                </ul>
            </div>


            {/* content */}

            <div className="relative flex mt-8 pb-4">
                <div className="min-h-[300px] w-[60%]">
                    {/* Alert Dropdown */}
                    <div className="flex justify-end items-center mb-8">
                        <div className="relative w-[180px]">
                            <div
                                className="border rounded-xl border-gray-500 h-[64px] pl-2 pr-5 relative flex items-center justify-start bg-white w-full cursor-pointer"
                                onClick={chooseAlertFunction}
                            >
                                <label className="absolute text-[13px] top-[-10px] left-2 pl-2 pr-2 bg-white"></label>
                                <Image
                                    src="/img/arrow-down-black.svg"
                                    alt="arrow-down"
                                    height={20}
                                    width={20}
                                    className="absolute right-3 top-5"
                                />
                                <span className="text-md text-black pl-2">{selectedAlert}</span>
                            </div>
                            {chooseAlertDrop ?
                                <div className={`border rounded-xl border-gray-500 h-auto w-full absolute flex items-start justify-start mt-[2px] top-[100%] left-0 overflow-hidden overflow-y-auto bg-white ${styles.scroll} z-10`}>
                                    <ul className="p-0 m-0 w-full text-md">
                                        {
                                            alertsTypes.map((item: any, index: any) => (
                                                <li
                                                    key={index}
                                                    className="px-4 py-2 border-b-[1px] border-gray-300 last:border-b-0  bg-white cursor-pointer hover:bg-yellow-951 w-full font-normal"
                                                    onClick={() => selectedAlertFunction(item)}
                                                >
                                                    <span>{item}</span>
                                                </li>
                                            ))
                                        }
                                    </ul>
                                </div>
                                : null
                            }
                        </div>
                    </div>

                    {/* Line Chart */}
                    <div className="flex relative w-full border border-gray-400 rounded rounded-xl p-2 min-h-[300px] bg-white">
                        <Image
                        src="/img/graph.svg"
                        alt="graph"
                        height={200}
                        width={300}
                        className="h-full w-full"
                        />
                    </div>

                </div>
                <div className="min-h-[300px] w-[40%]">
                    <div className="p-3">
                    <Image
                        src="/img/piechart.svg"
                        alt="piechart"
                        height={200}
                        width={200}
                        className="h-auto w-auto mt-20"
                        />
                    </div>
                </div>
            </div>



            {/* Content Ends */}

        </div>
    )
}

Analytics.getLayout = function getLayout(page: any) {
    return (
        <Layout>{page}</Layout>
    )
}