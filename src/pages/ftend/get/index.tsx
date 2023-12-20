import React, { useEffect } from "react";
import { tokenData } from "../constant";

export default function page(props: any) {
  let token = tokenData
  const handleSubmit = async () => {
    try {
      const response = await fetch(`/api/getResponse?modelObjectImageId=42`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      console.log(response, "-----");

      if (response.ok) {
        // setTimeout(() => {
        //   setSuccess(false);
        //   props.handleClick(false);
        // }, 1500);
      } else {
        // Handle error cases
        console.log("ERROR IN GET Model API:", response.statusText);
      }
    } catch (err) {
      console.log("ERROR IN GET Model API:", err);
    }
  };
  useEffect(() => {
    handleSubmit();
  }, []);
  return <div>Get Page</div>;
}
