import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import styles from '../../../styles/Common.module.css';
import Image from "next/image";
import { editObjectModalAction } from '@/store/actions/classAction';
import { successMessageAction } from "@/store/actions/classAction";
import axios from "axios";

export default function EditObject(props: any) {
    const [objectsData, setObjectsData] = useState([] as any);
    const [success, setSuccess] = useState(false);
    const [json, setJson] = useState({} as any)
    const [data, setData] = useState({} as any)

    const dispatch = useDispatch<any>();

    let access_token = "" as any;
    if (typeof window !== 'undefined') {
        access_token = localStorage.getItem('authToken')
    }

    // GET ALL DATATYPES
    async function fetchObjectData() {
        try {
            await axios({
                method: 'GET',
                url: `/api/getObjectById?objectId=${props.selectedObjID}&classId=${props.selectedParentClass}`,
                headers: {
                    "Authorization": `Bearer ${access_token}`,
                    "Content-Type": "application/json"
                }
            }).then(function (response) {
                if (response) {

                    let arr1 = [] as any;
                    let arr2 = [] as any;

                    setObjectsData(response?.data?.data);

                    response?.data?.data[0]?.Class?.ClassTags.map((item: any, index: any) => {
                        const linkContentVal = response?.data?.data[0]?.ObjectValues[index];
                        let tagWithID = item?.tagName + "_" + linkContentVal?.id
                        arr1.push(tagWithID);
                    })

                    response?.data?.data[0]?.ObjectValues.map((item: any) => {
                        arr2.push(item.values);
                    })

                    let arr5 = Object.fromEntries(arr1.map((v: any, i: any) => [v, arr2[i]]));

                    setJson(arr5)
                    setData(arr5)
                }
            }).catch(function (error) {
                console.log({
                    "ERROR IN AXIOS CATCH (GET DT)": error
                })
            })
        } catch (err) {
            console.log({
                "ERROR IN TRY CATCH (GET DT)": err
            })
        }
    }
    useEffect(() => {
        setTimeout(() => {
            fetchObjectData();
        }, 100)
    }, [access_token, props.selectedObjID, props.selectedParentClass])


    // Close the modal
    const closeModel = () => {
        dispatch(editObjectModalAction(false));
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
                "id": tagID
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
            "objectId": props.selectedObjID,
            "deleteValueId": [],
            "updatedValues": finalArray
        }
        let tokenStr = access_token;

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
                    setSuccess(true);
                    dispatch(successMessageAction(true))
                    setTimeout(() => {
                        setSuccess(false);
                        dispatch(editObjectModalAction(false));
                    }, 50);
                }
            }).catch(function (error) {
                console.log("ERROR IN AXIOS CATCH (CREATE CLASS OBJECT):", error)
            })
        } catch (err) {
            console.log("ERROR IN TRY CATCH (CREATE CLASS OBJECT):", err)
        }
    }

    const handleChange = (e: any) => {
        setData({
            ...data,
            [e.target.name]: e.target.value,
        })
    }

    return (
        <>
            <div className={`bg-white h-full z-[11] fixed top-0 right-0 p-5 shadow-lg ${props.show === true ? `${styles.objectContainer} ${styles.sliderShow}` : `${styles.objectContainer}`}`}>
                <div className="flex justify-between items-center w-full mb-3">
                    <h2 className="font-semibold text-lg">Edit Object
                        (<span className="text-sm text-gray-800">{props.selectedObjID}</span>)
                    </h2>
                    <button onClick={closeModel} className="duration-100 outline-none transform active:scale-75 transition-transform">
                        <Image
                            src="/img/x.svg"
                            alt="close"
                            height={27}
                            width={27}
                        />
                    </button>
                </div>


                {success &&
                    <div className={`bg-green-957 border-green-958 text-green-959 mb-1 mt-1 border text-md px-4 py-3 rounded-xl relative flex items-center justify-start`}>
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
                            // Object.keys(data).map((key, index) => {
                            objectsData[0]?.ObjectValues.map((items: any, index: any) => {
                                const linkContent = objectsData[0]?.Class?.ClassTags[index];
                                const linkContentVal = objectsData[0]?.ObjectValues[index];
                                const stateVal = Object.values(data)[index];
                                const key = Object.keys(data)[index];
                                return (
                                    <div key={index} className="w-full flex justify-start items-start flex-wrap flex-col">
                                        <div className={`mb-5 lg:w-full small:w-full ${styles.form__wrap}`}>
                                            <div className={`relative ${styles.form__group} font-OpenSans`}>
                                                <input
                                                    type="text"
                                                    name={key}
                                                    id={`${key}_${linkContentVal.id}`}
                                                    className={`border border-gray-961 ${styles.form__field}`}
                                                    placeholder={key}
                                                    value={stateVal as any}
                                                    onChange={(e) => handleChange(e)}
                                                    required
                                                />
                                                <label htmlFor={`${key}`} className={`${styles.form__label}`}>{key}</label>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }


                        <div className="relative flex justify-end items-center w-full">
                            <button
                                className="outline-none transform active:scale-75 transition-transform border border-black rounded-lg bg-black text-white text-lg w-20 h-12 mr-5 hover:bg-yellow-951 hover:text-white hover:border-yellow-951 ease-in-out duration-300 disabled:bg-gray-951 disabled:hover:border-gray-951 disabled:border-gray-951"
                            >
                                <span>Update</span>
                            </button>
                            <button
                                onClick={closeModel}
                                className=" outline-none transform active:scale-75 transition-transform border border-black rounded-lg bg-white text-black text-lg w-24 h-12 hover:text-white hover:bg-yellow-951 hover:border-yellow-951 ease-in-out duration-300"
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