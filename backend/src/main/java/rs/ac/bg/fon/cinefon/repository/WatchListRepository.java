package rs.ac.bg.fon.cinefon.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import rs.ac.bg.fon.cinefon.domain.User;
import rs.ac.bg.fon.cinefon.domain.WatchList;

import java.util.Optional;

@Repository
public interface WatchListRepository extends JpaRepository<WatchList, Long> {
    Optional<WatchList> findByUser(User user);

    Optional<WatchList> findByUserId(Long id);

    Page<WatchList> findByUserIdNot(Long id, Pageable pageable);
}
