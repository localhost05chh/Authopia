package com.app.authopia.mapper;

import com.app.authopia.domain.dto.CommentDTO;
import com.app.authopia.domain.vo.CommentVO;
import com.app.authopia.domain.dto.Pagination;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface CommentMapper {
//      댓글 목록
    public List<CommentDTO> selectAll(Long id, Pagination pagination);

//      댓글 작성
    public void insert(CommentVO commentVO);

//      댓글 수정
    public void update(CommentDTO commentDTO);

//      댓글 삭제
    public void delete(Long id);

//      게시글의 댓글 전체 삭제
    public void deleteAll(Long postId);
}
