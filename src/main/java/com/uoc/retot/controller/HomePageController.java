package com.uoc.retot.controller;


import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

@RestController
@RequestMapping("/api/v1/home")
public class HomePageController {
    @GetMapping("/")
    public ModelAndView loadNavigationPage(HttpServletRequest request){
        HttpSession session = request.getSession();
        Object userId = request.getSession().getAttribute("userId");
        if(session!=null && userId!=null){
            ModelAndView model=new ModelAndView("homeNavigation.html");
            model.addObject("userId",userId.toString());
            return model;
        }else{
            ModelAndView model=new ModelAndView("loginPage.html");
            model.addObject("sessionExpired","Session Expired...! Please sign in again");
            return model;
        }
    }

}
