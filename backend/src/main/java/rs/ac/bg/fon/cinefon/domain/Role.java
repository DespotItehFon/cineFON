package rs.ac.bg.fon.cinefon.domain;

import org.springframework.security.core.GrantedAuthority;

public enum Role implements GrantedAuthority {

    USER,
    CRITIC,
    ADMIN;

    @Override
    public String getAuthority() {
        return name();
    }
}
