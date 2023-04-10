import "./App.css";
import { Route, Routes } from "react-router-dom";

import Register from "./Components/Register";
import Login from "./Components/Login";
import Purchase from "./Components/Purchase";
import Upload from "./Components/Upload";
import Navbar from "./Components/NavBar";
import Home from "./Components/Home";
import FileUploader from "./Components/FileUpload";

function App() {
  return (
    <div className="App bg-stone-100">
      <Navbar />
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/purchase" element={<Purchase />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/home" element={<Home />} />
        <Route path="/fileUpload" element={<FileUploader />} />
      </Routes>
    </div>
  );
}

export default App;
