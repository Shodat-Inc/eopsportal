import React, { useState, useRef, useEffect } from "react";
import styles from '../../../styles/Common.module.css';
import Layout from "../../../components/Layout";
import Image from "next/image";
import Link from "next/link";
import axios from 'axios';
import Datepicker from "react-tailwindcss-datepicker";
import { useRouter } from 'next/router'
import { url } from "inspector";

export default function ViewTicket() {
    const router = useRouter();
    const urlParams = router.query;
    const [toggleArrow, setToggleArrow] = useState(false);
    const [toggleSort, setToggleSort] = useState(false);
    const [toggleAlertTable, setToggleALertTable] = useState(true)
    const [downloadDocumentModal, setDownloadDocumentModal] = useState(false);
    const [data, setData] = useState([] as any);

    // Fetch Ticket Data
    const fetechTicketData = () => {
        axios.get("/api/getTickets").then((response) => {
            if (response.data) {
                let filtered = [] as any;
                urlParams && urlParams.from === "ticketmanagement" ?
                    filtered = response.data.filter((item: any) => {
                        return item.ticketID == urlParams.ticketID
                    })
                    :
                    filtered = response.data.filter((item: any) => {
                        return item.alertID == urlParams.alertID
                    })
                if (filtered && filtered.length > 0) {
                    setData(filtered)
                }
            }
        });
    }
    useEffect(() => {
        fetechTicketData();
        if (fetechTicketData.length) return;
    }, [urlParams])

    // Fetch Alert Data
    const [alertData, setAlertData] = useState([] as any)
    const fetechAlertData = () => {
        axios.get("/api/getProsenseAlert").then((response) => {
            if (response.data) {
                const filtered = response.data.filter((item: any) => {
                    return item.alertID == urlParams.alertID
                })
                if (filtered && filtered.length > 0) {
                    setAlertData(filtered)
                }
            }
        });
    }
    useEffect(() => {
        fetechAlertData();
        if (fetechAlertData.length) return;
    }, [urlParams])


    // Sort Table By ID
    const sortByID = () => {
        setToggleSort(!toggleSort)
    }
    // Toggle Filter Dropdown function
    const toggleFilterFunction = () => {
        setToggleArrow(!toggleArrow);
        setToggleALertTable(!toggleAlertTable)
    }



    // Set Status color notification
    const issueStatusFunction = (item: any) => {
        if (item === "open") {
            return <><span className="bg-new h-3 w-3 rounded rounded-full inline-block"></span> <span className="text-sm ml-2">Open</span></>
        } else if (item === "in-process" || item === "in process" || item === "inProcess") {
            return <><span className="bg-inProcess h-3 w-3 rounded rounded-full inline-block"></span> <span className="text-sm ml-2">In Process</span></>
        } else if (item === "closed") {
            return <><span className="bg-resolved h-3 w-3 rounded rounded-full inline-block"></span> <span className="text-sm ml-2">Closed</span></>
        } else {
            return <><span className="bg-new h-3 w-3 rounded rounded-full inline-block"></span> <span className="text-sm ml-2">Open</span></>
        }
    }

    // Set Priority
    const setPriority = (item: any) => {
        if (item === "high") {
            return <span className="rounded-lg bg-[#FFD0D0] text-[#AB0202] text-sm font-semibold px-2 py-1 h-[24px] inline-flex justify-center items-center">High</span>
        } else if (item === "low") {
            return <span className="rounded-lg bg-[#EBEBEB] text-[#000000] text-sm font-semibold px-2 py-1 h-[24px] inline-flex justify-center items-center">Low</span>
        } else {
            return <span className="rounded-lg bg-[#EBEBEB] text-[#000000] text-sm font-semibold px-2 py-1 h-[24px] inline-flex justify-center items-center">Low</span>
        }
    }

    console.log({
        data: data,
        alertData: alertData
    })

    return (
        <div className="w-full h-full font-OpenSans">
            <p className="text-black text-lg mb-4 font-semibold text-xl">Ticket Details</p>

            {/* Breadcrumb */}
            <div className="flex justify-between items-center mb-2">
                <div className="flex relative bg-white rounded rounded-lg px-3 py-1 inline-flex border border-[#E3E3E3]">
                    <ul className="flex justify-start items-center text-sm">
                        <li className="flex justify-start items-center">
                            <Link
                                href={urlParams && urlParams.from === "ticketmanagement" ? "/dashboard/eopsinsight/ticketmanagement" : "/dashboard/eopsprosense"}
                                className="font-semibold"
                            >
                                Alert ID: {urlParams && urlParams.from === "ticketmanagement" ? urlParams.ticketID : urlParams.alertID}
                            </Link>
                        </li>

                        <li className="flex justify-start items-center">
                            <Image
                                src="/img/chevron-right.svg"
                                alt="chevron-right"
                                height={28}
                                width={28}
                            />
                            <span className="text-gray-967 capitalize">View Ticket</span>
                        </li>
                    </ul>
                </div>

                <Link href="/dashboard/eopsinsight/ticketmanagement" className="border border-white rounded-xl h-[44px] px-3 flex justify-center items-center bg-white text-black">
                    <span>View all tickets</span>
                </Link>
            </div>

            <div className="bg-white min-h-[500px] rounded rounded-xl lg:p-4 md:p-4 sm:p-4">
                {/* Table Section */}
                <div className="flex flex-wrap flex-col justify-start items-start">
                    <table className={`table-auto lg:min-w-full sm:w-full small:w-full text-left ${styles.tableV3}`}>
                        <thead className="text-sm font-normal">
                            <tr>
                                <th>Ticket ID</th>
                                <th>Subject</th>
                                <th>Attachment</th>
                                <th>
                                    <button className="flex" onClick={sortByID}>
                                        <Image src="/img/arrow-up-gray.svg" alt="sort" height={20} width={20} className={`${toggleSort === true ? 'rotate-180' : 'rotate-0'}`} />
                                        <span>Status</span>
                                    </button>
                                </th>
                                <th>Last Update</th>
                                <th>Priority</th>
                                <th>Assign To</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="!text-gray-967">{data && data.length > 0 ? data[0].ticketID : ''}</td>
                                <td className="!text-gray-967">{data && data.length > 0 ? data[0].subject : ''}</td>
                                <td className="!text-gray-967">
                                    <button onClick={() => setDownloadDocumentModal(true)}>
                                        <Image
                                            src="/img/paperclip.svg"
                                            alt="Trash"
                                            height={32}
                                            width={32}
                                        />
                                    </button>
                                </td>
                                <td className="!text-gray-967">
                                    <span className="relative">
                                        {issueStatusFunction(data && data.length > 0 ? data[0].status : '')}
                                    </span>
                                </td>
                                <td className="!text-gray-967">{data && data.length > 0 ? data[0].dateCreated : ''}</td>
                                <td className="!text-gray-967">
                                    {setPriority(data && data.length > 0 ? data[0].priority : 'low')}
                                </td>
                                <td className="!text-gray-967">{data && data.length > 0 ? data[0].assignTo : ''}</td>
                                <td className="!text-gray-967">
                                    <button
                                        onClick={toggleFilterFunction}
                                        className="bg-black rounded rounded-xl text-white flex justify-center items-center h-[34px] px-2 text-sm">
                                        <span>{toggleAlertTable ? 'Hide' : 'Show'} Alerts</span>
                                        <Image
                                            src="/img/arrow-down-white.svg"
                                            alt="Arrow Down"
                                            height={24}
                                            width={24}
                                            className={`ml-2 ${toggleArrow === true ? 'rotate-180' : 'rotate-0'}`}
                                        />
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                {/* Table Section Ends */}


                {/* Alerts Section Starts */}
                {toggleAlertTable &&
                    <div className="p-3 bg-[#FFF9E5] mt-2">
                        <table className={`table-auto lg:min-w-full sm:w-full small:w-full text-left ${styles.tableV3}`}>
                            <thead>
                                <tr>
                                    <th>Image</th>
                                    <th>Alert ID</th>
                                    <th>
                                        <button className="flex" onClick={sortByID}>
                                            <Image src="/img/arrow-up-gray.svg" alt="sort" height={20} width={20} className={`${toggleSort === true ? 'rotate-180' : 'rotate-0'}`} />
                                            <span>Alert Name</span>
                                        </button>
                                    </th>
                                    <th>Condition</th>
                                    <th>Predictrion</th>
                                    <th>Impact</th>
                                    <th>Date & Time</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    alertData && alertData.length > 0 ?
                                        alertData.map((item: any, index: any) => (
                                            <tr key={index}>
                                                <td>

                                                    {
                                                        item.image != "" ?
                                                            <span className="h-[60px] w-[80px] inline-block bg-gray-962 rounded rounded-xl overflow-hidden">
                                                                <Image
                                                                    src={`/img/${item.image}`}
                                                                    alt={item.alertName}
                                                                    height={60}
                                                                    width={80}
                                                                />
                                                            </span>
                                                            :
                                                            <span className="h-[60px] w-[80px] inline-block bg-gray-962 rounded rounded-xl"></span>
                                                    }
                                                </td>
                                                <td>{item.alertID}</td>
                                                <td>{item.alertName}</td>
                                                <td>{item.condition}</td>
                                                <td>{item.prediction}</td>
                                                <td>
                                                    <span className={`bg-${item.impact} h-[29px] w-[60px] text-[13px] flex justify-center items-center rounded rounded-lg text-white capitalize`}>{item.impact}</span>
                                                </td>
                                                <td>{item.date}</td>
                                            </tr>
                                        ))
                                        :
                                        <tr>
                                            <td colSpan={7}>No Alert Found!</td>
                                        </tr>
                                }
                            </tbody>
                            <tbody className="hidden">
                                <tr>
                                    <td>
                                        <span className="h-[60px] w-[80px] inline-block bg-gray-962 rounded rounded-xl">
                                            <Image
                                                src="/img/pro-1.png"
                                                alt="pro"
                                                height={60}
                                                width={80}
                                            />
                                        </span>
                                    </td>
                                    <td>112233445566</td>
                                    <td>Major Crack</td>
                                    <td>&gt; 50%</td>
                                    <td>&gt; 54%</td>
                                    <td><span className={`bg-medium h-[29px] w-[60px] text-sm flex justify-center items-center rounded rounded-lg text-white capitalize`}>medium</span></td>
                                    <td>15-03-2023, 13:45:00</td>
                                </tr>
                                <tr>
                                    <td>
                                        <span className="h-[60px] w-[80px] inline-block bg-gray-962 rounded rounded-xl">
                                            <Image
                                                src="/img/pro-2.png"
                                                alt="pro"
                                                height={60}
                                                width={80}
                                            />
                                        </span>
                                    </td>
                                    <td>112233445567</td>
                                    <td>Major Crack</td>
                                    <td>&lt; 45%</td>
                                    <td>&gt; 51%</td>
                                    <td><span className={`bg-medium h-[29px] w-[60px] text-sm flex justify-center items-center rounded rounded-lg text-white capitalize`}>medium</span></td>
                                    <td>14-03-2023, 16:20:22</td>
                                </tr>
                                <tr>
                                    <td>
                                        <span className="h-[60px] w-[80px] inline-block bg-gray-962 rounded rounded-xl">
                                            <Image
                                                src="/img/pro-3.png"
                                                alt="pro"
                                                height={60}
                                                width={80}
                                            />
                                        </span>
                                    </td>
                                    <td>112233445568</td>
                                    <td>Major Crack</td>
                                    <td>&lt; 45%</td>
                                    <td>&gt; 51%</td>
                                    <td><span className={`bg-low h-[29px] w-[60px] text-sm flex justify-center items-center rounded rounded-lg text-white capitalize`}>low</span></td>
                                    <td>14-03-2023, 16:20:22</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                }
                {/* Alerts Section Ends */}



                <div className="bg-gray-953 rounded rounded-xl p-3 mt-3">
                    <p className="text-sm">{data && data.length > 0 ? data[0].description : ''}</p>
                </div>

                {/* Comment Form Starts */}
                <div className="mt-8 flex justify-end items-start">
                    <div className="w-[86%] flex justify-start items-start">
                        <div className="bg-[#4784BD] text-2xl flex text-white justify-center items-center rounded rounded-full h-[56px] w-[62px]">S</div>
                        <div className="ml-8 border border-gray-954 rounded rounded-xl overflow-hidden w-full">
                            <textarea
                                placeholder="Write message here and post"
                                className={`w-full h-[55px] p-3 ${styles.textarea}`}
                            >
                            </textarea>
                            <div className="p-1 bg-gray-953 h-[44px] flex justify-end items-center">
                                <span className="text-sm text-gray-967 mr-1">.jpg,</span>
                                <span className="text-sm text-gray-967 mr-1">.gif,</span>
                                <span className="text-sm text-gray-967 mr-1">.png,</span>
                                <span className="text-sm text-gray-967 mr-1">.txt,</span>
                                <span className="text-sm text-gray-967 mr-1">.pdf</span>
                                <button className="mr-2 ml-2">
                                    <Image
                                        src="/img/paperclip.svg"
                                        alt="Trash"
                                        height={24}
                                        width={24}
                                    />
                                </button>
                                <button
                                    className="bg-black rounded rounded-lg text-white flex justify-center items-center h-[34px] px-4 text-sm">
                                    <span>Post</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Comments Section */}
                <div className="mt-8 flex justify-end items-start">
                    <div className="w-[86%] flex justify-start items-start border-b-2 border-dashed border-gray-957 pb-3 mb-5">
                        <div className="bg-[#EF9554] text-2xl flex text-white justify-center items-center rounded rounded-full h-[56px] w-[62px]">K</div>
                        <div className="ml-8 overflow-hidden w-full">
                            <div className="flex justify-between items-center">
                                <p className="text-md font-semibold text-black mb-2 capitalize">Klara</p>
                                <span className="text-[#929292] text-sm">12 hours ago</span>
                            </div>
                            <div className="text-sm text-gray-967">Lorem ipsum dolor sit amet consectetur. Orci varius at consequat magna vitae. Purus vestibulum pulvinar nisl elit sollicitudin dui a. Facilisis in tellus viverra faucibus phasellus senectus adipiscing.</div>
                        </div>
                    </div>
                </div>

            </div>


            {/* ===== Download Attachment Modal starts ===== */}
            {downloadDocumentModal ?
                <>
                    <div
                        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                    >
                        <div className="relative my-6 w-[650px]">
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                {/*header*/}
                                <div className="flex items-start justify-between py-4 px-4">
                                    <h3 className="text-lg font-medium text-black">Download documents</h3>
                                    <button
                                        className="p-1 ml-auto bg-transparent border-0 text-black float-right leading-none font-semibold outline-none focus:outline-none"
                                        onClick={() => setDownloadDocumentModal(false)}
                                    >
                                        <Image
                                            src="/img/x.svg"
                                            alt="close"
                                            className="h-10"
                                            height={32}
                                            width={32}
                                        />
                                    </button>
                                </div>
                                {/*body*/}
                                <div className="relative pt-2 pb-8 px-4 flex-auto">
                                    <div className="flex justify-start items-start flex-wrap flex-col">

                                        <div className="min-h-[220px] w-full">
                                            <ul className="space-y-4">
                                                <li>
                                                    <div className="flex-inline justify-start items-center mr-7">
                                                        <div className={`${styles.customCheck}`}>
                                                            <input
                                                                type="checkbox"
                                                                name="all"
                                                                id="all"
                                                                value="all"
                                                            />
                                                            <span></span>
                                                        </div>
                                                        <label htmlFor="all" className="capitalize ml-1 relative top-[-2px] text-sm">image1.jpg</label>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className="flex-inline justify-start items-center mr-7">
                                                        <div className={`${styles.customCheck}`}>
                                                            <input
                                                                type="checkbox"
                                                                name="all"
                                                                id="all"
                                                                value="all"
                                                            />
                                                            <span></span>
                                                        </div>
                                                        <label htmlFor="all" className="capitalize ml-1 relative top-[-2px] text-sm">document1123.pdf</label>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className="flex-inline justify-start items-center mr-7">
                                                        <div className={`${styles.customCheck}`}>
                                                            <input
                                                                type="checkbox"
                                                                name="all"
                                                                id="all"
                                                                value="all"
                                                            />
                                                            <span></span>
                                                        </div>
                                                        <label htmlFor="all" className="capitalize ml-1 relative top-[-2px] text-sm">document1123.doc</label>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>

                                        <div className="mt-10 relative flex justify-end items-center w-full">
                                            <button
                                                className="border border-black rounded-lg bg-black text-white text-lg h-[47px] mr-5 hover:bg-yellow-951 hover:text-white hover:border-yellow-951 ease-in-out duration-300 disabled:bg-gray-951 disabled:hover:border-gray-951 disabled:border-gray-951 px-3"
                                                onClick={() => { setDownloadDocumentModal(false); }}
                                            >
                                                Download
                                            </button>
                                            <button
                                                className="border border-black rounded-lg bg-white text-black text-lg h-[47px] hover:text-white hover:bg-yellow-951 hover:border-yellow-951 ease-in-out duration-300 px-3"
                                                onClick={() => { setDownloadDocumentModal(false); }}
                                            >
                                                Cancel
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
            {/* =====  Download Attachment Modal Ends ===== */}

        </div>
    )
}

ViewTicket.getLayout = function getLayout(page: any) {
    return (
        <Layout>{page}</Layout>
    )
}