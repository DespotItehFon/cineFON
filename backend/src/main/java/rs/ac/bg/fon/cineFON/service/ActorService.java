package rs.ac.bg.fon.cineFON.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import rs.ac.bg.fon.cineFON.domain.Actor;
import rs.ac.bg.fon.cineFON.domain.Movie;
import rs.ac.bg.fon.cineFON.exception.DataNotFoundException;
import rs.ac.bg.fon.cineFON.repository.ActorRepository;
import rs.ac.bg.fon.cineFON.repository.MovieRepository;

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
