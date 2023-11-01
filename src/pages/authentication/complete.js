import React, { useState, useEffect } from 'react';
import styles from '../../styles/Common.module.css';
import Link from "next/link";
import Router from 'next/router';
import Image from "next/image";
import axios from 'axios';
import FabricInfo from './fabricInfo';
import Head from 'next/head'
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import { useRouter } from 'next/navigation';
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { auth } from './firebase.config';


export default function Complete() {
    console.log({

    })
    const { push } = useRouter();
    const [showPassword, setShowPassword] = useState({
        pass: false,
        confirmPassword: false
    });
    const [formData, setFormData] = useState({
        phoneNumber: "",
        companyName: "",
    })
    const [errors, setErrors] = useState({
        phoneNumber: "",
        companyName: "",
    })
    const [agreement, setAgreement] = useState(false);
    const [formIsValid, setFormIsValid] = useState(true);
    const [agreementError, setAgreementError] = useState("");
    const [success, setSuccess] = useState(false);
    const [items, setItems] = useState([]);
    const [lastID, setLastID] = useState(0);

    const [otpScreen, setOtpScreen] = useState(false);
    const [code, setcode] = useState(new Array(6).fill(""));
    const [verified, setVerified] = useState(false);
    const [showTick, setShowTick] = useState(false);
    const [otpError, setOtpError] = useState(false);
    const [loader, setLoader] = useState(false);
    const handleChangeOTP = (element, index) => {
        if (isNaN(element.value)) return false;

        setcode([...code.map((d, indx) => (indx === index ? element.value : d))]);

        if (element.nextSibling) {
            element.nextSibling.focus();
        }

        if (index === 5) {
            setShowTick(true)
        } else {
            setShowTick(false)
        }
    };

    useEffect(() => {
        const items = localStorage.getItem('registerData');
        if (items) {
            setItems(JSON.parse(items));
        }
    }, []);

    const [phoneCode, setPhoneCode] = useState('RU')

    // Get User Data on Page Load
    useEffect(() => {
        axios.get("/api/getUsers")
            .then((response) => {
                let lastID = response.data.slice(-1)[0].userID;
                setLastID(lastID)
            })
    }, [])

    // Handle Input
    const handleInput = (evt) => {
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

    const handleValidation = () => {
        const newErrorsState = { ...errors };
        let formIsValid = true;

        // Validate Last Name
        if (!formData.companyName) {
            formIsValid = false;
            newErrorsState.companyName = "Company name must not be empty!"
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


    // Firebase OTP
    function onCaptchVerify() {
        if (!window.recaptchaVerifier) {
            window.recaptchaVerifier = new RecaptchaVerifier(
                "recaptcha-container",
                {
                    size: "invisible",
                    callback: (response) => {
                        verifyPhoneFunction();
                    },
                    "expired-callback": () => { },
                },
                auth
            );
        }
    }

    // Form Submit
    const submitForm = async (evt) => {
        evt.preventDefault();
        console.log({
            phoneCode: phoneCode,
            items:items
        })
        if (handleValidation()) {
            let currentDate = new Date().toISOString().split('T')[0];
            let currentTime = new Date().toISOString().split('T')[1].split(".")[0];
            let currentDateTime = currentDate + " " + currentTime;
            axios.post('http://localhost:3000/api/createUsers', {                
                username: `${items.email}`,
                emailAddress: `${items.email}`,
                firstName: `${items.firstName}`,
                lastName: `${items.lastName}`,
                companyName: `${formData.companyName}`,
                phoneNumber: parseInt(phoneCode),
                password: `${items.password}`,
                terms: agreement,
                role: "admin",
                address:"",
                city:"",
                state:"",
                pincode:"",
                country:"",
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(res => {
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

    // Handle change for checkbox
    const handleChange = (event) => {
        setAgreement(event.target.checked);
        if (event.target.checkbox) { setFormIsValid(false); }
    }


    const verifyPhoneFunction = () => {

        if (handleValidation()) {

            setLoader(true)

            onCaptchVerify();

            const appVerifier = window.recaptchaVerifier;

            const formatPh = phoneCode;

            signInWithPhoneNumber(auth, formatPh, appVerifier)
                .then((confirmationResult) => {
                    window.confirmationResult = confirmationResult;
                    console.log({
                        message: "OTP sended successfully!"
                    })
                    setTimeout(() => {
                        setOtpScreen(true);
                        setLoader(false)
                    }, 1000)
                })
                .catch((error) => {
                    console.log({
                        message: error
                    })
                });


        }

    }

    const verifyOtpFunction = () => {

        setLoader(true)

        let otp = code.join("");

        window.confirmationResult
            .confirm(otp)
            .then(async (res) => {
                console.log({
                    res: res,
                    message: "Verified"
                });
                setTimeout(() => {
                    setVerified(true);
                    setLoader(false);
                    setOtpScreen(false);
                }, 100)
                setOtpError(false)
            })
            .catch((err) => {
                setOtpError(true)
                console.log({
                    err: err,
                    message: "Error"
                });
            });
    }

    return (
        <>
            <Head>
                <title>eOps Fabric - Register</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <div className="column-2 flex font-Inter">
                <div className={`lg:w-[50%] lg:block md:hidden md:hidde sm:hidden ${styles.fabricInfo}`}>
                    <FabricInfo />
                </div>

                <div className={`lg:w-[50%] md:w-full sm:w-full sm:mt-0 relative ${styles.formContent}`}>
                    <div className="flex justify-start items-center h-full flex-wrap flex-col">

                        <div className="pt-5 pr-2 text-left text-gray-951 text-lg font-medium mb-5 md:w-full lg:pl-0 md:pl-5 lg:w-[470px]">
                            <Link href="/" className="flex items-center justify-start">
                                <Image
                                    src="/img/angle_left_icon.svg"
                                    alt="angle left"
                                    className="mr-2"
                                    width={10}
                                    height={10}
                                />
                                <span>Back</span>
                            </Link>
                        </div>

                        {!otpScreen ?
                            <div className="text-left w-[450px] lg:w-[450px] md:w-full sm:w-full lg:px-0 lg:py-0 md:px-5 md:py-5 sm:px-5 sm:py-5 sm:text-left">
                                <div id="recaptcha-container"></div>
                                <p className="font-[700] text-3xl md:text-3xl md:text-left text-black mb-2 capitalize sm:text-center sm:text-2xl">
                                    Complete Your Profile!
                                </p>
                                <p className="font-normal text-lg text-gray-500">For the purpose of industry regulation, your details are required.</p>
                                <div className="mb-4 mt-5 border border-gray-100 w-full h-[1px]"></div>
                                <div className="signinform relative">
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
                                                    onChange={(inputValue) => setPhoneCode(inputValue)}
                                                />
                                                {
                                                    verified &&
                                                    <div>
                                                        <div className='text-green-500 text-sm absolute right-[10px] top-[48px] font-semibold'>Verified</div>
                                                        <span className='absolute right-[-20px] top-[48px]'>
                                                            <Image
                                                                src="/img/green-circular-tick.svg"
                                                                alt="green-circular-tick"
                                                                height={19}
                                                                width={19}
                                                                className=""
                                                            />
                                                        </span>
                                                    </div>
                                                }
                                            </div>

                                            <div className='mb-3 relative justify-start items-start flex flex-wrap flex-col w-full mb-4'>
                                                <label htmlFor="companyName" className='font-[500] text-md text-gray-971 mb-3'>Company Name <span>*</span></label>
                                                <input
                                                    type="text"
                                                    className='rounded rounded-lg border border-gray-972 shadow shadow-lg h-[46px] pl-4 pr-2 w-full'
                                                    id="companyName"
                                                    name="companyName"
                                                    placeholder='Company Name'
                                                    value={formData.companyName}
                                                    onChange={(e) => handleInput(e)}
                                                />
                                                <span className='text-red-952 text-sm flex items-center justify-start'>{errors.companyName}</span>
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
                                                {
                                                    verified ?

                                                        <button className={`rounded-lg h-16 bg-black1 w-full text-white text-md ${!formIsValid} ? bg-black : bg-black`}>
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
                                                        :
                                                        <div
                                                            onClick={verifyPhoneFunction}
                                                            className={`rounded-lg h-16 bg-black1 w-full text-white text-md bg-black cursor-pointer flex justify-center items-center`}>
                                                            <span className='flex justify-center items-center'>
                                                                <span>Verify Phone</span>
                                                                {loader ?
                                                                    <Image
                                                                        src="/img/loading-gif.gif"
                                                                        alt="loader"
                                                                        height={20}
                                                                        width={20}
                                                                        className='ml-5'
                                                                    />
                                                                    : null}
                                                            </span>
                                                        </div>
                                                }
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

                                        </form>
                                    </div>

                                </div>
                            </div>
                            :
                            <div className="text-left w-[450px] lg:w-[450px] md:w-full sm:w-full lg:px-0 lg:py-0 md:px-5 md:py-5 sm:px-5 sm:py-5 sm:text-left">
                                <p className="font-[700] text-3xl md:text-3xl md:text-left text-black mb-2 capitalize sm:text-center sm:text-2xl">
                                    <span>Verify your account!</span>
                                </p>
                                <p className="font-normal text-lg text-gray-972">For the purpose of industry regulation, your details are required.</p>

                                <div className="mt-7 mb-12 relative">
                                    <label htmlFor="" className="font-[500] text-md text-gray-971 mb-3">Phone verification number (PVN)</label>

                                    <div className="flex justfy-between items-center mt-3">
                                        {code.map((data, index) => {
                                            return (
                                                <input
                                                    type="text"
                                                    className="rounded rounded-lg border border-gray-972 shadow shadow-lg h-[46px] pl-1 pr-1 w-[55px] text-center mr-4 text-xl font-semibold"
                                                    name="otp"
                                                    maxLength={1}
                                                    key={index}
                                                    value={data}
                                                    onChange={(e) => handleChangeOTP(e.target, index)}
                                                    onFocus={(e) => e.target.select}
                                                />
                                            );
                                        })}
                                        {showTick &&
                                            <span>
                                                <Image
                                                    src="/img/green-circular-tick.svg"
                                                    alt="green-circular-tick"
                                                    height={19}
                                                    width={19}
                                                    className=""
                                                />
                                            </span>
                                        }
                                    </div>
                                    <div className='mt-2 text-gray-971 text-sm'>
                                        <button>Resend Code</button>
                                    </div>

                                    {
                                        otpError ?
                                            <div className='mt-2 text-red-500 text-sm'>OTP mismatched! Please try again</div>
                                            :
                                            null
                                    }
                                </div>

                                <div className='relative justify-start items-start flex flex-wrap flex-col w-full mb-2'>
                                    <button
                                        onClick={verifyOtpFunction}
                                        className="rounded-lg h-16 bg-black w-full text-white text-md justify-center items-center flex"
                                    >
                                        <span className='flex justify-center items-center'>
                                            <span>Verify OTP</span>
                                            {loader ?
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
                                    <span className="text-gray-951 text-sm flex justify-center items-center mt-6 w-full">
                                        <Image
                                            src="/img/lock.svg"
                                            alt="green-circular-tick"
                                            height={19}
                                            width={19}
                                            className=""
                                        />
                                        Your info is safely secured
                                    </span>
                                </div>

                            </div>
                        }

                    </div>
                </div>

            </div>
        </>
    );
}
