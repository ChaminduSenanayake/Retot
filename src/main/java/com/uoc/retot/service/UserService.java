package com.uoc.retot.service;

import com.sun.xml.internal.ws.policy.EffectiveAlternativeSelector;
import com.uoc.retot.dto.ResponseDTO;
import com.uoc.retot.dto.UserDTO;
import com.uoc.retot.entity.User;
import com.uoc.retot.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.NumberFormat;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    public ResponseDTO registerUser(UserDTO userDTO){
        System.out.println(getNewID());
        User user = new User(getNewID(),userDTO.getFirstName(),userDTO.getLastName(),userDTO.getEmail(),userDTO.getPassword());
        if(getUserByEmail(userDTO.getEmail())==null){
            userRepository.save(user);
            if (userRepository.findById(user.getUserId()).isPresent()){
                return new ResponseDTO(true,"User Registerd Successfully");
            }
        }else if(getUserByEmail(userDTO.getEmail())!=null){
            return new ResponseDTO(false,"User Already Exists");
        }
        return new ResponseDTO(false,"User Registration Failed");
    }

    public UserDTO getUserByEmail(String email){
        User user = userRepository.getByEmail(email);
        if (user!=null){
            return new UserDTO(user.getUserId(),user.getFirstName(),user.getLastName(),user.getEmail(),user.getPassword());
        }else{
            return null;
        }

    }

    public UserDTO login(UserDTO dto){
        User user = userRepository.getByEmail(dto.getEmail());
        if (user!=null && user.getPassword().equalsIgnoreCase(dto.getPassword())){
            return new UserDTO(user.getUserId(),user.getFirstName(),user.getLastName(),user.getEmail(),"");
        }else{
            return null;
        }

    }

    public String getNewID() {
        String prifix = "U";
        try {
            User user= userRepository.findLastData();
            if (user != null) {
                String lastId = user.getUserId();
                int id = Integer.parseInt(lastId.split(prifix)[1]);
                id++;
                NumberFormat numberFormat = NumberFormat.getIntegerInstance();
                numberFormat.setMinimumIntegerDigits(3);
                numberFormat.setGroupingUsed(false);
                String newID = numberFormat.format(id);
                return prifix + newID;
            } else {
                return prifix + "001";
            }
        } catch (NullPointerException e) {
            e.printStackTrace();
        }
        return "0";
    }

}
