package rs.ac.bg.fon.cinefon.controller;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;
import rs.ac.bg.fon.cinefon.domain.Review;
import rs.ac.bg.fon.cinefon.service.ReviewService;

@RestController
@RequestMapping("/api/v1/reviews")
public class ReviewController {
    private final ReviewService reviewService;

    public ReviewController(ReviewService reviewService) {
        this.reviewService = reviewService;
    }

    @GetMapping
    public Page<Review> getAllReviews(Pageable pageable) {
        return reviewService.getAllReviews(pageable);
    }

    @GetMapping("/{id}")
    public Review getReviewById(@PathVariable Long id) {
        return reviewService.getReviewById(id);
    }

    @GetMapping("/movie/{movieId}")
    public Page<Review> getReviewsByMovieId(@PathVariable Long movieId, Pageable pageable) {
        return reviewService.getReviewsByMovieId(movieId, pageable);
    }

    @GetMapping("/user/{userId}")
    public Page<Review> getReviewsByUserId(@PathVariable Long userId, Pageable pageable) {
        return reviewService.getReviewsByUserId(userId, pageable);
    }

    @PostMapping
    public Review createReview(@RequestBody Review review) {
        return reviewService.createReview(review);
    }

    @DeleteMapping("/{id}")
    public void deleteReview(@PathVariable Long id) {
        reviewService.deleteReview(id);
    }


    @PutMapping
    public void updateReview(@RequestBody Review review) {
        reviewService.updateReview(review.getId(), review);
    }

    @PutMapping("/{id}")
    public void updateReview(@PathVariable Long id, @RequestBody Review review) {
        reviewService.updateReview(id, review);
    }
}
