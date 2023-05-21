package com.app.authopia.service.member;


import com.app.authopia.domain.vo.MemberVO;
import org.apache.ibatis.annotations.Param;

import java.util.Optional;

public interface MemberService {
    //    이메일 중복검사
    public Optional<MemberVO> checkEmail(String memberEmail);

    //    회원가입
    public void join(MemberVO memberVO);

    //    로그인
    public Optional<Long> login(String memberEmail, String memberPassword);

    // 비밀번호 재설정
    public void modifyPassword(String memberEmail, String memberPassword);

    // 회원 조회
    public Optional<MemberVO> getMemberInfo(Long id);

    // 회원 탈퇴
    public void deleteMember(Long id);

}