import React, { useState, useEffect } from "react";
import Layout from "../../../components/Layout";
import Select from "react-select";
type OptionType = {
    value: string;
    label: string;
  };
export default function TestPage() {
    const options: OptionType[]  = [
        { value: "React", label: "React" },
        { value: "Vue", label: "Vue" },
        { value: "Angular", label: "Angular" },
        { value: "Java", label: "Java" }
    ];
    const [skills, setSkills] = useState([] as any);

    useEffect(()=>{
        let arr = [
            { value: "React", label: "React" },
            { value: "Java", label: "Java" }
        ]
        setSkills(arr)
    }, [])

    const handleChange = (skills: any) => {
        setSkills(skills || []);
    };

    console.log({
        skills:skills
    })


    return (
        <div className="flex font-OpenSans">
            <h2>Please select all your skills</h2>
            <form>
                <Select
                    options={options}
                    onChange={handleChange}
                    value={skills}
                    isMulti
                    className={`w-96 h-[45px]`}
                />
                <button>Next</button>
            </form>
        </div>
    )
}

TestPage.getLayout = function getLayout(page: any) {
    return (
        <Layout>{page}</Layout>
    )
}