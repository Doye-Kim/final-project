package com.ssafy.finalpjt.user.service;

import org.springframework.stereotype.Service;

import com.ssafy.finalpjt.user.dao.UserDao;
import com.ssafy.finalpjt.user.dto.UserDto;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class UserServiceImpl implements UserService{

	private final UserDao userDao;
	@Override
	public int userRegister(UserDto userDto) {
		return userDao.userRegister(userDto);
	}

	@Override
	public int userUpdate(UserDto userDto) {
		return userDao.userUpdate(userDto);
	}
	@Override
	public int userUpdatePW(UserDto userDto) {
		return userDao.userUpdatePW(userDto);
	}

	@Override
	public int userDelete(String userId) {
		return userDao.userDelete(userId);
	}

	@Override
	public String userFindPassword(String userId) {
		return userDao.userFindPassword(userId);
	}

	@Override
	public UserDto getUser(String userId) {
		return userDao.getUser(userId);
	}

}
