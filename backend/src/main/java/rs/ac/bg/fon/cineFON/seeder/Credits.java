package rs.ac.bg.fon.cineFON.seeder;

import lombok.*;
import rs.ac.bg.fon.cineFON.domain.Actor;
import rs.ac.bg.fon.cineFON.domain.CrewMember;

import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@EqualsAndHashCode
@ToString
public class Credits {
    private long id;
    private List<Actor> cast;
    private List<CrewMember> crew;
}
