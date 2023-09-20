import { useState } from "react";
import axios from "axios";
import "./FileUpload.css";

// FileUpload component
const FileUpload = ({ contract, account, provider }) => {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("No File selected");

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (file) {
      try {
        const formData = new FormData();
        formData.append("file", file);

        // Send a POST request to Pinata API to pin the file to IPFS
        const resFile = await axios({
          method: "post",
          url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
          data: formData,
          headers: {
            pinata_api_key: `YOUR_PINATA_KEY`,
            pinata_secret_api_key: `YOUR_PINATA_SECRET_API_KEY`,
            "Content-Type": "multipart/form-data",
          },
        });

        // Construct the image URL using the IPFS hash returned from Pinata API
        const ImgHash = `https://gateway.pinata.cloud/ipfs/${resFile.data.IpfsHash}`;

        // Call the contract's add function to add the image URL to the blockchain
        contract.add(account, ImgHash);

        // Display success message and reset file state
        alert("Successfully File Uploaded");
        setFileName("No File selected");
        setFile(null);
      } catch (e) {
        // Display error message if unable to upload image to Pinata
        alert("Unable to upload file to Pinata");
      }
    }
    // Reset file state
    alert("Successfully Image Uploaded");
    setFileName("No image selected");
    setFile(null);
  };

  // Retrieve selected file
  const retrieveFile = (e) => {
    const data = e.target.files[0];
    const reader = new window.FileReader();
    reader.readAsArrayBuffer(data);
    reader.onloadend = () => {
      setFile(e.target.files[0]);
    };
    setFileName(e.target.files[0].name);
    e.preventDefault();
  };

  // Render the file upload form
  return (
    <div className="top">
      <form className="form" onSubmit={handleSubmit}>
        <span className="textArea">File: {fileName}</span>

        <div className="formButton">
          <label htmlFor="file-upload" className="choose">
            Choose File
          </label>
          <input
            disabled={!account}
            type="file"
            id="file-upload"
            name="data"
            onChange={retrieveFile}
          />
          <button type="submit" className="upload" disabled={!file}>
            Upload File
          </button>
        </div>
        
      </form>
    </div>
  );
};

export default FileUpload;
