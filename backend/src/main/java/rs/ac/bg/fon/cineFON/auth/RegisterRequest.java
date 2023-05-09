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
public class RegisterRequest {
  private String firstname;
  private String lastname;
  private String email;
  private String username;
  private String password;
  private Role role;
}
