import React, { useEffect } from "react";
import { tokenData } from "../constant";

export default function page(props: any) {
  let token = tokenData
  const handleSubmit = async () => {
    const data = {
      modelTitle: "Workplace Details",
      benefits: {
        "1": "fixed",
      },
    };
    console.log({
      dataToSave: data,
    });
    try {
      const response = await fetch(
        `/api/updateModel?modelName=Workplace Safety Detection`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      console.log(response, "-----");

      if (response.ok) {
        // setTimeout(() => {
        //   setSuccess(false);
        //   props.handleClick(false);
        // }, 1500);
      } else {
        // Handle error cases
        console.log("ERROR IN Update Model:", response.statusText);
      }
    } catch (err) {
      console.log("ERROR IN Update Model:", err);
    }
  };
  useEffect(() => {
    handleSubmit();
  }, []);
  return <div>Update Page</div>;
}
