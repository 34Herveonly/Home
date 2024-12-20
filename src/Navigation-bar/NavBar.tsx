import { useNavigate } from "react-router-dom"

const NavBar = () => {
  
  const navigate=useNavigate();

const handleLogout =() => {
  alert('You are Logging Out')
  navigate("/")
}

  return (
    <>
           {/* Navigation Bar */}
      <nav className="nav">
        {/* Logo Section */}
        <a href="/home" className="site-title">
          <img src="/src/assets/logo.jpg" alt="Logo" />
        </a>

        {/* Navigation Links */}
        <ul>
          <li>
            <a href="/home">Home</a>
          </li>
          <li>
            <a href="/QrCode Generator">QR Generator</a>
          </li>
          <li>
            <a href="/Attendance Form">Attendance Form</a>
          </li>
          <li>
            <a href="/Attendance">Attendance</a>
          </li>
          <li>
            <a href="/Notices">Add Notice</a>
          </li>
          <li>
            <button onClick={handleLogout}>Logout</button>
          </li>
        </ul>
      </nav>
 
    </>
  )
}

export default NavBar
