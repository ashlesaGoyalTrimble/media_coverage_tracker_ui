import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:8002/api/v1/media";

export const processHyperlinks = async (fileName, sheetName) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/process-hyperlinks`, null, {
      params: {
        media_sheet_name: sheetName
      },
      timeout: 30000,
    });
    return response.data;
  } catch (error) {
    console.error("Error processing hyperlinks:", error);
    return { status: "Error processing hyperlinks" };
  }
};
