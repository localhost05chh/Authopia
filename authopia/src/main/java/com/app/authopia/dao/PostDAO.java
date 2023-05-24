package com.app.authopia.dao;

import com.app.authopia.domain.dto.Pagination;
import com.app.authopia.domain.dto.PostDTO;
import com.app.authopia.domain.dto.PostType;
import com.app.authopia.domain.vo.PostVO;
import com.app.authopia.mapper.PostMapper;
import lombok.RequiredArgsConstructor;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
@RequiredArgsConstructor
public class PostDAO{
    private final PostMapper postMapper;

    //      게시글 목록
    public List<PostDTO> findAll(Pagination pagination , PostType postType){
        return postMapper.selectAll(pagination, postType);
    }
    //      게시글 추가
    public void save(PostDTO postDTO){
        postMapper.insert(postDTO);
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
    //    게시글 총 개수
    public int findCountOfPost(PostType postType){
        return postMapper.selectCountOfPost(postType);
    }
    //      게시글 조회수 증가
    public void setViewCount(Long id){
        postMapper.updateViewCount(id);
    }

    // 메인페이지에서 최신 인기 포스트 조회
    public List<PostDTO> findPostMain(Pagination pagination){
        return postMapper.selectMain(pagination);
    }
}