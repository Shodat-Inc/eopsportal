import React, { useEffect } from "react";
import { tokenData } from "../constant";

export default function Page(props: any) {
  let token =tokenData
  const handleDelete = async () => {
    try {
      const response = await fetch(`/api/`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      console.log(response, "-----");

      if (response.ok) {
        // Handle successful deletion
      } else {
        // Handle error cases
        console.log("ERROR IN DELETE Model API:", response.statusText);
      }
    } catch (err) {
      console.log("ERROR IN DELETE Model API:", err);
    }
  };

  useEffect(() => {
    handleDelete();
  }, []);

  return <div>Delete Page</div>;
}
