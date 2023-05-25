package com.app.authopia.mapper;

import com.app.authopia.domain.type.FileType;
import com.app.authopia.domain.vo.FileVO;
import com.app.authopia.domain.vo.MemberVO;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.Optional;
import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
@Slf4j
public class FileMapperTests {
    @Autowired
    private FileMapper fileMapper;

    // 파일 추가
    @Test
    public void insertTest(){
        FileVO fileVO = new FileVO();
        fileVO.setFileName("신궁코강.png");
        fileVO.setFileSize(1234L);
        fileVO.setFileUuid(UUID.randomUUID().toString());
        fileVO.setFilePath("2023/05/24");
        fileVO.setFileType(FileType.REPRESENTATIVE.name());
        fileVO.setPostId(1L);
        fileMapper.insertFile(fileVO);
    }

    // 파일 조회
    @Test
    public void selectAllTest(){
        fileMapper.selectAllFile(1L).stream().map(FileVO::toString).forEach(log::info);
    }

    // 게시글 삭제
    @Test
    public void deleteTest(){
        fileMapper.deleteFile(1L);
        assertThat(fileMapper.selectAllFile(22L)).hasSize(0);
    }

    //게시글의 파일 전체 삭제
    @Test
    public void deleteAllTest(){
        fileMapper.deleteAllFile(22L);
        assertThat(fileMapper.selectAllFile(22L)).hasSize(0);
    }

    // 프로필 사진 조회
    @Test
    public void selectProfileImage(){
        Optional<FileVO> foundImage = fileMapper.selectProfileImage(26L);
        assertThat(foundImage.isPresent()).isEqualTo(true);
    }

    // 쪽지 파일 추가
    @Test
    public void insertMessageFileTest(){
        FileVO fileVO = new FileVO();
        fileVO.setFileName("test-image.png");
        fileVO.setFileSize(1234L);
        fileVO.setFileUuid(UUID.randomUUID().toString());
        fileVO.setFilePath("2023/05/23");
        fileVO.setFileType(FileType.REPRESENTATIVE.name());
        fileVO.setMessageId(37L);
        fileMapper.insertMessageFile(fileVO);
    }

    // 쪽지 파일 조회
    @Test
    public void selectAllMessageFileTest(){
        fileMapper.selectAllMessageFile(37L).stream().map(FileVO::toString).forEach(log::info);
    }

    // 쪽지 파일 전체 삭제
    @Test
    public void deleteAllMessageFileTest(){
        fileMapper.deleteAllMessageFile(37L);
        assertThat(fileMapper.selectAllMessageFile(37L)).hasSize(0);
    }
}
