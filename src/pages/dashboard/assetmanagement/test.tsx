import React, { useState, useRef, useEffect } from "react";
import { useDispatch } from 'react-redux';
import styles from '../../../styles/Common.module.css';
import Image from "next/image";
import { editSubObjectModalAction } from '@/store/actions/classAction';
import axios from "axios";
import TextInput from "@/common/textInput";

export default function Test(props: any) {
    const data = [0, 1, 2, 3];
    const [inputs, setInputs] = useState({});
    const [inputValue, setInputValue] = useState({});
    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setInputValue((prev) => ({
            ...prev,
            [name]: value,
        }));
        console.log(inputValue);
    };
    return (
        <>
            <div className="p-5">
                {
                    data.map((item: any, index: any) => (
                        <div className="mb-2" key={item}>
                            <TextInput
                                type="text"
                                defaultValue={'Amit'}
                                placeholder=""
                                label="Name"
                                name="name"
                                onChange={handleChange}
                            />
                        </div>
                    ))
                }
            </div>
        </>
    )
}