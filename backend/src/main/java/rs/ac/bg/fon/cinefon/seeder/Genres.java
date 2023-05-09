package rs.ac.bg.fon.cinefon.seeder;

import lombok.*;
import rs.ac.bg.fon.cinefon.domain.Genre;

import java.util.List;


@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@EqualsAndHashCode
@ToString
public class Genres {
    private List<Genre> genres;
}
