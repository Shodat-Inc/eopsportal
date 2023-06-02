import React, { useState, useEffect } from 'react'
import Link from "next/link";
import Image from "next/image";

export default function Complete(props: any) {
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
    const [formIsValid, setFormIsValid] = useState(true);

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


    const handleValidation = () => {
        const newErrorsState = { ...errors };
        let formIsValid = true;
        if (!formData.phoneNumber) {
            formIsValid = false;
            newErrorsState.phoneNumber = "Phone number must not be empty!"
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

        }

        // if any field is invalid - then we need to update our state
        if (!formIsValid) {
            setFormIsValid(false);
            setErrors(newErrorsState);
        }

        return formIsValid
    }

    const submitForm = (evt: any) => {
        evt.preventDefault()
        console.log("handleValidation() =>", handleValidation())
        if (handleValidation()) {
            console.log("VERY NICE !")
        } else {
            console.log("SOMETHING WENT WRONG !")
        }
    }

    console.log("ERROR", errors)
    console.log("FORM DATA", formData)
    return (
        <>

            <div className="signinform relative">
                <form method='post' onSubmit={submitForm}>
                    <div className="mb-5">
                        <label className="text-gray-500 text-md font-medium mb-1 block">Phone number*</label>
                        <input
                            type="text"
                            className={`border rounded-lg pl-5 pr-10 border-black h-12 w-full shadow-sm ${errors.phoneNumber ? 'border-red-500' : 'border-black'}`}
                            name="phoneNumber"
                            placeholder="Phone number"
                            value={formData.phoneNumber}
                            onChange={(e) => handleInput(e)}
                        />
                        <span className='text-red-500 text-sm'>{errors.phoneNumber}</span>
                    </div>
                    <div className="mb-5 relative">
                        <label className="text-gray-500 text-md font-medium mb-1 block">Enter password*</label>
                        <>
                            <input
                                type={showPassword.pass ? "text" : "password"}
                                className={`border rounded-lg pl-5 pr-10 border-black h-12 w-full shadow-sm ${errors.password ? 'border-red-500' : 'border-black'}`}
                                name="password"
                                placeholder="Enter password"
                                value={formData.password}
                                onChange={(e) => handleInput(e)}
                            />
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
                        </>
                        <span className='text-red-500 text-sm'>{errors.password}</span>
                    </div>
                    <div className="mb-5 relative">
                        <div className="column-2 flex items-center justify-between">
                            <label className="text-gray-500 text-md font-medium mb-3 block">Confirm password*</label>
                        </div>
                        <>
                            <input
                                type={showPassword.confirmPassword ? "text" : "password"}
                                className={`border rounded-lg pl-5 pr-10 border-black h-12 w-full shadow-sm ${errors.confirmPassword ? 'border-red-500' : 'border-black'}`}
                                name="confirmPassword"
                                placeholder="Confirm password"
                                value={formData.confirmPassword}
                                onChange={(e) => handleInput(e)}
                            />
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
                        </>
                        <span className='text-red-500 text-sm'>{errors.confirmPassword}</span>
                    </div>
                    <div className="mb-5 relative flex">
                        <input type="checkbox" className="checked:bg-black indeterminate:bg-gray-300" />
                        <label className="ml-5 text-gray-951 block">I agree to terms & conditions</label>
                    </div>
                    <div className="relative">
                        <button className="rounded-lg h-16 bg-black w-full text-white text-md">
                            Register Account
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
                </form>
            </div>

        </>
    );
}
