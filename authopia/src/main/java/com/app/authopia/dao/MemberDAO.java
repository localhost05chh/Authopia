package com.app.authopia.dao;

import com.app.authopia.domain.dto.MemberDTO;
import com.app.authopia.domain.vo.MemberVO;
import com.app.authopia.mapper.MemberMapper;
import lombok.RequiredArgsConstructor;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
@RequiredArgsConstructor
public class MemberDAO {
    private final MemberMapper memberMapper;

    // 이메일 중복 검사
    public Optional<MemberVO> findByMemberEmail(String memberEmail){
        return memberMapper.selectByMemberEmail(memberEmail);
    };

    // 회원가입
    public void save(MemberVO memberVO){
        memberMapper.insert(memberVO);
    };

    // 카카오 회원가입
    public void saveByKakao(MemberVO memberVO){ memberMapper.insertByKakao(memberVO); };

    // 로그인
    public Optional<Long> findByMemberEmailAndMemberPassword(String memberEmail, String memberPassword){
        return memberMapper.selectByMemberEmailAndMemberPassword(memberEmail, memberPassword);
    };

    // 카카오 로그인
    public Optional<Long> findByMemberEmailAndMemberKakaoLogin(String memberEmail, String memberKakaoLogin){
        return memberMapper.selectByMemberEmailAndMemberKakaoLogin(memberEmail, memberKakaoLogin);
    };

    // 비밀번호 재설정
    public void setPassword(String memberEmail, String memberPassword){
        memberMapper.updatePassword(memberEmail, memberPassword);
    };

    // 메인에서 최근 회원 목록 조회
    public List<MemberDTO> findAll(){
        return memberMapper.selectAll();
    }

    // 메인에서 인기 회원 목록 조회
    public List<MemberDTO> findPopular(){
        return memberMapper.selectPopular();
    }

    // 메인에서 회원 전체 조회
    public List<MemberDTO> findAllMember(){
        return memberMapper.selectAllMember();
    }

    // 메인에서 회원 카테고리별 조회
    public List<MemberDTO> findMemberByCategory(String category){
        return memberMapper.selectMemberByCategory(category);
    }

    // 회원 조회
    public Optional<MemberVO> findByMemberId(Long id){
        return memberMapper.selectMemberInfo(id);
    };

    // 회원 정보 수정
    public void setMemberInfo(MemberVO memberVO){
        memberMapper.updateMemberInfo(memberVO);
    };

    // 회원 탈퇴
    public void cancelMember(Long id){
        memberMapper.updateMemberIsRemaining(id);
    };

}