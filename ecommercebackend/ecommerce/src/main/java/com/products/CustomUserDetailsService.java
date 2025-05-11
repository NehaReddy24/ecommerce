package com.products;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Set;

@Service // Mark this as a Spring Service
public class CustomUserDetailsService implements UserDetailsService {

    private final UserRepository userRepository;

    
    public CustomUserDetailsService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    // This method is called by Spring Security to load user details
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        // Fetch the user from your database using the UserRepository
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with username: " + username));

        // Create a set of GrantedAuthorities based on the user's role
        Set<GrantedAuthority> authorities = new HashSet<>();
        // Spring Security roles should typically be prefixed with "ROLE_"
        authorities.add(new SimpleGrantedAuthority(user.getRole()));

        // Return a Spring Security UserDetails object
        return new org.springframework.security.core.userdetails.User(
                user.getUsername(),
                user.getPassword(), // This should be the encoded password
                authorities // User's roles/authorities
        );
    }
}