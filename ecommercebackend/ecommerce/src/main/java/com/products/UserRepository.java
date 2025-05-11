package com.products; // Adjust package as needed

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    // Spring Data JPA automatically provides implementations for these
    Optional<User> findByUsername(String username);
    // Optional<User> findByEmail(String email); // Optional: if using email for login
    boolean existsByUsername(String username);
    // boolean existsByEmail(String email); // Optional: if using email validation/email as unique identifier
}