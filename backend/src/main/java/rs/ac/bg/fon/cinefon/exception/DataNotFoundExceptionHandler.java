package rs.ac.bg.fon.cinefon.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ProblemDetail;
import org.springframework.http.ResponseEntity;
import org.springframework.web.ErrorResponse;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class DataNotFoundExceptionHandler {
    @ExceptionHandler(DataNotFoundException.class)
    public ResponseEntity<ErrorResponse> handleEntityNotFoundException(DataNotFoundException ex) {
        ErrorResponse error = new ErrorResponse() {
            @Override
            public HttpStatusCode getStatusCode() {
                return HttpStatus.NOT_FOUND;
            }

            @Override
            public ProblemDetail getBody() {
                return null;
            }
        };
        return new ResponseEntity<>(error, HttpStatus.NOT_FOUND);
    }
}
