package com.ssafy.finalpjt.user.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.finalpjt.user.dto.UserDto;
import com.ssafy.finalpjt.user.service.UserService;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/users")
@AllArgsConstructor
public class UserController {
	private final UserService userService;
	
	@PostMapping("")
	public int userRegister(@RequestParam("userId") String userId, @RequestParam("userNickname") String userNickname, @RequestParam("password") String password, @RequestParam("userPhone") String userPhone, @RequestParam("allowSearchByPhone") int allowSearchByPhone ) {
		UserDto userDto = new UserDto();
		userDto.setUserId(userId);
		userDto.setUserNickname(userNickname);
		userDto.setPassword(password);
		userDto.setAllowSearchByPhone(allowSearchByPhone);
		userDto.setUserPhone(userPhone);
		System.out.println(userDto);
		return userService.userRegister(userDto);
	}
	@PostMapping("/{userSeq}")
	public int userUpdate(@RequestParam("userId") String userId, @RequestParam("userNickname") String userNickname, @RequestParam("userPhone") String userPhone, @RequestParam("allowSearchByPhone") int allowSearchByPhone) {
		UserDto userDto = userService.getUser(userId);
		userDto.setUserNickname(userNickname);
		userDto.setAllowSearchByPhone(allowSearchByPhone);
		userDto.setUserPhone(userPhone);
		return userService.userUpdate(userDto);
	}
	@PutMapping("/{userSeq}/password")
	public int userUpdatePW(@RequestParam("userId") String userId, @RequestParam("userPassword") String userPassword) {
		UserDto userDto = userService.getUser(userId);
		userDto.setPassword(userPassword);
		return userService.userUpdatePW(userDto);
	}
	@PostMapping("/delete/{userSeq}")
	public int UserDelete(@PathVariable("userId") String userId) {
		return userService.userDelete(userId);
	}
	@GetMapping("/{userId}")
	public UserDto getUser(@PathVariable("userId") String userId) {
		return userService.getUser(userId);
	}
	@GetMapping("/{userSeq}/password")
	public Map<String, String> UserFindPassword(@PathVariable("userId") String userId) {
		Map<String, String> map = new HashMap<>();
		if(userService.userFindPassword(userId) != null) map.put("result", "success");
		else map.put("result", "fail");
		return map;
	}
}
