package rs.ac.bg.fon.cinefon.controller;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;
import rs.ac.bg.fon.cinefon.domain.CrewMember;
import rs.ac.bg.fon.cinefon.domain.Movie;
import rs.ac.bg.fon.cinefon.service.CrewService;


@CrossOrigin
@RestController
@RequestMapping("/api/v1/crew")
public class CrewController {
    private final CrewService crewService;

    public CrewController(CrewService crewService) {
        this.crewService = crewService;
    }

    @GetMapping
    public Page<CrewMember> getCrew(Pageable pageable) {
        return crewService.getAll(pageable);
    }

    @GetMapping("/{creditId}")
    public CrewMember getCrewById(@PathVariable String creditId) {
        return crewService.getByCreditId(creditId);
    }

    @GetMapping("/{creditId}/movies")
    public Page<Movie> getMoviesByCrewMember(@PathVariable String creditId, Pageable pageable) {
        return crewService.getMoviesByCrewMember(creditId, pageable);
    }
}
