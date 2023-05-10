package rs.ac.bg.fon.cinefon.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import rs.ac.bg.fon.cinefon.domain.Review;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Long> {
    Page<Review> findByAuthorId(Long id, Pageable pageable);
    Page<Review> findByMovieId(long id, Pageable pageable);
}
