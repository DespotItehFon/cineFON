package rs.ac.bg.fon.cinefon.controller;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;
import rs.ac.bg.fon.cinefon.domain.Genre;
import rs.ac.bg.fon.cinefon.domain.Movie;
import rs.ac.bg.fon.cinefon.service.GenreService;

@CrossOrigin
@RestController
@RequestMapping("/api/v1/genres")
public class GenreController {
    private final GenreService genreService;

    public GenreController(GenreService genreService) {
        this.genreService = genreService;
    }

    @GetMapping
    public Page<Genre> getGenres(Pageable pageable) {
        return genreService.getAll(pageable);
    }

    @GetMapping("/{id}")
    public Genre getGenreById(@PathVariable Long id) {
        return genreService.getById(id);
    }

    @GetMapping("/{id}/movies")
    public Page<Movie> getGenreMovies(@PathVariable Long id, Pageable pageable) {
        return genreService.getGenreMovies(id, pageable);
    }

}
