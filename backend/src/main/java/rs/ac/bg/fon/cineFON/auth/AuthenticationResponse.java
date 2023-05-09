package rs.ac.bg.fon.cineFON.auth;

import lombok.*;
import rs.ac.bg.fon.cineFON.domain.Role;

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
