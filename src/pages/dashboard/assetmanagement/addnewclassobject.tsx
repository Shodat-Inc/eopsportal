import React, { useState, useRef, useEffect } from "react";
import { useDispatch } from 'react-redux';
import styles from '../../../styles/Common.module.css';
import Image from "next/image";
import { toggleAddNewClassObjectModel } from "@/store/actions/classAction";
import { successMessageAction, successMessagAdvancedAction } from '@/store/actions/classAction';
import axios from "axios";

export default function AddNewClassObject(props: any) {

    const dispatch = useDispatch<any>();
    const [classData, setClassData] = useState([] as any);
    const formData = useRef("");
    const [success, setSuccess] = useState(false);
    let access_token = "" as any;
    if (typeof window !== 'undefined') {
        access_token = localStorage.getItem('authToken')
    }

    // Filter the selected class data from class data array
    useEffect(() => {
        if (props.classData && props.classData.length >= 0) {
            let filtered = props.classData.filter((item: any) => {
                return item.id === props.selectedParentClass
            })
            if (filtered) {
                setClassData(filtered[0]?.ClassTags)
            }
        }
    }, [props.selectedParentClass, props.classData])

    // Close modal action - redux
    const closeModel = () => {
        dispatch(toggleAddNewClassObjectModel(false));
    }

    // Save Data for subclass
    const handleSubmit = async (e: any) => {
        e.preventDefault();
        var formData = new FormData(e.target);
        const form_values = Object.fromEntries(formData);
        const objectKey = [] as any;
        const objVal = [] as any;
        Object.keys(form_values).map((item: any) => {
            let tagID = item.split("_")[1];
            let tagName = item.split("_")[0];
            objectKey.push({
                "classTagId": tagID
            })
            objVal.push({
                tagName: tagName
            })
        })
        const objectValue = [] as any;
        Object.values(form_values).map((item: any) => {
            objectValue.push({
                "value": item
            })
        })

        let finalArray = objectKey.map((item: any, i: any) => Object.assign({}, item, objectValue[i]));
        const dataToSave = {
            "classId": props.selectedParentClass,
            "values": finalArray
        }
        let tokenStr = access_token;

        try {
            await axios({
                method: 'POST',
                url: `/api/createObjects`,
                data: dataToSave,
                headers: {
                    "Authorization": `Bearer ${tokenStr}`,
                    "Content-Type": "application/json"
                }
            }).then(function (response) {
                if (response) {
                    setSuccess(true);
                    dispatch(successMessageAction(true))

                    let data = {
                        "type": "editObject",
                        "action": true
                    };
                    dispatch(successMessagAdvancedAction(data))

                    setTimeout(() => {
                        setSuccess(false);
                        dispatch(toggleAddNewClassObjectModel(false));
                    }, 50);
                }
            }).catch(function (error) {
                console.log("ERROR IN AXIOS CATCH (CREATE CLASS OBJECT):", error)
            })
        } catch (err) {
            console.log("ERROR IN TRY CATCH (CREATE CLASS OBJECT):", err)
        }
    }


    // convert selected id to classname
    const showClassNameFromID = (id: any) => {
        if (props.classData && props.classData.length > 0) {
            let filter = props.classData.filter((item: any) => {
                return item.id === id
            })
            if (filter) {
                return filter[0]?.className
            }
        }
    }

    return (
        <>
            <div className={`bg-white h-full z-[11] fixed top-0 right-0 p-5 shadow-lg ${props.show === true ? `${styles.objectContainer} ${styles.sliderShow}` : `${styles.objectContainer}`}`}>
                <div className="flex justify-between items-center w-full mb-3">
                    <h2 className="font-semibold text-lg">Add New Object (<span className="text-sm text-gray-800">{showClassNameFromID(props.selectedParentClass)}</span>)</h2>
                    <button onClick={closeModel}>
                        <Image
                            src="/img/x.svg"
                            alt="close"
                            height={27}
                            width={27}
                        />
                    </button>
                </div>

                {
                    success &&
                    <div className={`bg-green-957 border-green-958 text-green-959 mb-1 mt-1 border text-md px-4 py-3 rounded-xl relative flex items-center justify-start`}>
                        <Image
                            src="/img/AlertSuccess.svg"
                            alt="Alert Success"
                            height={24}
                            width={24}
                            className='mr-2'
                        />
                        <strong className="font-semibold">Success</strong>
                        <span className="block sm:inline ml-2">New Object has been created successfuly!</span>
                    </div>
                }

                <div className={`flex justify-start items-start w-full overflow-auto h-full pb-10 ${styles.scroll} pr-3`}>
                    <form
                        method='post'
                        onSubmit={handleSubmit}
                        className="w-full flex justify-start items-start flex-wrap flex-col"
                    >
                        {
                            classData && classData.length != 0 ?
                                classData?.map((item: any, index: any) => (
                                    <div key={index} className="w-full flex justify-start items-start flex-wrap flex-col">
                                        <div className={`mb-5 lg:w-full small:w-full ${styles.form__wrap}`}>
                                            <div className={`relative ${styles.form__group} font-OpenSans`}>
                                                <input
                                                    type="text"
                                                    id={`${item.tagName}`}
                                                    name={`${item.tagName}_${item.id}`}
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
                                className="border border-black rounded-lg bg-black text-white text-lg w-20 h-12 mr-5 hover:bg-yellow-951 hover:text-white hover:border-yellow-951 ease-in-out duration-300 disabled:bg-gray-951 disabled:hover:border-gray-951 disabled:border-gray-951"
                            >
                                <span>Save</span>
                            </button>
                            <div
                                onClick={closeModel}
                                className="border border-black rounded-lg bg-white text-black text-lg w-24 h-12 hover:text-white hover:bg-yellow-951 hover:border-yellow-951 ease-in-out duration-300 cursor-pointer flex justify-center items-center"
                            >
                                <span>Cancel</span>
                            </div>
                        </div>

                    </form>
                </div>

            </div>
            {props.show === true && <div className={styles.backdrop}></div>}
        </>
    )
}