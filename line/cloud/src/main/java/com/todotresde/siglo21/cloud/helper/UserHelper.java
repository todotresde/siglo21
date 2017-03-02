package com.todotresde.siglo21.cloud.helper;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * Created by Leonardo on 13/01/2017.
 */
public class UserHelper {
    public static Boolean validEmail(String email) {
        final String EMAIL_PATTERN = "^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$";
        Pattern pattern = Pattern.compile(EMAIL_PATTERN);
        Matcher matcher;

        matcher = pattern.matcher(email);
        return matcher.matches();
    }
}
