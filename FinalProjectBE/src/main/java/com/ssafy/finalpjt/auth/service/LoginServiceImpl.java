package com.ssafy.finalpjt.auth.service;

import java.util.Map;

import org.springframework.stereotype.Service;

import com.ssafy.finalpjt.auth.dao.LoginDao;
import com.ssafy.finalpjt.user.dto.UserDto;

import jakarta.servlet.http.HttpSession;
import lombok.AllArgsConstructor;
@Service
@AllArgsConstructor
public class LoginServiceImpl implements LoginService{

	private final LoginDao loginDao;
	
	@Override
	public UserDto login(Map<String, String> map) {
		return loginDao.login(map);
	}

	@Override
	public int logout(HttpSession session) {
		return loginDao.logout(session);
	}

}
