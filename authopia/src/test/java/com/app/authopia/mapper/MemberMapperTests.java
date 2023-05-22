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
        memberVO.setMemberEmail("gmatn97@naver.com");
        memberVO.setMemberPassword("1234");
        memberVO.setMemberName("임희수");
        memberMapper.insert(memberVO);
    }

    @Test
    public void insetByKakaoTest(){
        MemberVO memberVO = new MemberVO();
        memberVO.setMemberEmail("gmatn98@naver.com");
        memberVO.setMemberName("임희수");
        memberVO.setMemberKakaoLogin("1234");
        memberMapper.insertByKakao(memberVO);
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

    @Test
    public void selectByMemberEmailAndMemberKakaoLoginTest(){
        Optional<Long> foundId = memberMapper.selectByMemberEmailAndMemberKakaoLogin("gmatn98@naver.com", "1234");
        assertThat(foundId.isPresent()).isEqualTo(true);
    }

    @Test
    public void updatePasswordTest(){
        memberMapper.updatePassword("gmatn96@naver.com", "12341234");
    }

    @Test
    public void selectAllTest(){
        assertThat(memberMapper.selectAll()).hasSize(13);
        memberMapper.selectAll().stream().map(MemberVO::toString).forEach(log::info);
    }

    @Test
    public void selectPopularTest(){
//        assertThat(memberMapper.selectPopular()).hasSize(14);
        memberMapper.selectPopular().stream().map(MemberVO::toString).forEach(log::info);
    }

    @Test
    public void selectMemberInfo(){
        Optional<MemberVO> foundMemberInfo = memberMapper.selectMemberInfo(1L);
        assertThat(foundMemberInfo.isPresent()).isEqualTo(true);
    }
//    @Test
//    public void updateMemberInfo(){
//        memberMapper.selectMemberInfo(1L, "섭섭", "나도 작가할래", "뭐든지 해보고 싶어서 가입했어요", "");
//    }

    @Test
    public void updateMemberIsRemainingTest(){
        memberMapper.updateMemberIsRemaining(1L);
    }
}
