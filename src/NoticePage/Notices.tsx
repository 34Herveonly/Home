import { useState } from "react";
import axiosInstance from "../Axios/Axios"; // Adjust the path if needed
import "./Notice.css"; // Assuming you have some styling

const Notices = () => {
  // State variables for form fields and messages
  const [lecturerName, setLecturerName] = useState("");
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Handle form submission
  const handlePost = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    // Clear previous messages
    setErrorMessage("");
    setSuccessMessage("");

    // Validate inputs
    if (!lecturerName.trim()) {
      setErrorMessage("Lecturer's name is required.");
      return;
    }
    if (!title.trim()) {
      setErrorMessage("Title of the post is required.");
      return;
    }
    if (!message.trim()) {
      setErrorMessage("Message/Notice is required.");
      return;
    }

    // Prepare data for submission
    const postData = {
      fullName: lecturerName.trim(),
      title: title.trim(),
      content: message.trim(),
      date: new Date().toISOString(), // Automatically add the current timestamp
    };

    try {
      // Send the post request to save the data
      const response = await axiosInstance.post("/posts", postData);

      if (response.status === 201) {
        // Reset form and display success message
        setLecturerName("");
        setTitle("");
        setMessage("");
        setSuccessMessage("Notice posted successfully!");
      } else {
        setErrorMessage("Failed to post the notice. Please try again.");
      }
    } catch (error) {
      console.error("Error posting notice:", error);
      setErrorMessage("An error occurred while posting the notice. Please try again.");
    }
  };

  return (
    <div className="notice-page">
      {/* Title Section */}
      <div className="notice-title">
        <h1>Anything important you want to share?</h1>
        <h2>Post it below.</h2>
      </div>

      {/* Form Section */}
      <form className="notice-form" onSubmit={handlePost}>
        <label htmlFor="lecturer-name">Lecturer's Full Name</label>
        <input
          type="text"
          id="lecturer-name"
          placeholder="Enter full name"
          value={lecturerName}
          onChange={(e) => setLecturerName(e.target.value)}
          required
        />

        <label htmlFor="title">Title of your Post</label>
        <input
          type="text"
          id="title"
          placeholder="Enter title of your post"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <label htmlFor="message">Message/Notice</label>
        <textarea
          id="message"
          name="notice"
          placeholder="Use this space to share a notice/quote or anything"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        ></textarea>

        <button type="submit">Post</button>

        {/* Display messages */}
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        {successMessage && <p className="success-message">{successMessage}</p>}
      </form>
    </div>
  );
};

export default Notices;
