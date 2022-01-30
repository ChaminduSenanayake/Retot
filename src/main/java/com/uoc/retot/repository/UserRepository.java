package com.uoc.retot.repository;

import com.uoc.retot.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, String> {
    @Query(value = "select * from User order by userId desc limit 1;",nativeQuery = true)
    User findLastData();

    @Query(value = "select * from User where email=:email",nativeQuery = true)
    User getByEmail(@Param("email") String email);

}
