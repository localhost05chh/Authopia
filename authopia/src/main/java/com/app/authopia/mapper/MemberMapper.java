package com.app.authopia.mapper;

import com.app.authopia.domain.vo.MemberVO;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

import java.util.List;
import java.util.Optional;

@Mapper
public interface MemberMapper {
    // 이메일 중복 검사
    public Optional<MemberVO> selectByMemberEmail(String memberEmail);

    // 회원가입
    public void insert(MemberVO memberVO);

    // 카카오 회원가입
    public void insertByKakao(MemberVO memberVO);

    // 로그인
    public Optional<Long> selectByMemberEmailAndMemberPassword(@Param("memberEmail") String memberEmail, @Param("memberPassword") String memberPassword);

    // 카카오 로그인
    public Optional<Long> selectByMemberEmailAndMemberKakaoLogin(@Param("memberEmail") String memberEmail, @Param("memberKakaoLogin") String memberKakaoLogin);

    // 비밀번호 재설정
    public void updatePassword(@Param("memberEmail") String memberEmail, @Param("memberPassword") String memberPassword);

    // 메인에서 회원 목록 조회
    public List<MemberVO> selectAll();

   // 회원 조회
    public Optional<MemberVO> selectMemberInfo(Long id);

    // 회원 탈퇴
    public void updateMemberIsRemaining(Long id);
}
