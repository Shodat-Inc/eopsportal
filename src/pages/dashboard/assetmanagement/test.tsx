// import React, { useState, useRef, useEffect } from "react";
// import { useDispatch } from 'react-redux';
// import styles from '../../../styles/Common.module.css';
// import Image from "next/image";
// import { editSubObjectModalAction } from '@/store/actions/classAction';
// import axios from "axios";
// import TextInput from "@/common/textInput";

// export default function Test(props: any) {
//     const data2 = ["TPC3305-01", "3861 Scenic Hwy", "Baton Rouge", "Louisana", "70805"];
//     const arr = [
//         {
//             "tagName": "PlantID",
//             "value": 'TPC3305-01'
//         },
//         {
//             "tagName": "Street",
//             "value": '3861 Scenic Hwy'
//         },
//         {
//             "tagName": "City",
//             "value": 'Baton Rouge'
//         },
//         {
//             "tagName": "State",
//             "value": 'Louisana'
//         },
//         {
//             "tagName": "Zipcode",
//             "value": '70805'
//         },
//         {
//             "tagName": "Country",
//             "value": 'United States'
//         },
//         {
//             "tagName": "Name",
//             "value": 'Tepco Petroleum'
//         },
//         {
//             "tagName": "Description",
//             "value": 'Description'
//         }
//     ]
//     const [inputs, setInputs] = useState('');
//     const [fields, setFields] = useState(arr);
//     const [inputValue, setInputValue] = useState({});
//     const fieldRef = useRef("" as any);
//     const [data, setData] = useState({
//         PlantID: '',
//         Street: '',
//         City: '',
//         State: '',
//         Zipcode: '',
//         Country: '',
//         Name: '',
//         Description: '',
//     })
//     function handleChange(e: any) {
//         setData({
//             ...data,
//             [e.target.name]: e.target.value,
//         })

//         // Do soemthing with the updated data, for now I'll just console.log
//         console.log(data);
//     }

//     return (
//         <>
//             <div className="p-5">
//                 {
//                     arr.map((item: any, index: any) => {
//                         let a = `${data}.${item.tagName}`
//                         return (
//                             <div className="mb-4" key={index}>
//                                 <div className="relative">
//                                     <span className="absolute bg-white text-sm top-[-11px] left-[8px] font-semibold">{item.tagName}</span>
//                                     <input
//                                         ref={fieldRef}
//                                         type="text"
//                                         value={item.value}
//                                         placeholder={item.tagName}
//                                         name={item.tagName}
//                                         onChange={(e) => e.target.name = e.target.value}
//                                         className="border border-yellow-951 rounded h-12 w-[300px] pl-2 pr-2"
//                                     />
//                                 </div>

//                                 {/* <TextInput
//                                 type="text"
//                                 value={item.value}
//                                 placeholder={item.tagName}
//                                 label={item.tagName}
//                                 name={item.tagName}
//                                 // onChange={handleChange}
//                                 onChange={(e:any) => (formData.current = e.target.value)}
//                             /> */}
//                             </div>
//                         )
//                     })
//                 }
//             </div>
//         </>
//     )
// }



import React, { useState, useRef, useEffect } from "react";
export default function Test() {
    

    var obj = {};
    Object.assign(obj, { "PlantID": "10011001", "Street": "ABC" })
    // console.log(obj)


    const arr1 = [
        {
            "id": 1,
            "tagName": "PlantID"
        },
        {
            "id": 2,
            "tagName": "Street"
        },
        {
            "id": 3,
            "tagName": "City"
        },
        {
            "id": 4,
            "tagName": "State"
        },
        {
            "id": 5,
            "tagName": "Zipcode"
        },
        {
            "id": 6,
            "tagName": "Country"
        },
        {
            "id": 7,
            "tagName": "Name"
        },
        {
            "id": 8,
            "tagName": "Description"
        }
    ];

    let arr3 = [] as any;
    let arr4 = [] as any;
    arr1.map((item)=>{
        arr3.push(item.tagName)
    })
    

    const arr2 = [
        {
            "id": 1,
            "values": "TPC3305-01",
            "createdAt": "2024-01-04T16:04:19.000Z"
        },
        {
            "id": 2,
            "values": "3861 Scenic Hwy1",
            "createdAt": "2024-01-04T16:04:19.000Z"
        },
        {
            "id": 3,
            "values": "Baton Rouge",
            "createdAt": "2024-01-04T16:04:19.000Z"
        },
        {
            "id": 4,
            "values": "Louisana",
            "createdAt": "2024-01-04T16:04:19.000Z"
        },
        {
            "id": 5,
            "values": "70805",
            "createdAt": "2024-01-04T16:04:19.000Z"
        },
        {
            "id": 6,
            "values": "United States",
            "createdAt": "2024-01-04T16:04:19.000Z"
        },
        {
            "id": 7,
            "values": "Tepco Petroleum",
            "createdAt": "2024-01-04T16:04:19.000Z"
        },
        {
            "id": 8,
            "values": "Description",
            "createdAt": "2024-01-04T16:04:19.000Z"
        }
    ]

    arr2.map((item)=>{
        arr4.push(item.values)
    })


    let arr5 = Object.fromEntries(arr3.map((v:any, i:any) => [v, arr4[i]]));

    // console.log({
    //     "ARRAY_1":arr3,
    //     "ARRAY_2":arr4,
    //     "ARRAY_3": arr5
    // })

    const [data, setData] = useState(arr5)

    const handleChange = (e: any) => {
        setData({
            ...data,
            [e.target.name]: e.target.value,
        })
        
    }

    // console.log({
    //     "DATA": data
    // })

    return (
        <div className="p-5">
            {
                Object.keys(data).map((key, index) => {
                    const linkContent = Object.values(data)[index];
                    return (
                        <div className="mb-5">
                            <input
                            type="text"
                            value={linkContent}
                            name={key}
                            placeholder={key}
                            className="border border-yellow-951 rounded h-12 w-[300px] pl-2 pr-2"
                            onChange={(e) => handleChange(e)}
                        />
                        </div>
                    )
                })
            }

        </div>
    )
}