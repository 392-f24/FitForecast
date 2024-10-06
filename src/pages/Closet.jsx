import { useState } from "react";
import AddClothesButton from "../components/AddClothesButton";
import EditForm from "../components/EditForm";

function Closet() {
    const [showModal, setShowModal] = useState(false);
    return (
      <div className="flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Closet Page</h1>
          <p className="text-lg">Welcome to the closet page!</p>
          <AddClothesButton onClick={() => setShowModal(true)}/>
          <EditForm showModal={showModal} setShowModal={setShowModal}/>
        </div>
      </div>
    );
  }
  
  export default Closet;
  