import { useState } from "react";
import { processHyperlinks } from "./api";

const FormComponent = () => {
  const [fileName, setFileName] = useState("");
  const [sheetName, setSheetName] = useState("");
  const [response, setResponse] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await processHyperlinks(fileName, sheetName);
    setResponse(result);
  };

  return (
    <div>
      <h2>Process Hyperlinks</h2>
      <form onSubmit={handleSubmit}>
        <label>Excel File Name:</label>
        <input 
          type="text" 
          value={fileName} 
          onChange={(e) => setFileName(e.target.value)} 
          placeholder="Enter file name"
          required 
        />
        <br/>
        <label>Sheet Name:</label>
        <input 
          type="text" 
          value={sheetName} 
          onChange={(e) => setSheetName(e.target.value)} 
          placeholder="Enter sheet name"
          required 
        />
        <br/>
        <button type="submit">Submit</button>
      </form>

      {response && (
        <div>
          <h3>Response:</h3>
          <pre>{JSON.stringify(response, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default FormComponent;
