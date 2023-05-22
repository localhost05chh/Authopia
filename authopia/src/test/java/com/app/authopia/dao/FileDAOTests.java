package com.app.authopia.dao;

import com.app.authopia.domain.vo.FileVO;
import com.app.authopia.domain.vo.MemberVO;
import lombok.extern.slf4j.Slf4j;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.Optional;

@SpringBootTest
@Slf4j
public class FileDAOTests {
    @Autowired
    private FileDAO fileDAO;

    @Test
    public void findProfileImageTest(){
        Optional<FileVO> foundImage = fileDAO.findProfileImage(26L);
        Assertions.assertThat(foundImage.isPresent()).isEqualTo(true);
    }
}
