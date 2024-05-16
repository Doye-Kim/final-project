package com.ssafy.finalpjt.auth.service;

import java.util.Map;

import com.ssafy.finalpjt.user.dto.UserDto;

import jakarta.servlet.http.HttpSession;

public interface LoginService {
	UserDto login(Map<String, String> map);
	int logout(HttpSession session);
}
