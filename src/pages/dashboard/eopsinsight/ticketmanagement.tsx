import React, { useState, useRef, useEffect } from "react";
import styles from '../../../styles/Common.module.css';
import Layout from "../../../components/Layout";
import Image from "next/image";
import Link from "next/link";
import axios from 'axios';

export default function TicketManagement() {
    const [toggleSort, setToggleSort] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);
    const [checkFilter, setCheckFilter] = useState([] as any);
    const [allChecked, setAllChecked] = useState(true);
    const [search, setSearch] = useState("")
    const [downloadDocumentModal, setDownloadDocumentModal] = useState(false);
    const [attachment, setAttachment] = useState([] as any);

    // Fetch ticket data
    const [ticketData, setTicketData] = useState([] as any);
    const fetechTicketData = () => {
        axios.get("/api/getTickets").then((response) => {
            if (response.data) {
                setTicketData(response.data);
                setAllChecked(true)
            }
        });
    }
    useEffect(() => {
        fetechTicketData();
        if (fetechTicketData.length) return;
    }, [])

    // Sort Table By ID
    const sortByID = () => {
        setToggleSort(!toggleSort)
    }

    // Set Status color notification
    const issueStatusFunction = (item: any) => {
        if (item === "open") {
            return <><span className="bg-new h-3 w-3 rounded rounded-full inline-block"></span> <span className="text-sm ml-2">Open</span></>
        } else if (item === "in process" || item === "inProcess") {
            return <><span className="bg-inProcess h-3 w-3 rounded rounded-full inline-block"></span> <span className="text-sm ml-2">In Process</span></>
        } else if (item === "closed" || item === "resolved") {
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
        } else if (item === "medium") {
            return <span className="rounded-lg bg-[#FF984E] text-[#000000] text-sm font-semibold px-2 py-1 h-[24px] inline-flex justify-center items-center">Medium</span>
        } else {
            return <span className="rounded-lg bg-[#EBEBEB] text-[#000000] text-sm font-semibold px-2 py-1 h-[24px] inline-flex justify-center items-center">Low</span>
        }
    }


    const ref = useRef([] as any);
    // Handle Checkboxes
    const handleChangeCheckboxes = (event: any) => {

        let value = event.target.value;
        let arr = [...checkFilter];
        if (event.target.checked === true && event.target.value != "all") {
            if (arr.length > 0) {
                arr.push(value)
            } else {
                arr.push(value)
            }
            setCheckFilter(arr)
        } else if (event.target.checked === true && event.target.value === "all") {
            setAllChecked(true);
            setCheckFilter([]);
            for (let i = 0; i < ref.current.length; i++) {
                ref.current[i].checked = false;
            }
        } else {
            var index = arr.indexOf(value);
            if (index !== -1) {
                arr.splice(index, 1);
            }
            setCheckFilter(arr)
        }
    }

    useEffect(() => {
        if (checkFilter && checkFilter.length > 0) {
            axios.get("/api/getTickets").then((response) => {
                if (response.data) {
                    let filtered = [] as any;
                    if (checkFilter && checkFilter.length > 0) {
                        filtered = response.data.filter((item: any) => {
                            return checkFilter.includes(item.status);
                        });
                        setTicketData(filtered);
                        setAllChecked(false);
                    }
                }
            });
        } else {
            axios.get("/api/getTickets").then((response) => {
                if (response.data) {
                    setTicketData(response.data);
                    setAllChecked(true);
                }
            });
        }
    }, [checkFilter])


    // Search Filter
    const handleSearchBar = (event: any) => {
        setSearch(event.target.value)
    }
    useEffect(() => {
        if (search != "") {
            axios.get("/api/getTickets").then((response) => {
                if (response.data) {
                    const filtered = response.data.filter((item: any) => {
                        if (item.ticketID.toString().toLowerCase().includes(search) || item.subject.toString().toLowerCase().includes(search)) {
                            return item;
                        }
                    })
                    setTicketData(filtered);
                }
            });
        } else {
            axios.get("/api/getTickets").then((response) => {
                if (response.data) {
                    setTicketData(response.data);
                }
            });
        }
    }, [search])


    // Open Attachment Modal
    const openDownloadAttachmentModal = (item: any) => {
        setAttachment(item)
        setDownloadDocumentModal(true)
    }

    return (
        <div className="w-full h-full font-OpenSans">
            <p className="text-black text-lg mb-4 font-semibold text-xl">Ticket Management</p>
            <div className="bg-white min-h-[500px] rounded rounded-xl lg:p-4 md:p-4 sm:p-4">
                {/* Top Section */}
                <div className="flex justify-between items-center mb-5">
                    <div className="flex relative justify-start items-center">
                        <div className="flex-inline justify-start items-center mr-7">
                            <div className={`${styles.customCheck}`}>
                                <input
                                    type="checkbox"
                                    name="status"
                                    id="all"
                                    value="all"
                                    checked={allChecked}
                                    onChange={handleChangeCheckboxes}
                                    ref={(element) => { ref.current[0] = element }}
                                />
                                <span></span>
                            </div>
                            <label htmlFor="all" className="capitalize ml-1 relative top-[-2px] text-sm">All</label>
                        </div>
                        <div className="flex-inline justify-start items-center mr-7">
                            <div className={`${styles.customCheck}`}>
                                <input
                                    type="checkbox"
                                    name="status"
                                    id="open"
                                    value="open"
                                    onChange={handleChangeCheckboxes}
                                    ref={(element) => { ref.current[1] = element }}
                                />
                                <span></span>
                            </div>
                            <label htmlFor="open" className="capitalize ml-1 relative top-[-2px] text-sm">open</label>
                        </div>
                        <div className="flex-inline justify-start items-center mr-7">
                            <div className={`${styles.customCheck}`}>
                                <input
                                    type="checkbox"
                                    name="status"
                                    id="inProcess"
                                    value="inProcess"
                                    onChange={handleChangeCheckboxes}
                                    ref={(element) => { ref.current[2] = element }}
                                />
                                <span></span>
                            </div>
                            <label htmlFor="inProcess" className="capitalize ml-1 relative top-[-2px] text-sm">In Process</label>
                        </div>
                        <div className="flex-inline justify-start items-center mr-7">
                            <div className={`${styles.customCheck}`}>
                                <input
                                    type="checkbox"
                                    name="status"
                                    id="closed"
                                    value="closed"
                                    onChange={handleChangeCheckboxes}
                                    ref={(element) => { ref.current[3] = element }}
                                />
                                <span></span>
                            </div>
                            <label htmlFor="closed" className="capitalize ml-1 relative top-[-2px] text-sm">closed</label>
                        </div>
                    </div>
                    <div className="flex">
                        <div className="flex relative">
                            <Image src="/img/search-icon-gray.svg" alt="search" height={22} width={22} className="absolute top-[11px] left-3" />
                            <input
                                type="text"
                                name="searchbar"
                                className="border-2 border-gray-969 rounded-xl h-[44px] w-[300px] pl-10 pr-2" placeholder="Search ticket ID or title"
                                onChange={handleSearchBar}
                                value={search}
                            />
                        </div>
                        <div className="relative ml-3">
                            <Link
                                href="/dashboard/eopsinsight/createticket"
                                className="border border-yellow-951 rounded-xl h-[44px] px-3 flex justify-center items-center bg-yellow-951 text-black"
                            >
                                <span>Add New Ticket</span>
                            </Link>
                        </div>
                    </div>
                </div>
                {/* Top Section Ends */}

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
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                ticketData && ticketData.length > 0 ?
                                    ticketData.map((item: any, index: any) => (
                                        <tr key={index}>
                                            <td>
                                                <Link
                                                    className="font-semibold"
                                                    href={{
                                                        pathname: '/dashboard/eopsinsight/viewticket',
                                                        query: {
                                                            ticketID: item.ticketID,
                                                            from:"ticketmanagement"
                                                        }
                                                    }}
                                                >
                                                    <span>{item.ticketID}</span>
                                                </Link>
                                            </td>
                                            <td>{item.subject}</td>
                                            <td>
                                                {item.attachment ?
                                                    <button onClick={() => openDownloadAttachmentModal(item.attachment)}>
                                                        <Image
                                                            src="/img/paperclip.svg"
                                                            alt="Trash"
                                                            height={32}
                                                            width={32}
                                                        />
                                                    </button>
                                                    : ''}
                                            </td>
                                            <td>
                                                <span className="relative">
                                                    {issueStatusFunction(item.status)}
                                                </span>
                                            </td>
                                            <td>{item.dateCreated}</td>
                                            <td>
                                                {setPriority(item.priority)}
                                            </td>
                                            <td>{item.assignTo ? item.assignTo : ''}</td>
                                            <td>
                                                <div className="flex justify-center item-center">
                                                    <Link
                                                        href={{
                                                            pathname: '/dashboard/eopsinsight/editticket',
                                                            query: {
                                                                ticketID: item.ticketID,
                                                                from:"ticketmanagement"
                                                            }
                                                        }}
                                                        className="mr-5"
                                                    >
                                                        <Image
                                                            src="/img/edit.svg"
                                                            alt="Edit"
                                                            height={22}
                                                            width={22}
                                                        />
                                                    </Link>
                                                    <button onClick={() => setDeleteModal(true)}>
                                                        <Image
                                                            src="/img/trash.svg"
                                                            alt="Trash"
                                                            height={22}
                                                            width={22}
                                                        />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                    :
                                    <tr>
                                        <td colSpan={8}>No Ticket found!</td>
                                    </tr>
                            }
                        </tbody>
                    </table>
                </div>
                {/* Table Section Ends */}
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
                                            src="/img/x.svg"
                                            alt="close"
                                            className="h-10"
                                            height={32}
                                            width={32}
                                        />
                                    </button>
                                </div>
                                {/*body*/}
                                <div className="relative pt-2 pb-8 flex-auto">
                                    <div className="flex justify-start items-center flex-wrap flex-col">
                                        <p className="flex justify-center items-center text-lg">Are you sure want to delete this ticket?</p>
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
                                                {
                                                    attachment && attachment.length > 0 ?
                                                        attachment.map((item: any, index: any) => (
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
                                                                    <label htmlFor="all" className="capitalize ml-1 relative top-[-2px] text-sm">{item}</label>
                                                                </div>
                                                            </li>
                                                        ))
                                                        :
                                                        <li>No attachment Found!</li>
                                                }
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

TicketManagement.getLayout = function getLayout(page: any) {
    return (
        <Layout>{page}</Layout>
    )
}