package com.app.authopia.mapper;

import com.app.authopia.domain.vo.FileVO;
import com.app.authopia.domain.vo.MemberVO;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
@Slf4j
public class FileMapperTests {
    @Autowired
    private FileMapper fileMapper;

    @Test
    public void selectProfileImage(){
        Optional<FileVO> foundImage = fileMapper.selectProfileImage(26L);
        assertThat(foundImage.isPresent()).isEqualTo(true);
    }
}
