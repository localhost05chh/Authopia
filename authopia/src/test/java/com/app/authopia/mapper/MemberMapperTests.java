package com.app.authopia.mapper;

import com.app.authopia.domain.vo.MemberVO;
import lombok.extern.slf4j.Slf4j;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.Optional;

import static org.assertj.core.api.Assertions.*;

@SpringBootTest
@Slf4j
public class MemberMapperTests {
    @Autowired
    private MemberMapper memberMapper;

    @Test
    public void insertTest(){
        MemberVO memberVO = new MemberVO();
        memberVO.setMemberEmail("gmatn96@naver.com");
        memberVO.setMemberPassword("1234");
        memberVO.setMemberName("임희수");
        memberMapper.insert(memberVO);
    }

    @Test
    public void selectByMemberEmailTest(){
        Optional<MemberVO> foundMember = memberMapper.selectByMemberEmail("gmatn96@naver.com");
        assertThat(foundMember.isPresent()).isEqualTo(true);
    }

    @Test
    public void selectByMemberEmailAndMemberPasswordTest(){
        Optional<Long> foundId = memberMapper.selectByMemberEmailAndMemberPassword("gmatn96@naver.com", "1234");
        assertThat(foundId.isPresent()).isEqualTo(true);
    }
}
