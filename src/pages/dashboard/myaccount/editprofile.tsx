import React, { useState, useEffect } from 'react';
import styles from '../../../styles/Common.module.css';
import Image from "next/image";
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router'

export default function EditProfile(props: any) {
    const { push } = useRouter();
    const dispatch = useDispatch();
    const [personalDetail, setPersonalDetail] = useState(false);
    const [contactInfo, setContactInfo] = useState(false);
    const [authContactInfo, setAuthContactInfo] = useState(false);
    const [userData, setUserData] = useState({} as any);
    const sampleListData = useSelector((state: any) => state.usersReducer);
    const [personalData, setPersonalData] = useState({
        firstName: "",
        lastName: ""
    } as any)
    const [authInfo, setAuthInfo] = useState({
        phoneNumber: "",
        email: ""
    } as any)
    const togglePersonalDetail = () => {
        setPersonalDetail(!personalDetail)
    }
    const editPersonalDetail = () => {
        setPersonalDetail(false);
        // dispatch(updateUser(personalData, userData.username) as any);

    }
    const toggleAuthContactInfo = () => {
        setAuthContactInfo(!authContactInfo)
    }
    const editAuthContactInfo = () => {
        setAuthContactInfo(false);
    }
    const toggleContactInfo = () => {
        setContactInfo(!contactInfo)
    }
    const editContactInfo = () => {
        setContactInfo(false);
    }

    useEffect(() => {
        if (sampleListData) {
            setUserData(sampleListData.singleUser);
        }
    }, [sampleListData])
    useEffect(() => {
        if (userData) {
            setPersonalData({
                firstName: userData.firstName,
                lastName: userData.lastName
            })
            setAuthInfo({
                phoneNumber: userData.PhoneRecords,
                email: userData.email
            })
        }
    }, [userData])
    // console.log({
    //     // userData: userData,
    //     // authInfo:authInfo,
    //     sampleListData: sampleListData,
    //     // user:user
    // })
    const handleInputField = (evt: any) => {
        let targetName = evt.target.name;
        let targetValue = evt.target.value;
        setPersonalData((state: any) => ({
            ...state,
            [targetName]: targetValue
        }));
    }

    return (
        <div className="relative bg-white p-5 w-full">

            <div className='w-full flex justify-start items-center mb-10'>
                <div className='relative inline-block'>
                    <div className='w-[120px] h-[120px] rounded-full border border-[#5B5A59] bg-[#5B5A59] inline-flex justify-center items-center text-6xl text-white font-semibold'>{userData && userData.username && userData.username.charAt(0).toUpperCase()}</div>
                    <button
                        className="rounded-full bg-white h-[24px] w-[24px] flex items-center justify-center absolute right-[-2px] bottom-[9px]"
                    >
                        <Image
                            src="/img/editpencil.svg"
                            alt="edit_icon"
                            height={13}
                            width={13}
                        />
                    </button>
                </div>
                <div className='ml-8'>
                    <p className='font-semibold text-2xl text-black mb-2'>{userData && userData.firstName && userData.firstName} {userData && userData.lastName && userData.lastName}</p>
                    <span className='text-[12px] bg-[#E7E6E2] inline-flex px-2 py-1 justify-center items-center text-black rounded-xl'>Admin</span>
                </div>
            </div>

            <div className='w-full flex justify-start items-start mb-10'>
                <div className='w-[50%] min-h-[200px] pr-[70px]'>

                    <div className='mb-10'>
                        <div className='w-full flex justify-start items-center mb-4'>
                            <div className='font-semibold'>Personal Details</div>
                            {!personalDetail ?
                                <button onClick={togglePersonalDetail} className='bg-[#666666] h-[27px] px-2 rounded rounde-lg py-1 flex justify-center items-center text-white text-sm ml-3'>Edit</button>
                                :
                                <>
                                    <button onClick={editPersonalDetail} className='bg-yellow-951 bg-opacity-50 hover:bg-opacity-100 h-[27px] px-2 rounded rounde-lg py-1 flex justify-center items-center text-black text-sm ml-3'>Save</button>
                                    <button onClick={() => setPersonalDetail(false)} className='bg-resolved bg-opacity-50 hover:bg-opacity-100 h-[27px] px-2 rounded rounde-lg py-1 flex justify-center items-center text-black text-sm ml-3'>Close</button>
                                </>
                            }
                        </div>
                        {
                            !personalDetail
                                ?
                                <div className='w-full'>
                                    <div className='relative flex justify-start items-center mb-2'>
                                        <p className='w-[30%] text-[#666666]'>First Name :</p>
                                        <p className='w-[70%] text-black'>{personalData.firstName}</p>
                                    </div>
                                    <div className='relative flex justify-start items-center mb-2'>
                                        <p className='w-[30%] text-[#666666]'>Last Name :</p>
                                        <p className='w-[70%] text-black'>{personalData.lastName}</p>
                                    </div>
                                </div>
                                :
                                <div className='w-full'>
                                    <div className={`mb-5 ${styles.form__wrap} w-full`}>
                                        <div className={`relative ${styles.form__group} font-OpenSans`}>
                                            <input
                                                type="text"
                                                id="firstName"
                                                name="firstName"
                                                className={`${styles.form__field} border border-[#A7A7A7] bg-white`}
                                                placeholder="First Name"
                                                value={personalData.firstName}
                                                onChange={(e) => handleInputField(e)}

                                            />
                                            <label htmlFor="firstname" className={`${styles.form__label}`}>First Name</label>
                                        </div>
                                        <span className='text-red-952 text-sm flex items-center justify-start'></span>
                                    </div>
                                    <div className={`mb-5 ${styles.form__wrap} w-full`}>
                                        <div className={`relative ${styles.form__group} font-OpenSans`}>
                                            <input
                                                type="text"
                                                id="lastName"
                                                name="lastName"
                                                className={`${styles.form__field} border border-[#A7A7A7] bg-white}`}
                                                placeholder="Last Name"
                                                value={personalData.lastName}
                                                onChange={(e) => handleInputField(e)}
                                            />
                                            <label htmlFor="lastName" className={`${styles.form__label}`}>Last Name</label>
                                        </div>
                                        <span className='text-red-952 text-sm flex items-center justify-start'></span>
                                    </div>
                                </div>
                        }
                    </div>

                    <div className='mb-10'>
                        <div className='w-full flex justify-start items-center mb-4'>
                            <div className='font-semibold'>Authentication contact info</div>
                            {!authContactInfo ?
                                <button onClick={toggleAuthContactInfo} className='bg-[#666666] h-[27px] px-2 rounded rounde-lg py-1 flex justify-center items-center text-white text-sm ml-3'>Edit</button>
                                :
                                <>
                                    <button onClick={editAuthContactInfo} className='bg-yellow-951 bg-opacity-50 hover:bg-opacity-100 h-[27px] px-2 rounded rounde-lg py-1 flex justify-center items-center text-black text-sm ml-3'>Save</button>
                                    <button onClick={() => setAuthContactInfo(false)} className='bg-resolved bg-opacity-50 hover:bg-opacity-100 h-[27px] px-2 rounded rounde-lg py-1 flex justify-center items-center text-black text-sm ml-3'>Close</button>
                                </>
                            }
                        </div>
                        {
                            !authContactInfo
                                ?
                                <div className='w-full'>
                                    <div className='relative flex justify-start items-center mb-2'>
                                        <p className='w-[30%] text-[#666666]'>Phone number:</p>
                                        <p className='w-[70%] text-black'>+1 123 456 1100</p>
                                    </div>
                                    <div className='relative flex justify-start items-center mb-2'>
                                        <p className='w-[30%] text-[#666666]'>Email address:</p>
                                        <p className='w-[70%] text-black'>narendra.nallamilli@shodat.com</p>
                                    </div>
                                </div>
                                :
                                <div className='w-full'>
                                    <div className={`mb-5 ${styles.form__wrap} w-full`}>
                                        <div className={`relative ${styles.form__group} font-OpenSans`}>
                                            <input
                                                type="text"
                                                id="phoneNumber"
                                                name="phoneNumber"
                                                className={`${styles.form__field} border border-[#A7A7A7] bg-white`}
                                                placeholder="First Name"
                                                value="+1 123 456 1100"

                                            />
                                            <label htmlFor="phoneNumber" className={`${styles.form__label}`}>Phone Number</label>
                                        </div>
                                        <span className='text-red-952 text-sm flex items-center justify-start'></span>
                                    </div>
                                    <div className={`mb-5 ${styles.form__wrap} w-full`}>
                                        <div className={`relative ${styles.form__group} font-OpenSans`}>
                                            <input
                                                type="text"
                                                id="emailAddress"
                                                name="emailAddress"
                                                className={`${styles.form__field} border border-[#A7A7A7] bg-white}`}
                                                placeholder="Last Name"
                                                value="narendra.nallamilli@shodat.com"
                                            />
                                            <label htmlFor="emailAddress" className={`${styles.form__label}`}>Email address:</label>
                                        </div>
                                        <span className='text-red-952 text-sm flex items-center justify-start'></span>
                                    </div>
                                </div>
                        }
                    </div>

                </div>

                <div className='w-[50%] min-h-[200px] pl-[50px] border border-[#A7A7A7] border-t-0 border-b-0 border-r-0 border-l-1'>
                    <div className='mb-10'>
                        <div className='w-full flex justify-start items-center mb-4'>
                            <div className='font-semibold'>Contact Info</div>
                            {!contactInfo ?
                                <button onClick={toggleContactInfo} className='bg-[#666666] h-[27px] px-2 rounded rounde-lg py-1 flex justify-center items-center text-white text-sm ml-3'>Edit</button>
                                :
                                <>
                                    <button onClick={editContactInfo} className='bg-yellow-951 bg-opacity-50 hover:bg-opacity-100 h-[27px] px-2 rounded rounde-lg py-1 flex justify-center items-center text-black text-sm ml-3'>Save</button>
                                    <button onClick={() => setContactInfo(false)} className='bg-resolved bg-opacity-50 hover:bg-opacity-100 h-[27px] px-2 rounded rounde-lg py-1 flex justify-center items-center text-black text-sm ml-3'>Close</button>
                                </>
                            }
                        </div>
                        {!contactInfo ?
                            <div className='w-full'>
                                <div className='relative flex justify-start items-center mb-2'>
                                    <p className='w-[30%] text-[#666666]'>Address:</p>
                                    <p className='w-[70%] text-black'>2443 Sierra Nevada Road</p>
                                </div>
                                <div className='relative flex justify-start items-center mb-2'>
                                    <p className='w-[30%] text-[#666666]'>City:</p>
                                    <p className='w-[70%] text-black'>Mammoth Lakes</p>
                                </div>
                                <div className='relative flex justify-start items-center mb-2'>
                                    <p className='w-[30%] text-[#666666]'>State:</p>
                                    <p className='w-[70%] text-black'>California</p>
                                </div>
                                <div className='relative flex justify-start items-center mb-2'>
                                    <p className='w-[30%] text-[#666666]'>Zip Code:</p>
                                    <p className='w-[70%] text-black'>93546</p>
                                </div>
                                <div className='relative flex justify-start items-center mb-2'>
                                    <p className='w-[30%] text-[#666666]'>Country:</p>
                                    <p className='w-[70%] text-black'>United States</p>
                                </div>
                            </div>
                            :
                            <div className='w-full'>
                                <div className={`mb-5 ${styles.form__wrap} w-full`}>
                                    <div className={`relative ${styles.form__group} font-OpenSans`}>
                                        <input
                                            type="text"
                                            id="address"
                                            name="address"
                                            className={`${styles.form__field} border border-[#A7A7A7] bg-white`}
                                            placeholder="Address"
                                            value="2443 Sierra Nevada Road"

                                        />
                                        <label htmlFor="address" className={`${styles.form__label}`}>Address</label>
                                    </div>
                                    <span className='text-red-952 text-sm flex items-center justify-start'></span>
                                </div>
                                <div className={`mb-5 ${styles.form__wrap} w-full`}>
                                    <div className={`relative ${styles.form__group} font-OpenSans`}>
                                        <input
                                            type="text"
                                            id="city"
                                            name="city"
                                            className={`${styles.form__field} border border-[#A7A7A7] bg-white}`}
                                            placeholder="City"
                                            value="Mammoth Lakes"
                                        />
                                        <label htmlFor="city" className={`${styles.form__label}`}>City</label>
                                    </div>
                                    <span className='text-red-952 text-sm flex items-center justify-start'></span>
                                </div>
                                <div className={`mb-5 ${styles.form__wrap} w-full`}>
                                    <div className={`relative ${styles.form__group} font-OpenSans`}>
                                        <input
                                            type="text"
                                            id="state"
                                            name="state"
                                            className={`${styles.form__field} border border-[#A7A7A7] bg-white}`}
                                            placeholder="State"
                                            value="California"
                                        />
                                        <label htmlFor="state" className={`${styles.form__label}`}>State</label>
                                    </div>
                                    <span className='text-red-952 text-sm flex items-center justify-start'></span>
                                </div>
                                <div className={`mb-5 ${styles.form__wrap} w-full`}>
                                    <div className={`relative ${styles.form__group} font-OpenSans`}>
                                        <input
                                            type="text"
                                            id="zipCode"
                                            name="zipCode"
                                            className={`${styles.form__field} border border-[#A7A7A7] bg-white}`}
                                            placeholder="Zip Code"
                                            value="93546"
                                        />
                                        <label htmlFor="zipCode" className={`${styles.form__label}`}>Zip Code</label>
                                    </div>
                                    <span className='text-red-952 text-sm flex items-center justify-start'></span>
                                </div>
                                <div className={`mb-5 ${styles.form__wrap} w-full`}>
                                    <div className={`relative ${styles.form__group} font-OpenSans`}>
                                        <input
                                            type="text"
                                            id="country"
                                            name="country"
                                            className={`${styles.form__field} border border-[#A7A7A7] bg-white}`}
                                            placeholder="Country"
                                            value="United States"
                                        />
                                        <label htmlFor="country" className={`${styles.form__label}`}>Country</label>
                                    </div>
                                    <span className='text-red-952 text-sm flex items-center justify-start'></span>
                                </div>
                            </div>
                        }
                    </div>
                </div>

            </div>

        </div>
    )
}