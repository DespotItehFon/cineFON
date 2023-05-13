package rs.ac.bg.fon.cinefon.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import rs.ac.bg.fon.cinefon.domain.Review;
import rs.ac.bg.fon.cinefon.domain.Role;
import rs.ac.bg.fon.cinefon.domain.User;
import rs.ac.bg.fon.cinefon.exception.DataNotFoundException;
import rs.ac.bg.fon.cinefon.repository.ReviewRepository;

import java.time.LocalDate;
import java.util.Optional;

@Service
public class ReviewService {
    private final ReviewRepository reviewRepository;

    private final UserService userService;

    public ReviewService(ReviewRepository reviewRepository, UserService userService) {
        this.reviewRepository = reviewRepository;
        this.userService = userService;
    }

    public Page<Review> getAllReviews(Pageable pageable) {
        return reviewRepository.findAll(pageable);
    }

    public Review getReviewById(Long id) {
        return reviewRepository.findById(id).orElseThrow(DataNotFoundException::new);
    }

    public Page<Review> getReviewsByMovieId(Long movieId, Pageable pageable) {
        return reviewRepository.findByMovieId(movieId, pageable);
    }

    public Page<Review> getReviewsByUserId(Long userId, Pageable pageable) {
        User userById = userService.getById(userId);
        if (!userById.getRole().equals(Role.CRITIC)) {
            throw new IllegalArgumentException("Requested user " + userId + " is not critic");
        }
        return reviewRepository.findByAuthorId(userId, pageable);
    }

    public Review createReview(Review review) {
        User currentlyLoggedInUser = userService.getCurrentlyLoggedInUser();
        if(!currentlyLoggedInUser.getRole().equals(Role.CRITIC)) {
            throw new IllegalArgumentException("You are not logged in as critic");
        }
        review.setAuthor(currentlyLoggedInUser);
        review.setDate(LocalDate.now());
        return reviewRepository.save(review);
    }

    public void deleteReview(Long id) {
        if(reviewRepository.existsById(id)) {
            reviewRepository.deleteById(id);
        }
    }

    public void updateReview(Long id, Review review) {
        User currentlyLoggedInUser = userService.getCurrentlyLoggedInUser();
        if(!currentlyLoggedInUser.getRole().equals(Role.CRITIC)) {
            throw new IllegalArgumentException("You are not logged in as critic");
        }

        Review databaseReview = reviewRepository.findById(id).orElseThrow(DataNotFoundException::new);

        databaseReview.setDate(LocalDate.now());
        databaseReview.setRating(review.getRating());
        databaseReview.setContent(review.getContent());
        reviewRepository.save(databaseReview);
    }

    public long isReviewed(Long movieId) {
        User currentlyLoggedInUser = userService.getCurrentlyLoggedInUser();
        Optional<Review> byAuthorIdAndMovieId = reviewRepository.findByAuthorIdAndMovieId(currentlyLoggedInUser.getId(), movieId);
        return byAuthorIdAndMovieId.map(Review::getId).orElse(-1L);
    }
}
