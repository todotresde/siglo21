package com.todotresde.siglo21.cloud.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.HashMap;
import java.util.Map;

/**
 * Created by Leonardo on 19/01/2017.
 */
@RestController
public class LoginController {

    @RequestMapping(value={"/login"}, method = RequestMethod.GET)
    public ModelAndView login(){
        ModelAndView modelAndView = new ModelAndView();
        modelAndView.setViewName("login");
        return modelAndView;
    }

    @RequestMapping(value="/token", method = RequestMethod.GET, produces="application/json")
    @ResponseBody
    public Map<String,String> getCsrfToken(HttpServletRequest request, HttpSession session) {
        //CsrfToken token = (CsrfToken)request.getAttribute(CsrfToken.class.getName());
        Map<String, String> tokens = new HashMap<String, String>();

        //tokens.put("csrfToken", token.getToken());
        tokens.put("sessionToken", session.getId());

        return tokens;
    }

}
