package rs.ac.bg.fon.cinefon.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
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

    public WatchList getCurrentUsersWatchList() {
        User currentUser = userService.getCurrentlyLoggedInUser();
        return watchListRepository.findByUserId(currentUser.getId()).orElseThrow(DataNotFoundException::new);
    }

    public Page<WatchList> getOtherUsersWatchList(Pageable pageable) {
        return watchListRepository.findByUserIdNot(userService.getCurrentlyLoggedInUser().getId(), pageable);
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
}
