package com.app.authopia.dao;

import com.app.authopia.domain.vo.MemberVO;
import com.app.authopia.mapper.MemberMapper;
import lombok.RequiredArgsConstructor;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

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

    // 회원 탈퇴
    public void cancelMember(Long id){
        memberMapper.updateMemberIsRemaining(id);
    }
}