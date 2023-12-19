import React, { useEffect } from "react";

export default function page(props: any) {
  let token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsInJvbGUiOjEsImlhdCI6MTcwMjkxMDA0OCwiZXhwIjoxNzAzNTE0ODQ4fQ.0ifQ_sBokRJofW-qYM_fUhU7FTBxzZiOb3D-qSp2lgE";
  const handleSubmit = async () => {
    const data = {
      modelName: "Crack Detections",
      modelTitle: "Model Detailss",
      modelSubTitle: "Crack Detections",
      howItWorks: "Crack Safety detection techniques.",
      benefits: {
        "1": "beautifys",
        "2": "fixs",
      },
      iconUrl: "crack.jpeg",
    };
    console.log({
      dataToSave: data,
    });
    try {
      const response = await fetch(`/api/createModel`, {
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
