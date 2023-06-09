package rs.ac.bg.fon.cinefon.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import rs.ac.bg.fon.cinefon.domain.User;
import rs.ac.bg.fon.cinefon.exception.DataNotFoundException;
import rs.ac.bg.fon.cinefon.repository.UserRepository;

@Service
public class UserService {
    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public Page<User> getAll(Pageable pageable) {
        return userRepository.findAll(pageable);
    }

    public User getById(Long id) {
        return userRepository.findById(id).orElseThrow(DataNotFoundException::new);
    }

    public User getCurrentlyLoggedInUser() {
        return (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    }

    public User getByUsername(String username) {
        return userRepository.findByUsername(username).orElseThrow(DataNotFoundException::new);
    }

    public Page<User> getOtherUsers(Pageable pageable) {
        return userRepository.findByUsernameNot(getCurrentlyLoggedInUser().getUsername(), pageable);
    }
}
