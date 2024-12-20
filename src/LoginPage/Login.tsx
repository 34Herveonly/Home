import {
  FaGithubSquare,
  FaLinkedin,
  FaEnvelope,
  FaInstagramSquare,
} from "react-icons/fa";


export default function Login() {
  return (
    <>
      {/* Welcome Section */}
      <section className="welcome-section">
  <h1><strong>Welcome to the Student Attendance System</strong></h1>
  <p>
    Revolutionizing attendance management with modern QR technology for
    seamless, secure, and efficient tracking.
  </p>

  {/* Outer Flex container */}
  <div className="notices-container">
    {/* Inner Grid elements (each notice/quote) */}
    <div className="notice-item">
        <h2>Notice</h2>
      <p>We are 3 weeks away from Exams so be 
        sure to cover your modules

    <span><br/><br/>
    Hod Murangira Thierry </span>
      </p>
    </div>
    <div className="notice-item">
    <h2>Notice</h2>
      <p>Exams will take place in January
        <span><br /><br />
        Dean Mr Ndi</span>
      </p>
    </div>
    <div className="notice-item">
    <h2>Notice</h2>
      <p>Teaching and Learning activities will end by December 20
        <span><br /><br />
        Lecturer Mugisha Clement</span>
      </p>
    </div>
    <div className="notice-item">
    <h2>Quote</h2>
      <p>"The road to the bright future is always under construction
        "<span><br /><br />Manguste</span>
      </p>
    </div>
    <div className="notice-item">
    <h2>Quote</h2>
      <p>"Watchout for the toes you step on today because they might be connected to the asses you have to kiss tomorrow."
        <span><br /><br />
        Samuel L Jackson</span> </p>
    </div>
    <div className="notice-item">
    <h2>Favorite Saying</h2>
      <p>"Why Always Me?"
        <span><br /><br />Mario Barotelli</span>
      </p>
    </div>
  </div>
</section>

      {/* Footer */}
      <footer className="footer">
        <p>
          <strong>Empowering Education:</strong> Accurate and efficient way of 
          attendance tracking for teachers.
        </p>

        <div className="contact">
          <ul>
            <li>
              <a href="https://github.com/34Herveonly">
                <FaGithubSquare />
              </a>
            </li>
            <li>
              <a href="https://www.linkedin.com/in/sugira-herve-b92a4a23a/">
                <FaLinkedin />
              </a>
            </li>
            <li>
              <a href="https://mail.google.com/">
                <FaEnvelope />
              </a>
            </li>
            <li>
              <a href="www.instagram.com">
                <FaInstagramSquare />
              </a>
            </li>
          </ul>
        </div>

        <div className="other-options">
          <ul>
            <li>
              <a href="#">Help</a>
            </li>
            <li>
              <a href="#">About</a>
            </li>
            <li>
              <a href="#">Contact Us</a>
            </li>
          </ul>
        <p>@Copyright HerveOnly34</p>
        </div>
      </footer>
    </>
  );
}
