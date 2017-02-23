package com.todotresde.siglo21.cloud.configuration;

import com.netflix.zuul.ZuulFilter;

/**
 * Created by Leonardo on 21/02/2017.
 */
public class SimpleFilter extends ZuulFilter {

    @Override
    public String filterType() {
        return "pre";
    }

    @Override
    public int filterOrder() {
        return 1;
    }

    @Override
    public boolean shouldFilter() {
        return true;
    }

    @Override
    public Object run() {

        return null;
    }

}
