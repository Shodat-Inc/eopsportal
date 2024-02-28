import React, { useState, useEffect } from "react";
import Layout from "../../../components/Layout";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from 'next/router'
import axios from 'axios';
import styles from '../../../styles/Common.module.css';
import AlertMessage from '@/common/alertMessage';
import { getAlerts } from "../../../lib/getalerts";

export async function getServerSideProps() {
    const localData = await getAlerts()
    return {
        props: {
            localData,
        },
    }
}

export default function AddAlerts(localData: any) {

    const router = useRouter();
    const parentAsset = router.query;
    const [formData, setFormData] = useState({
        alertName: "",
        thresholdMeasure: "",
        thresholdValue: "0",
        tireWare: "",
    });
    const [success, setSuccess] = useState(false);
    const [data, setData] = useState([] as any);
    const [templates, setTemplates] = useState([] as any);
    const [selectTemplate, setSelectTemplate] = useState([] as any);
    const [emailTemplate, setEmailTemplate] = useState("");
    const [defaultTemplate, setDefaultTemplate] = useState("")
    const [disableTireWear, setDisableTireWear] = useState(false);
    const [disableCondition, setDisableCondition] = useState(false)

    // Get JSON data on page load
    const fetchData = () => {
        axios.get("/api/getParentAlerts").then((response) => {
            if (response.data) {
                setData(response.data);
            }
        });
    };
    useEffect(() => {
        fetchData();
        if (fetchData.length) return;
    }, [localData.localData])

    // Get JSON data on page load
    const fetchEmailTemplate = () => {
        axios.get("/api/getEmailTemplates").then((response) => {
            if (response.data) {
                setTemplates(response.data);
                setDefaultTemplate(response.data[0]?.templateName)
                setSelectTemplate(response.data[0])
            }
        });
    };
    useEffect(() => {
        fetchEmailTemplate();
        if (fetchEmailTemplate.length) return;
    }, [])


    // Get Last Asset ID
    const getLastID = (data && data.length > 0) ? data.slice(-1)[0].ID : 1;
    const getLastAlertID = (data && data.length > 0) ? data.slice(-1)[0].alertID : 10000000001;

    const handleInput = (evt: any) => {
        evt.preventDefault()
        let targetName = evt.target.name;
        let targetValue = evt.target.value;
        if (targetName === "thresholdMeasure") {
            setDisableTireWear(true)
            setDisableCondition(false)
        }
        if (targetName === "tireWare") {
            setDisableTireWear(false)
            setDisableCondition(true)
        }
        setFormData((state) => ({
            ...state,
            [targetName]: targetValue
        }));
    };

    const handleInputChange = (evt: any) => {
        evt.preventDefault();
        let targetName = evt.target.name;
        let targetValue = evt.target.value;
        const filtered = templates.filter((item: any) => {
            return item.templateName === targetValue;
        });
        // console.log({
        //     filtered: filtered
        // })
        setEmailTemplate(filtered[0]?.templateName)
        setSelectTemplate(filtered[0])
    }


    const submitForm = async (evt: any) => {
        evt.preventDefault();
        let targetName = evt.target.name;
        let targetValue = evt.target.value;
        let currentDate = new Date().toISOString().split('T')[0];
        let currentTime = new Date().toISOString().split('T')[1];
        let currentDateTime = currentDate + " " + currentTime.split(".")[0];
        // console.log({
        //     formData: formData,
        //     currentDateTime: currentDateTime
        // })
        axios.post('/api/addAlerts', {

            ID: parseInt(getLastID) + 1,
            alertID: parseInt(getLastAlertID) + 1,
            alertName: `${formData.alertName}`,
            model: parentAsset.model,
            primaryClass: parentAsset.objectID,
            subObject: parentAsset.subObject,
            condition: `${formData.thresholdMeasure}`,
            threshold: `${formData.thresholdValue}`,
            tireware: `${formData.tireWare}`,
            serialNo: parentAsset.key,
            dateCreated: currentDateTime,
            status: true,
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => {
            // console.log('res', res.data);
            setSuccess(true)
            setTimeout(() => {
                setFormData((state) => ({
                    alertName: "",
                    thresholdMeasure: "",
                    thresholdValue: "",
                    tireWare: "",
                }));
            }, 500)
            setTimeout(() => {
                setSuccess(false)
            }, 5000)

        }).catch(err => {
            console.log('error in request', err);
        });
    }

    // Reset all disabled form 
    const resetAllDisabled = () => {
        setDisableCondition(false);
        setDisableTireWear(false);
        setFormData({
            alertName: "",
            thresholdMeasure: "",
            thresholdValue: "0",
            tireWare: "",
        })
    }

    return (
        <div className="flex font-OpenSans">

            <div className="w-[100%]">
                <div className="columns-2 flex justify-between items-center">
                    <p className="text-black text-lg mb-0 font-semibold">eOps Watch</p>
                </div>

                <div className="border border-gray-957 bg-gray-953 min-h-full rounded-xl mt-3 px-4 py-4">

                    {/* Breadcrumb */}
                    <div className="flex justify-between items-center">
                        <nav className="flex" aria-label="Breadcrumb">
                            <ol className="inline-flex items-center space-x-1 md:space-x-1">
                                <li className="inline-flex items-center">
                                    <Link href="/dashboard/aimodaldetection"
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
                                            pathname: "/dashboard/aimodaldetection",
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
                                            pathname: "/dashboard/aimodaldetection"
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
                                            pathname: "/dashboard/eopswatch/preview",
                                            query: {
                                                objectID: parentAsset.objectID,
                                                key: parentAsset.key,
                                                id: parentAsset.id,
                                                industryID: parentAsset.id,
                                                subObject: parentAsset.subObject,
                                                model: parentAsset.model,
                                                from:"eopswatch"
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
                                    <Link
                                        href={{
                                            pathname: "/dashboard/eopswatch/alerts",
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
                                        <span className="ml-1 text-sm font-medium text-black hover:text-yellow-950 md:ml-1">Alerts</span>
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
                                        <span className="ml-1 text-sm font-medium text-black md:ml-1">New Alerts</span>
                                    </div>
                                </li>
                            </ol>
                        </nav>
                    </div>

                    <div className="relative rounded overflow-hidden mt-5">
                        {success &&
                            <AlertMessage alertType="success" title="Saved Successfully!" message="New alert is created successfully!" />
                        }

                        {/* Add Alert Form */}
                        <form method='post' onSubmit={submitForm}>
                            <div className="rounded rounded-xl bg-white p-3 mb-7">
                                <h4 className="font-semibold text-[16px]">Config Alert</h4>
                                <div className="mt-3 flex justify-start items-center">
                                    <div className="relative w-[40%]">
                                        <div className={`mb-5 ${styles.form__wrap}`}>
                                            <div className={`relative ${styles.form__group} font-OpenSans`}>
                                                <input
                                                    type="text"
                                                    id="alertName"
                                                    name="alertName"
                                                    className={`${styles.form__field} border border-black w-full`}
                                                    placeholder="Alert Name"
                                                    value={formData.alertName}
                                                    onChange={(e) => handleInput(e)}
                                                />
                                                <label htmlFor="alertName" className={`${styles.form__label}`}>Alert Name</label>
                                            </div>
                                            <span className='text-red-952 text-sm flex items-center justify-start'>

                                            </span>
                                        </div>
                                    </div>

                                    <div className="relative w-[60%] mb-5 ml-28 flex justify-end items-center flex-wrap flex-row">
                                        {disableTireWear || disableCondition ?
                                            <span
                                                className="cursor-pointer absolute top-[-35px] px-[5px] py-[2px]  border border-black rounded-lg bg-black text-white text-sm"
                                                onClick={resetAllDisabled}
                                            >Reset</span>
                                            : null}
                                        <div className=" mb-1 ml-28 flex justify-start items-center">
                                            <div className={`${styles.form__wrap} w-[200px] pt-[15px] mr-10`}>
                                                <select
                                                    name="thresholdMeasure"
                                                    id="thresholdMeasure"
                                                    className={`border border-black h-[50px] relative rounded rounded-xl w-[200px] px-2 ${disableCondition ? 'border-gray-951 bg-gray-957' : 'border-black bg-white'}`}
                                                    value={formData.thresholdMeasure}
                                                    onChange={(e) => handleInput(e)}
                                                    disabled={disableCondition ? true : false}
                                                >
                                                    <option value="">-Select-</option>
                                                    <option selected value="less than">Less than</option>
                                                    <option value="greater than">Greater than</option>
                                                </select>
                                            </div>
                                            <div className={`${styles.form__wrap} w-[300px]`}>
                                                <div className={`relative ${styles.form__group} font-OpenSans`}>
                                                    <input
                                                        type="text"
                                                        id="thresholdValue"
                                                        name="thresholdValue"
                                                        className={`${styles.form__field} border border-black w-[250px] ${disableCondition ? '!border-gray-951 !bg-gray-957' : 'border-black bg-white'}`}
                                                        placeholder="Tire Wear Threshold"
                                                        value={formData.thresholdValue}
                                                        onChange={(e) => handleInput(e)}
                                                        disabled={disableCondition ? true : false}
                                                    />
                                                    <label htmlFor="thresholdValue" className={`${styles.form__label}`}>
                                                        Tire Wear Threshold
                                                        <span
                                                            className="group ml-2 mr-2 inline-flex justify-center items-center font-itallic relative top-1" data-tooltip-target="tooltip-default"
                                                        >
                                                            <Image
                                                                src="/img/info_icon.svg"
                                                                alt="info_icon"
                                                                height={18}
                                                                width={18}
                                                            />

                                                            <span className="group-hover:opacity-100 transition-opacity bg-gray-800 px-1 text-sm text-gray-100 rounded-md absolute left-1/2 -translate-x-1/2 translate-y-full opacity-0 m-4 mx-auto w-20 flex justify-center items-center inline-block">In miles</span>
                                                        </span>

                                                    </label>
                                                </div>
                                                <span className='text-red-952 text-sm flex items-center justify-start'>

                                                </span>
                                            </div>
                                        </div>
                                        <div className=" mb-1 ml-28 flex justify-start items-center">
                                            <div className={`${styles.form__wrap} w-[100px] pt-[15px] mr-10`}></div>
                                            <div className={`${styles.form__wrap} w-[400px] font-bold mt-3`}>OR</div>
                                        </div>
                                        <div className=" mb-1 ml-28 flex justify-start items-center">
                                            <div className={`${styles.form__wrap} w-[540px]`}>
                                                <span className="text-sm font-semibold">Tire Wear</span>
                                                <select
                                                    name="tireWare"
                                                    id="tireWare"
                                                    className={`mt-1 border h-[50px] relative rounded rounded-xl w-[540px] px-2 ${disableTireWear ? 'border-gray-951 bg-gray-957' : 'border-black bg-white'}`}
                                                    value={formData.tireWare}
                                                    onChange={(e) => handleInput(e)}
                                                    disabled={disableTireWear ? true : false}
                                                >
                                                    <option value="">-Select-</option>
                                                    <option value="Minimal to No Tire Wear">Minimal to No Tire Wear</option>
                                                    <option value="Medium Tire Wear">Medium Tire Wear</option>
                                                    <option value="Medium to Severe Tire Wear">Medium to Severe Tire Wear</option>
                                                    <option value="Severe Tire Wear">Severe Tire Wear</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>

                            <div className="rounded rounded-xl bg-white p-3">
                                
                                <div className="mt-3 flex justify-start items-start">
                                    <div className="relative w-[40%]">
                                    <h4 className="font-semibold text-[16px]">Send Email</h4>
                                        <div className={`${styles.form__wrap} w-full pt-[15px] mb-5`}>
                                            <select
                                                name="emailTemplate"
                                                id="emailTemplate"
                                                className="border border-black h-[50px] relative rounded rounded-xl w-full pl-3"
                                                value={emailTemplate ? emailTemplate : defaultTemplate}
                                                onChange={(e) => handleInputChange(e)}
                                            >
                                                <option value="">-Select template-</option>
                                                {
                                                    templates && templates.length > 0 ?
                                                        templates.map((items: any, index: any) => (
                                                            <option key={index} value={items.templateName}>{items.templateName}</option>
                                                        ))
                                                        : null
                                                }
                                            </select>
                                        </div>

                                        <div className={`mb-5 ${styles.form__wrap} hidden`}>
                                            <div className={`relative ${styles.form__group} font-OpenSans`}>
                                                <input
                                                    type="text"
                                                    id="emailTemplate"
                                                    name="emailTemplate"
                                                    className={`${styles.form__field} border border-black w-[300px]`}
                                                    placeholder="Email Template"
                                                />
                                                <label htmlFor="emailTemplate" className={`${styles.form__label}`}>Email Template</label>
                                            </div>
                                            <span className='text-red-952 text-sm flex items-center justify-start'></span>
                                        </div>

                                        <div className={`mb-5 ${styles.form__wrap}`}>
                                            <div className={`relative ${styles.form__group} font-OpenSans`}>
                                                <input
                                                    type="text"
                                                    id="emailAddress"
                                                    name="emailAddress"
                                                    className={`${styles.form__field} border border-black w-[250px]`}
                                                    placeholder="Enter new email address"
                                                />
                                                <label htmlFor="emailAddress" className={`${styles.form__label}`}>Enter new email address</label>
                                            </div>
                                            <span className='text-red-952 text-sm flex items-center justify-start'></span>
                                        </div>

                                        <div className={`mb-5 ${styles.form__wrap}`}>
                                            <div className={`relative ${styles.form__group} font-OpenSans`}>
                                                <input
                                                    type="text"
                                                    id="emailSubject"
                                                    name="emailSubject"
                                                    className={`${styles.form__field} border border-black w-[250px]`}
                                                    placeholder="Enter email subject"
                                                />
                                                <label htmlFor="emailSubject" className={`${styles.form__label}`}>Subject</label>
                                            </div>
                                            <span className='text-red-952 text-sm flex items-center justify-start'></span>
                                        </div>

                                        <div className="relative">
                                            <div className="mt-20 relative flex justify-end items-center w-full">
                                                <button
                                                    className="border border-black rounded-lg bg-black text-white text-lg w-[70px] h-[47px] mr-5 hover:bg-yellow-951 hover:text-white hover:border-yellow-951 ease-in-out duration-300 disabled:bg-gray-951 disabled:hover:border-gray-951 disabled:border-gray-951 transition-all duration-[400ms] mr-3 transition-opacity duration-300 outline-none transform active:scale-75 transition-transform"
                                                >
                                                    Save
                                                </button>
                                                <button
                                                    className="border border-black rounded-lg bg-white text-black text-lg w-[70px] h-[47px] hover:text-white hover:bg-yellow-951 hover:border-yellow-951 ease-in-out duration-300 transition-all duration-[400ms] mr-3 transition-opacity duration-300 outline-none transform active:scale-75 transition-transform"
                                                >
                                                    Close
                                                </button>
                                            </div>
                                        </div>

                                    </div>

                                    <div className="relative w-[60%] mb-5 ml-28 flex justify-start items-start flex-wrap flex-col">
                                        <div className="text-black font-sm font-semibold mb-4">Email Preview</div>
                                        <div className="border border-black rounded rounded-xl p-4">
                                            <Image
                                                src="/img/shodatLogo.svg"
                                                alt="shodat logo"
                                                height={27}
                                                width={100}
                                                className="mb-5"
                                            />
                                            {/* <p className="m-0 text-black mb-2 font-semibold">Dear Customer</p> */}
                                            <div className="p-3 bg-yellow-951 rounded rounded-xl">
                                                {/* <p className="font-semibold text-black text-sm text-semibold mb-2">{selectTemplate.templateHeading}</p> */}
                                                <p className="text-sm mb-3">{selectTemplate.templateContent}</p>
                                                <button
                                                    className="border border-black rounded-lg bg-black text-white text-sm font-normal h-[40px] px-2 mr-5 hover:bg-yellow-951 hover:text-black hover:border-black ease-in-out duration-300 disabled:bg-gray-951 disabled:hover:border-gray-951 disabled:border-gray-951 transition-all duration-[400ms] mr-3 transition-opacity duration-300 outline-none transform active:scale-75 transition-transform"
                                                >
                                                    Click here
                                                </button>
                                            </div>
                                            <p className="m-0 text-black mt-4 font-semibold text-sm">Best Regards, </p>
                                            <p className="m-0 text-black font-normal">SHODAT</p>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </form>

                    </div>

                </div>

            </div>
        </div>
    )
}

AddAlerts.getLayout = function getLayout(page: any) {
    return (
        <Layout>{page}</Layout>
    )
}