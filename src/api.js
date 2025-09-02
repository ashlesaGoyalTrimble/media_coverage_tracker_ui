import axios from "axios";

const API_BASE_URL = "https://mtb.trimblecentraldev.com/api/v1/media";
//const API_BASE_URL = "http://127.0.0.1:8002/api/v1/media";
//const API_BASE_URL = "/api/v1/media"; // Using proxy from package.json

export const processHyperlinks = async (file, sheetName) => {
  try {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('sheet_name', sheetName);

    const response = await axios.post(`${API_BASE_URL}/process-hyperlinks`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      responseType: 'blob', // Important: tells axios to expect a binary response
      timeout: 900000, // 15 minutes timeout
    });
    
    // Extract filename from response headers or use default
    const contentDisposition = response.headers['content-disposition'];
    let filename = 'processed_file.xlsx';
    if (contentDisposition) {
      const filenameMatch = contentDisposition.match(/filename=(.+)/);
      if (filenameMatch) {
        filename = filenameMatch[1].replace(/"/g, '');
      }
    }
    
    // Return the blob data and filename instead of auto-downloading
    return { 
      status: "success", 
      message: "File processed successfully",
      filename: filename,
      fileBlob: response.data
    };
  } catch (error) {
    console.error("Error processing hyperlinks:", error);
    return { status: "Error processing hyperlinks" };
  }
};

// Separate function to handle file download
export const downloadFile = (fileBlob, filename) => {
  try {
    const url = window.URL.createObjectURL(new Blob([fileBlob]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url);
    return true;
  } catch (error) {
    console.error("Error downloading file:", error);
    return false;
  }
};