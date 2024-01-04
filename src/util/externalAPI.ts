export default async function externalAPI(
  image_url: object,
  modelName: string
) {
  try {
    // python app 5000
    const url: any = process.env.MODEL_URL;
    const response = await fetch(`${url}/${modelName}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(image_url),
    });
    if (response.ok) {
      const responseData = await response.json();
      return responseData;
    } else {
      console.log("ERROR IN EXTERNAL API:", response.statusText);
    }
  } catch (err) {
    console.log("ERROR IN EXTERNAL API:", err);
  }
}
