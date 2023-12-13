import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import styles from '../../../styles/Common.module.css';
import Image from "next/image";
import { toggleAddNewObjectModel } from "@/store/actions/classAction";
import { successMessageAction } from '@/store/actions/classAction';

export default function AddNewObject(props: any) {
    const [selectedObjectData, setSelectedObjectData] = useState([] as any);
    const formData = useRef("");

    useEffect(() => {
        if (props.subClassData && props.subClassData.length > 0) {
            let filtered = props.subClassData.filter((item: any) => {
                return item.assetName === props.selectedSubClass
            })
            if (filtered) {
                setSelectedObjectData(filtered[0].tagsWithDataType)
            }
        }
    }, [props])

    const dispatch = useDispatch<any>();
    const closeModel = () => {
        dispatch(toggleAddNewObjectModel(false));
    }

    // Submit Form Data
    const handleSubmit = async (e: any) => {
        e.preventDefault();
        var formData = new FormData(e.target);
        let currentDate = new Date().toISOString().split('T')[0];
        const form_values = Object.fromEntries(formData);

        const response = await fetch('/api/createChildObject', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                {
                    className: `${props.parentClass}`,
                    object: `${props.selectedSubClass}`,
                    subObject: `${props.objID}`,
                    dateCreated: `${currentDate}`,
                    tags: form_values,
                }
            )
        });
        const resdata = await response.json();
        if (resdata) {
            dispatch(successMessageAction(true));
            setTimeout(()=>{
                dispatch(toggleAddNewObjectModel(false));
            }, 10)
        } else {
            console.log("FAILED")
        }

    }

    return (
        <>
            <div className={`bg-white h-full z-[11] fixed top-0 right-0 p-5 shadow shadow-lg ${props.show === true ? `${styles.objectContainer} ${styles.sliderShow}` : `${styles.objectContainer}`}`}>
                <div className="flex justify-between items-center w-full mb-3">
                    <h2 className="font-semibold text-lg">Add New Object (<span className="text-sm text-gray-800">{props.selectedSubClass}</span>)</h2>
                    <button onClick={closeModel} className="transition-all duration-[100ms] transition-opacity duration-100 outline-none transform active:scale-75 transition-transform">
                        <Image
                            src="/img/x.svg"
                            alt="close"
                            height={27}
                            width={27}
                        />
                    </button>
                </div>

                <div className={`flex justify-start items-start w-full overflow-auto h-full pb-10 ${styles.scroll} pr-3`}>

                    <form
                        action=""
                        method="post"
                        onSubmit={handleSubmit}
                        className="w-full flex justify-start items-start flex-wrap flex-col"
                    >
                        {
                            selectedObjectData && selectedObjectData.length != 0 ?
                                selectedObjectData.map((item: any, index: any) => (
                                    <div key={index} className="w-full flex justify-start items-start flex-wrap flex-col">
                                        <div className={`mb-5 lg:w-full small:w-full small:w-full ${styles.form__wrap}`}>
                                            <div className={`relative ${styles.form__group} font-OpenSans`}>
                                                <input
                                                    type="text"
                                                    id={`${item.tagName}`}
                                                    name={`${item.tagName}`}
                                                    className={`border border-gray-961 ${styles.form__field}`}
                                                    placeholder={`${item.tagName}`}
                                                    onChange={(e) => (formData.current = e.target.value)}
                                                    required
                                                />
                                                <label htmlFor={`${item.tagName}`} className={`${styles.form__label}`}>{item.tagName}</label>
                                            </div>
                                        </div>
                                    </div>
                                ))
                                :
                                <div className="flex justify-center items-center flex-wrap flex-col font-OpenSans mt-20">
                                    <div className="no-data-image">
                                        <Image
                                            src="/img/not-found.svg"
                                            alt="no data found!"
                                            className="inline-block"
                                            height={72}
                                            width={72}
                                        />
                                    </div>
                                    <p className="text-black text-xl mt-8 font-semibold">No data found!!</p>
                                </div>
                        }

                        <div className="relative flex justify-end items-center w-full">
                            <button
                                className="transition-all duration-[100ms] transition-opacity duration-100 outline-none transform active:scale-75 transition-transform border border-black rounded-lg bg-black text-white text-lg w-20 h-12 mr-5 hover:bg-yellow-951 hover:text-white hover:border-yellow-951 ease-in-out duration-300 disabled:bg-gray-951 disabled:hover:border-gray-951 disabled:border-gray-951"
                            >
                                <span>Save</span>
                            </button>
                            <button
                                onClick={closeModel}
                                className="transition-all duration-[100ms] transition-opacity duration-100 outline-none transform active:scale-75 transition-transform border border-black rounded-lg bg-white text-black text-lg w-24 h-12 hover:text-white hover:bg-yellow-951 hover:border-yellow-951 ease-in-out duration-300"
                            >
                                <span>Cancel</span>
                            </button>
                        </div>

                    </form>

                </div>

            </div>
            {props.show === true && <div className={styles.backdrop}></div>}
        </>
    )
}