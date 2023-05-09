package rs.ac.bg.fon.cineFON.seeder;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;
import rs.ac.bg.fon.cineFON.domain.Movie;
import rs.ac.bg.fon.cineFON.domain.Role;
import rs.ac.bg.fon.cineFON.domain.User;
import rs.ac.bg.fon.cineFON.repository.GenreRepository;
import rs.ac.bg.fon.cineFON.repository.MovieRepository;
import rs.ac.bg.fon.cineFON.repository.UserRepository;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/seed")
public class Seeder {

    private static final String API_KEY = "49844a98b9fefb94d4a075c1432d1f99";

    private static final String URL_GENRES = "https://api.themoviedb.org/3/genre/movie/list?api_key=" + API_KEY;
    private static final String URL_CREDITS = "https://api.themoviedb.org/3/movie/{movieID}/credits?api_key=" + API_KEY;
    private static final String URL_MOVIE = "https://api.themoviedb.org/3/movie/{movieID}?api_key=" + API_KEY;
    private static final List<Long> popularMoviesIDs = List.of(238L, 278L, 240L, 424L, 389L, 155L, 497L, 680L, 429L, 13L, 122L, 769L, 76600L, 493529L, 603692L, 804150L, 934433L);


    private final RestTemplate restTemplate = new RestTemplate();

    private final GenreRepository genreRepository;

    private final MovieRepository movieRepository;

    private final UserRepository userRepository;

    public Seeder(GenreRepository genreRepository, MovieRepository movieRepository, UserRepository userRepository) {
        this.genreRepository = genreRepository;
        this.movieRepository = movieRepository;
        this.userRepository = userRepository;
    }

    @GetMapping
    public void seed() {
        seedGenres();
        seedMovies();
        seedUsers();
    }

    private void seedUsers() {
        User admin = User.builder()
                .email("admin@gmail.com")
                .username("admin123")
                .password("admin123")
                .firstname("Admin")
                .lastname("Admin")
                .role(Role.ADMIN)
                .build();
        userRepository.save(admin);

        User nikola = User.builder()
                .email("nikola@gmail.com")
                .username("nikola123")
                .password("nikola123")
                .firstname("Nikola")
                .lastname("Nikola")
                .role(Role.USER)
                .build();

        userRepository.save(nikola);

        User veljko = User.builder()
                .email("veljko@gmail.com")
                .username("veljko123")
                .password("veljko123")
                .firstname("Veljko")
                .lastname("Veljko")
                .role(Role.CRITIC)
                .build();

        userRepository.save(veljko);
    }

    private void seedGenres() {
        ResponseEntity<Genres> genres = restTemplate.getForEntity(URL_GENRES, Genres.class);
        genreRepository.saveAll(genres.getBody().getGenres());
    }

    private void seedMovies() {
        popularMoviesIDs.forEach(popularMovieID -> {
            Map<String, Long> uriVariables = new HashMap<>();
            uriVariables.put("movieID", popularMovieID);

            Movie movie = restTemplate.getForEntity(URL_MOVIE, Movie.class, uriVariables).getBody();

            Credits credits = restTemplate.getForEntity(URL_CREDITS, Credits.class, uriVariables).getBody();
            movie.setCast(credits.getCast().subList(0, 5));
            movie.setCrew(credits.getCrew().subList(0, 5));

            movieRepository.save(movie);
        });
    }

}
