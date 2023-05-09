package rs.ac.bg.fon.cineFON.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import rs.ac.bg.fon.cineFON.domain.WatchList;

@Repository
public interface WatchListRepository extends JpaRepository<WatchList, Long> {
}
