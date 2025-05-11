import React, { createContext, useState, useEffect, useContext } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
      // In a real app, you would decode the token here to get user info and role,
      // or make a separate API call to a /userinfo endpoint.
      // For now, we'll just set placeholder user/role based on token presence.
      try {
        // You'll replace this with actual logic after implementing backend login response handling
        // Example: If your backend sends user and roles in the login response:
        // const decodedToken = jwt_decode(token); // You'd need a library like jwt-decode
        // setUser({ username: decodedToken.sub }); // 'sub' is standard for subject (username)
        // setRole(decodedToken.role); // Assuming role is in the token payload
        setUser({ username: 'AuthenticatedUser' }); // Placeholder until backend login provides user details
        setRole('ROLE_USER'); // Placeholder role until backend provides role
      } catch (e) {
        console.error("Failed to process token:", e);
        logout(); // Log out if token is invalid
      }
    } else {
      localStorage.removeItem('token');
      setUser(null);
      setRole(null);
    }
  }, [token]);

  const login = async (username, password) => {
    try {
      const response = await fetch('http://localhost:8080/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Login failed');
      }

      const data = await response.json();
       // Assuming backend returns a JSON object like { accessToken: 'your_token', user: { ... }, role: '...' }
       // Adjust data.accessToken, data.user, data.role based on your actual backend login response
      setToken(data.accessToken); // Set the token received from the backend
       // If backend returns user/role directly in response:
       // setUser(data.user);
       // setRole(data.role);
       // Otherwise, the useEffect will handle setting placeholder based on token presence
      console.log("Login successful, token received.");
       // You might want to redirect here using react-router-dom's useNavigate, but it's
       // often better to handle navigation in the component calling login (e.g., SignInPage)
       return data; // Return data for calling component
    } catch (error) {
      console.error("Login error:", error);
      alert(`Login failed: ${error.message}`);
      throw error;
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    setRole(null);
    console.log("User logged out.");
    // Optionally, redirect user to home or login page in the component calling logout
  };

  const contextValue = {
    token,
    user,
    role,
    login,
    logout,
    isAuthenticated: !!token,
    isAdmin: role === 'ROLE_ADMIN',
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === null) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;