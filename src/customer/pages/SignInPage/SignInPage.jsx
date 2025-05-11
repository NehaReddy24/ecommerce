import React, { useState } from 'react'; // Import useState
import { Link, useNavigate } from 'react-router-dom'; // Import Link and useNavigate
import { useAuth } from '../../context/AuthContext'; // Import useAuth - Make sure path is correct
import './SignInPage.css'; // Your CSS file for styling

function SignInPage() {
  // State to hold form input values
  const [formData, setFormData] = useState({
    username: '', // Or email, depending on your login
    password: ''
  });

  // Get the login function from AuthContext and the navigate function
  const { login } = useAuth();
  const navigate = useNavigate();

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default browser form submission

    try {
      // Call the login function from AuthContext
      await login(formData.username, formData.password);

      // --- Redirect after successful login ---
      console.log("Login successful, navigating to home page."); // Optional log
      navigate('/'); // Redirect to the home page
      // --- End Redirect ---

    } catch (error) {
      // Handle login error (the login function in AuthContext already shows an alert)
      console.error("Login failed in component:", error);
      // You could add more specific error handling here if needed
    }
  };

  return (
    <div className="signin-container"> {/* Apply your styling class */}
      <div className="signin-form-box"> {/* Apply styling for the form container */}
        <h2 className="signin-title">Sign In</h2> {/* Apply styling for the title */}
        <form onSubmit={handleSubmit}>
          <div className="form-group"> {/* Apply styling for form groups */}
            <label htmlFor="username">Email address</label> {/* Update label if using username */}
            <input
              type="text" // Use text or email depending on your backend's login
              id="username" // Update id and name if using email
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
          </div>

          {/* You can add "Remember me" and "Forgot password" here if you implement that */}
          {/* <div className="form-options">
              <label>
                  <input type="checkbox" /> Remember me
              </label>
              <Link to="/forgot-password">Forgot your password?</Link>
          </div> */}


          <button type="submit" className="signin-button">Sign in</button> {/* Apply styling for the button */}
        </form>
        <p className="signup-link-text"> {/* Apply styling */}
          New to our store? <Link to="/create-account">Create an account</Link> {/* Link to signup page */}
        </p>
      </div>
    </div>
  );
}

export default SignInPage;