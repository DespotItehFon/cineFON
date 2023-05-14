package rs.ac.bg.fon.cinefon.controller;

import org.springframework.web.bind.annotation.*;
import rs.ac.bg.fon.cinefon.domain.WatchList;
import rs.ac.bg.fon.cinefon.service.WatchListService;

@CrossOrigin
@RestController
@RequestMapping("/api/v1/watchlist")
public class WatchlistController {
    private final WatchListService watchListService;

    public WatchlistController(WatchListService watchListService) {
        this.watchListService = watchListService;
    }

    @GetMapping("/{id}")
    public WatchList getWatchlistById(@PathVariable Long id) {
        return watchListService.getWatchlistById(id);
    }

    @GetMapping
    public WatchList getWatchlist() {
        return watchListService.getWatchlist();
    }

    @GetMapping("/user/{userId}")
    public WatchList getWatchlistByUser(@PathVariable Long userId) {
        return watchListService.getWatchlistByUser(userId);
    }

    @PostMapping("/movie/{movieId}")
    public WatchList addMovieToMyWatchlist(@PathVariable Long movieId) {
        return watchListService.addMovieToMyWatchlist(movieId);
    }

    @DeleteMapping("/movie/{movieId}")
    public void removeMovieFromMyWatchlist(@PathVariable Long movieId) {
        watchListService.removeMovieFromMyWatchlist(movieId);
    }

    @GetMapping("/movie/{movieId}")
    public boolean isInMyWatchlist(@PathVariable Long movieId) {
        return watchListService.isInMyWatchlist(movieId);
    }
}
