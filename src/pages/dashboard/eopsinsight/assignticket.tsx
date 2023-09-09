import React, { useState, useRef, useEffect } from "react";
import styles from '../../../styles/Common.module.css';
import Layout from "../../../components/Layout";
import Image from "next/image";
import Link from "next/link";
import axios from 'axios';
import Datepicker from "react-tailwindcss-datepicker";
import { useRouter } from 'next/router'

const usersList = [
    "Kalra",
    "Sebastian",
    "Albert",
    "John Mark"
]
const priorityList = [
    "high",
    "medium",
    "low"
]


export default function AssignTicket() {
    const router = useRouter();
    const urlParams = router.query;
    const [data, setData] = useState({} as any)
    const [toggleAlertID, setToggleAlertID] = useState(false)
    const [chooseAlertID, setChooseAlertID] = useState("");

    const [togglePriority, setTogglePriority] = useState(false)
    const [chooseSubject, setchooseSubject] = useState("");

    const [allTicket, setAllTicket] = useState([] as any);
    const [allSubject, setAllSubject] = useState([] as any);
    const [searchTicket, setSearchTicket] = useState([] as any);
    const [searchSubject, setSearchSubject] = useState([] as any);

    const [formData, setFormData] = useState({
        description: "",
        assignTo: "",
        priority: "",
        attachment: []
    } as any)


    const fetechTicketData = () => {
        axios.get("/api/getTickets").then((response) => {
            if (response.data) {
                setAllTicket(response.data);
                setAllSubject(response.data);
                const filtered = response.data.filter((item: any) => {
                    return item.alertID === urlParams.alertID
                })
                if (filtered && filtered.length > 0) {
                    setData(filtered[0])
                }
                setChooseAlertID(response.data[0].ticketID);
                setchooseSubject(response.data[0].subject);
                setFormData({
                    description: response.data[0].description,
                    assignTo: response.data[0].assignTo,
                    priority: response.data[0].priority,
                    attachment: response.data[0].attachment
                })
            }
        });
    }
    useEffect(() => {
        fetechTicketData();
        if (fetechTicketData.length) return;
    }, [])

    // Hook that alerts clicks outside of the passed ref
    function useOutsideAlerter(ref: any) {
        useEffect(() => {
            function handleClickOutside(event: any) {
                if (ref.current && !ref.current.contains(event.target)) {
                    setToggleAlertID(false);
                    setTogglePriority(false);
                }
            }
            document.addEventListener("mousedown", handleClickOutside);
            return () => {
                document.removeEventListener("mousedown", handleClickOutside);
            };
        }, [ref]);
    }
    const wrapperRef = useRef(null);
    useOutsideAlerter(wrapperRef);



    const functionAlertDrop = () => {
        setToggleAlertID(!toggleAlertID)
    }
    const functionSelectedAlertID = (item: any) => {
        setChooseAlertID(item)
        setToggleAlertID(false)        
    }

    const functionPriorityDrop = () => {
        setTogglePriority(!togglePriority)
    }
    const functionSelectedSubject = (item: any) => {
        setchooseSubject(item)
        setTogglePriority(false)
    }

    const searchTicketIDFunction = (event: any) => {
        setSearchTicket(event.target.value)

    }
    const searchSubjectFunction = (event: any) => {
        setSearchSubject(event.target.value);
    }

    useEffect(() => {
        if (searchTicket != "") {
            axios.get("/api/getTickets").then((response) => {
                if (response.data) {
                    const filtered = response.data.filter((item: any) => {
                        if (item.ticketID.toString().toLowerCase().includes(searchTicket.toLowerCase()) || item.subject.toString().toLowerCase().includes(searchTicket.toLowerCase())) {
                            return item;
                        }
                    })
                    if (filtered && filtered.length > 0) {
                        setAllTicket(filtered);
                    }
                }
            });
        } else {
            axios.get("/api/getTickets").then((response) => {
                if (response.data) {
                    setAllTicket(response.data);
                }
            });
        }
    }, [searchTicket])

    useEffect(() => {
        if (searchSubject != "") {
            axios.get("/api/getTickets").then((response) => {
                if (response.data) {
                    const filtered = response.data.filter((item: any) => {
                        if (item.subject.toString().toLowerCase().includes(searchSubject.toLowerCase()) || item.subject.toString().toLowerCase().includes(searchSubject.toLowerCase())) {
                            return item;
                        }
                    })
                    setAllSubject(filtered);
                }
            });
        } else {
            axios.get("/api/getTickets").then((response) => {
                if (response.data) {
                    setAllSubject(response.data);
                }
            });
        }
    }, [searchSubject])

    useEffect(() => {
        if (chooseAlertID) {
            axios.get("/api/getTickets").then((response) => {
                if (response.data) {
                    const filtered = response.data.filter((item: any) => {
                        return item.ticketID === chooseAlertID
                    })
                    console.log({
                        amit:filtered
                    })
                    if (filtered && filtered.length > 0) {
                        setFormData({
                            description: filtered[0].description,
                            assignTo: filtered[0].assignTo,
                            priority: filtered[0].priority,
                            attachment: filtered[0].attachment
                        })
                    }
                }
            });
        }
    }, [chooseAlertID])

    console.log({
        allTicket: allTicket,
        data: data,
        formData:formData,
        chooseAlertID:chooseAlertID
    })

    return (
        <div className="w-full h-full font-OpenSans">
            <p className="text-black text-lg mb-4 font-semibold text-xl">Ticket Management</p>

            {/* Breadcrumb */}
            <div className="flex justify-between items-center mb-2">
                <div className="flex relative bg-white rounded rounded-lg px-3 py-1 inline-flex border border-[#E3E3E3]">
                    <ul className="flex justify-start items-center text-sm">
                        <li className="flex justify-start items-center">
                            <Link
                                href="/dashboard/eopsprosense"
                                className="font-semibold"
                            >
                                Alert ID: {urlParams.alertID}
                            </Link>
                        </li>

                        <li className="flex justify-start items-center">
                            <Image
                                src="/img/chevron-right.svg"
                                alt="chevron-right"
                                height={28}
                                width={28}
                            />
                            <span className="text-gray-967 capitalize">Assign Ticket</span>
                        </li>
                    </ul>
                </div>


            </div>

            <div className="bg-white min-h-[500px] rounded rounded-xl lg:p-4 md:p-4 sm:p-4">
                <h3 className="text-black w-full font-semibold">Assign Ticket</h3>

                {/* Edit Form starts */}
                <div className="w-[80%] ml-[10%] mr-[10%] mt-8">

                    <div className="flex justify-between items-center m-5 hidden">
                        <div className="flex relative w-full">
                            <Image
                                src="/img/search-icon-gray.svg"
                                alt="search"
                                height={22}
                                width={22}
                                className="absolute top-[11px] left-3"
                            />
                            <input
                                type="text"
                                name="search"
                                className="border border-gray-954 rounded-xl h-[44px] w-full pl-10 pr-2 text-gray-967"
                                placeholder="Search"
                            />
                        </div>
                    </div>

                    <div className="flex justify-between items-center m-5">
                        <div className={`lg:w-[44%] small:w-full small:w-full relative`}>
                            <div
                                className="border rounded-xl border-gray-500 h-[44px] w-full pl-2 pr-5 relative flex items-center justify-start bg-white"
                                onClick={functionAlertDrop}
                            >
                                <label className="absolute text-[13px] top-[-10px] left-2 pl-2 pr-2 bg-white">Ticket ID</label>
                                <Image
                                    src="/img/arrow-down-black.svg"
                                    alt="arrow-down"
                                    height={20}
                                    width={20}
                                    className="absolute right-3 top-3"
                                />
                                <span className="text-md text-black pl-2 capitalize">{chooseAlertID}</span>
                            </div>
                            {toggleAlertID ?
                                <div ref={wrapperRef} className={`h-52 border rounded-xl border-gray-500 h-auto max-h-[300px] w-full absolute flex items-start justify-start flex-wrap flex-col mt-1 overflow-hidden overflow-y-auto bg-white ${styles.scroll} z-10`}>
                                    <div className="flex justify-between items-center mb-2 mt-1  w-full">
                                        <div className="flex relative w-full px-2">
                                            <Image
                                                src="/img/search-icon-gray.svg"
                                                alt="search"
                                                height={22}
                                                width={22}
                                                className="absolute top-[5px] left-3"
                                            />
                                            <input
                                                type="text"
                                                name="search"
                                                className="border border-gray-954 text-sm rounded-lg h-[35px] w-full pl-8 pr-2 text-gray-967"
                                                placeholder="Search"
                                                value={searchTicket}
                                                onChange={searchTicketIDFunction}
                                            />
                                        </div>
                                    </div>
                                    <ul className="p-0 m-0 w-full text-md">
                                        {
                                            allTicket && allTicket.length > 0 ?
                                                allTicket.map((item: any, index: any) => (
                                                    <li key={index} onClick={() => functionSelectedAlertID(item.ticketID)} className="px-5 py-1 bg-white cursor-pointer hover:bg-yellow-951 w-full font-normal">{item.ticketID}</li>
                                                ))
                                                :
                                                null
                                        }
                                    </ul>
                                </div>
                                : null
                            }
                        </div>

                        <div className={`lg:w-[44%] small:w-full small:w-full relative`}>
                            <div
                                className="border rounded-xl border-gray-500 h-[44px] w-full pl-2 pr-5 relative flex items-center justify-start bg-white"
                                onClick={functionPriorityDrop}
                            >
                                <label className="absolute text-[13px] top-[-10px] left-2 pl-2 pr-2 bg-white">Subject</label>
                                <Image
                                    src="/img/arrow-down-black.svg"
                                    alt="arrow-down"
                                    height={20}
                                    width={20}
                                    className="absolute right-3 top-3"
                                />
                                <span className="text-md text-black pl-2 capitalize">{chooseSubject}</span>
                            </div>
                            {togglePriority ?
                                <div ref={wrapperRef} className={`h-52 border rounded-xl border-gray-500 h-auto max-h-[300px] w-full absolute flex items-start justify-start flex-wrap flex-col mt-1 overflow-hidden overflow-y-auto bg-white ${styles.scroll} z-10`}>
                                    <div className="flex justify-between items-center mb-2 mt-1 w-full">
                                        <div className="flex relative w-full px-2">
                                            <Image
                                                src="/img/search-icon-gray.svg"
                                                alt="search"
                                                height={22}
                                                width={22}
                                                className="absolute top-[5px] left-3"
                                            />
                                            <input
                                                type="text"
                                                name="search"
                                                className="border border-gray-954 rounded-xl h-[35px] w-full pl-8 pr-2 text-gray-967"
                                                placeholder="Search"
                                                value={searchSubject}
                                                onChange={searchSubjectFunction}
                                            />
                                        </div>
                                    </div>
                                    <ul className="p-0 m-0 w-full text-md">
                                        {
                                            allSubject && allSubject.length > 0 ?
                                                allSubject.map((item: any, index: any) => (
                                                    <li key={index} onClick={() => functionSelectedSubject(item.subject)} className="px-5 py-1 bg-white cursor-pointer hover:bg-yellow-951 w-full font-normal">{item.subject}</li>
                                                ))
                                                :
                                                null
                                        }
                                    </ul>
                                </div>
                                : null
                            }
                        </div>

                    </div>

                    <div className="flex justify-between items-center m-5">
                        <div className={`lg:w-full small:w-full small:w-full ${styles.form__wrap}`}>
                            <div className={`relative ${styles.form__group} font-OpenSans`}>
                                <textarea
                                    id="description"
                                    name="description"
                                    className={`!min-h-[120px] border border-gray-961 ${styles.form__field}`}
                                    placeholder="Description"
                                    value={formData.description}
                                    required
                                >
                                </textarea>
                                <label htmlFor="description" className={`${styles.form__label}`}>Description</label>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-between items-center m-5">
                        <div className={`lg:w-[44%] small:w-full small:w-full ${styles.form__wrap} relative`}>
                            <span className="absolute text-[14px] bg-white px-[3px] py-0 left-[15px] top-[3px]">Assign To</span>
                            <select
                                defaultValue={formData.assignTo}
                                // value={formData.assignTo}
                                // onChange={handleChange}
                                name="assignTo"
                                id="assignTo"
                                className={`capitalize mt-[15px] border border-gray-961 ${styles.form__field}`}
                            >
                                {
                                    usersList && usersList.length > 0 ?
                                        usersList.map((item: any, index: any) => (
                                            <option
                                                selected={item === formData.assignTo}
                                                key={index}
                                                value={item}
                                            >
                                                {item}
                                            </option>
                                        ))
                                        : null
                                }
                            </select>
                        </div>
                        <div className={`lg:w-[44%] small:w-full small:w-full ${styles.form__wrap} relative`}>
                            <span className="absolute text-[14px] bg-white px-[3px] py-0 left-[15px] top-[3px]">Priority</span>
                            <select
                                defaultValue={formData.priority}
                                // value={formData.priority}
                                // onChange={handleChange}
                                name="priority"
                                id="priority"
                                className={`capitalize mt-[15px] border border-gray-961 ${styles.form__field}`}
                            >
                                {
                                    priorityList && priorityList.length > 0 ?
                                        priorityList.map((item: any, index: any) => (
                                            <option
                                                selected={item === formData.priority}
                                                key={index}
                                                value={item}
                                            >
                                                {item}
                                            </option>
                                        ))
                                        : null
                                }
                            </select>
                        </div>
                    </div>

                    <div className="flex justify-between items-center m-5 flex-wrap flex-row">
                        <div className="border border-gray-954 bg-[#DBDBDB] rounded rounded-xl h-[50px] w-full flex justify-center items-center relative overflow-hidden">
                            <input
                                type="file"
                                className="w-full h-[48px] z-[99] relative opacity-0"
                            />
                            <span className="text-sm text-black flex justify-center items-center absolute w-full">
                                <Image
                                    src="/img/upload-cloud-black.svg"
                                    alt="upload"
                                    height={20}
                                    width={20}
                                    className="mr-2"
                                />
                                Upload multiple files
                            </span>
                        </div>
                        <p className="text-[#929292] text-sm">Accepted file format .jpg, .png, .pdf, .txt, .doc Maximum 15 MB only</p>
                    </div>

                    <div className="flex justify-start items-center m-5 flex-wrap flex-row">
                        {
                            formData.attachment && formData.attachment.length > 0 ?
                                formData.attachment.map((item: any, index: any) => (
                                    <div key={index} className="bg-[#F4F3F3] px-2 py-1 rounded rounded-xl w-full flex justify-between items-center mb-3">
                                        <span className="text-sm">{item}</span>
                                        <button>
                                            <Image
                                                src="/img/x.svg"
                                                alt="x"
                                                height={24}
                                                width={24}
                                            />
                                        </button>
                                    </div>
                                ))
                                :
                                null
                        }
                    </div>

                    <div className="flex justify-end items-center m-5">
                        <button className="border border-black rounded-xl h-[44px] px-8 flex justify-center items-center bg-black text-white">
                            <span>Assign</span>
                        </button>
                    </div>

                </div>
                {/* Edit Form Ends */}

            </div>

        </div>
    )
}

AssignTicket.getLayout = function getLayout(page: any) {
    return (
        <Layout>{page}</Layout>
    )
}