package com.app.authopia.service;

import com.app.authopia.domain.dto.PostDTO;
import com.app.authopia.domain.vo.PostVO;
import com.app.authopia.service.post.PostService;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.Optional;

@SpringBootTest
@Slf4j
public class PostServiceTests {
    @Autowired
    private PostService postService;

    //  게시글 추가
    @Test
    public void writeTest(){
        PostVO postVO = new PostVO();
        postVO.setMemberId(1L);
        postVO.setPostType("작품");
        postVO.setPostName("제목4");
        postVO.setPostContent("되기만 해봐?");
        postService.write(postVO);
    }

    //  게시글 조회
    @Test
    public void readTest(){
        Long id = 2L;
        postService.read(id);
    }

    //  게시글 수정




}
