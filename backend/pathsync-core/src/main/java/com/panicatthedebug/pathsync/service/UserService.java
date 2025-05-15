package com.panicatthedebug.pathsync.service;

import com.panicatthedebug.pathsync.exception.UnauthorizedException;
import com.panicatthedebug.pathsync.exception.UserAlreadyExistsException;
import com.panicatthedebug.pathsync.exception.UserNotFoundException;
import com.panicatthedebug.pathsync.exception.ValidationException;
import com.panicatthedebug.pathsync.model.User;
import com.panicatthedebug.pathsync.repository.UserRepository;
import com.panicatthedebug.pathsync.security.JwtService;
import com.panicatthedebug.pathsync.util.ValidationUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
public class UserService {
    static final String MESSAGE = "message";

    private final UserRepository userRepo;
    private final JwtService jwtService;
    private final BCryptPasswordEncoder passwordEncoder;
    private final AuthenticationManager authManager;

    @Autowired
    public UserService(UserRepository userRepo, JwtService jwtService, BCryptPasswordEncoder passwordEncoder, AuthenticationManager authManager) {
        this.userRepo = userRepo;
        this.jwtService = jwtService;
        this.passwordEncoder = passwordEncoder;
        this.authManager = authManager;
    }

    public Map<String, String> registerUser(String firstName, String lastName, String email, String password) {
        String validationError = ValidationUtil.validateRegistration(firstName, lastName, email, password);
        if (validationError != null) throw new ValidationException(validationError);

        if (userRepo.findByEmail(email) != null) {
            throw new UserAlreadyExistsException("User already exists.");
        }
        userRepo.save(new User(firstName, lastName, email, passwordEncoder.encode(password), "USER", null, null,false));
        return Map.of(MESSAGE, "User registered successfully.");
    }

    public Map<String, String> loginUser(String email, String password) throws UnauthorizedException {
        String validationError = ValidationUtil.validateLogin(email, password);
        if (validationError != null) throw new ValidationException(validationError);

        try {
            authManager.authenticate(
                    new UsernamePasswordAuthenticationToken(email, password));
        } catch (BadCredentialsException ex) {
            throw new UnauthorizedException("Unauthorized request. Please verify credentials and try again.", ex);
        }

        User user = userRepo.findByEmail(email);
        if (user == null) {
            throw new UserNotFoundException("User not found");
        }

        return Map.of("accessToken", jwtService.generateToken(email),
                "username", user.getFirstName() + " " + user.getLastName(),
                "role", user.getRole()
        );
    }
}
