import React, { useEffect } from "react";

export default function page(props: any) {
  let token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsInJvbGUiOjEsImlhdCI6MTcwMjk2MzkzMywiZXhwIjoxNzAzNTY4NzMzfQ.TRNXMzLJbZWM5tKBJmGZ_jAevB3BTqAFXIlm54RWHHA";
  const handleSubmit = async () => {
    const data = {
      modelTitle: "Crack Detailss",
      benefits: {
        "1": "fixs",
        "2": "beautify1",
      },
    };
    console.log({
      dataToSave: data,
    });
    try {
      const response = await fetch(
        `/api/updateModel?modelName=Crack Detection`,
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
