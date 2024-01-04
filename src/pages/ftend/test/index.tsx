import React, { useEffect, useState } from "react";

export default function Page(props: any) {
  const [processedImage, setProcessedImage] = useState();
  const [coordinates, setCoordinates] = useState([]);

  const handleSubmit = async () => {
    const data = {
      image_url:
        "https://www.shutterstock.com/image-vector/surface-cracks-fissures-ground-concrete-600nw-2167683007.jpg",
    };

    try {
      // python app 5000
      const response = await fetch(`http://127.0.0.1:5000/process_image_url`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      //insert query fr image and assetid
      if (response.ok) {
        const responseData = await response.json();
        let url = responseData.processed_image_path.split("/");
        let imgPath = url[url.length - 1];
        setProcessedImage(imgPath);
        setCoordinates(responseData.crack_coordinates);
      } else {
        console.log("ERROR IN FETCH Create Model:", response.statusText);
      }
    } catch (err) {
      console.log("ERROR IN TRY CATCH Create Model:", err);
    }
  };

  useEffect(() => {
    handleSubmit();
  }, []);

  return (
    <div>
      <p>Output Image</p>
      {processedImage && (
        <img
          src={`/img/${processedImage}`}
          alt={"Processed Image"}
          width="500"
          height="500"
        />
      )}
      <p>Crack Coordinates:</p>
      <ul>
        {Object.entries(coordinates).map(([key, value]) => (
          <li key={key}>
            <strong>{key}:</strong> {value}
          </li>
        ))}
      </ul>
    </div>
  );
}
