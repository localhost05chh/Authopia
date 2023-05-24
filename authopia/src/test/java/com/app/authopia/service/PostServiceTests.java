package com.app.authopia.service;

import com.app.authopia.domain.dto.Pagination;
import com.app.authopia.domain.dto.PostDTO;
import com.app.authopia.service.post.PostService;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
@Slf4j
public class PostServiceTests {
    @Autowired
    private PostService postService;

    //  게시글 추가
//    @Test
//    public void writeTest(){
//        PostVO postVO = new PostVO();
//        postVO.setMemberId(1L);
//        postVO.setPostType("작품");
//        postVO.setPostName("제목4");
//        postVO.setPostContent("되기만 해봐?");
//        postService.write(postVO);
//    }

    //  게시글 조회
    @Test
    public void readTest(){
        Long id = 2L;
        postService.read(id);
    }

    //  게시글 수정


    @Test
    public void findPostMainTest(){
        Pagination pagination = new Pagination();
        pagination.setPage(1); //화면에서 전달받은 페이지
//        assertThat(postMapper.selectMain(pagination)).hasSize(4);
        postService.getListMain(pagination).stream().map(PostDTO::toString).forEach(log::info);
    }



}
