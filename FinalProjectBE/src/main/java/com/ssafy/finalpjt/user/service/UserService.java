package com.ssafy.finalpjt.user.service;

import com.ssafy.finalpjt.user.dto.UserDto;

public interface UserService {
	UserDto getUser(String userId);
	int userRegister(UserDto userDto);
	int userUpdate(UserDto userDto);
	int userUpdatePW(UserDto userDto);
	int userDelete(String userId);
	String userFindPassword(String userId);
}
