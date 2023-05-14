package rs.ac.bg.fon.cinefon.controller;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;
import rs.ac.bg.fon.cinefon.domain.Movie;
import rs.ac.bg.fon.cinefon.service.MovieService;

import java.util.Map;

@RestController
@RequestMapping("/api/v1/movies")
public class MovieController {
    private final MovieService movieService;

    public MovieController(MovieService movieService) {
        this.movieService = movieService;
    }

    @GetMapping
    public Page<Movie> getAllMovies(Pageable pageable) {
        return movieService.getAll(pageable);
    }

    @GetMapping("/{id}")
    public Movie getMovieById(@PathVariable Long id) {
        return movieService.getById(id);
    }

    @GetMapping("/{movieId}/statistics")
    public Map<Integer, Long> getStatistics(@PathVariable Long movieId) {
        return movieService.getStatistics(movieId);
    }

    @PutMapping
    public Movie updateMovie(@RequestBody Movie movie) {
        return movieService.updateMovie(movie);
    }
}