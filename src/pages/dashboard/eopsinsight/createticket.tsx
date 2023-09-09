import React, { useState, useEffect } from "react";
import styles from '../../../styles/Common.module.css';
import Layout from "../../../components/Layout";
import Image from "next/image";
import Link from "next/link";
import axios from 'axios';
import { useRouter } from 'next/router'
import AlertMessage from '@/common/alertMessage';


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

export default function CreateTicket() {
    const router = useRouter();
    const urlParams = router.query;
    const { push } = useRouter();
    const [getTicket, setGetTicket] = useState([] as any)
    const [lastInsertedID, setLastInsertedID] = useState(0)
    const [file, setFile] = useState()

    function handleChange(event:any) {
        console.log({
            files:event.target.files
        })
        setFile(event.target.files[0])
      }

    // Get all tickets tickets
    const fetechTicketData = () => {
        axios.get("/api/getTickets").then((response) => {
            if (response.data) {
                setGetTicket(response.data);
                let getID = (response.data && response.data.length > 0) ? response.data.slice(-1)[0].ticketID : 1;
                setLastInsertedID(parseInt(getID) + 1)
            }
        });
    }
    useEffect(() => {
        fetechTicketData()
    }, [])

    const [formData, setFormData] = useState({
        ticketID: lastInsertedID,
        subject: "",
        description: "",
        assignTo: "",
        priority: "",
        attachments: [] as any
    })
    const [errors, setErrors] = useState({
        ticketID: "",
        subject: "",
        description: "",
        assignTo: "",
        priority: "",
        attachments: [] as any
    })
    const [formIsValid, setFormIsValid] = useState(true);
    const [success, setSuccess] = useState(false);

    // Handle Input Fields
    const handleInput = (evt: any) => {
        evt.preventDefault()
        let targetName = evt.target.name;
        let targetValue = evt.target.value;
        setFormData((state) => ({
            ...state,
            [targetName]: targetValue
        }));
        setErrors({
            ...errors,
            [targetName]: ""

        })
        setFormIsValid(false);
    };

    // Validations
    const handleValidation = () => {
        const newErrorsState = { ...errors };
        let formIsValid = true;

        // Validate Subject
        if (!formData.subject) {
            formIsValid = false;
            newErrorsState.subject = "Subject must not be empty!"
        }

        // Validate Description
        if (formData.description === "") {
            formIsValid = false;
            newErrorsState.description = "Description must not be empty!"
        } else if (formData.description.length < 15) {
            formIsValid = false;
            newErrorsState.description = "Description must be grather then 15 characters"
        }

        // Validate Assign To
        if (!formData.assignTo) {
            formIsValid = false;
            newErrorsState.assignTo = "Please select assignee"
        }

        // Validate Priority
        if (!formData.priority) {
            formIsValid = false;
            newErrorsState.priority = "Please select priority"
        }

        // if any field is invalid - then we need to update our state
        if (!formIsValid) {
            setFormIsValid(false);
            setErrors(newErrorsState);
        }

        return formIsValid
    }

    // Submit Form
    const submitForm = async (evt: any) => {
        evt.preventDefault()
        if (handleValidation()) {
            // Storing data to Users JSON            
            let currentDate = new Date().toISOString().split('T')[0];
            let currentTime = new Date().toISOString().split('T')[1].split(".")[0];
            let currentDateTime = currentDate + " " + currentTime;
            axios.post('/api/createTicket', {
                ID: 100,
                alertID: urlParams.alertID,
                ticketID: lastInsertedID.toString(),
                subject: `${formData.subject}`,
                description: `${formData.description}`,
                assignTo: `${formData.assignTo}`,
                priority: `${formData.priority}`,
                attachment: `${formData.attachments}`,
                status: 'open',
                statusChangedBy: '',
                statusChangeDate: '',
                dateCreated: currentDateTime,
                dateModified: currentDateTime,
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(res => {
                setSuccess(true)
                setTimeout(() => {
                    push("/dashboard/eopsinsight/ticketmanagement");
                }, 2000)
            }).catch(err => {
                console.log('error in request', err);
            });

        } else {
            console.log("SOMETHING WENT WRONG !")
        }
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
                            <span className="text-gray-967 capitalize">Add New Ticket</span>
                        </li>
                    </ul>
                </div>


            </div>

            <div className="bg-white min-h-[500px] rounded rounded-xl lg:p-4 md:p-4 sm:p-4">
                <h3 className="text-black w-full font-semibold">Create New Ticket</h3>

                {success &&
                    <AlertMessage alertType="success" title="Ticket Created" message="New ticket is created successfully." />
                }

                {/* Edit Form starts */}
                <form method='post' onSubmit={submitForm}>
                    <div className="w-[80%] ml-[10%] mr-[10%] mt-12">
                        <div className="flex justify-between items-start m-5">
                            <div className={`lg:w-[44%] small:w-full small:w-full ${styles.form__wrap}`}>
                                <div className={`relative ${styles.form__group} font-OpenSans`}>
                                    <input
                                        type="text"
                                        id="ticketID"
                                        name="ticketID"
                                        className={`!bg-gray-956 ${styles.form__field} border border-black ${errors.ticketID ? 'border-red-952' : 'border-black'}`}
                                        placeholder="Ticket ID"
                                        value={lastInsertedID}
                                        disabled
                                    />
                                    <label htmlFor="newticketid" className={`${styles.form__label}`}>Ticket ID</label>
                                </div>
                                <span className='text-red-952 text-sm flex items-center justify-start'>
                                    {errors.ticketID &&
                                        <>
                                            <Image
                                                height={14}
                                                width={14}
                                                alt="error"
                                                src="/img/alert-triangle.svg"
                                                className='mr-2'
                                            />
                                            {errors.ticketID}
                                        </>
                                    }
                                </span>
                                <div className="hidden flex-inline justify-start items-center mt-3">
                                    <div className={`${styles.customCheck}`}>
                                        <input
                                            type="checkbox"
                                            name="autogenerate"
                                            id="autogenerate"
                                            value="autogenerate"
                                        />
                                        <span></span>
                                    </div>
                                    <span className="capitalize ml-1 relative top-[-2px] text-[13px] text-gray-967">Auto generate ticket ID</span>
                                </div>

                            </div>
                            <div className={`lg:w-[44%] small:w-full small:w-full ${styles.form__wrap}`}>
                                <div className={`relative ${styles.form__group} font-OpenSans`}>
                                    <input
                                        type="text"
                                        id="subject"
                                        name="subject"
                                        className={`${styles.form__field} border border-black ${errors.subject ? 'border-red-952' : 'border-black'}`}
                                        placeholder="Subject"
                                        value={formData.subject}
                                        onChange={(e) => handleInput(e)}
                                    />
                                    <label htmlFor="subject" className={`${styles.form__label}`}>Subject</label>
                                </div>
                                <span className='text-red-952 text-sm flex items-center justify-start'>
                                    {errors.subject &&
                                        <>
                                            <Image
                                                height={14}
                                                width={14}
                                                alt="error"
                                                src="/img/alert-triangle.svg"
                                                className='mr-2'
                                            />
                                            {errors.subject}
                                        </>
                                    }
                                </span>
                            </div>
                        </div>

                        <div className="flex justify-between items-center m-5">
                            <div className={`lg:w-full small:w-full small:w-full ${styles.form__wrap}`}>
                                <div className={`relative ${styles.form__group} font-OpenSans`}>
                                    <textarea
                                        id="description"
                                        name="description"
                                        className={`!min-h-[120px] border ${styles.form__field} border border-black ${errors.description ? 'border-red-952' : 'border-black'}`}
                                        placeholder="Description"
                                        value={formData.description}
                                        onChange={(e) => handleInput(e)}
                                    >
                                    </textarea>
                                    <label htmlFor="description" className={`${styles.form__label}`}>Description</label>
                                </div>
                                <span className='text-red-952 text-sm flex items-center justify-start'>
                                    {errors.description &&
                                        <>
                                            <Image
                                                height={14}
                                                width={14}
                                                alt="error"
                                                src="/img/alert-triangle.svg"
                                                className='mr-2'
                                            />
                                            {errors.description}
                                        </>
                                    }
                                </span>
                            </div>
                        </div>

                        <div className="flex justify-between items-center m-5">
                            <div className={`lg:w-[44%] small:w-full small:w-full ${styles.form__wrap} relative`}>
                                <span className="absolute text-[14px] bg-white px-[3px] py-0 left-[15px] top-[3px]">Assign To</span>
                                <select
                                    name="assignTo"
                                    id="assignTo"
                                    className={`${styles.form__field} capitalize mt-[15px] border border-black ${errors.assignTo ? 'border-red-952' : 'border-black'}`}
                                    value={formData.assignTo}
                                    onChange={(e) => handleInput(e)}
                                >
                                    <option value="">-Select-</option>
                                    {
                                        usersList && usersList.length > 0 ?
                                            usersList.map((item: any, index: any) => (
                                                <option
                                                    key={index}
                                                    value={item}
                                                >
                                                    {item}
                                                </option>
                                            ))
                                            : null
                                    }
                                </select>
                                <div className='text-red-952 text-sm flex items-center justify-start'>
                                    {errors.assignTo &&
                                        <>
                                            <Image
                                                height={14}
                                                width={14}
                                                alt="error"
                                                src="/img/alert-triangle.svg"
                                                className='mr-2'
                                            />
                                            {errors.assignTo}
                                        </>
                                    }
                                </div>
                            </div>
                            <div className={`lg:w-[44%] small:w-full small:w-full ${styles.form__wrap} relative`}>
                                <span className="absolute text-[14px] bg-white px-[3px] py-0 left-[15px] top-[3px]">Priority</span>
                                <select name="priority"
                                    id="priority"
                                    className={`${styles.form__field} capitalize mt-[15px] border border-black ${errors.priority ? 'border-red-952' : 'border-black'}`}
                                    value={formData.priority}
                                    onChange={(e) => handleInput(e)}
                                >
                                    <option value="">-Select-</option>
                                    {
                                        priorityList && priorityList.length > 0 ?
                                            priorityList.map((item: any, index: any) => (
                                                <option
                                                    key={index}
                                                    value={item}
                                                >
                                                    {item}
                                                </option>
                                            ))
                                            : null
                                    }
                                </select>
                                <div className='text-red-952 text-sm flex items-center justify-start'>
                                    {errors.priority &&
                                        <>
                                            <Image
                                                height={14}
                                                width={14}
                                                alt="error"
                                                src="/img/alert-triangle.svg"
                                                className='mr-2'
                                            />
                                            {errors.priority}
                                        </>
                                    }
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-between items-center m-5 flex-wrap flex-row">
                            <div className="border border-gray-954 bg-[#DBDBDB] rounded rounded-xl h-[50px] w-full flex justify-center items-center relative overflow-hidden">
                                <input
                                    type="file" 
                                    multiple
                                    onChange={handleChange}
                                    accept='application/pdf, image/png, image/jpg, image/svg'
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

                        <div className="flex justify-start items-center m-5 flex-wrap flex-row hidden">
                            <div className="bg-[#F4F3F3] px-2 py-1 rounded rounded-xl w-full flex justify-between items-center mb-3">
                                <span className="text-sm">image1.jpg</span>
                                <button>
                                    <Image
                                        src="/img/x.svg"
                                        alt="x"
                                        height={24}
                                        width={24}
                                    />
                                </button>
                            </div>
                            <div className="bg-[#F4F3F3] px-2 py-1 rounded rounded-xl w-full flex justify-between items-center mb-3">
                                <span className="text-sm">document123.pdf</span>
                                <button>
                                    <Image
                                        src="/img/x.svg"
                                        alt="x"
                                        height={24}
                                        width={24}
                                    />
                                </button>
                            </div>
                            <div className="bg-[#F4F3F3] px-2 py-1 rounded rounded-xl w-full flex justify-between items-center mb-3">
                                <span className="text-sm">document4546.docx</span>
                                <button>
                                    <Image
                                        src="/img/x.svg"
                                        alt="x"
                                        height={24}
                                        width={24}
                                    />
                                </button>
                            </div>
                        </div>

                        <div className="flex justify-end items-center m-5">
                            <button className="border border-black rounded-xl h-[44px] px-8 flex justify-center items-center bg-black text-white">
                                <span>Assign</span>
                            </button>
                        </div>

                    </div>
                </form>
                {/* Edit Form Ends */}

            </div>

        </div>
    )
}

CreateTicket.getLayout = function getLayout(page: any) {
    return (
        <Layout>{page}</Layout>
    )
}