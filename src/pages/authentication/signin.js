import React, { useState, useEffect } from 'react';
import styles from '../../styles/Common.module.css';
import Image from "next/image";
import Link from "next/link";
import Head from 'next/head'
import Header from './header';
import BgInfo from './bginfo';
import PhoneInput from 'react-phone-number-input'
import 'react-phone-number-input/style.css';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { useRouter } from 'next/router';
import AlertMessage from '@/common/alertMessage';
import { getSampleData } from '../../store/actions/getPostAction'
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { auth } from './firebase.config';

export default function SignIn() {
    const [disable, setDisable] = useState(true);
    const [showPass, setShowPass] = useState(false);
    const showHidePasswordFunction = () => {
        setShowPass(!showPass)
    }

    const dispatch = useDispatch();
    const { push } = useRouter();
    const [userData, setUserData] = useState([]);
    const [showPassword, setShowPassword] = useState({
        password: false
    });
    const [formData, setFormData] = useState({
        username: "",
        password: ""
    })
    const [errors, setErrors] = useState({
        username: "",
        password: ""
    })
    const [formIsValid, setFormIsValid] = useState(true);
    const [success, setSuccess] = useState(false);
    const [responseError, setResponseError] = useState(false);

    const [otpScreen, setOtpScreen] = useState(false);
    const [code, setcode] = useState(new Array(6).fill(""));
    const [verified, setVerified] = useState(false);
    const [showTick, setShowTick] = useState(false);
    const [otpError, setOtpError] = useState(false);
    const [loader, setLoader] = useState(false);
    const [otpSent, setOtpSent] = useState(false);
    const [userPhone, setUserPhone] = useState("")


    // useEffect(() => {
    //     axios.get("http://20.232.178.134:3000/api/getUsers")
    //         .then((response) => {
    //             // setUserData(response.data)
    //             console.log({
    //                 data: response.data
    //             })
    //         })
    // }, [])


    // Firebase OTP
    function onCaptchVerify() {
        if (!window.recaptchaVerifier) {
            window.recaptchaVerifier = new RecaptchaVerifier(
                "recaptcha-container",
                {
                    size: "invisible",
                    callback: (response) => {
                        submitForm();
                    },
                    "expired-callback": () => { },
                },
                auth
            );
        }
    }

    const submitForm = async (event) => {
        event.preventDefault()
        if (handleValidation()) {

            // setLoader(true)

            // onCaptchVerify();

            // const appVerifier = window.recaptchaVerifier;

            await axios.get("http://20.232.178.134:3000/api/signIn")
                .then((response) => {
                    // setUserData(response.data)
                    console.log({
                        LoginData: response.data
                    })
                })

            // const matched = userData.filter((item) => {
            //     return item.username === formData.username && item.password === formData.password
            // })
            // if (matched && matched.length > 0) {
            //     let phoneNumber = matched[0].phoneNumber;
            //     console.log({
            //         matched: matched[0].phoneNumber
            //     })
            //     setUserPhone(phoneNumber);
            //     sessionStorage.setItem("authenticationUsername", matched[0].username);
            //     localStorage.setItem("authenticationUsername", matched[0].username);

            //     signInWithPhoneNumber(auth, phoneNumber, appVerifier)
            //         .then((confirmationResult) => {
            //             window.confirmationResult = confirmationResult;
            //             console.log({
            //                 message: "OTP sent successfully!"
            //             })
            //             setOtpSent(true);
            //             setTimeout(() => {
            //                 setOtpScreen(true);
            //                 setLoader(false)
            //             }, 1000)
            //         })
            //         .catch((error) => {
            //             setOtpSent(false);
            //             setResponseError(true);
            //             console.log({
            //                 message: error
            //             })
            //         });

            //     setTimeout(() => {
            //         setSuccess(true);
            //         // setOtpScreen(true)
            //     }, 1000)
            // } else {
            //     setOtpScreen(false)
            //     setResponseError(true);
            //     setTimeout(() => {
            //         setFormData({
            //             username: "",
            //             password: ""
            //         })
            //         setErrors({
            //             username: "",
            //             password: ""
            //         })
            //     }, 100);
            //     setTimeout(() => {
            //         setResponseError(false)
            //     }, 2000)
            // }
        }

    }

    // Phone Number With Starts
    const phoneNumberWithStar = (phone) => {
        let last4Digit = phone.substr(phone.length - 4);
        let lengthOfPhone = phone.length - 4;
        let hiddenPhone = [];
        let finalPhone = '';
        for (let i = 0; i < lengthOfPhone; i++) {
            hiddenPhone.push("*")
        }
        finalPhone = hiddenPhone.join("").toString() + last4Digit.toString();
        return finalPhone;
    }


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

    const verifyOtpFunction = () => {
        console.log({
            code: code
        })

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
                    const token = Math.floor((Math.random() * 1000000000000000) + 1);
                    sessionStorage.setItem("authenticationToken", token);
                    localStorage.setItem("authenticationToken", token);

                    setTimeout(() => {
                        push("/dashboard/");
                    }, 1)
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


    // useEffect(() => {
    //     axios.get("/api/getUsers")
    //         .then((response) => {
    //             setUserData(response.data)
    //         })
    // }, [])

    const sampleListData = useSelector((state) => state.sampleData);

    useEffect(() => {
        dispatch(getSampleData());
    }, [dispatch]);

    // Show Hide Eye Icon
    const hideShow = () => {
        setShowPassword({
            ...showPassword,
            password: !showPassword.password
        })
    }

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

    // Check for validations
    const handleValidation = () => {
        const EMAIL_REGEX = new RegExp(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i);
        const newErrorsState = { ...errors };
        let formIsValid = true;

        // Validate Last Name
        if (!formData.password) {
            formIsValid = false;
            newErrorsState.password = "Password must not be blank!"
        }

        // Validate Email Address
        if (!formData.username) {
            formIsValid = false;
            newErrorsState.username = "Username/email must not be empty!"
        } else if (!EMAIL_REGEX.test(formData.username)) {
            formIsValid = false;
            newErrorsState.username = "Please enter valid username/address address!"
        }

        // if any field is invalid - then we need to update our state
        if (!formIsValid) {
            setFormIsValid(false);
            setErrors(newErrorsState);
        }

        return formIsValid
    }



    const initialMinute = 9;
    const initialSeconds = 59;
    const [minutes, setMinutes] = useState(initialMinute);
    const [seconds, setSeconds] = useState(initialSeconds);
    useEffect(() => {
        let myInterval = setInterval(() => {
            if (seconds > 0) {
                setSeconds(seconds - 1);
            }
            if (seconds === 0) {
                if (minutes === 0) {
                    clearInterval(myInterval)
                    setDisable(false)
                } else {
                    setMinutes(minutes - 1);
                    setSeconds(59);
                    setDisable(true)
                }
            }
        }, 1000)
        return () => {
            clearInterval(myInterval);
        };
    });

    return (
        <>
            {/* Head Information */}
            <Head>
                <title>eOps Fabric - Login</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>

            <div className="font-OpenSans">
                {/* Header */}
                <Header />

                {/* MAIN Content */}
                <div className="grid grid-cols-2 gap-4">
                    {/* Bg Image Information */}
                    <BgInfo />

                    {/* Content section */}
                    <div className='w-full mt-20 flex justify-center items-start'>
                        <div className='border border-[#D9D9D9] rounded rounded-lg p-6 w-[70%] mb-10'>

                            {
                                otpScreen ?
                                    <>
                                        <p className="text-2xl font-semibold mb-2">
                                            <span>Verify your account!</span>
                                        </p>
                                        <p className="text-[#8692A6] mb-12">We have sent you an otp for two step verification on you mobile number</p>
                                    </>
                                    :
                                    <>
                                        <h2 className='text-2xl font-semibold mb-2'>Hello! Welcome Back.</h2>
                                        <div className='text-[#8692A6] mb-4'>Log in with your credentials that you entered during your registration.</div>
                                    </>
                            }


                            {/* === Login Message Alert === */}
                            {responseError &&
                                <AlertMessage alertType="error" title="Login Failed!" message="Please try again!" />
                            }

                            {success &&
                                <AlertMessage alertType="success" title="Success!" message="OTP Sent Successfully" />
                            }
                            {/* === Login Message Alert === */}

                            {otpSent &&
                                <AlertMessage alertType="success" title="" message={`An OTP is sent to you mobile number ${phoneNumberWithStar(userPhone)}`} />
                            }

                            {
                            !otpScreen ?
                                <form method='post' onSubmit={submitForm}>
                                    <div className={`mb-5 lg:w-full small:w-full small:w-full ${styles.form__wrap}`}>
                                        <div className={`relative ${styles.form__group} font-OpenSans`}>
                                            <input
                                                type="text"
                                                id="username"
                                                name="username"
                                                className={`border border-[#A7A7A7] text-[#666666] ${styles.form__field}`}
                                                placeholder="Enter email address"
                                                value={formData.username}
                                                onChange={(e) => handleInput(e)}
                                            />
                                            <label htmlFor="username" className={`${styles.form__label} !text-[#666666]`}>Enter email address</label>
                                        </div>
                                        <span className='text-red-952 text-sm flex items-center justify-start'>
                                            {
                                                errors.username &&
                                                <>
                                                    <Image
                                                        height={14}
                                                        width={14}
                                                        alt="error"
                                                        src="/img/alert-triangle.svg"
                                                        className='mr-2'
                                                    />
                                                    {errors.username}
                                                </>
                                            }
                                        </span>
                                    </div>

                                    <div className={`mb-2 lg:w-full small:w-full small:w-full ${styles.form__wrap}`}>
                                        <div className={`relative ${styles.form__group} font-OpenSans`}>
                                            <input
                                                type={showPass ? 'text' : 'password'}
                                                id="password"
                                                name="password"
                                                className={`border border-[#A7A7A7] text-[#666666] !pr-12 ${styles.form__field}`}
                                                placeholder="Enter Password"
                                                value={formData.password}
                                                onChange={(e) => handleInput(e)}
                                            />
                                            <label htmlFor="password" className={`${styles.form__label} !text-[#666666]`}>Password</label>
                                            <div className='absolute right-2 top-7 cursor-pointer' onClick={showHidePasswordFunction}>
                                                {
                                                    !showPass ?
                                                        <Image
                                                            src="/img/auth/pass-show-off.svg"
                                                            alt="pass-show-off"
                                                            height={24}
                                                            width={24}
                                                        />
                                                        :
                                                        <Image
                                                            src="/img/auth/eye-off.svg"
                                                            alt="eye-off"
                                                            height={24}
                                                            width={24}
                                                        />
                                                }
                                            </div>
                                        </div>
                                        <div className="column-2 flex items-center justify-between">
                                            <span className='text-red-952 text-sm flex items-center justify-start'>
                                                {
                                                    errors.password &&
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
                                    </div>
                                    <div className='flex justify-between items-center mb-10'>
                                        <Link href="/authentication/forgot-password" className='font-semibold text-sm'>Forgot Password?</Link>
                                    </div>

                                    <div className='flex justify-between items-center'>
                                        <div>
                                            <Link href="/authentication/individual"
                                                className='text-black text-sm mb-2 font-semibold'>
                                                <span>Create an account</span>
                                            </Link>
                                        </div>
                                        <button
                                            // href="/authentication/complete-individual" 
                                            className='bg-yellow-951 min-w-[111px] flex justify-center items-center rounded rounded-xl py-4 px-2 font-semibold'
                                            disabled={success ? true : false}
                                        >
                                            <span>Next</span>
                                        </button>
                                    </div>
                                </form>
                                :
                                <div className=''>
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
                                        <div className='text-sm text-[#666666] mt-5'>
                                            The OTP will be expired in
                                            <span>
                                                {minutes === 0 && seconds === 0
                                                    ? null
                                                    : <span> {minutes}:{seconds < 10 ? `0${seconds}` : seconds}</span>
                                                }
                                            </span>
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
                                            className="bg-yellow-951 min-w-[111px] flex justify-center items-center rounded rounded-xl py-4 px-2 font-semibold"
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

            </div>
        </>
    )
}