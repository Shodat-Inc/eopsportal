import React, { useState, useEffect } from 'react';
import Link from "next/link";
import Image from "next/image";
import styles from '../../styles/Common.module.css';
import Head from 'next/head';
import axios from 'axios';
import AlertMessage from '@/common/alertMessage';
export default function Enterprise(props: any) {

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        workEmail: "",
        message: "",
        companyName: "",
        numberOfEmp: "",
        phoneNumber: "",
        CIN: "",
    });
    const [errors, setErrors] = useState({
        firstName: "",
        lastName: "",
        workEmail: "",
        message: "",
        companyName: "",
        numberOfEmp: "",
        phoneNumber: "",
        CIN: "",
    });
    const [formIsValid, setFormIsValid] = useState(true);
    const [userData, setUserData] = useState([] as any);
    const [success, setSuccess] = useState(false);


    // Get User Data on Page Load
    useEffect(() => {
        axios.get("/api/getEnterprise")
            .then((response) => {
                setUserData(response.data)
            })
    }, [])

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

    const getLastID = (userData && userData.length > 0) ? userData.slice(-1)[0].userID : '1';

    const handleValidation = () => {
        const EMAIL_REGEX = new RegExp(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i);
        const PHONE_REGEX = new RegExp(/^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/i);
        const newErrorsState = { ...errors };
        let formIsValid = true;
        if (!formData.firstName) {
            formIsValid = false;
            newErrorsState.firstName = "First name must not be empty!"
        }
        // Validate Last Name
        if (!formData.lastName) {
            formIsValid = false;
            newErrorsState.lastName = "Last name must not be empty!"
        }

        // Validate Email Address
        if (!formData.workEmail) {
            formIsValid = false;
            newErrorsState.workEmail = "Email must not be empty!"
        } else if (!EMAIL_REGEX.test(formData.workEmail)) {
            formIsValid = false;
            newErrorsState.workEmail = "Please enter valid email address!"
        }


        // Validate message
        if (!formData.message) {
            formIsValid = false;
            newErrorsState.message = "Message must not be empty!"
        }

        // Validate company name
        if (!formData.companyName) {
            formIsValid = false;
            newErrorsState.companyName = "Company Name must not be empty!"
        }

        // Validate number of employee
        if (!formData.numberOfEmp) {
            formIsValid = false;
            newErrorsState.numberOfEmp = "Please select Number of Employee!"
        }

        // Validate phone number
        if (!formData.phoneNumber) {
            formIsValid = false;
            newErrorsState.phoneNumber = "Phone number must not be empty!"
        } else if (!PHONE_REGEX.test(formData.phoneNumber)) {
            formIsValid = false;
            newErrorsState.phoneNumber = "Please enter valid phone number!"
        } else if (formData.phoneNumber.length != 10) {
            formIsValid = false;
            newErrorsState.phoneNumber = "Please enter valid  phone number!"
        }

        // Validate CIN
        if (!formData.CIN) {
            formIsValid = false;
            newErrorsState.CIN = "Please enter your CIN number"
        }

        // if any field is invalid - then we need to update our state
        if (!formIsValid) {
            setFormIsValid(false);
            setErrors(newErrorsState);
        }

        return formIsValid
    }

    const submitForm = (evt: any) => {
        evt.preventDefault();
        if (handleValidation()) {
            // Storing data to Users JSON            
            let currentDate = new Date().toISOString().split('T')[0];
            let currentTime = new Date().toISOString().split('T')[1].split(".")[0];
            let currentDateTime = currentDate + " " + currentTime;
            axios.post('/api/addEnterprise', {
                ID: parseInt(getLastID) + 1,
                firstName: `${formData.firstName}`,
                lastName: `${formData.lastName}`,
                workEmail: `${formData.workEmail}`,
                message: `${formData.message}`,
                companyName: `${formData.companyName}`,
                numberOfEmp: `${formData.numberOfEmp}`,
                phoneNumber: `${formData.phoneNumber}`,
                CIN: `${formData.CIN}`,
                dateCreated: currentDateTime
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(res => {
                setSuccess(true);
                setTimeout(() => {
                    setSuccess(false);
                }, 3000)
                setFormData({
                    firstName: "",
                    lastName: "",
                    workEmail: "",
                    message: "",
                    companyName: "",
                    numberOfEmp: "",
                    phoneNumber: "",
                    CIN: "",
                })

            }).catch(err => {
                console.log('error in request', err);
            });

        } else {
            console.log("SOMETHING WENT WRONG !")
        }
    }

    return (
        <>
            <Head>
                <title>eOps Fabric - Contact Sales</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>

            <div className="flex font-Inter h-full">
                <div className='w-[50%] relative pb-16'>
                    <div className='flex justify-start items-start p-3 mb-16'>
                        <Image
                            src="/img/logoNew.svg"
                            alt='logoNew'
                            height={35}
                            width={131}
                            className='inline-block'
                        />
                    </div>
                    <div className='h-full flex justify-center items-start'>
                        <Image
                            src="/img/contact-sales-image.svg"
                            alt='contact-sales-image'
                            height={525}
                            width={525}
                            className='inline-block'
                        />
                    </div>
                </div>

                <div className='w-[50%] relative p-8 pb-16'>
                    {/* Top */}
                    <div className='flex justify-between items-center mb-3'>
                        <Link href="/" className="flex items-center justify-start">
                            <Image
                                src="/img/angle_left_icon.svg"
                                alt="angle left"
                                className="mr-2"
                                width={10}
                                height={10}
                            />
                            <span className='text-gray-972 text-lg'>Back</span>
                        </Link>
                        <div className='text-lg'>
                            <span className="text-gray-500 font-normal"> Already have an account? </span>
                            <Link href="/authentication/signin">Sign In</Link>
                        </div>
                    </div>
                    {/* Form */}
                    <div className='h-full flex justify-center items-center flex-wrap'>

                        {success &&
                            <AlertMessage alertType="success" title="Success" message="Data saved successfully!" />
                        }

                        <div className='bg-[#e5e5e5] rounded rounded-xl min-h-[400px] px-24 py-8 min-w-[600px]'>
                            <form method='post' onSubmit={submitForm} className='w-full'>
                                <div className='text-black font-semibold text-3xl mb-2'>Contact Sales</div>
                                <p className='text-gray-972 text-lg mb-3'>Lets get this conversation started. Tell us a bit about yourself, and we will get in touch as soon as we can..</p>

                                <div className="flex w-full mb-3">
                                    <div className={`${styles.form__wrap} w-full`}>
                                        <div className={`relative ${styles.form__group} font-Inter`}>
                                            <input
                                                type="text"
                                                id="workEmail"
                                                name="workEmail"
                                                className={`${styles.form__field} border border-gray-954 !bg-white ${errors.workEmail ? 'border-red-952' : 'border-gray-954'}`}
                                                placeholder="Work email address"
                                                value={formData.workEmail}
                                                onChange={(e) => handleInput(e)}
                                            />
                                            <label htmlFor="workEmail" className={`${styles.form__label}`}>Work email address</label>
                                        </div>
                                        <span className='text-red-952 text-sm flex items-center justify-start'>
                                            {errors.workEmail}
                                        </span>
                                    </div>
                                </div>

                                <div className="flex w-full mb-3">
                                    <div className={`${styles.form__wrap} w-full`}>
                                        <div className={`relative ${styles.form__group} font-Inter`}>
                                            <textarea
                                                id="message"
                                                name="message"
                                                className={`${styles.form__field} border border-gray-954 !bg-white !h-24  ${errors.message ? 'border-red-952' : 'border-gray-954'}`}
                                                placeholder="Message"
                                                value={formData.message}
                                                onChange={(e) => handleInput(e)}
                                            >
                                            </textarea>
                                            <label htmlFor="phoneNumber" className={`${styles.form__label}`}>Message</label>
                                        </div>
                                        <span className='text-red-952 text-sm flex items-center justify-start'>
                                            {errors.message}
                                        </span>
                                    </div>
                                </div>


                                <div className="flex w-full mb-3">
                                    <div className={`${styles.form__wrap} w-full`}>
                                        <div className={`relative ${styles.form__group} font-Inter`}>
                                            <input
                                                type="text"
                                                id="firstName"
                                                name="firstName"
                                                className={`${styles.form__field} border border-gray-954 !bg-white  ${errors.firstName ? 'border-red-952' : 'border-gray-954'}`}
                                                placeholder="First Name"
                                                value={formData.firstName}
                                                onChange={(e) => handleInput(e)}
                                            />
                                            <label htmlFor="firstName" className={`${styles.form__label}`}>First Name</label>
                                        </div>
                                        <span className='text-red-952 text-sm flex items-center justify-start'>{errors.firstName}</span>
                                    </div>
                                </div>


                                <div className="flex w-full mb-3">
                                    <div className={`${styles.form__wrap} w-full`}>
                                        <div className={`relative ${styles.form__group} font-Inter`}>
                                            <input
                                                type="text"
                                                id="lastName"
                                                name="lastName"
                                                className={`${styles.form__field} border border-gray-954 !bg-white  ${errors.lastName ? 'border-red-952' : 'border-gray-954'}`}
                                                placeholder="Last Name"
                                                value={formData.lastName}
                                                onChange={(e) => handleInput(e)}
                                            />
                                            <label htmlFor="lastName" className={`${styles.form__label}`}>Last Name</label>
                                        </div>
                                        <span className='text-red-952 text-sm flex items-center justify-start'>{errors.lastName}</span>
                                    </div>
                                </div>


                                <div className="flex w-full mb-3">
                                    <div className={`${styles.form__wrap} w-full`}>
                                        <div className={`relative ${styles.form__group} font-Inter`}>
                                            <input
                                                type="text"
                                                id="companyName"
                                                name="companyName"
                                                className={`${styles.form__field} border border-gray-954 !bg-white  ${errors.companyName ? 'border-red-952' : 'border-gray-954'}`}
                                                placeholder="Company Name"
                                                value={formData.companyName}
                                                onChange={(e) => handleInput(e)}
                                            />
                                            <label htmlFor="companyName" className={`${styles.form__label}`}>Company Name</label>
                                        </div>
                                        <span className='text-red-952 text-sm flex items-center justify-start'>{errors.companyName}</span>
                                    </div>
                                </div>


                                <div className="flex w-full mb-3">
                                    <div className={`${styles.form__wrap} w-full`}>
                                        <div className={`relative ${styles.form__group} font-Inter`}>
                                            <input
                                                type="text"
                                                id="CIN"
                                                name="CIN"
                                                className={`${styles.form__field} border border-gray-954 !bg-white  ${errors.CIN ? 'border-red-952' : 'border-gray-954'}`}
                                                placeholder="CIN"
                                                value={formData.CIN}
                                                onChange={(e) => handleInput(e)}
                                            />
                                            <label htmlFor="CIN" className={`${styles.form__label}`}>CIN</label>
                                        </div>
                                        <span className='text-red-952 text-sm flex items-center justify-start'>{errors.CIN}</span>
                                    </div>
                                </div>


                                <div className="flex w-full mb-3">
                                    <div className={`${styles.form__wrap} w-full`}>
                                        <div className={`relative ${styles.form__group} font-Inter`}>
                                            <select
                                                id="numberOfEmp"
                                                name="numberOfEmp"
                                                className={`${styles.form__field} border border-gray-954 !bg-white  ${errors.numberOfEmp ? 'border-red-952' : 'border-gray-954'}`}
                                                value={formData.numberOfEmp}
                                                onChange={(e) => handleInput(e)}
                                            >
                                                <option value="">Select number of employees</option>
                                                <option value="5">5</option>
                                                <option value="15">15</option>
                                                <option value="25">25</option>
                                                <option value="35">35</option>
                                                <option value="45">45</option>
                                            </select>
                                            {/* <label htmlFor="numberOfEmp" className={`${styles.form__label}`}>Number of employee</label> */}
                                        </div>
                                        <span className='text-red-952 text-sm flex items-center justify-start'>{errors.numberOfEmp}</span>
                                    </div>
                                </div>

                                <div className="flex w-full mb-8">
                                    <div className={`${styles.form__wrap} w-full`}>
                                        <div className={`relative ${styles.form__group} font-Inter`}>
                                            <input
                                                type="number"
                                                id="phoneNumber"
                                                name="phoneNumber"
                                                className={`${styles.form__field} border border-gray-954 !bg-white  ${errors.phoneNumber ? 'border-red-952' : 'border-gray-954'}`}
                                                placeholder="Phone number"
                                                value={formData.phoneNumber}
                                                onChange={(e) => handleInput(e)}
                                            />
                                            <label htmlFor="phoneNumber" className={`${styles.form__label}`}>Phone number</label>
                                        </div>
                                        <span className='text-red-952 text-sm flex items-center justify-start'>{errors.phoneNumber}</span>
                                    </div>
                                </div>


                                <div className="flex w-full">
                                    <button
                                        className="rounded-lg h-[47px] bg-black w-full text-white text-md justify-center items-center flex"
                                    >
                                        <span>Submit</span>
                                    </button>
                                </div>


                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}