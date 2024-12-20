import React, { useState } from "react";
import { FaInfoCircle } from "react-icons/fa";
import axios from "axios";
import axiosInstance from "../Axios/Axios"; // Adjust the path as needed
import "./AttendanceForm.css";

interface AttendanceFormProps {
  isWithinRadius: boolean;
}

const AttendanceForm: React.FC<AttendanceFormProps> = () => {
  const [username, setUsername] = useState<string>("");
  const [registrationNumber, setRegistrationNumber] = useState<string>("");
  const [yearOfStudy, setYearOfStudy] = useState<string>("");
  const [course, setCourse] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");

  function handleSub (){
    console.log('clicked')
  }

  
  // Method to save attendance to the database
  const saveAttendanceToDatabase = async (formData: Record<string, any>) => {
    try {
      console.log("Submitting data:", formData); // Debugging log
      const response = await axiosInstance.post("/students/add", formData);

      if (response.status === 201) {
        // Reset form and show success message
        setUsername("");
        setRegistrationNumber("");
        setYearOfStudy("");
        setCourse("");
        setDate("");
        setSuccessMessage("Attendance submitted successfully!");
        setErrorMessage(""); // Clear any previous error
      } else {
        setErrorMessage("Failed to submit attendance. Please try again.");
      }
    } catch (error: unknown) {
      // Check if it's an Axios error
      if (axios.isAxiosError(error)) {
        console.error("Axios error:", error.response?.data || error.message);
        setErrorMessage(
          error.response?.data?.message || "Failed to submit attendance."
        );
      } else {
        console.error("Unknown error:", error);
        setErrorMessage("An unexpected error occurred. Please try again.");
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    // Validate the inputs
    if (!username.trim()) {
      setErrorMessage("Username is required");
      return;
    }

    if (!registrationNumber.trim()) {
      setErrorMessage("Registration number is required");
      return;
    } else if (registrationNumber.length > 9) {
      setErrorMessage("Registration number can't exceed 9 characters");
      return;
    }

    if (!yearOfStudy || isNaN(Number(yearOfStudy)) || yearOfStudy.length > 2) {
      setErrorMessage(
        "Year of study must be a valid number and cannot exceed 2 digits"
      );
      return;
    }

    if (!course.trim()) {
      setErrorMessage("Course is required");
      return;
    }

    if (!date.trim()) {
      setErrorMessage("Date is required");
      return;
    }

    // Prepare the data for submission
    const formData = {
      fullName: username.trim(),
      registrationNo: registrationNumber.trim(),
      department: course.trim(),
      yearOfStudy: Number(yearOfStudy), // Convert to a number
      date: date.trim(),
    };

    // Call the method to save data to the database
    saveAttendanceToDatabase(formData);
  };

  return (
    <div className="attendance-form">
      <div className="wrapper">
        <div className="form-box login">
          <form onSubmit={handleSubmit}>
            <h1>ATTENDANCE FORM</h1>

            <div className="input-box">
              <input
                type="text"
                placeholder="Enter Fullname"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>

            <div className="input-box">
              <input
                type="text"
                placeholder="Enter Registration Number"
                value={registrationNumber}
                onChange={(e) => setRegistrationNumber(e.target.value)}
                required
              />
            </div>

            <div className="input-box">
              <input
                type="text"
                placeholder="Department"
                value={course}
                onChange={(e) => setCourse(e.target.value)}
                required
              />
            </div>

            <div className="input-box">
              <input
                type="text"
                placeholder="Year of Study"
                value={yearOfStudy}
                onChange={(e) => setYearOfStudy(e.target.value)}
                required
              />
            </div>

            <div className="input-box">
              <input
                type="date"
                placeholder="Choose date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </div>

            <button type="submit"  onClick={handleSub}>
              Submit
            </button>

            {errorMessage && <p className="error-message">{errorMessage}</p>}
            {successMessage && <p className="success-message">{successMessage}</p>}

            <p>
              <FaInfoCircle /> Make sure you provide valid information
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AttendanceForm;
