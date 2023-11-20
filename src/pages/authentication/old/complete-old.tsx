import React, { useState, useEffect } from 'react'
import Link from "next/link";
import Image from "next/image";
import { useRouter } from 'next/navigation';
import axios from 'axios';
import styles from '../../styles/Common.module.css';
import FabricInfo from './fabricInfo';
import Head from 'next/head'
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import Router from 'next/router'

export default function Complete(props: any) {
    const { push } = useRouter();
    const router = useRouter();
    const [showPassword, setShowPassword] = useState({
        pass: false,
        confirmPassword: false
    });
    const [formData, setFormData] = useState({
        phoneNumber: "",
        password: "",
        confirmPassword: ""
    })
    const [errors, setErrors] = useState({
        phoneNumber: "",
        password: "",
        confirmPassword: ""
    })
    const [agreement, setAgreement] = useState(false);
    const [formIsValid, setFormIsValid] = useState(true);
    const [agreementError, setAgreementError] = useState("");
    const [userData, setUserData] = useState([] as any);
    const [success, setSuccess] = useState(false);

    const [phoneCode, setPhoneCode] = useState('RU')

    // Get User Data on Page Load
    useEffect(() => {
        axios.get("/api/getUsers")
            .then((response) => {
                setUserData(response.data)
            })
    }, [])

    // Show Hide Eye Icon
    const hideShow = () => {
        setShowPassword({
            ...showPassword,
            pass: !showPassword.pass
        })
    }
    const hideShowConfirm = () => {
        setShowPassword({
            ...showPassword,
            confirmPassword: !showPassword.confirmPassword
        })
    }


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

    // Get Last Asset ID
    const getLastID = (userData && userData.length > 0) ? userData.slice(-1)[0].userID : '1';
    console.log({
        getLastID: getLastID,
        userData: userData,
    })

    const handleValidation = () => {
        const PHONE_REGEX = new RegExp(/^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/i);
        const newErrorsState = { ...errors };
        let formIsValid = true;
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

        // Validate Last Name
        if (!formData.password) {
            formIsValid = false;
            newErrorsState.password = "Password must not be empty!"
        }

        // Validate company Name
        if (!formData.confirmPassword) {
            formIsValid = false;
            newErrorsState.confirmPassword = "Confirm password must not be empty!"
        } else if (formData.confirmPassword !== formData.password) {
            formIsValid = false;
            newErrorsState.confirmPassword = "Password and Confirm Password does not match"
        }

        // Validation for Checkbox
        if (!agreement) {
            formIsValid = false;
            setAgreementError("You must agree with terms and condition");
        }

        // if any field is invalid - then we need to update our state
        if (!formIsValid) {
            setFormIsValid(false);
            setErrors(newErrorsState);
        }

        return formIsValid
    }

    const submitForm = async (evt: any) => {
        evt.preventDefault()
        if (handleValidation()) {
            // Storing data to Users JSON            
            let currentDate = new Date().toISOString().split('T')[0];
            axios.post('/api/createUsers', {
                userID: parseInt(getLastID) + 1,
                username: `${props.registerData.email}`,
                firstName: `${props.registerData.firstName}`,
                lastName: `${props.registerData.lastName}`,
                companyName: `${props.registerData.companyName}`,
                phoneNumber: `${formData.phoneNumber}`,
                password: `${formData.password}`,
                terms: agreement,
                dateCreated: currentDate,
                dateModified: currentDate,
                role: "admin"
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(res => {
                console.log('res', res.data);
                setSuccess(true)
                setTimeout(() => {
                    push("/authentication/success");
                }, 2000)
            }).catch(err => {
                console.log('error in request', err);
            });

        } else {
            console.log("SOMETHING WENT WRONG !")
        }
    }

    const handleChange = (event: any) => {
        setAgreement(event.target.checked);
        if (event.target.checkbox) { setFormIsValid(false); }
    }


    const [successVerify, setSuccessVerify] = useState(false)
    const verifyPhoneFunction = () => {
        console.log("Verify Account!");
        setSuccessVerify(!successVerify);
        setTimeout(() => {
            Router.push({
                pathname: '/authentication/verifyphone'
            }, 'authentication/verifyphone')
        }, 100)
    }

    return (
        <>

            <div className="signinform relative">
                <form method='post' onSubmit={submitForm}>

                    <div className={`mb-3 relative justify-start items-start flex flex-wrap flex-col w-full mb-4 relative ${styles.phoneField}`}>
                        <label htmlFor="phoneNumber" className='font-[500] text-md text-gray-971 mb-3'>Phone Number <span>*</span></label>

                        <PhoneInput
                            international
                            countryCallingCodeEditable={false}
                            defaultCountry="RU"
                            className='rounded rounded-lg border border-gray-972 shadow shadow-lg h-[46px] pl-4 pr-16 w-full'
                            value={phoneCode}
                            onChange={(inputValue:any) => setPhoneCode(inputValue)}
                            />

                        {/* <input
                            type="text"
                            className='rounded rounded-lg border border-gray-972 shadow shadow-lg h-[46px] pl-4 pr-16 w-full'
                            id="phoneNumber"
                            name="phoneNumber"
                            placeholder='Phone Number '
                        /> */}
                        <button
                            onClick={verifyPhoneFunction}
                            className={`text-sm ${successVerify ? 'text-[#138A00]' : 'text-black'} font-semibold absolute right-[6px] top-[49px]`}>
                            {successVerify ? 'Verified' : 'Verify'}
                        </button>
                    </div>

                    <div className='mb-3 relative justify-start items-start flex flex-wrap flex-col w-full mb-4'>
                        <label htmlFor="companyName" className='font-[500] text-md text-gray-971 mb-3'>Company Name <span>*</span></label>
                        <input
                            type="text"
                            className='rounded rounded-lg border border-gray-972 shadow shadow-lg h-[46px] pl-4 pr-2 w-full'
                            id="companyName"
                            name="companyName"
                            placeholder='Company Name'
                        />
                    </div>

                    <div className="mb-7 relative flex flex-wrap">
                        <div className='flex justify-start items-center'>
                            <div className={`${styles.customCheck} mt-2`}>
                                <input
                                    type='checkbox'
                                    name="agreement"
                                    onChange={handleChange} />
                                <span></span>
                            </div>
                            <label className="ml-2 text-black block">I agree to terms & conditions</label>
                        </div>
                        <span className='text-red-952 text-sm flex items-center justify-start'>
                            {!agreement ?
                                <>
                                    {agreementError}
                                </>
                                : null}
                        </span>
                    </div>
                    <div className="relative">
                        <button className={`rounded-lg h-16 bg-black1 w-full text-white text-md ${!formIsValid} ? bg-black : bg-black`}>
                            {/* Register Account */}
                            <span className='flex justify-center items-center'>
                                <span>{success ? "Please wait..." : 'Register Account'}</span>
                                {success ?
                                    <Image
                                        src="/img/loading-gif.gif"
                                        alt="loader"
                                        height={20}
                                        width={20}
                                        className='ml-5'
                                    />
                                    : null}
                            </span>
                        </button>
                        <div className="mt-5 mb-5 flex items-center justify-center">
                            <Image
                                src="/img/lock.svg"
                                alt="lock"
                                className="h-6"
                                height={18}
                                width={18}
                            />
                            <span className="text-gray-951 text-[12px]">Your info is safely secured</span>
                        </div>
                    </div>

                    <div className='hidden'>

                        <div className={`mb-5 ${styles.form__wrap}`}>
                            <div className={`relative ${styles.form__group} font-Inter`}>
                                <input
                                    type="number"
                                    id="phoneNumber"
                                    name="phoneNumber"
                                    className={`${styles.form__field} border border-black ${errors.phoneNumber ? 'border-red-952' : 'border-black'}`}
                                    placeholder="Phone number"
                                    value={formData.phoneNumber}
                                    onChange={(e) => handleInput(e)}
                                />
                                <label htmlFor="phoneNumber" className={`${styles.form__label}`}>Phone number</label>
                            </div>
                            <span className='text-red-952 text-sm flex items-center justify-start'>
                                {errors.phoneNumber &&
                                    <>
                                        <Image
                                            height={14}
                                            width={14}
                                            alt="error"
                                            src="/img/alert-triangle.svg"
                                            className='mr-2'
                                        />
                                        {errors.phoneNumber}
                                    </>
                                }
                            </span>
                        </div>

                        <div className={`mb-5 ${styles.form__wrap}`}>
                            <div className={`relative ${styles.form__group} font-Inter`}>
                                <input
                                    type={showPassword.pass ? "text" : "password"}
                                    id="password"
                                    name="password"
                                    className={`${styles.form__field} border border-black ${errors.password ? 'border-red-952' : 'border-black'}`}
                                    placeholder="Enter password"
                                    value={formData.password}
                                    onChange={(e) => handleInput(e)}
                                />
                                <label htmlFor="password" className={`${styles.form__label}`}>Enter password</label>
                                <span
                                    className="absolute text-black font-normal font-8 right-2 bottom-[8px] cursor-pointer"
                                    onClick={hideShow}
                                >
                                    {
                                        showPassword.pass ?
                                            <Image
                                                src="/img/eye_hide_off_see_view_icon.svg"
                                                alt='hide'
                                                height={32}
                                                width={32}
                                            />
                                            :
                                            <Image
                                                src="/img/eye_on_see_show_view_icon.svg"
                                                alt='hide'
                                                height={32}
                                                width={32}
                                            />
                                    }
                                </span>
                            </div>
                            <span className='text-red-952 text-sm flex items-center justify-start'>
                                {errors.password &&
                                    <>
                                        <Image
                                            height={14}
                                            width={14}
                                            alt="error"
                                            src="/img/alert-triangle.svg"
                                            className='mr-2'
                                        />
                                        {errors.password}
                                    </>
                                }
                            </span>
                        </div>

                        <div className={`mb-5 ${styles.form__wrap}`}>
                            <div className={`relative ${styles.form__group} font-Inter`}>
                                <input
                                    type={showPassword.confirmPassword ? "text" : "password"}
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    className={`${styles.form__field} border border-black ${errors.confirmPassword ? 'border-red-952' : 'border-black'}`}
                                    placeholder="Enter confirm password"
                                    value={formData.confirmPassword}
                                    onChange={(e) => handleInput(e)}
                                />
                                <label htmlFor="confirmPassword" className={`${styles.form__label}`}>Enter confirm password</label>
                                <span
                                    className="absolute text-black font-normal font-8 right-2 bottom-[8px] cursor-pointer"
                                    onClick={hideShowConfirm}
                                >
                                    {
                                        showPassword.confirmPassword ?
                                            <Image
                                                src="/img/eye_hide_off_see_view_icon.svg"
                                                alt='hide'
                                                height={32}
                                                width={32}
                                            />
                                            :
                                            <Image
                                                src="/img/eye_on_see_show_view_icon.svg"
                                                alt='hide'
                                                height={32}
                                                width={32}
                                            />
                                    }
                                </span>
                            </div>
                            <span className='text-red-952 text-sm flex items-center justify-start'>
                                {errors.confirmPassword &&
                                    <>
                                        <Image
                                            height={14}
                                            width={14}
                                            alt="error"
                                            src="/img/alert-triangle.svg"
                                            className='mr-2'
                                        />
                                        {errors.confirmPassword}
                                    </>
                                }
                            </span>
                        </div>

                        <div className="mb-5 relative flex flex-wrap">
                            <div className='flex justify-start items-center'>
                                <div className={`${styles.customCheck}`}>
                                    <input type='checkbox' name="agreement" onChange={handleChange} />
                                    <span></span>
                                </div>
                                <label className="ml-2 text-black block">I agree to terms & conditions</label>
                            </div>
                            <span className='text-red-952 text-sm flex items-center justify-start'>
                                {!agreement ?
                                    <>
                                        <Image
                                            height={14}
                                            width={14}
                                            alt="error"
                                            src="/img/alert-triangle.svg"
                                            className='mr-2'
                                        />
                                        {agreementError}
                                    </>
                                    : null}
                            </span>
                        </div>
                        <div className="relative">
                            <button className={`rounded-lg h-16 bg-black1 w-full text-white text-md ${!formIsValid} ? bg-black : bg-black`}>
                                {/* Register Account */}
                                <span className='flex justify-center items-center'>
                                    <span>{success ? "Please wait..." : 'Register Account'}</span>
                                    {success ?
                                        <Image
                                            src="/img/loading-gif.gif"
                                            alt="loader"
                                            height={20}
                                            width={20}
                                            className='ml-5'
                                        />
                                        : null}
                                </span>
                            </button>
                            <div className="mt-5 mb-5 flex items-center justify-center">
                                <Image
                                    src="/img/lock.svg"
                                    alt="lock"
                                    className="h-6"
                                    height={24}
                                    width={24}
                                />
                                <span className="text-gray-951 text-sm">Your info is safely secured</span>
                            </div>
                        </div>
                    </div>
                </form>
            </div>

        </>
    );
}
