package rs.ac.bg.fon.cineFON.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import rs.ac.bg.fon.cineFON.domain.CrewMember;

@Repository
public interface CrewMemberRepository extends JpaRepository<CrewMember, Long> {
}
