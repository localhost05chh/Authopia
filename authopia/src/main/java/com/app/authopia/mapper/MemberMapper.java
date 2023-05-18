package com.app.authopia.mapper;

import com.app.authopia.domain.vo.MemberVO;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

import java.util.Optional;

@Mapper
public interface MemberMapper {
    // 이메일 중복 검사
    public Optional<MemberVO> selectByMemberEmail(String memberEmail);

    // 회원가입
    public void insert(MemberVO memberVO);

    // 로그인
    public Optional<Long> selectByMemberEmailAndMemberPassword(@Param("memberEmail") String memberEmail, @Param("memberPassword") String memberPassword);
}
