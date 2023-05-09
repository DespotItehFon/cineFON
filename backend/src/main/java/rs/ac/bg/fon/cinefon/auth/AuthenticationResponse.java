package rs.ac.bg.fon.cinefon.auth;

import lombok.*;
import rs.ac.bg.fon.cinefon.domain.Role;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
@Setter
@EqualsAndHashCode
@ToString
public class AuthenticationResponse {

  private String token;
  private Role role;
}
