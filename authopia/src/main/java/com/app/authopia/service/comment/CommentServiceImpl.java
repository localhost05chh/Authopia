package com.app.authopia.service.comment;

import com.app.authopia.dao.CommentDAO;
import com.app.authopia.domain.dto.CommentDTO;
import com.app.authopia.domain.vo.CommentVO;
import com.app.authopia.domain.dto.Pagination;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CommentServiceImpl implements CommentService{
    private final CommentDAO commentDAO;

    //      댓글 목록
    @Override
    public List<CommentDTO> getList(Long id, Pagination pagination){

         return commentDAO.findAll(id, pagination);
    }

    //      댓글 작성
    @Override
    public void write(CommentVO commentVO){
        commentDAO.save(commentVO);
    }

    //      댓글 수정
    @Override
    public void modify(CommentVO commentVO){
        commentDAO.setComment(toDTO(commentVO));
    }

    //      댓글 삭제
    @Override
    public void remove(Long id){
        commentDAO.delete(id);
    }

    //      게시글의 댓글 전체 삭제
    @Override
    public void removeAll(Long postId){
        commentDAO.deleteAll(postId);
    }
}
