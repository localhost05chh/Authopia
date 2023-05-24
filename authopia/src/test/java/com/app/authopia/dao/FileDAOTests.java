package com.app.authopia.dao;

import com.app.authopia.domain.type.FileType;
import com.app.authopia.domain.vo.FileVO;
import com.app.authopia.domain.vo.MemberVO;
import lombok.extern.slf4j.Slf4j;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.Optional;
import java.util.UUID;

@SpringBootTest
@Slf4j
public class FileDAOTests {
    @Autowired
    private FileDAO fileDAO;

    @Test
    public void saveTest() {
        FileVO fileVO = new FileVO();
        fileVO.setFileName("신궁코강.png");
        fileVO.setFileSize(1234L);
        fileVO.setFileUuid(UUID.randomUUID().toString());
        fileVO.setFilePath("2023/05/24");
        fileVO.setFileType(FileType.REPRESENTATIVE.name());
        fileVO.setPostId(1L);
        fileDAO.saveFile(fileVO);
    }

    @Test
    public void findAllTest(){
        fileDAO.findAllFile(1L).stream().map(FileVO::toString).forEach(log::info);
    }


    @Test
    public void findProfileImageTest(){
        Optional<FileVO> foundImage = fileDAO.findProfileImage(26L);
        Assertions.assertThat(foundImage.isPresent()).isEqualTo(true);
    }
}
