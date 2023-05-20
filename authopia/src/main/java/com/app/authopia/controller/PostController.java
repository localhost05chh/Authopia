package com.app.authopia.controller;

import com.app.authopia.domain.vo.PostVO;
import com.app.authopia.service.post.PostService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;
import org.springframework.web.servlet.view.RedirectView;

@Controller
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/post/*")
public class PostController{
    private final PostService postService;

    //      게시글 목록
    @GetMapping("list")
    public void gotoList(Model model){
        model.addAttribute("posts", postService.getList());
    }

    //      게시글 추가
    @GetMapping("write")
    public void goToWrite(PostVO postVO){;}

    @PostMapping("write")
    public RedirectView write(PostVO postVO){
        postService.write(postVO);
        return new RedirectView("/writing-post/recruit-list");
    }

    //      게시글 조회, 수정
    @GetMapping(value = {"read","modify"})
    public void read(Long id, Model model){
        model.addAttribute("post", postService.read(id));
    }

    @PostMapping("modify")
    public RedirectView modify(PostVO postVO, RedirectAttributes redirectAttributes){
        postService.modify(postVO);
        redirectAttributes.addAttribute("id", postVO.getId());
        return new RedirectView("/writing-post/view-detail");
    }

    @PostMapping("remove")
    public RedirectView remove(Long id){
        postService.remove(id);
        return new RedirectView("/writing-post/recruit-list");
    }

//    복구는 필요한사람이 작성해주세용!!

}