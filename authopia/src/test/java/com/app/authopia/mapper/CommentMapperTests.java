package com.app.authopia.mapper;

import com.app.authopia.domain.dto.CommentDTO;
import com.app.authopia.domain.dto.PostDTO;
import com.app.authopia.domain.vo.CommentVO;
import com.app.authopia.domain.vo.PostVO;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.stream.IntStream;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
@Slf4j
public class CommentMapperTests {
    @Autowired
    private CommentMapper commentMapper;

    //    댓글 작성
    @Test
    public void insertTest() {
        CommentVO commentVO = new CommentVO();
        commentVO.setCommentContent("댓글 내용3");
        commentVO.setMemberId(1L);
        commentVO.setPostId(1L);
        commentMapper.insert(commentVO);
    }

    //    댓글 목록
    @Test
    public void selectAllTest() {
        //       성공
        assertThat(commentMapper.selectAll(1L)).hasSize(3);
    }

    //    댓글 수정
    @Test
    public void updateTest() {
        CommentDTO commentDTO = new CommentDTO();
        commentDTO.setId(3L);
        commentDTO.setCommentContent("수정되었습니다");
        commentMapper.update(commentDTO);
    }

    //      댓글 삭제
    @Test
    public void deleteTest() {
        // rangeClosed: 둘다 포함
        IntStream.rangeClosed(5, 6).forEach(i -> commentMapper.delete(Long.valueOf(i)));
    }

    //      게시글의 댓글 전체 삭제
    @Test
    public void deleteAllTest() {
        commentMapper.deleteAll(1L);
    }
}