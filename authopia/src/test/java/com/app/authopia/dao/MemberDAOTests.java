package com.app.authopia.dao;

import com.app.authopia.domain.vo.MemberVO;
import lombok.extern.slf4j.Slf4j;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
@Slf4j
public class MemberDAOTests {
    @Autowired
    private MemberDAO memberDAO;

    @Test
    public void saveTest(){
        MemberVO memberVO = new MemberVO();
        memberVO.setMemberEmail("gmatn97@naver.com");
        memberVO.setMemberPassword("12345");
        memberVO.setMemberName("임희수2");
        memberDAO.save(memberVO);
    }

    @Test
    public void findByMemberEmailTest(){
        Optional<MemberVO> foundMember = memberDAO.findByMemberEmail("gmatn97@naver.com");
        Assertions.assertThat(foundMember.isPresent()).isEqualTo(true);
    }

    @Test
    public void findByMemberEmailAndMemberPasswordTest(){
        Optional<Long> foundId = memberDAO.findByMemberEmailAndMemberPassword("gmatn97@naver.com", "12345");
        assertThat(foundId.isPresent()).isEqualTo(true);
    }

    @Test
    public void setPasswordTest(){
        memberDAO.setPassword("gmatn97@naver.com","1234512345");
    }

    @Test
    public void selectAllTest(){
        assertThat(memberDAO.findAll()).hasSize(13);
        memberDAO.findAll().stream().map(MemberVO::toString).forEach(log::info);
    }

    @Test
    public void findByMemberIdTest(){
        Optional<MemberVO> foundMemberInfo = memberDAO.findByMemberId(1L);
        assertThat(foundMemberInfo.isPresent()).isEqualTo(true);
    }

    @Test
    public void cancelMemberTest(){
        memberDAO.cancelMember(1L);
    }

}
