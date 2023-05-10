package rs.ac.bg.fon.cinefon.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import rs.ac.bg.fon.cinefon.domain.Genre;
import rs.ac.bg.fon.cinefon.domain.Movie;
import rs.ac.bg.fon.cinefon.exception.DataNotFoundException;
import rs.ac.bg.fon.cinefon.repository.GenreRepository;
import rs.ac.bg.fon.cinefon.repository.MovieRepository;

import java.util.List;

@Service
public class GenreService {

    private final GenreRepository genreRepository;
    private final MovieRepository movieRepository;

    public GenreService(GenreRepository genreRepository, MovieRepository movieRepository) {
        this.genreRepository = genreRepository;
        this.movieRepository = movieRepository;
    }

    public Page<Genre> getAll(Pageable pageable) {
        return genreRepository.findAll(pageable);
    }

    public Genre getById(Long id) {
        return genreRepository.findById(id).orElseThrow(DataNotFoundException::new);
    }

    public Page<Movie> getGenreMovies(Long id, Pageable pageable) {
        Genre genre = getById(id);
        return movieRepository.findByGenresIn(List.of(genre), pageable);
    }
}
