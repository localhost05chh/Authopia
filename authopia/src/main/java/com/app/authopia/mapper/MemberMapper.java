package com.app.authopia.mapper;

import com.app.authopia.domain.dto.MemberDTO;
import com.app.authopia.domain.vo.MemberVO;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

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

    // 메인에서 최근 회원 목록 조회
    public List<MemberDTO> selectAll();

    // 메인에서 인기 회원 목록 조회
    public List<MemberDTO> selectPopular();

    // 메인에서 회원 전체 조회
    public List<MemberDTO> selectAllMember();

    // 메인에서 회원 카테고리별 조회
    public List<MemberDTO> selectMemberByCategory(@Param("category") String category);

   // 회원 조회
    public Optional<MemberVO> selectMemberInfo(Long id);

    // 회원 정보 수정
    public void updateMemberInfo(MemberVO memberVO);

    // 회원 페이지 수정
    public void updateMemberPage(MemberVO memberVO);

    // 회원 탈퇴
    public void updateMemberIsRemaining(Long id);

    // 관리자페이지에서 회원 목록 조회
    public List<MemberVO> selectMember();
}
