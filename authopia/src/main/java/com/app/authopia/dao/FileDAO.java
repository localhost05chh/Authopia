package com.app.authopia.dao;

import com.app.authopia.domain.vo.FileVO;
import com.app.authopia.mapper.FileMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@RequiredArgsConstructor
public class FileDAO {
    private final FileMapper fileMapper;

    //    파일 추가
    public void saveFile(FileVO fileVO){ fileMapper.insertFile(fileVO);}

    //    파일 삭제
    public void deleteFile(Long id){
        fileMapper.deleteFile(id);
    }

    //    게시글의 파일 전체 삭제
    public void deleteAllFile(Long postId){
        fileMapper.deleteAllFile(postId);
    }

    //    파일 조회
    public List<FileVO> findAllFile(Long postId){ return fileMapper.selectAllFile(postId); }
}
