package com.app.authopia.service;

import com.app.authopia.domain.vo.MemberVO;
import com.app.authopia.service.member.MemberService;
import lombok.extern.slf4j.Slf4j;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
@Slf4j
public class MemberServiceTests {
    @Autowired
    private MemberService memberService;

    @Test
    public void joinTest(){
        MemberVO memberVO = new MemberVO();
        memberVO.setMemberEmail("gmatn98@naver.com");
        memberVO.setMemberPassword("123456");
        memberVO.setMemberName("임희수3");
        memberService.join(memberVO);
    }

    @Test
    public void findByMemberEmailTest(){
        Optional<MemberVO> foundMember = memberService.checkEmail("gmatn98@naver.com");
        Assertions.assertThat(foundMember.isPresent()).isEqualTo(true);
    }

    @Test
    public void findByMemberEmailAndMemberPassword(){
        Optional<Long> foundId = memberService.login("gmatn98@naver.com", "123456");
        assertThat(foundId.isPresent()).isEqualTo(true);
    }
}
