import { useEffect } from "react";
import "./Modal.css";

// This component represents a modal that allows the user to share access with others.
const Modal = ({ setModalOpen, contract }) => {
  // This function is called when the user clicks the "Share" button.
  // It retrieves the address entered by the user and calls the "allow" function of the contract to grant access to that address.
  const sharing = async () => {
    const address = document.querySelector(".address").value;
    await contract.allow(address);
    setModalOpen(false);
  };

  useEffect(() => {
    // This function is called when the component is rendered.
    // It retrieves the list of addresses with access from the contract and populates the select dropdown with those addresses.
    const accessList = async () => {
      const addressList = await contract.shareAccess();
      let select = document.querySelector("#selectNumber");
      const options = addressList;

      for (let i = 0; i < options.length; i++) {
        let opt = options[i];
        let e1 = document.createElement("option");
        e1.textContent = opt;
        e1.value = opt;
        select.appendChild(e1);
      }
    };

    // Only call the accessList function if the contract is available.
    contract && accessList();
  }, [contract]);

  return (
    <>
      <div className="modalBackground">
        <div className="modalContainer">
          <div className="title">
            <p className="titleHead">Share with people</p>
            <p className="titleCont">Enter the address of the account below</p> 
          </div>
          <div className="body">
            <input
              type="text"
              className="address"
              placeholder="Enter Address"
            ></input>
          </div>
          <form id="myForm">
            <select id="selectNumber">
              <option className="address">People With Access</option>
            </select>
          </form>
          <div className="footer">
            <button
              onClick={() => {
                setModalOpen(false);
              }}
              id="cancelBtn"
            >
              Cancel
            </button>
            <button onClick={() => sharing()} id="shareBtn">Share</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
