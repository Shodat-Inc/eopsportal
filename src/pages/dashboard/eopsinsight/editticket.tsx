import React, { useState, useRef, useEffect } from "react";
import styles from '../../../styles/Common.module.css';
import Layout from "../../../components/Layout";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from 'next/router'
import axios from 'axios';

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

export default function EditTicket() {
    const router = useRouter();
    const parentAsset = router.query;
    const [formData, setFormData] = useState({
        ticketID: "",
        subject: "",
        description: "",
        assignTo: "",
        priority: "",
        attachment: [] as any
    })
    const [errors, setErrors] = useState({
        ticketID: "",
        subject: "",
        description: "",
        assignTo: "",
        priority: "",
        attachment: [] as any
    })
    const [data, setData] = useState([] as any)
    const fetechTicketData = () => {
        axios.get("/api/getTickets").then((response) => {
            if (response.data) {
                const filtered = response.data.filter((item: any) => {
                    return item.ticketID === parentAsset.ticketID
                })
                if (filtered && filtered.length > 0) {
                    setData(filtered)
                    setFormData({
                        ticketID: filtered[0].ticketID,
                        subject: filtered[0].subject,
                        description: filtered[0].description,
                        assignTo: filtered[0].assignTo,
                        priority: filtered[0].priority,
                        attachment: filtered[0].attachment,
                    })
                }
            }
        });
    }
    useEffect(() => {
        fetechTicketData();
        if (fetechTicketData.length) return;
    }, [parentAsset])

    const handleChange = (evt: any) => {
        evt.preventDefault()
        let targetName = evt.target.name;
        let targetValue = evt.target.value;
        setFormData((state) => ({
            ...state,
            [targetName]: targetValue
        }));
    }

    return (
        <div className="w-full h-full font-OpenSans">
            <p className="text-black text-lg mb-4 font-semibold text-xl">Ticket Management</p>

            {/* Breadcrumb */}
            <div className="flex justify-between items-center mb-2">
                <div className="flex relative bg-white rounded rounded-lg px-3 py-1 inline-flex border border-[#E3E3E3]">
                    <ul className="flex justify-start items-center text-sm">
                        <li className="flex justify-start items-center">
                            <Link
                                href="/dashboard/eopsinsight/ticketmanagement"
                                className="font-semibold"
                            >
                                Ticket Management
                            </Link>
                        </li>

                        <li className="flex justify-start items-center">
                            <Image
                                src="/img/chevron-right.svg"
                                alt="chevron-right"
                                height={28}
                                width={28}
                            />
                            <span className="text-gray-967 capitalize">{parentAsset.ticketID}</span>
                        </li>
                    </ul>
                </div>


            </div>

            <div className="bg-white min-h-[500px] rounded rounded-xl lg:p-4 md:p-4 sm:p-4">
                <h3 className="text-black w-full font-semibold">Edit Ticket</h3>

                {/* Edit Form starts */}
                <div className="w-[80%] ml-[10%] mr-[10%] mt-12">
                    <div className="flex justify-between items-center m-5">
                        <div className={`lg:w-[44%] small:w-full small:w-full ${styles.form__wrap}`}>
                            <div className={`relative ${styles.form__group} font-OpenSans`}>
                                <input
                                    type="text"
                                    id="existingticketid"
                                    name="existingticketid"
                                    className={`!bg-gray-956 border border-gray-961 ${styles.form__field}`}
                                    placeholder="Existing Ticket ID"
                                    value={formData.ticketID}
                                    required
                                    disabled
                                    onChange={handleChange}
                                />
                                <label htmlFor="existingticketid" className={`${styles.form__label}`}>Ticket ID</label>
                            </div>
                        </div>
                        <div className={`lg:w-[44%] small:w-full small:w-full ${styles.form__wrap}`}>
                            <div className={`relative ${styles.form__group} font-OpenSans`}>
                                <input
                                    type="text"
                                    id="subject"
                                    name="subject"
                                    className={`border border-gray-961 ${styles.form__field}`}
                                    placeholder="Subject"
                                    value={formData.subject}
                                    required
                                    onChange={handleChange}
                                />
                                <label htmlFor="subject" className={`${styles.form__label}`}>Subject</label>
                            </div>
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
                                    onChange={handleChange}
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

EditTicket.getLayout = function getLayout(page: any) {
    return (
        <Layout>{page}</Layout>
    )
}