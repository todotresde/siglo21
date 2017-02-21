package com.todotresde.siglo21.line.helper;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * Created by Leonardo on 13/01/2017.
 */
public class WorkStationHelper {
    public static Boolean validIP(String ip) {
        final String IPADDRESS_PATTERN =
                "^([01]?\\d\\d?|2[0-4]\\d|25[0-5])\\." +
                        "([01]?\\d\\d?|2[0-4]\\d|25[0-5])\\." +
                        "([01]?\\d\\d?|2[0-4]\\d|25[0-5])\\." +
                        "([01]?\\d\\d?|2[0-4]\\d|25[0-5])$";
        Pattern pattern = Pattern.compile(IPADDRESS_PATTERN);
        Matcher matcher;

        matcher = pattern.matcher(ip);
        return matcher.matches();
    }
}
