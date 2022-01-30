package com.uoc.retot.controller;


import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/api/v1/home")
public class HomePageController {
    @GetMapping("/")
    public ModelAndView loadNavigationPage(HttpServletRequest request){
        return new ModelAndView("homeNavigation.html");
    }

}
