package rs.ac.bg.fon.cinefon.seeder;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;
import rs.ac.bg.fon.cinefon.auth.AuthenticationService;
import rs.ac.bg.fon.cinefon.auth.RegisterRequest;
import rs.ac.bg.fon.cinefon.domain.Movie;
import rs.ac.bg.fon.cinefon.domain.Role;
import rs.ac.bg.fon.cinefon.repository.GenreRepository;
import rs.ac.bg.fon.cinefon.repository.MovieRepository;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/seed")
public class Seeder {

    private static final String API_KEY = "49844a98b9fefb94d4a075c1432d1f99";

    private static final String URL_GENRES = "https://api.themoviedb.org/3/genre/movie/list?api_key={API_KEY}";
    private static final String URL_CREDITS = "https://api.themoviedb.org/3/movie/{movieID}/credits?api_key={API_KEY}";
    private static final String URL_MOVIE = "https://api.themoviedb.org/3/movie/{movieID}?api_key={API_KEY}";
    private static final List<Long> popularMoviesIDs = List.of(238L, 278L, 240L, 424L, 389L, 155L, 497L, 680L, 429L, 13L, 122L, 769L, 76600L, 493529L, 603692L, 804150L, 934433L, 274L, 901L, 101L, 207L, 105L, 361743L, 315162L, 10494L, 28L, 299534L, 299536L, 8587L, 1585L, 490132L, 354912L, 37257L, 284L, 555604L);


    private final RestTemplate restTemplate = new RestTemplate();

    private final GenreRepository genreRepository;

    private final MovieRepository movieRepository;

    private final AuthenticationService authenticationService;

    public Seeder(GenreRepository genreRepository, MovieRepository movieRepository, AuthenticationService authenticationService) {
        this.genreRepository = genreRepository;
        this.movieRepository = movieRepository;
        this.authenticationService = authenticationService;
    }

    @GetMapping
    public String seed() {
        seedGenres();
        seedMovies();
        seedUsers();
        return "Successful seed of the database!";
    }

    private void seedUsers() {
        RegisterRequest admin = RegisterRequest.builder()
                .email("admin@gmail.com")
                .username("admin123")
                .password("admin123")
                .firstname("Admin")
                .lastname("Admin")
                .role(Role.ADMIN)
                .build();
        authenticationService.register(admin);

        RegisterRequest nikola = RegisterRequest.builder()
                .email("nikola@gmail.com")
                .username("nikola123")
                .password("nikola123")
                .firstname("Nikola")
                .lastname("Petrovic")
                .role(Role.USER)
                .build();
        authenticationService.register(nikola);

        RegisterRequest despot = RegisterRequest.builder()
                .email("despot@gmail.com")
                .username("despot123")
                .password("despot123")
                .firstname("Despot")
                .lastname("Minic")
                .role(Role.CRITIC)
                .build();
        authenticationService.register(despot);

        RegisterRequest veljko = RegisterRequest.builder()
                .email("veljko@gmail.com")
                .username("veljko123")
                .password("veljko123")
                .firstname("Veljko")
                .lastname("Markovic")
                .role(Role.CRITIC)
                .build();
        authenticationService.register(veljko);
    }

    private void seedGenres() {
        Map<String, String> uriVariables = new HashMap<>();
        uriVariables.put("API_KEY", API_KEY);
        ResponseEntity<Genres> genres = restTemplate.getForEntity(URL_GENRES, Genres.class, uriVariables);
        genreRepository.saveAll(genres.getBody().getGenres());
    }

    private void seedMovies() {
        popularMoviesIDs.forEach(popularMovieID -> {
            Map<String, String> uriVariables = new HashMap<>();
            uriVariables.put("API_KEY", API_KEY);
            uriVariables.put("movieID", String.valueOf(popularMovieID));

            Movie movie = restTemplate.getForEntity(URL_MOVIE, Movie.class, uriVariables).getBody();

            Credits credits = restTemplate.getForEntity(URL_CREDITS, Credits.class, uriVariables).getBody();

            movie.setCast(credits.getCast().subList(0, 5));
            movie.setCrew(credits.getCrew().subList(0, 5));
            movieRepository.save(movie);
        });
    }

}
