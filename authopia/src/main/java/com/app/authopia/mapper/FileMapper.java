package com.app.authopia.mapper;

import com.app.authopia.domain.vo.FileVO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Optional;

@Mapper
public interface FileMapper {
    //    파일 추가
    public void insertFile(FileVO fileVO);

    //    파일 삭제
    public void deleteFile(Long id);

    //    게시글의 파일 전체 삭제
    public void deleteAllFile(Long postId);

    //    파일 조회
    public List<FileVO> selectAllFile(Long postId);

    // 프로필 사진 조회
    public Optional<FileVO> selectProfileImage(Long memberId);

    // 쪽지 파일 추가
    public void insertMessageFile(FileVO fileVO);

    // 쪽지 파일 조회
    public List<FileVO> selectAllMessageFile(Long messageId);

    // 쪽지 파일 전체 삭제
    public void deleteAllMessageFile(Long messageId);
}
