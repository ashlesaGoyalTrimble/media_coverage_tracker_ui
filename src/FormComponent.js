import { useState } from "react";
import { processHyperlinks } from "./api";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const FormComponent = () => {
  const [fileName, setFileName] = useState("");
  const [sheetName, setSheetName] = useState("");
  const [response, setResponse] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const result = await processHyperlinks(fileName, sheetName);
      setResponse(result);
      setIsLoading(false);
      toast.success("Successfully submitted!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } catch (error) {
      setIsLoading(false);
      toast.error("Submission failed. Please try again.");
    }
  };

  // Styles for the form elements
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
    backgroundColor: '#f2f2f2', // Grey background only for header
    borderTopLeftRadius: '8px',
    borderTopRightRadius: '8px'
  };

  const formStyles = {
    padding: '20px',
    backgroundColor: 'white', // White background for form
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
    backgroundColor: '#005f9e', // Trimble blue
    color: 'white',
    border: 'none',
    padding: '12px 20px',
    fontSize: '16px',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'background-color 0.3s'
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

  const responsePreStyles = {
    whiteSpace: 'pre-wrap',
    overflowX: 'auto',
    backgroundColor: '#f5f5f5',
    padding: '10px',
    borderRadius: '4px'
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

  return (
    <div>
      <ToastContainer />
      <div style={containerStyles}>
        <h2 style={headerStyles}>Process Media Links</h2>
        <div style={formStyles}>
          <form onSubmit={handleSubmit}>
            <div style={formGroupStyles}>
              <label style={labelStyles}>Excel File Name</label>
              <input 
                type="text" 
                value={fileName} 
                onChange={(e) => setFileName(e.target.value)} 
                placeholder="Enter file name"
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
              <button type="submit" style={buttonStyles}>Submit</button>
            </div>
          </form>
        </div>
      </div>

      {isLoading && (
        <div style={responseContainerStyles}>
          <div style={loadingStyles}>Processing... This may take up to 15 minutes.</div>
        </div>
      )}

      {!isLoading && response && (
        <div style={responseContainerStyles}>
          <h3>Response:</h3>
          <pre style={responsePreStyles}>{JSON.stringify(response, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default FormComponent;
