package rs.ac.bg.fon.cineFON.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import rs.ac.bg.fon.cineFON.domain.Movie;
import rs.ac.bg.fon.cineFON.exception.DataNotFoundException;
import rs.ac.bg.fon.cineFON.repository.MovieRepository;

@Service
public class MovieService {
    private final MovieRepository movieRepository;

    public MovieService(MovieRepository movieRepository) {
        this.movieRepository = movieRepository;
    }

    public Page<Movie> getAll(Pageable pageable) {
        return movieRepository.findAll(pageable);
    }
    public Movie getById(Long id) {
        return movieRepository.findById(id).orElseThrow(DataNotFoundException::new);
    }
}
