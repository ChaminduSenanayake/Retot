package com.uoc.retot.dto;

import javax.persistence.Entity;
import javax.persistence.Id;

public class UserDTO {
    private String userId;
    private String FirstName;
    private String LastName;
    private String email;
    private String password;

    public UserDTO(String userId, String firstName, String lastName, String email, String password) {
        this.userId = userId;
        FirstName = firstName;
        LastName = lastName;
        this.email = email;
        this.password = password;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getFirstName() {
        return FirstName;
    }

    public void setFirstName(String firstName) {
        FirstName = firstName;
    }

    public String getLastName() {
        return LastName;
    }

    public void setLastName(String lastName) {
        LastName = lastName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}

