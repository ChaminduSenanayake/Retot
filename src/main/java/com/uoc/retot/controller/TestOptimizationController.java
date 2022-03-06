package com.uoc.retot.controller;

import com.uoc.retot.dto.UploadFileResponseDTO;
import com.uoc.retot.service.TestOptimizationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.List;

@RestController
@RequestMapping("/api/v1/testOptimization")
public class TestOptimizationController {
    @Autowired
    private TestOptimizationService testOptimizationService;

    @GetMapping("/")
    public ModelAndView loadOptimizationPage(HttpServletRequest request) {
        HttpSession session = request.getSession();
        Object userId = request.getSession().getAttribute("userId");
        if(session!=null && userId!=null){
            ModelAndView model=new ModelAndView("optimizationPage.html");
            model.addObject("userId",userId.toString());
            return model;
        }else{
            ModelAndView model=new ModelAndView("loginPage.html");
            model.addObject("sessionExpired","Session Expired...! Please sign in again");
            return model;
        }
    }

    @PostMapping("/saveDataTable")
    public UploadFileResponseDTO uploadCSVDocument(@RequestParam("testTableCSV") MultipartFile testTableCSV,@RequestParam("fileName") String fileName, HttpServletRequest request){
        HttpSession session = request.getSession();
        String userId = (String) request.getSession().getAttribute("userId");
        if (userId != null) {
            return testOptimizationService.uploadCSVDocument(testTableCSV,fileName, userId);
        }else{
            return new UploadFileResponseDTO(false,"Unable to find user");
        }
    }

    @PostMapping("/optimize")
    public UploadFileResponseDTO optimizeTestCases(@RequestParam("testTxt") MultipartFile testTxt, HttpServletRequest request){
        HttpSession session = request.getSession();
        String userId = (String) request.getSession().getAttribute("userId");
        if (userId != null) {
            return testOptimizationService.optimizeTestCases(testTxt, userId);
        }else{
            return new UploadFileResponseDTO(false,"Unable to find user");
        }
    }

}
