package com.ssafy.finalpjt.auth.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.finalpjt.auth.service.LoginService;
import com.ssafy.finalpjt.user.dto.UserDto;

import jakarta.servlet.http.HttpSession;
import lombok.AllArgsConstructor;

@RestController
@AllArgsConstructor
public class LoginController {
	
	private final LoginService loginService;
	
	@PostMapping("/login")
	public UserDto login(@RequestParam("userId") String userId, @RequestParam("password") String password, HttpSession session) {
		Map<String, String> map = new HashMap<>();
		map.put("userId", userId);
		map.put("password", password);
		
		UserDto user = loginService.login(map);
		session.setAttribute("userDto", user);

		System.out.println("login user " + user);
		return user;
	}
	@GetMapping("/logout")
	public int login(HttpSession session) {
		session.invalidate();
		return 1;
	}
}
