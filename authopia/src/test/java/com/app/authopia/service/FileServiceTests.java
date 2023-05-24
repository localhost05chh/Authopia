package com.app.authopia.service;

import com.app.authopia.domain.vo.FileVO;
import com.app.authopia.domain.vo.MemberVO;
import com.app.authopia.service.file.FileService;
import com.app.authopia.service.member.MemberService;
import lombok.extern.slf4j.Slf4j;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.Optional;

@SpringBootTest
@Slf4j
public class FileServiceTests {
    @Autowired
    private FileService fileService;


    @Test
    public void getProfileImageTest(){
        Optional<FileVO> foundImage = fileService.getProfileImage(26l);
        Assertions.assertThat(foundImage.isPresent()).isEqualTo(true);
    }
}
