package com.app.authopia.controller;


import com.app.authopia.domain.dto.Pagination;
import com.app.authopia.domain.dto.PostDTO;
import com.app.authopia.service.member.MemberService;
import com.app.authopia.service.post.PostService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.view.RedirectView;

import javax.servlet.http.HttpSession;
import java.util.List;

@Controller
@RequiredArgsConstructor
public class ManagerController {
    private final MemberService memberService;
    private final PostService postService;

    @GetMapping("/manager-page")
    public String goToManagerPosts(HttpSession session, Model model, Pagination pagination){
        Long memberId = (Long) session.getAttribute("id");
        model.addAttribute("memberId", memberId);
        pagination.setPage(1);
        model.addAttribute("posts", postService.getListManager(pagination));
        return "/manage/manager-page";
    }

    @GetMapping("/manager-members")
    public String goToManagerMembers(HttpSession session, Model model, Pagination pagination){
        Long memberId = (Long) session.getAttribute("id");
        model.addAttribute("memberId", memberId);
        pagination.setPage(1);
        model.addAttribute("members", memberService.getMember());
        return "/manage/manager-members";
    }

    @GetMapping("/manage/{page}")
    @ResponseBody
    public List<PostDTO> mainPost(@PathVariable int page){
        Pagination pagination = new Pagination();
        pagination.setPage(page);
        return postService.getListManager(pagination);
    }

    @PostMapping("remove")
    public RedirectView remove(Long id){
        postService.remove(id);
        return new RedirectView("/manage/manager-page");
    }
}
