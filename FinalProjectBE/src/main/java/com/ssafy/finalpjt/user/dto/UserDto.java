package com.ssafy.finalpjt.user.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class UserDto {
	private int userSeq;
    private String userId;
    private String password;
    private String userNickname;
    private String userPhone;
    private int allowSearchByPhone;
    private int isQuit;
}
