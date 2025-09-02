import { useState } from "react";
import { processHyperlinks, downloadFile } from "./api";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const FormComponent = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [sheetName, setSheetName] = useState("");
  const [response, setResponse] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [processedFile, setProcessedFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedFile) {
      toast.error("Please select a file to upload.");
      return;
    }
    try {
      setIsLoading(true);
      setResponse(null);
      setProcessedFile(null);
      
      const result = await processHyperlinks(selectedFile, sheetName);
      setResponse(result);
      setIsLoading(false);
      
      if (result.status === "success") {
        setProcessedFile({
          blob: result.fileBlob,
          filename: result.filename
        });
        toast.success("File processed successfully! Click the download button to get your file.", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      } else {
        toast.error("Processing failed. Please try again.");
      }
    } catch (error) {
      setIsLoading(false);
      toast.error("Submission failed. Please try again.");
    }
  };

  const handleDownload = () => {
    if (processedFile) {
      const success = downloadFile(processedFile.blob, processedFile.filename);
      if (success) {
        toast.success("File downloaded successfully!", {
          position: "top-right",
          autoClose: 3000,
        });
      } else {
        toast.error("Failed to download file. Please try again.");
      }
    }
  };

  const containerStyles = {
    maxWidth: '800px',
    margin: '0 auto'
  };

  const headerStyles = {
    fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
    fontSize: '24px',
    textAlign: 'left',
    margin: '0',
    padding: '15px 20px',
    fontWeight: 'normal',
    backgroundColor: '#f2f2f2',
    borderTopLeftRadius: '8px',
    borderTopRightRadius: '8px'
  };

  const formStyles = {
    padding: '20px',
    backgroundColor: 'white',
    borderBottomLeftRadius: '8px',
    borderBottomRightRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
  };

  const formGroupStyles = {
    marginBottom: '20px'
  };

  const labelStyles = {
    display: 'block',
    marginBottom: '8px',
    fontWeight: 'bold',
    color: '#333',
    fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif'
  };

  const inputStyles = {
    width: '100%',
    padding: '10px',
    fontSize: '16px',
    borderRadius: '4px',
    border: '1px solid #ddd',
    boxSizing: 'border-box',
    transition: 'border-color 0.3s',
    fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif'
  };

  const buttonStyles = {
    backgroundColor: '#005f9e',
    color: 'white',
    border: 'none',
    padding: '12px 20px',
    fontSize: '16px',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'background-color 0.3s'
  };

  const downloadButtonStyles = {
    backgroundColor: '#28a745',
    color: 'white',
    border: 'none',
    padding: '12px 24px',
    fontSize: '16px',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
    marginTop: '15px',
    fontWeight: 'bold'
  };

  const buttonContainerStyles = {
    display: 'flex',
    justifyContent: 'flex-end'
  };

  const responseContainerStyles = {
    maxWidth: '800px',
    margin: '20px auto 0',
    padding: '15px',
    backgroundColor: '#fff',
    borderRadius: '4px',
    border: '1px solid #ddd'
  };

  const loadingStyles = {
    textAlign: 'center',
    margin: '20px 0',
    padding: '15px',
    backgroundColor: '#f9f9f9',
    borderRadius: '4px',
    fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
    color: '#005f9e',
    fontWeight: 'bold'
  };

  const successMessageStyles = {
    backgroundColor: '#d4edda',
    color: '#155724',
    border: '1px solid #c3e6cb',
    borderRadius: '4px',
    padding: '12px',
    fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
    textAlign: 'center'
  };

  return (
    <div>
      <ToastContainer />
      <div style={containerStyles}>
        <h2 style={headerStyles}>Process Media Links</h2>
        <div style={formStyles}>
          <form onSubmit={handleSubmit}>
            <div style={formGroupStyles}>
              <label style={labelStyles}>Excel File</label>
              <input 
                type="file" 
                accept=".xlsx,.xls" 
                onChange={(e) => setSelectedFile(e.target.files[0])} 
                required 
                style={inputStyles}
              />
            </div>
            
            <div style={formGroupStyles}>
              <label style={labelStyles}>Sheet Name</label>
              <input 
                type="text" 
                value={sheetName} 
                onChange={(e) => setSheetName(e.target.value)} 
                placeholder="Enter sheet name"
                required 
                style={inputStyles}
              />
            </div>
            
            <div style={buttonContainerStyles}>
              <button type="submit" style={buttonStyles} disabled={isLoading}>
                {isLoading ? 'Processing...' : 'Submit'}
              </button>
            </div>
          </form>
        </div>
      </div>

      {isLoading && (
        <div style={responseContainerStyles}>
          <div style={loadingStyles}>Processing... This may take up to 15 minutes.</div>
        </div>
      )}

      {!isLoading && response && response.status === "success" && processedFile && (
        <div style={responseContainerStyles}>
          <div style={successMessageStyles}>
            <strong>✅ Processing Complete!</strong><br/>
            {response.message}<br/>
            <small>File ready: {processedFile.filename}</small><br/>
            <button 
              onClick={handleDownload} 
              style={downloadButtonStyles}
              onMouseOver={(e) => e.target.style.backgroundColor = '#218838'}
              onMouseOut={(e) => e.target.style.backgroundColor = '#28a745'}
            >
              📥 Download Processed File
            </button>
          </div>
        </div>
      )}

      {!isLoading && response && response.status !== "success" && (
        <div style={responseContainerStyles}>
          <div style={{...successMessageStyles, backgroundColor: '#f8d7da', color: '#721c24', border: '1px solid #f5c6cb'}}>
            <strong>❌ Processing Failed</strong><br/>
            Please try again or contact support.
          </div>
        </div>
      )}
    </div>
  );
};

export default FormComponent;