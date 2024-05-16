package com.ssafy.finalpjt.auth.dao;

import java.util.Map;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.web.bind.annotation.RequestBody;

import com.ssafy.finalpjt.user.dto.UserDto;

import jakarta.servlet.http.HttpSession;
@Mapper
public interface LoginDao {
	UserDto login(@RequestBody Map<String, String> map);
	int logout(HttpSession session);
}
