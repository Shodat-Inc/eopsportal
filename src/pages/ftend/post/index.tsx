import React, { useEffect } from "react";
import { tokenData } from "../constant";

export default function page(props: any) {
  let token = tokenData;
  const handleSubmit = async () => {
    const data = {
      "coordinates": [
        {
          "image1": {
            "probability": "41.3%",
            "coord-topLeft": "(-3,5)",
            "coord-topRight": "(3,7)",
            "coord-bottomLeft": "(0,-4)",
            "coord-bottomRight": "(6,-2)"
          }
        },
      ],
      "tag": "Crack",
      "modelObjectImageId": 42
    }
    console.log({
      dataToSave: data,
    });
    try {
      const response = await fetch(`/api/saveResponse`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      console.log(response, "-----");

      if (response.ok) {
        // setTimeout(() => {
        //   setSuccess(false);
        //   props.handleClick(false);
        // }, 1500);
      } else {
        // Handle error cases
        console.log("ERROR IN FETCH Create Model:", response.statusText);
      }
    } catch (err) {
      console.log("ERROR IN TRY CATCH Create Model:", err);
    }
  };
  useEffect(() => {
    handleSubmit();
  }, []);
  return <div>Page</div>;
}
