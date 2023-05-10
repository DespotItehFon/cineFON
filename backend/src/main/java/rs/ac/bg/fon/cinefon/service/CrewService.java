package rs.ac.bg.fon.cinefon.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import rs.ac.bg.fon.cinefon.domain.CrewMember;
import rs.ac.bg.fon.cinefon.domain.Movie;
import rs.ac.bg.fon.cinefon.exception.DataNotFoundException;
import rs.ac.bg.fon.cinefon.repository.CrewMemberRepository;
import rs.ac.bg.fon.cinefon.repository.MovieRepository;

import java.util.List;

@Service
public class CrewService {

    private final CrewMemberRepository crewRepository;
    private final MovieRepository movieRepository;

    public CrewService(CrewMemberRepository crewRepository,
                       MovieRepository movieRepository) {
        this.crewRepository = crewRepository;
        this.movieRepository = movieRepository;
    }

    public Page<CrewMember> getAll(Pageable pageable) {
        return crewRepository.findAll(pageable);
    }

    public Page<Movie> getMoviesByCrewMember(String creditsId, Pageable pageable) {
        CrewMember crewMember = crewRepository.findByCreditId(creditsId).orElseThrow(DataNotFoundException::new);
        List<Movie> movieList = movieRepository.findAll()
                .stream()
                .filter(movie -> movie.getCrew().contains(crewMember))
                .toList();
        return new PageImpl<>(movieList, pageable, movieList.size());
    }

    public CrewMember getByCreditId(String creditId) {
        return crewRepository.findByCreditId(creditId).orElseThrow(DataNotFoundException::new);
    }
}
