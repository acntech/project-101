package no.acntech.project101.web;

public class TestUtil {
    public static String createURL(int port, String uri) {
        return "http://localhost:" + port + uri;
    }
}
