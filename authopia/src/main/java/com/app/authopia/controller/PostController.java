package com.app.authopia.controller;

import com.app.authopia.dao.PostDAO;
import com.app.authopia.domain.dto.PostDTO;
import com.app.authopia.domain.dto.PostType;
import com.app.authopia.domain.vo.PostVO;
import com.app.authopia.service.member.MemberService;
import com.app.authopia.service.post.PostService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;
import org.springframework.web.servlet.view.RedirectView;

import javax.servlet.http.HttpSession;

@Controller
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/post/*")
public class PostController{
    private final PostService postService;

    //      게시글 목록
    @GetMapping("list")
    public void gotoList(Model model, PostType postType, @RequestParam(defaultValue = "writing")String type, @RequestParam(defaultValue = "new")String order, @RequestParam(defaultValue ="")String keyword){
        postType.setType(type);
        postType.setOrder(order);
        postType.setKeyword(keyword);
        System.out.println(postType.getKeyword());
        model.addAttribute("posts", postService.getList(postType));
    }

    //      게시글 추가
    @GetMapping("write")
    public void goToWrite(PostDTO postDTO, Model model){;}

    @PostMapping("write")
    public RedirectView write(PostDTO postDTO){
        postService.write(postDTO);
        return new RedirectView("/post/list");
    }

    //      게시글 조회, 수정
    @GetMapping(value = {"detail", "modify"})
    public void read(Long id, Model model){
//        model.addAttribute("post",postService.read(id));
    }

    @PostMapping("modify")
    public RedirectView modify(PostDTO postDTO, RedirectAttributes redirectAttributes){
        postService.modify(postDTO);
        redirectAttributes.addAttribute("id", postDTO.getId());
        return new RedirectView("/post/detail");
    }

    @PostMapping("remove")
    public RedirectView remove(Long id){
        postService.remove(id);
        return new RedirectView("/post/list");
    }

//    복구는 필요한사람이 작성해주세용!!

}