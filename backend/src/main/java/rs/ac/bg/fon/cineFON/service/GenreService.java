package rs.ac.bg.fon.cineFON.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import rs.ac.bg.fon.cineFON.domain.Genre;
import rs.ac.bg.fon.cineFON.exception.DataNotFoundException;
import rs.ac.bg.fon.cineFON.repository.GenreRepository;

@Service
public class GenreService {

    private final GenreRepository genreRepository;

    public GenreService(GenreRepository genreRepository) {
        this.genreRepository = genreRepository;
    }

    public Page<Genre> getAll(Pageable pageable) {
        return genreRepository.findAll(pageable);
    }

    public Genre getById(Long id) {
        return genreRepository.findById(id).orElseThrow(DataNotFoundException::new);
    }
}
