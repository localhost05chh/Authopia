package com.app.authopia.service.member;


import com.app.authopia.domain.vo.MemberVO;

import java.util.Optional;

public interface MemberService {
    //    이메일 중복검사
    public Optional<MemberVO> checkEmail(String memberEmail);

    //    회원가입
    public void join(MemberVO memberVO);

    //    로그인
    public Optional<Long> login(String memberEmail, String memberPassword);
}