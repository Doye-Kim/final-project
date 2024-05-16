package com.ssafy.finalpjt.user.dao;

import org.apache.ibatis.annotations.Mapper;

import com.ssafy.finalpjt.user.dto.UserDto;

@Mapper
public interface UserDao {
	UserDto getUser(String userId);
	int userRegister(UserDto userDto);
	int userUpdate(UserDto userDto);
	int userUpdatePW(UserDto userDto);
	int userDelete(String userId);
	String userFindPassword(String userId);
}