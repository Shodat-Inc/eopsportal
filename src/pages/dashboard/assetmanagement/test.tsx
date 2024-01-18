import React, { useState, useRef, useEffect } from "react";
import { useDispatch } from 'react-redux';
import styles from '../../../styles/Common.module.css';
import Image from "next/image";
import { editSubObjectModalAction } from '@/store/actions/classAction';
import axios from "axios";
import TextInput from "@/common/textInput";

export default function Test(props: any) {
    const data2 = ["TPC3305-01", "3861 Scenic Hwy", "Baton Rouge", "Louisana", "70805"];
    const arr = [
        {
            "tagName": "PlantID",
            "value": 'TPC3305-01'
        },
        {
            "tagName": "Street",
            "value": '3861 Scenic Hwy'
        },
        {
            "tagName": "City",
            "value": 'Baton Rouge'
        },
        {
            "tagName": "State",
            "value": 'Louisana'
        },
        {
            "tagName": "Zipcode",
            "value": '70805'
        },
        {
            "tagName": "Country",
            "value": 'United States'
        },
        {
            "tagName": "Name",
            "value": 'Tepco Petroleum'
        },
        {
            "tagName": "Description",
            "value": 'Description'
        }
    ]
    const [inputs, setInputs] = useState('');
    const [fields, setFields] = useState(arr);
    const [inputValue, setInputValue] = useState({});
    const fieldRef = useRef("" as any);
    const [data, setData] = useState({
        PlantID: '',
        Street: '',
        City: '',
        State: '',
        Zipcode: '',
        Country: '',
        Name: '',
        Description: '',
    })
    function handleChange(e: any) {
        setData({
            ...data,
            [e.target.name]: e.target.value,
        })

        // Do soemthing with the updated data, for now I'll just console.log
        console.log(data);
    }
    return (
        <>
            <div className="p-5">
                {
                    arr.map((item: any, index: any) => {
                        let a = `${data}.${item.tagName}`
                        return (
                            <div className="mb-4" key={index}>
                                <div className="relative">
                                    <span className="absolute bg-white text-sm top-[-11px] left-[8px] font-semibold">{item.tagName}</span>
                                    <input
                                        ref={fieldRef}
                                        type="text"
                                        value={item.value}
                                        placeholder={item.tagName}
                                        name={item.tagName}
                                        onChange={handleChange}
                                        className="border border-yellow-951 rounded h-12 w-[300px] pl-2 pr-2"
                                    />
                                </div>

                                {/* <TextInput
                                type="text"
                                value={item.value}
                                placeholder={item.tagName}
                                label={item.tagName}
                                name={item.tagName}
                                // onChange={handleChange}
                                onChange={(e:any) => (formData.current = e.target.value)}
                            /> */}
                            </div>
                        )
                    })
                }
            </div>
        </>
    )
}