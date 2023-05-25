package com.app.authopia.dao;

import com.app.authopia.domain.dto.CommentDTO;
import com.app.authopia.domain.vo.CommentVO;
import com.app.authopia.domain.dto.Pagination;
import com.app.authopia.mapper.CommentMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@RequiredArgsConstructor
public class CommentDAO {
    private final CommentMapper commentMapper;

    //      댓글 목록
    public List<CommentDTO> findAll(Long id, Pagination pagination){
        return commentMapper.selectAll(id, pagination);
    }

    //      댓글 작성
    public void save(CommentVO commentVO){
        commentMapper.insert(commentVO);
    }

    //      댓글 수정
    public void setComment(CommentDTO commentDTO){
        commentMapper.update(commentDTO);
    }

    //      댓글 삭제
    public void delete(Long id){
        commentMapper.delete(id);
    }

    //      게시글의 댓글 전체 삭제
    public void deleteAll(Long postId){
        commentMapper.deleteAll(postId);
    }
}
