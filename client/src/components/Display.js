import { useState } from "react";
import "./Display.css";

// This component is responsible for displaying images based on the data retrieved from the contract.
const Display = ({ contract, account }) => {
  const [data, setData] = useState("");

  // Function to retrieve data from the contract
  const viewShared = async () => {
    let dataArray;
    const Otheraddress = document.querySelector(".address").value;

    try {
      if (Otheraddress) {
        // If an address is provided, retrieve data for that address
        dataArray = await contract.display(Otheraddress);
        console.log(dataArray);
      }
    } catch (e) {
      alert("You don't have access");
    }
    
    if(dataArray !== undefined){
      const isEmpty = Object.keys(dataArray).length === 0;

    if (!isEmpty) {
      const str = dataArray.toString();
      const str_array = str.split(",");
      console.log(dataArray);
      console.log(str);
      console.log(str_array);

      // Create an array of image elements based on the retrieved data
      const images = str_array.map((item, i) => {
        console.log(item);
        return (
          <a href={item} key={i} target="_blank" rel="noreferrer">
            <img
              key={i}
              src={item}
              alt="test.txt"
              className="image-list"
            ></img>
          </a>
        );
      });

      // Set the state with the array of image elements
      setData(images);
    } 
    }
    else{
      alert("Please enter a valid address")
    }
    // Check if the retrieved data is empty
    
  };

  const viewYourFiles = async () => {
    let dataArray;
    dataArray = await contract.display(account);
    console.log(dataArray)

    // Check if the retrieved data is empty
    const isEmpty = Object.keys(dataArray).length === 0;

    if (!isEmpty) {
      const str = dataArray.toString();
      const str_array = str.split(",");
      console.log(dataArray);
      console.log(str);
      console.log(str_array);

      // Create an array of image elements based on the retrieved data
      const images = str_array.map((item, i) => {
        console.log(item);
        return (
          <a href={item} key={i} target="_blank" rel="noreferrer">
            <img
              key={i}
              src={item}
              alt="test.txt"
            ></img>
          </a>
        );
      });

      // Set the state with the array of image elements
      setData(images);
    } else {
      alert("No image to display");
    }
  };

  return (
    <div className="displayContent">
      <div className="shareAcc">

        <div className="shareAccHeading">
          <p>
            Access Shared Files
          </p>
        </div>
        

        <div className="shareAccDet">
          <p style={{ color: "black" }} className="shareAccLbl">Account Number</p>
          <input
          type="text"
          placeholder="Enter Address"
          className="address"
          ></input>
        </div>
        
      </div>

      <div className="imageDisp">

        <div className="buttonDiv">
          <button onClick={viewYourFiles} className="your">
            Your Files
          </button>
          
          <button className="center button shared" onClick={viewShared}>
            Shared Files
          </button>
        </div>
        
        <div className="image-list">{data}</div>

      </div>
      
      

    </div>
  );
};

export default Display;