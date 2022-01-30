package com.uoc.retot.controller;

import com.uoc.retot.dto.ResponseDTO;
import com.uoc.retot.dto.UserDTO;
import com.uoc.retot.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/api/v1/login")
public class LoginController {
    @Autowired
    private UserService userService;

    @GetMapping("/")
    public ModelAndView loadPage(HttpServletRequest request){
        return new ModelAndView("index.html") ;
    }
    public UserDTO login(@RequestBody UserDTO userDTO){
        return userService.login(userDTO);
    }
}