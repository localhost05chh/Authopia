package com.app.authopia.mapper;

import com.app.authopia.domain.dto.PostDTO;
import com.app.authopia.domain.vo.PostVO;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
@Slf4j
public class PostMapperTests {

    @Autowired
    private PostMapper postMapper;

    //      게시글 추가 테스트
    @Test
    public void insertTest(){
        PostVO postVO = new PostVO();
        postVO.setMemberId(1L);
        postVO.setPostType("작품");
        postVO.setPostName("제목3");
        postVO.setPostContent("안녕하세요");
        postMapper.insert(postVO);
    }

    //      게시글 목록 테스트
    @Test
    public void selectAllTest(){
        assertThat(postMapper.selectAll()).hasSize(3);
    }

    //      게시글 조회 테스트
    @Test
    public void selectTest(){
        postMapper.select(2L).map(PostDTO::getPostContent).ifPresent(log::info);
    }

    //      게시글 수정 테스트
    @Test
    public void updateTest(){
        postMapper.select(3L).ifPresent(postDTO -> {
            postDTO.setPostContent("수정해따!!!");
            postMapper.update(postDTO);
        });
    }

    //      게시글 삭제 테스트
    @Test
    public void deleteTest(){
        postMapper.delete(2l);
    }

    //      게시글 복구 테스트
    @Test
    public void restoreTest(){
        postMapper.restore(2l);
    }

}
