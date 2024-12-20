// import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import { GoogleMap, LoadScript } from "@react-google-maps/api"; // Correct imports
import "./App.css";
import Login from "./LoginPage/Login";
import "./LoginPage/Login.css";
import "./NoticePage/Notice.css";
import Notices from "./NoticePage/Notices";
import NavBar from "./Navigation-bar/NavBar";
import Attendance from "./Attendance/Attendance";
import "./Attendance/Attendance.css";
import "./Qrcode genrator/Qrcode.css";
import Qrcode from "./Qrcode genrator/Qrcode";
import "./LoginRegister/LoginRegister.css";
import LoginRegister from "./LoginRegister/LoginRegister";
import "./student-attendance-form/AttendanceForm.css";
import AttendanceForm from "./student-attendance-form/AttendanceForm";
import MyComponent from "./Maps/Maps"




function App() {
  return (
    <>
      {/* Routes */}
      <Router>
        <Routes>
          {/* Route for home page */}
          <Route
            path="/home"
            element={
              <>
                <NavBar />
                <Login />
              </>
            }
          />
          <Route
            path="/map"
            element={
              <>
                <NavBar />
                <MyComponent />
              </>
            }
          />

          {/* Routes for Attendance */}
          <Route
            path="/Attendance"
            element={
              <>
                <NavBar />
                <Attendance />
              </>
            }
          />

          {/* Route for Attendance Form page */}
          <Route
            path="/Attendance Form"
            element={
              <>
                {/* <NavBar /> */}
                <AttendanceForm isWithinRadius={false} />
              </>
            }
          />

          {/* Route for Notices Page */}
          <Route
            path="/notices"
            element={
              <>
                <NavBar />
                <Notices />
              </>
            }
          />

          {/* Route for QrCode Generator */}
          <Route
            path="/QrCode Generator"
            element={
              <>
                <NavBar />
                <Qrcode />
              </>
            }
          />

          {/* Route for Login (no NavBar here) */}
          <Route path="/" element={<LoginRegister />} />

          <Route path="*" element={<NotFound />} />

        </Routes>
      </Router>
    </>
  );
}

export default App;
