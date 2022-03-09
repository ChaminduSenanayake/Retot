package com.uoc.retot.controller;

import com.uoc.retot.dto.ResponseDTO;
import com.uoc.retot.dto.UserDTO;
import com.uoc.retot.dto.UserUpdateDTO;
import com.uoc.retot.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.Query;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import javax.websocket.server.PathParam;

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
    public ResponseDTO updateUser(@RequestBody UserUpdateDTO userDTO){
        return userService.updateUser(userDTO);
    }

    @GetMapping("/get/{userId}")
    public UserDTO getUser(@PathVariable("userId") String userId, HttpServletRequest request){
        String userID=userId;
        if(userID==""){
            HttpSession session = request.getSession();
            userID = (String) request.getSession().getAttribute("userId");
        }
        return userService.getUser(userID);
    }
}
