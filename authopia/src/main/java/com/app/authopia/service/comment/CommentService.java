package com.app.authopia.service.comment;

import com.app.authopia.domain.dto.CommentDTO;
import com.app.authopia.domain.vo.CommentVO;
import com.app.authopia.domain.dto.Pagination;

import java.util.List;

public interface CommentService {
    //      댓글 목록
    public List<CommentDTO> getList(Long id, Pagination pagination);

    //      댓글 작성
    public void write(CommentVO commentVO);

    //      댓글 수정
    public void modify(CommentVO commentVO);

    //      댓글 삭제
    public void remove(Long id);

    //      게시글의 댓글 전체 삭제
    public void removeAll(Long postId);

    default CommentDTO toDTO(CommentVO commentVO){
        CommentDTO commentDTO = new CommentDTO();
        commentDTO.setId(commentVO.getId());
        commentDTO.setMemberId(commentVO.getMemberId());
        commentDTO.setPostId(commentVO.getPostId());
        commentDTO.setCommentContent(commentVO.getCommentContent());
        commentDTO.setCommentRegisterDate(commentVO.getCommentRegisterDate());
        commentDTO.setCommentUpdateDate(commentVO.getCommentUpdateDate());
        return commentDTO;
    }
}
