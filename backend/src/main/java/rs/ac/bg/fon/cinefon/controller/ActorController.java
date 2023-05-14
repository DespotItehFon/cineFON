package rs.ac.bg.fon.cinefon.controller;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;
import rs.ac.bg.fon.cinefon.domain.Actor;
import rs.ac.bg.fon.cinefon.domain.Movie;
import rs.ac.bg.fon.cinefon.service.ActorService;

@CrossOrigin
@RestController
@RequestMapping("/api/v1/actors")
public class ActorController {

    private final ActorService actorService;

    public ActorController(ActorService actorService) {
        this.actorService = actorService;
    }

    @GetMapping
    public Page<Actor> getActors(Pageable pageable) {
        return actorService.getAll(pageable);
    }

    @GetMapping("/{id}")
    public Actor getActor(@PathVariable Long id) {
        return actorService.getById(id);
    }

    @GetMapping("/{id}/movies")
    public Page<Movie> getMoviesByActor(@PathVariable Long id, Pageable pageable) {
        return actorService.getMoviesByActorId(id, pageable);
    }

}
