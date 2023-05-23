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
    public void checkEmailTest(){
        Optional<MemberVO> foundMember = memberService.checkEmail("gmatn98@naver.com");
        Assertions.assertThat(foundMember.isPresent()).isEqualTo(true);
    }

    @Test
    public void loginTest(){
        Optional<Long> foundId = memberService.login("gmatn98@naver.com", "123456");
        assertThat(foundId.isPresent()).isEqualTo(true);
    }

    @Test
    public void modifyPasswordTest(){
        memberService.modifyPassword("gmatn98@naver.com", "123456123456");
    }

//    @Test
//    public void getNewMemberTest(){
//        assertThat(memberService.getNewMember()).hasSize(13);
//        memberService.getNewMember().stream().map(MemberVO::toString).forEach(log::info);
//    }
//
//    @Test
//    public void getPopularMemberTest(){
//        assertThat(memberService.getPopularMember()).hasSize(14);
//        memberService.getPopularMember().stream().map(MemberVO::toString).forEach(log::info);
//    }
//
//    @Test
//    public void findAllMemberTest(){
//        memberService.getAllMember().stream().map(MemberVO::toString).forEach(log::info);
//    }
//
//    @Test
//    public void findMemberByCategoryTest(){
//        memberService.getMemberByCategory("writing").stream().map(MemberVO::toString).forEach(log::info);
//    }

    @Test
    public void getMemberInfoTest(){
        Optional<MemberVO> foundMemberInfo = memberService.getMemberInfo(1L);
        assertThat(foundMemberInfo.isPresent()).isEqualTo(true);
    }

    @Test
    public void modifyMemberInfo(){
        memberService.getMemberInfo(1L).ifPresent(memberVO -> {
            memberVO.setMemberName("섭섭");
            memberVO.setMemberCategory("글");
            memberVO.setMemberBriefIntroduce("나도 작가할래");
            memberVO.setMemberIntroduce("뭐든지 해보고 싶어서 가입했어요");
            memberVO.setMemberUrl("dev-Sub");
            memberService.modifyMemberInfo(memberVO);
        });
    }

    @Test
    public void deleteMember(){
        memberService.deleteMember(1L);
    }


}

