package com.app.authopia.dao;

import com.app.authopia.domain.dto.PostDTO;
import com.app.authopia.domain.vo.PostVO;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;


import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
@Slf4j
public class PostDAOTests {
    @Autowired
    private PostDAO postDAO;

    @Test
    public void saveTest(){
        PostVO postVO = new PostVO();
        postVO.setMemberId(1L);
        postVO.setPostType("작품");
        postVO.setPostName("제목4");
        postVO.setPostContent("안녕하세요");
        postDAO.save(postVO);
    }

    //      게시글 목록 테스트
//    @Test
//    public void findAllTest(){
//        assertThat(postDAO.findAll()).hasSize(4);
//    }

    //      게시글 조회 테스트
    @Test
    public void findByIdTest(){
        postDAO.findById(2L).map(PostDTO::getPostContent).ifPresent(log::info);
    }

    //      게시글 수정 테스트
    @Test
    public void setPostDTOTest(){
        postDAO.findById(2L).ifPresent(postDTO -> {
            postDTO.setPostContent("현호야 공부좀 하자");
            postDAO.setPostDTO(postDTO);
        });
    }

    //      게시글 삭제 테스트
    @Test
    public void deleteTest(){
        postDAO.delete(2l);
    }

    //      게시글 복구 테스트
    @Test
    public void restoreTest(){
        postDAO.restore(2l);
    }
}
