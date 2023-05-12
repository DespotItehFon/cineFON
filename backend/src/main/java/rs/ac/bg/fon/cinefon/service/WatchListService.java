package rs.ac.bg.fon.cinefon.service;

import org.springframework.stereotype.Service;
import rs.ac.bg.fon.cinefon.domain.Movie;
import rs.ac.bg.fon.cinefon.domain.User;
import rs.ac.bg.fon.cinefon.domain.WatchList;
import rs.ac.bg.fon.cinefon.exception.DataNotFoundException;
import rs.ac.bg.fon.cinefon.repository.WatchListRepository;

@Service
public class WatchListService {
    private final WatchListRepository watchListRepository;

    private final UserService userService;

    private final MovieService movieService;

    public WatchListService(WatchListRepository watchListRepository, UserService userService, MovieService movieService) {
        this.watchListRepository = watchListRepository;
        this.userService = userService;
        this.movieService = movieService;
    }

    public WatchList addMovieToMyWatchlist(Long movieId) {
        User currentUser = userService.getCurrentlyLoggedInUser();
        Movie movieToBeAddedToWatchList = movieService.getById(movieId);
        WatchList watchList = watchListRepository.findByUserId(currentUser.getId())
                .orElseGet(() -> {
                    WatchList newWatchList = new WatchList();
                    newWatchList.setUser(currentUser);
                    return newWatchList;
                });
        watchList.addMovie(movieToBeAddedToWatchList);
        return watchListRepository.save(watchList);
    }

    public WatchList getWatchlistById(Long id) {
        return watchListRepository.findById(id).orElseThrow(DataNotFoundException::new);
    }

    public WatchList getWatchlist() {
        User currentUser = userService.getCurrentlyLoggedInUser();
        return watchListRepository.findByUserId(currentUser.getId()).orElseThrow(DataNotFoundException::new);
    }

    public WatchList getWatchlistByUser(Long userId) {
        return watchListRepository.findByUserId(userId).orElseThrow(DataNotFoundException::new);
    }

    public void removeMovieFromMyWatchlist(Long movieId) {
        User currentlyLoggedInUser = userService.getCurrentlyLoggedInUser();
        Movie movieToBeRemovedFromWatchList = movieService.getById(movieId);
        WatchList watchList = watchListRepository
                .findByUserId(currentlyLoggedInUser.getId())
                .orElseThrow(DataNotFoundException::new);
        watchList.removeMovie(movieToBeRemovedFromWatchList);
    }

    public boolean isInMyWatchlist(Long movieId) {
        Movie movie = movieService.getById(movieId);
        User currentUser = userService.getCurrentlyLoggedInUser();
        WatchList watchList = watchListRepository.findByUserId(currentUser.getId()).orElseThrow(DataNotFoundException::new);
        return watchList.getMovies().contains(movie);
    }
}
