package com.app.authopia.service.member;


import com.app.authopia.domain.dto.MemberDTO;
import com.app.authopia.domain.vo.MemberVO;
import org.apache.ibatis.annotations.Param;

import java.util.List;
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

    // 메인에서 최근 회원 목록 조회
    public List<MemberDTO> getNewMember();

    // 메인에서 인기 회원 목록 조회
    public List<MemberDTO> getPopularMember();

    // 메인에서 회원 전체 조회
    public List<MemberDTO> getAllMember();

    // 메인에서 회원 카테고리별 조회
    public List<MemberDTO> getMemberByCategory(String category);

    // 회원 조회
    public Optional<MemberVO> getMemberInfo(Long id);

    // 회원 정보 수정
    public void modifyMemberInfo(MemberVO memberVO);

    // 회원 페이지 수정
    public void modifyMemberPage(MemberVO memberVO);

   // 회원 탈퇴
    public void deleteMember(Long id);

}