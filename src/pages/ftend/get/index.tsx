import React, { useEffect } from "react";

export default function page(props: any) {
  let token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsInJvbGUiOjEsImlhdCI6MTcwMjk2MzkzMywiZXhwIjoxNzAzNTY4NzMzfQ.TRNXMzLJbZWM5tKBJmGZ_jAevB3BTqAFXIlm54RWHHA";
  const handleSubmit = async () => {
    try {
      const response = await fetch(`/api/getModel`, {
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
