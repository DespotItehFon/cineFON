package rs.ac.bg.fon.cinefon.controller;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;
import rs.ac.bg.fon.cinefon.domain.WatchList;
import rs.ac.bg.fon.cinefon.service.WatchListService;

@RestController
@RequestMapping("/api/v1/watchlist")
public class WatchlistController {
    private final WatchListService watchListService;

    public WatchlistController(WatchListService watchListService) {
        this.watchListService = watchListService;
    }

    @GetMapping("/my")
    public WatchList getWatchlist() {
        return watchListService.getCurrentUsersWatchList();
    }

    @GetMapping("/others")
    public Page<WatchList> addWatchlist(Pageable pageable) {
        return watchListService.getOtherUsersWatchList(pageable);
    }

    @PostMapping("/my/{movieId}")
    public WatchList addMovieToMyWatchlist(@PathVariable Long movieId) {
        return watchListService.addMovieToMyWatchlist(movieId);
    }
}
