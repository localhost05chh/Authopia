package com.app.authopia.dao;

import com.app.authopia.domain.dto.CommentDTO;
import com.app.authopia.domain.vo.CommentVO;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.stream.IntStream;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
@Slf4j
public class CommentDAOTests {
//    @Autowired
//    private CommentDAO commentDAO;
//
//    @Test
//    public void saveTest() {
//        CommentVO commentVO = new CommentVO();
//        commentVO.setCommentContent("댓글 내용3");
//        commentVO.setMemberId(1L);
//        commentVO.setPostId(1L);
//        commentDAO.save(commentVO);
//    }
//
//    //    댓글 목록
//    @Test
//    public void findAllTest() {
//        //       성공
//        assertThat(commentDAO.findAll(1L)).hasSize(3);
//    }
//
//    //    댓글 수정
//    @Test
//    public void setCommentTest() {
//        CommentDTO commentDTO = new CommentDTO();
//        commentDTO.setId(3L);
//        commentDTO.setCommentContent("수정되었습니다");
//        commentDAO.setComment(commentDTO);
//    }
//
//    //      댓글 삭제
//    @Test
//    public void deleteTest() {
//        // rangeClosed: 둘다 포함
//        IntStream.rangeClosed(5, 6).forEach(i -> commentDAO.delete(Long.valueOf(i)));
//    }
//
//    //      게시글의 댓글 전체 삭제
//    @Test
//    public void deleteAllTest() {
//        commentDAO.deleteAll(1L);
//    }

}
