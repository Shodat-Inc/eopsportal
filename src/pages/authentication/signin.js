import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Link from "next/link";
import Image from "next/image";
import axios from 'axios';
import { useRouter } from 'next/router';
import styles from '../../styles/Common.module.css';
import AlertMessage from '@/common/alertMessage';
import FabricInfo from './fabricInfo';
import Head from 'next/head';
import { getSampleData } from '../../store/actions/getPostAction'
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { auth } from './firebase.config';
import { userSignIn } from '@/store/actions/loginAction';

export default function SignIn() {
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

    const submitForm = (event) => {
        event.preventDefault()
        if (handleValidation()) {
            setLoader(true)
            onCaptchVerify();
            const appVerifier = window.recaptchaVerifier;
            

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

    // const submitForm = (event) => {
    //     event.preventDefault()
    //     if (handleValidation()) {

    //         setLoader(true)

    //         onCaptchVerify();

    //         const appVerifier = window.recaptchaVerifier;

    //         const matched = userData.filter((item) => {
    //             return item.username === formData.username && item.password === formData.password
    //         })
    //         if (matched && matched.length > 0) {
    //             let phoneNumber = matched[0].phoneNumber;
    //             console.log({
    //                 matched: matched[0].phoneNumber
    //             })
    //             setUserPhone(phoneNumber);
    //             sessionStorage.setItem("authenticationUsername", matched[0].username);
    //             localStorage.setItem("authenticationUsername", matched[0].username);

    //             signInWithPhoneNumber(auth, phoneNumber, appVerifier)
    //                 .then((confirmationResult) => {
    //                     window.confirmationResult = confirmationResult;
    //                     console.log({
    //                         message: "OTP sent successfully!"
    //                     })
    //                     setOtpSent(true);
    //                     setTimeout(() => {
    //                         setOtpScreen(true);
    //                         setLoader(false)
    //                     }, 1000)
    //                 })
    //                 .catch((error) => {
    //                     setOtpSent(false);
    //                     setResponseError(true);
    //                     console.log({
    //                         message: error
    //                     })
    //                 });

    //             setTimeout(() => {
    //                 setSuccess(true);
    //                 // setOtpScreen(true)
    //             }, 1000)
    //         } else {
    //             setOtpScreen(false)
    //             setResponseError(true);
    //             setTimeout(() => {
    //                 setFormData({
    //                     username: "",
    //                     password: ""
    //                 })
    //                 setErrors({
    //                     username: "",
    //                     password: ""
    //                 })
    //             }, 100);
    //             setTimeout(() => {
    //                 setResponseError(false)
    //             }, 2000)
    //         }
    //     }

    // }

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
        
        setLoader(true)

        let otp = code.join("");

        window.confirmationResult
            .confirm(otp)
            .then(async (res) => {
                setTimeout(() => {
                    setVerified(true);
                    setLoader(false);
                    setOtpScreen(false);
                    setTimeout(() => {
                        push("/dashboard/");
                    }, 1)
                }, 100)
                setOtpError(false)
            })
            .catch((err) => {
                localStorage.clear();
                setOtpError(true)
                console.log({
                    err: err,
                    message: "Error"
                });
            });
    }

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
            newErrorsState.username = "Username must not be empty!"
        } else if (!EMAIL_REGEX.test(formData.username)) {
            formIsValid = false;
            newErrorsState.username = "Please enter valid username address!"
        }

        // if any field is invalid - then we need to update our state
        if (!formIsValid) {
            setFormIsValid(false);
            setErrors(newErrorsState);
        }

        return formIsValid
    }

    const submitForm1 = (evt) => {
        evt.preventDefault()
        if (handleValidation()) {
            const matched = userData.filter((item) => {
                return item.username === formData.username && item.password === formData.password
            })
            if (matched && matched.length > 0) {
                sessionStorage.setItem("authenticationUsername", matched[0].username);
                localStorage.setItem("authenticationUsername", matched[0].username);
                // const token = Math.floor((Math.random() * 1000000000000000) + 1);
                // sessionStorage.setItem("authenticationToken", token);
                // localStorage.setItem("authenticationToken", token);
                setTimeout(() => {
                    setSuccess(true);
                }, 1000)
                setOtpScreen(true)
                // setTimeout(() => {
                //     push("/dashboard/");
                // }, 1)

            } else {
                setOtpScreen(false)
                setResponseError(true);
                setTimeout(() => {
                    setResponseError(false)
                    setFormData({
                        username: "",
                        password: ""
                    })
                    setErrors({
                        username: "",
                        password: ""
                    })
                }, 100)
            }
        } else {
            console.log("SOMETHING WENT WRONG !")
        }
    }


    return (
        <>
            <Head>
                <title>eOps Fabric - Login</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <div className="font-Inter md:flex lg:flex">
                <div className={`md:w-[50%] md:block ${styles.fabricInfo}`}>
                    <FabricInfo />
                </div>

                <div className={`lg:w-[50%] md:w-[50%] sm:w-full sm:mt-0 relative ${styles.formContent}`}>
                    <div className="flex justify-center items-center h-full flex-wrap">

                        <div className={`pt-10 pr-2 text-right text-black text-xl font-medium absolute top-0 right-2 sm:relative sm:pt-3 sm:pb-3 sm:right-0 sm:left-0 md:absolute sm:pt-0 sm:pb-0 sm:right-2 sm:left-0 ${styles.dontHaveAcc}`}>
                            <span className="text-gray-500 font-normal">Don&apos;t have an account? </span> <Link href="/authentication/register">Sign Up</Link>
                        </div>

                        <div className="text-left w-[470px] md:w-[470px] sm:w-full sm:px-5 sm:py-5 sm:text-left">
                            <p className="font-bold text-3xl md:text-3xl md:text-left text-black mb-4 capitalize sm:text-center sm:text-2xl">Hello! Welcome back.</p>
                            <p className="font-normal text-lg text-gray-972">Log in with your credenticals that you entered during your registration.</p>
                            <div className="mb-4 mt-5 border border-gray-100 w-full h-[1px]"></div>

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
                            <div className="signinform relative sm:pb-6">
                                <div id="recaptcha-container"></div>
                                {
                                    !otpScreen ?

                                        <form method='post' onSubmit={submitForm}>

                                            <div className={`mb-5`}>
                                                <div className={`relative`}>
                                                    <label className="font-[500] text-md text-gray-971 mb-3 block">Your email address<span>*</span></label>
                                                    <input
                                                        type="text"
                                                        id="username"
                                                        name="username"
                                                        className='rounded rounded-lg border border-gray-972 shadow shadow-lg h-[46px] pl-4 pr-2 w-full'
                                                        placeholder="Enter email address"
                                                        value={formData.username}
                                                        onChange={(e) => handleInput(e)}
                                                    />
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

                                            <div className={`mb-5`}>
                                                <div className={`relative font-Inter`}>
                                                    <div className='flex justify-between items-start'>
                                                        <label className="font-[500] text-md text-gray-971 mb-3 block">Password<span>*</span></label>
                                                        <Link className="text-black text-md font-medium mb-0 block" href="/authentication/forgotpassword">Forgot Password?</Link>
                                                    </div>
                                                    <input
                                                        type={showPassword.password ? "text" : "password"}
                                                        id="password"
                                                        name="password"
                                                        className='rounded rounded-lg border border-gray-972 shadow shadow-lg h-[46px] pl-4 pr-2 w-full'
                                                        placeholder="Enter password"
                                                        value={formData.password}
                                                        onChange={(e) => handleInput(e)}
                                                    />
                                                    <span className="absolute text-black font-normal font-8 right-4 bottom-[11px] cursor-pointer" onClick={hideShow}>
                                                        {
                                                            showPassword.password ?
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


                                            <div className="relative">
                                                <button
                                                    className={`flex rounded-lg h-16 bg-black1 w-full text-white text-lg block flex justify-center items-center ${success ? 'bg-gray-951' : 'bg-black'}`}
                                                    disabled={success ? true : false}
                                                >
                                                    <span className='flex justify-center items-center'>
                                                        <span>Login</span>
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
                                            </div>
                                        </form>
                                        :

                                        <div className="text-left w-[450px] lg:w-[450px] md:w-full sm:w-full lg:px-0 lg:py-0 md:px-5 md:py-5 sm:px-5 sm:py-5 sm:text-left">
                                            <p className="font-[700] text-3xl md:text-3xl md:text-left text-black mb-2 capitalize sm:text-center sm:text-2xl">
                                                <span>Verify your account!</span>
                                            </p>
                                            <p className="font-normal text-lg text-gray-972">We have sent you an otp for two step verification on you mobile number</p>

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
                </div >

            </div >
        </>
    );
}
