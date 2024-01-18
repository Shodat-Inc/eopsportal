import React, { useState, useRef, useEffect } from "react";
import { useDispatch } from 'react-redux';
import styles from '../../../styles/Common.module.css';
import Image from "next/image";
import { editSubObjectModalAction } from '@/store/actions/classAction';
import axios from "axios";

export default function EditSubObject(props: any) {


    console.log({
        "PROPS_IN_EDIT_SUB_OBJECT_COMPONENT": props
    })
    const [selectedObjectData, setSelectedObjectData] = useState([] as any);
    const [objectsData, setObjectsData] = useState([] as any);
    const [success, setSuccess] = useState(false);
    const formData = useRef("");
    const [inputs, setInputs] = useState({});

    let access_token = "" as any;
    if (typeof window !== 'undefined') {
        access_token = localStorage.getItem('authToken')
    }

    // GET ALL DATATYPES
    async function fetchObjectData() {
        try {
            await axios({
                method: 'GET',
                url: `/api/getObjectById?objectId=${props.objID}&classId=${props.selectedSubClass}`,
                headers: {
                    "Authorization": `Bearer ${access_token}`,
                    "Content-Type": "application/json"
                }
            }).then(function (response) {
                if (response) {
                    console.log({
                        "RESPONSE HERE": response?.data?.data
                    })
                    setObjectsData(response.data?.data)
                }
            }).catch(function (error) {
                console.log({
                    "ERROR IN AXIOS CATCH": error
                })
            })
        } catch (err) {
            console.log({
                "ERROR IN TRY CATCH": err
            })
        }
    }
    useEffect(() => {
        fetchObjectData();
    }, [access_token, props])

    const dispatch = useDispatch<any>();
    const closeModel = () => {
        dispatch(editSubObjectModalAction(false))
    }

    // Save Data for subclass
    const handleSubmit = async (e: any) => {
        e.preventDefault();
        var formData = new FormData(e.target);
        let currentDate = new Date().toISOString().split('T')[0];
        const form_values = Object.fromEntries(formData);
        const objectKey = [] as any;
        const objVal = [] as any;
        Object.keys(form_values).map((item: any) => {
            let tagID = item.split("_")[1];
            let tagName = item.split("_")[0];
            objectKey.push({
                "classTagId": parseInt(tagID)
            })
            objVal.push({
                tagName: tagName
            })
        })
        const objectValue = [] as any;
        Object.values(form_values).map((item: any) => {
            objectValue.push({
                "values": item
            })
        })

        let finalArray = objectKey.map((item: any, i: any) => Object.assign({}, item, objectValue[i]));
        const dataToSave = {
            "objectId": props.objID,
            "deleteValueId": [],
            "updatedValues": finalArray
        }
        let tokenStr = access_token;

        console.log({
            "DATA_TO_SAVE": dataToSave
        })

        try {
            await axios({
                method: 'PUT',
                url: `/api/updateObjects`,
                data: dataToSave,
                headers: {
                    "Authorization": `Bearer ${tokenStr}`,
                    "Content-Type": "application/json"
                }
            }).then(function (response) {
                if (response) {

                    console.log({
                        "RESULT_RESPONSE":response
                    })
                    // setSuccess(true);
                    // dispatch(successMessageAction(true))
                    setTimeout(() => {
                        // setSuccess(false);
                        dispatch(editSubObjectModalAction(false))
                    }, 50);
                }
            }).catch(function (error) {
                console.log("ERROR IN AXIOS CATCH (EDIT SUB OBJECT):", error)
            })
        } catch (err) {
            console.log("ERROR IN TRY CATCH (EDIT SUB OBJECT):", err)
        }
    }

    const handelChange = (e: any) => {
        e.preventDefault();
        console.log("Clicked", e.target.name)
        formData.current = e.target.value
    }

    return (
        <>
            <div className={`bg-white h-full z-[11] fixed top-0 right-0 p-5 shadow shadow-lg ${props.show === true ? `${styles.objectContainer} ${styles.sliderShow}` : `${styles.objectContainer}`}`}>
                <div className="flex justify-between items-center w-full mb-3">
                    <h2 className="font-semibold text-lg">Edit Sub Object (<span className="text-sm text-gray-800">{props.parentClass} / {props.selectedSubClass} / <strong>{props.objID}</strong></span>)</h2>
                    <button onClick={closeModel} className="transition-all duration-[100ms] transition-opacity duration-100 outline-none transform active:scale-75 transition-transform">
                        <Image
                            src="/img/x.svg"
                            alt="close"
                            height={27}
                            width={27}
                        />
                    </button>
                </div>


                {success &&
                    <div className={`bg-green-957 border-green-958 text-green-959 mb-1 mt-1 border text-md px-4 py-3 rounded rounded-xl relative flex items-center justify-start`}>
                        <Image
                            src="/img/AlertSuccess.svg"
                            alt="Alert Success"
                            height={24}
                            width={24}
                            className='mr-2'
                        />
                        <strong className="font-semibold">Success</strong>
                        <span className="block sm:inline ml-2">Object has been added successfully!</span>
                    </div>
                }

                <div className={`flex justify-start items-start w-full overflow-auto h-full pb-10 ${styles.scroll} pr-3`}>

                    <form
                        action=""
                        method="post"
                        onSubmit={handleSubmit}
                        className="w-full flex justify-start items-start flex-wrap flex-col"
                    >

                        {
                            objectsData[0]?.ObjectValues.map((items: any, index: any) => {
                                const linkContent = objectsData[0]?.Class?.ClassTags[index];
                                return (
                                    <div key={index} className="w-full flex justify-start items-start flex-wrap flex-col">
                                        <div className={`mb-5 lg:w-full small:w-full small:w-full ${styles.form__wrap}`}>
                                            <div className={`relative ${styles.form__group} font-OpenSans`}>
                                                <input
                                                    type="text"
                                                    id={`${items.values}`}
                                                    name={`${items.values}_${linkContent.id}`}
                                                    className={`border border-gray-961 ${styles.form__field}`}
                                                    placeholder={`${items.values}`}
                                                    defaultValue={`${items.values}`}
                                                    onChange={(e) => (formData.current = e.target.value)}
                                                    required
                                                />
                                                <label htmlFor={`${items.values}`} className={`${styles.form__label}`}>{linkContent.tagName}</label>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }


                        <div className="relative flex justify-end items-center w-full">
                            <button
                                className="transition-all duration-[100ms] transition-opacity duration-100 outline-none transform active:scale-75 transition-transform border border-black rounded-lg bg-black text-white text-lg w-20 h-12 mr-5 hover:bg-yellow-951 hover:text-white hover:border-yellow-951 ease-in-out duration-300 disabled:bg-gray-951 disabled:hover:border-gray-951 disabled:border-gray-951"
                            >
                                <span>Update</span>
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