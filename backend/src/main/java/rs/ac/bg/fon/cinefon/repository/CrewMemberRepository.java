package rs.ac.bg.fon.cinefon.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import rs.ac.bg.fon.cinefon.domain.CrewMember;

@Repository
public interface CrewMemberRepository extends JpaRepository<CrewMember, Long> {
}
