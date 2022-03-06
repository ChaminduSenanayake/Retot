package com.uoc.retot.controller;

import com.uoc.retot.dto.ResponseDTO;
import com.uoc.retot.dto.UserDTO;
import com.uoc.retot.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/api/v1/user")
public class UserController {
    @Autowired
    private UserService userService;

    @GetMapping("/regPage")
    public ModelAndView loadRegistrationPage(HttpServletRequest request){
        return new ModelAndView("registration.html");
    }

    @PostMapping("/save")
    public ResponseDTO registerUser(@RequestBody UserDTO userDTO){
        return userService.registerUser(userDTO);
    }

    @PostMapping("/validate")
    public UserDTO login(@RequestBody UserDTO userDTO,HttpServletRequest request){
        UserDTO dto = userService.login(userDTO);
        if(dto!=null){
            request.getSession().setAttribute("userName", dto.getFirstName()+" "+dto.getLastName());
            request.getSession().setAttribute("userId", dto.getUserId());
            request.getSession().setAttribute("userEmail", dto.getEmail());
        }
        return dto;
    }
    @GetMapping("/logout")
    public ModelAndView logOut(HttpServletRequest request) {
        //invalidate the session , this will clear the data from configured database (Mysql/redis/hazelcast)
        return new ModelAndView("loginPage.html");
    }
    @PostMapping("/update")
    public ResponseDTO updateUser(@RequestBody UserDTO userDTO){
        return userService.updateUser(userDTO);
    }

}
