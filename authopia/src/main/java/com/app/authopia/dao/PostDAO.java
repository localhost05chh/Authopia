package com.app.authopia.dao;

import com.app.authopia.domain.dto.PostDTO;
import com.app.authopia.domain.vo.PostVO;
import com.app.authopia.mapper.PostMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
@RequiredArgsConstructor
public class PostDAO{
    private final PostMapper postMapper;

    //      게시글 목록
    public List<PostDTO> findAll(){
        return postMapper.selectAll();
    }
    //      게시글 추가
    public void save(PostVO postVO){
        postMapper.insert(postVO);
    }
    //      게시글 조회
    public Optional<PostDTO> findById(Long id){
        return postMapper.select(id);
    }
    //      게시글 수정
    public void setPostDTO(PostDTO postDTO){
        postMapper.update(postDTO);
    }
    //      게시글 삭제
    public void delete(Long id){
        postMapper.delete(id);
    }
    //      게시글 복구
    public void restore(Long id){
        postMapper.restore(id);
    }
}