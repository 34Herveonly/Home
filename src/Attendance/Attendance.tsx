import { useState, useEffect } from "react";
import axiosInstance from "../Axios/Axios"; // Adjust the path to your Axios instance

// Define the type for a single attendance record
interface AttendanceRecord {
  fullName: string;
  registrationNo: string;
  department: string;
  yearOfStudy: number; // Keep yearOfStudy as a number
  date: string; // Keep date as a string, will convert to number for comparison
}

const Attendance = () => {
  // State for search input, dropdown, and date
  const [searchText, setSearchText] = useState<string>(""); // Search text
  const [selectedOption, setSelectedOption] = useState<number | string>(""); // Dropdown value
  const [searchDate, setSearchDate] = useState<string>(""); // Date filter
  const [data, setData] = useState<AttendanceRecord[]>([]); // State for attendance data
  const [loading, setLoading] = useState<boolean>(true); // State for loading indicator
  const [error, setError] = useState<string | null>(null); // State for error messages

  // Fetch data from the backend on component mount
  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        setLoading(true);
         // Start loading
         console.time()
         const response = await axiosInstance.get("/students"); // API endpoint for fetching attendance
         console.timeEnd()
        setData(response.data); // Set the fetched data
        setLoading(false); // Stop loading
      } catch (err: any) {
        console.error("Error fetching attendance data:", err);
        setError("Failed to fetch attendance data.");
        setLoading(false);
      }
    };

    fetchAttendance();
  }, []); // Empty dependency array to run only once on mount

  // Convert searchDate to a timestamp (number) for comparison
  const searchDateTimestamp = searchDate ? new Date(searchDate).getTime() : null;

  // Filtered data based on search text, dropdown, and date
  const filteredData = data.filter((item) => {
    const itemDateTimestamp = new Date(item.date).getTime(); // Convert the item's date to timestamp for comparison
    return (
      (!searchText || item.department.toLowerCase().includes(searchText.toLowerCase())) &&
      // Convert selectedOption to a number for comparison
      (!selectedOption || item.yearOfStudy === Number(selectedOption)) &&
      // Compare the timestamp for date
      (!searchDateTimestamp || itemDateTimestamp === searchDateTimestamp)
    );
  });

  return (
    <div className="attendance-page">
      {/* Title */}
      <div className="title">
        <h1>ATTENDANCE LIST</h1>
      </div>

      {/* Search and Filter Section */}
      <div className="students-list">
        <input
          type="search"
          placeholder="Search by Department"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <select value={selectedOption} onChange={(e) => setSelectedOption(e.target.value)}>
          <option value="">Choose a Year</option>
          <option value={1}>Year 1</option> {/* Changed to number */}
          <option value={2}>Year 2</option> {/* Changed to number */}
          <option value={3}>Year 3</option> {/* Changed to number */}
          <option value={4}>Year 4</option> {/* Changed to number */}
          <option value={5}>Year 5</option> {/* Changed to number */}
        </select>
        <input
          type="date"
          value={searchDate}
          onChange={(e) => setSearchDate(e.target.value)}
          placeholder="Search by Date"
        />
        <button>Search</button>
      </div>

      {/* Attendance Table */}
      <div className="attendance-table">
        {loading ? (
          <p>Loading...</p> // Display loading indicator while fetching data
        ) : error ? (
          <p style={{ color: "red" }}>{error}</p> // Display error message if any
        ) : (
          <table>
            <thead>
              <tr>
                <th>FullName</th>
                <th>Reg_Number</th>
                <th>Department</th>
                <th>Year Of Study</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((row, index) => (
                <tr key={index}>
                  <td>{row.fullName}</td>
                  <td>{row.registrationNo}</td>
                  <td>{row.department}</td>
                  <td>{row.yearOfStudy}</td>
                  <td>{row.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Attendance;
