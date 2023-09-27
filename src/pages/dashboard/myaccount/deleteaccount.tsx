import React, { useState, useEffect } from 'react';
import styles from '../../../styles/Common.module.css';
import Image from "next/image";
import Link from 'next/dist/client/link';
export default function DeleteAccount(props: any) {
    const [edit, setEdit] = useState(false);
    // Toggle Edit & Save button
    const toggleSave = () => {
        setEdit(!edit)
    }
    // Save Form Data
    const saveDetails = () => {
        console.log("Save Details!")
    }
    return (
        <div className="relative bg-white p-5">

            <div className="flex justify-between items-start mb-5">
                <div className="text-lg font-semibold text-black w-[33%]">Delete my account</div>
            </div>

            <div className='bg-[#FFF3CB] min-h-[100px] border border-[#FED136] p-2 mb-4'>
                <p className='text-sm uppercase mb-3'><strong>Warning:</strong> Deletion is permanent. This also removes access to all connected services and deletes all of you contacts.</p>
                <p className='text-sm'>If you wish to combine this account with other one. do NOT delete it. <Link href="#" className='text-[#055AFF] underline'>Learn More</Link></p>
            </div>

            <div className='mb-4'>
                <label htmlFor="reason">What is the main reason you are deleting your account?</label>
                <div className={`${styles.form__wrap} w-full`}>
                    <div className={`relative ${styles.form__group} font-Inter`}>
                        <select
                            id="reason"
                            name="reason"
                            className={`${styles.form__field} border border-gray-954 !bg-white  border-gray-954`}
                        >
                            <option value="">Select your reason</option>
                            <option value="5">5</option>
                            <option value="15">15</option>
                            <option value="25">25</option>
                            <option value="35">35</option>
                            <option value="45">45</option>
                        </select>
                    </div>
                </div>
            </div>

            <div className='mb-4'>
                <label htmlFor="message" className='mb-3 w-full block'>We are sorry to see you go. Please explain why you are leaving to help us improve.</label>
                <textarea
                    id="reason"
                    name="reason"
                    placeholder='Message'
                    className={`rounded rounded-xl outline-none border border-gray-954 !bg-white  border-gray-954 min-h-[90px] p-3 w-full`}
                >
                </textarea>
            </div>

            <div className='mb-4'>
                <input
                    type='text'
                    id="email"
                    name="email"
                    placeholder='Email address'
                    className={`rounded rounded-xl outline-none border border-gray-954 !bg-white  border-gray-954 h-[50px] p-3 w-full`}
                />
            </div>

            <div className="flex justify-start items-center mb-4 w-full">
                <div className={`${styles.customCheck} mt-2`}>
                    <input
                        type='checkbox'
                        name="agreement"
                    />
                    <span></span>
                </div>
                <label className="ml-2 text-sm text-black block relative top-[1px]">Yes, I want to permanently delete this account and all its data.</label>
            </div>

            <div className="flex justify-center items-center pt-1 w-full">
                <button
                    className='h-[44px] rounded rounded-xl w-[280px] bg-yellow-951 text-black text-sm flex justify-center items-center'>Confirm</button>
            </div>

        </div>
    )
}