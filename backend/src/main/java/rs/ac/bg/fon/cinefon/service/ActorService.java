package rs.ac.bg.fon.cinefon.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import rs.ac.bg.fon.cinefon.domain.Actor;
import rs.ac.bg.fon.cinefon.domain.Movie;
import rs.ac.bg.fon.cinefon.exception.DataNotFoundException;
import rs.ac.bg.fon.cinefon.repository.ActorRepository;
import rs.ac.bg.fon.cinefon.repository.MovieRepository;

import java.util.List;

@Service
public class ActorService {

    private final ActorRepository actorRepository;
    private final MovieRepository movieRepository;

    public ActorService(ActorRepository actorRepository,
                        MovieRepository movieRepository) {
        this.actorRepository = actorRepository;
        this.movieRepository = movieRepository;
    }

    public Page<Actor> getAll(Pageable pageable) {
        return actorRepository.findAll(pageable);
    }

    public Actor getById(Long id) {
        return actorRepository.findById(id).orElseThrow(DataNotFoundException::new);
    }


    public List<Movie> getMoviesByActorId(Long actorId) {
        Actor actor = actorRepository.findById(actorId).orElseThrow(DataNotFoundException::new);
        return movieRepository.findAll().stream().filter(movie -> movie.getCast().contains(actor)).toList();
    }
}
