package com.products; // Adjust package as needed

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
// import jakarta.validation.constraints.Email; // Optional: if using email validation

@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // @Email // Optional: if using email validation
    // private String email; // Optional: if you use email for login/username

    private String username;
    private String password; // Store encoded password
    private String role;     // e.g., "ROLE_USER", "ROLE_ADMIN" - Spring Security convention is to prefix with "ROLE_"

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    // public String getEmail() { return email; } // Optional
    // public void setEmail(String email) { this.email = email; } // Optional

    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }

    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }

    // Constructors
    public User() {}

    // Constructor including role
    public User(String username, String password, String role) {
        this.username = username;
        this.password = password;
        this.role = role;
    }

    // You might want to add other fields like firstName, lastName, etc.
}