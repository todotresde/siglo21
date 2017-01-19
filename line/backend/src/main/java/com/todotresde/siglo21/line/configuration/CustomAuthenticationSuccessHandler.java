package com.todotresde.siglo21.line.configuration;

/**
 * Created by Leonardo on 19/01/2017.
 */
import java.io.IOException;
import java.util.Set;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.SavedRequestAwareAuthenticationSuccessHandler ;
import org.springframework.stereotype.Component;

@Component
public class CustomAuthenticationSuccessHandler extends SavedRequestAwareAuthenticationSuccessHandler  {
    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException  {
        response.setStatus(HttpServletResponse.SC_OK);
    }
}