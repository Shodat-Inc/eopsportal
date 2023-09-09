import React, { useState, useEffect } from 'react';
import styles from '../../../styles/Common.module.css';
import Image from "next/image";
export default function ManageTeams(props: any) {
    const [toggleText, setToggleText] = useState(false)

    // Toggle Text
    const toggleChecked = () => {
        setToggleText(!toggleText)
    }
    return (
        <div className="relative bg-white p-5 min-h-[430px]">

            {/* Manage Team */}
            <div className="flex justify-between items-start mb-7">
                <div className="text-lg font-semibold text-black w-[33%]">Manage Team</div>
                <div className="text-right inline-flex justify-start items-end">
                    <div className='flex justify-start items-start flex-wrap flex-col mr-2'>
                        <p className='text-lg font-semibold text-black'>Add New User</p>
                        <p className='text-sm text-black'>You are able to add more 8 users out of 10.</p>
                    </div>
                    <button
                        className="border border-yellow-951 text-sm text-black px-1 bg-yellow-951 flex justify-center items-center rounded-lg h-9 hover:bg-yellow-951 hover:text-black hover:border-yellow-951 transition-opacity duration-300 outline-none transform active:scale-75 transition-transform"
                    >
                        <Image
                            src="/img/plus-black.svg"
                            alt="edit"
                            height={22}
                            width={22}
                            className="mr-1"
                        />
                        <span>Add more</span>
                    </button>
                </div>
            </div>


            {/* Invite User  */}
            <div className='flex justify-between items-start w-full mb-6'>
                <div className='rounded rounded-lg border border-gray-962 h-[60px] w-[82%] py-1 px-3 flex justify-start items-center'>
                    <span className='bg-gray-957 rounded rounded-lg p-1 mr-2 inline-flex justify-between items-center text-sm'>
                        amitpandey@shodat.com
                        <button className='ml-2'>
                            <Image
                                src="/img/close.svg"
                                alt="edit"
                                height={18}
                                width={18}
                                className="mr-1"
                            />
                        </button>
                    </span>
                </div>
                <div className='w-[18%] flex justify-end items-start'>
                    <button className='h-[60px] text-white bg-black flex justify-center items-center text-sm font-[300] rounded rounded-lg px-5'>
                        <span>Invite User</span>
                    </button>
                </div>
            </div>


            {/* Active Users */}
            <div className='flex justify-start items-start flex-wrap w-full mb-6'>
                <p className='text-black font-semibold text-lg mb-4'>Active Users</p>
                <div className='border border-gray-962 min-h-[100px] w-full '>
                    <div className='relative border border-t-0 border-l-0 border-r-0 border-b-1 border-gray-962 flex justify-start items-center py-4 px-2'>
                        <div className='w-[50%] flex justify-start items-center'>
                            <div className='rounded rounded-full bg-medium w-[45px] h-[45px] inline-flex justify-center items-center text-white text-2xl font-[400] mr-4'>V</div>
                            <div className='flex flex-wrap flex-col'>
                                <p className='text-md font-semibold'>Venkat SR</p>
                                <p className='text-sm'>venkatasubbareddy@shodat.com</p>
                            </div>
                        </div>
                        <div className='w-[25%]'>
                            <select name="" id="" className='border border-gray-962 rounded rounded-lg w-[110px] p-1'>
                                <option value="member">Member</option>
                            </select>
                        </div>
                        <div className='w-[25%] flex justify-between items-center'>
                            <div>
                                <div className={`${styles.radioWrap}`}>
                                    <input
                                        type="checkbox"
                                        onClick={toggleChecked}
                                    />
                                    <span className={`${styles.radioFrame}`}></span>
                                </div>
                            </div>
                            <button>
                                <Image
                                    src="/img/trash.svg"
                                    alt="Trash"
                                    height={24}
                                    width={24}
                                />
                            </button>
                        </div>
                    </div>

                    <div className='relative border border-t-0 border-l-0 border-r-0 border-b-0 border-gray-962 flex justify-start items-center py-4 px-2'>
                        <div className='w-[50%] flex justify-start items-center'>
                            <div className='rounded rounded-full bg-high w-[45px] h-[45px] inline-flex justify-center items-center text-white text-2xl font-[400] mr-4'>A</div>
                            <div className='flex flex-wrap flex-col'>
                                <p className='text-md font-semibold'>Amit P</p>
                                <p className='text-sm'>amitpandey@shodat.com</p>
                            </div>
                        </div>
                        <div className='w-[25%]'>
                            <select name="" id="" className='border border-gray-962 rounded rounded-lg w-[110px] p-1'>
                                <option value="member">Member</option>
                            </select>
                        </div>
                        <div className='w-[25%] flex justify-between items-center'>
                            <div>
                                <div className={`${styles.radioWrap}`}>
                                    <input
                                        type="checkbox"
                                        onClick={toggleChecked}
                                    />
                                    <span className={`${styles.radioFrame}`}></span>
                                </div>
                            </div>
                            <button>
                                <Image
                                    src="/img/trash.svg"
                                    alt="Trash"
                                    height={24}
                                    width={24}
                                />
                            </button>
                        </div>
                    </div>
                </div>

                <div className='flex justify-end items-center mt-5 w-full'>
                    <button className='text-white text-md font-[400] bg-black rounded rounded-xl flex justify-center items-center h-[48px] px-4'>
                        <span>Save Changes</span>
                    </button>
                </div>
            </div>

            {/* Pending Users */}
            <div className='flex justify-start items-start flex-wrap w-full mb-6'>
                <p className='text-black font-semibold text-lg mb-4'>Pending Users</p>
                <div className='border border-gray-962 min-h-[100px] w-full '>
                    <div className='relative border border-t-0 border-l-0 border-r-0 border-b-1 border-gray-962 flex justify-start items-center py-4 px-2'>
                        <div className='w-[50%] flex justify-start items-center'>
                            <div className='rounded rounded-full border border-dashed border-gray-950 bg-gray-957 w-[45px] h-[45px] inline-flex justify-center items-center text-white text-2xl font-[400] mr-4'></div>
                            <div className='flex flex-wrap flex-col'>
                                <p className='text-sm'>narendra.nallamilli@shodat.com</p>
                            </div>
                        </div>
                        <div className='w-[25%]'>
                            <span className='bg-gray-957 rounded rounded-xl py-1 px-3 mr-2 inline-flex justify-between items-center text-sm'>Pending...</span>
                        </div>
                        <div className='w-[25%] flex justify-end items-center'>
                            <button className='rounded rounded-xl border border-gray-957 bg-white flex justify-center items-center text-sm h-[30px] px-2'>Cancel invite</button>
                        </div>
                    </div>

                    <div className='relative border border-t-0 border-l-0 border-r-0 border-b-1 border-gray-962 flex justify-start items-center py-4 px-2'>
                        <div className='w-[50%] flex justify-start items-center'>
                            <div className='rounded rounded-full border border-dashed border-gray-950 bg-gray-957 w-[45px] h-[45px] inline-flex justify-center items-center text-white text-2xl font-[400] mr-4'></div>
                            <div className='flex flex-wrap flex-col'>
                                <p className='text-sm'>chinmay@shodat.com</p>
                            </div>
                        </div>
                        <div className='w-[25%]'>
                            <span className='bg-gray-957 rounded rounded-xl py-1 px-3 mr-2 inline-flex justify-between items-center text-sm'>Pending...</span>
                        </div>
                        <div className='w-[25%] flex justify-end items-center'>
                            <button className='rounded rounded-xl border border-gray-957 bg-white flex justify-center items-center text-sm h-[30px] px-2'>Cancel invite</button>
                        </div>
                    </div>

                    <div className='relative border border-t-0 border-l-0 border-r-0 border-b-0 border-gray-962 flex justify-start items-center py-4 px-2'>
                        <div className='w-[50%] flex justify-start items-center'>
                            <div className='rounded rounded-full border border-dashed border-gray-950 bg-gray-957 w-[45px] h-[45px] inline-flex justify-center items-center text-white text-2xl font-[400] mr-4'></div>
                            <div className='flex flex-wrap flex-col'>
                                <p className='text-sm'>ved@shodat.com</p>
                            </div>
                        </div>
                        <div className='w-[25%]'>
                            <span className='bg-gray-957 rounded rounded-xl py-1 px-3 mr-2 inline-flex justify-between items-center text-sm'>Pending...</span>
                        </div>
                        <div className='w-[25%] flex justify-end items-center'>
                            <button className='rounded rounded-xl border border-gray-957 bg-white flex justify-center items-center text-sm h-[30px] px-2'>Cancel invite</button>
                        </div>
                    </div>

                </div>
            </div>

            <div className={`h-[350px] overflow-x-auto mb-5 ${styles.scrollTableWrap} hidden`}>
                <div className='flex w-full'>
                    <table className={`${styles.borderedTable}`}>
                        <thead>
                            <tr>
                                <th>Username</th>
                                <th>Email address</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Venkat SR</td>
                                <td>venkatasubbareddy@shodat.com</td>
                                <td>
                                    <div>
                                        <div className={`${styles.radioWrap}`}>
                                            <input
                                                type="checkbox"
                                                onClick={toggleChecked}
                                            />
                                            <span className={`${styles.radioFrame}`}></span>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>Amith Pandey</td>
                                <td>amithpandey@shodat.com</td>
                                <td>
                                    <div>
                                        <div className={`${styles.radioWrap}`}>
                                            <input
                                                type="checkbox"
                                                onClick={toggleChecked}
                                            />
                                            <span className={`${styles.radioFrame}`}></span>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <div className='flex justify-between items-center hidden'>
                <div>
                    <h2 className='text-black text-sm font-bold'>Add New User</h2>
                    <div className='text-black text-sm flex items-center justify-start'>
                        <span>You are able to add more 8 users out of 10.</span>
                        <button
                            className="border border-yellow-951 text-sm text-black px-2 bg-yellow-951 flex justify-center items-center rounded-lg h-9 w-36hover:bg-yellow-951 hover:text-black hover:border-yellow-951 transition-opacity duration-300 outline-none transform active:scale-75 transition-transform ml-2"
                        >
                            <Image
                                src="/img/plusblack.svg"
                                alt="edit"
                                height={20}
                                width={20}
                            />
                            <span>Add User</span>
                        </button>
                    </div>
                </div>
                <div>
                    <button
                        className="border border-black text-sm text-white px-2 bg-black flex justify-center items-center rounded-lg h-9 w-36hover:bg-yellow-951 hover:text-black hover:border-yellow-951 transition-opacity duration-300 outline-none transform active:scale-75 transition-transform ml-2"
                    >
                        <span>Save Changes</span>
                    </button>
                </div>
            </div>
        </div>
    )
}