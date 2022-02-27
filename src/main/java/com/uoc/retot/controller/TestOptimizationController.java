package com.uoc.retot.controller;

import com.uoc.retot.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/api/v1/testOptimization")
public class TestOptimizationController {

    @GetMapping("/")
    public ModelAndView loadOptimizationPage(HttpServletRequest request) {
        return new ModelAndView("optimizationPage.html");
    }

    @PostMapping("/optimize")
    public MultipartFile optimizeDocument(@RequestParam("testTxt") MultipartFile testTxt){
        return testTxt;
    }
}
