package com.app.authopia.controller;

import com.app.authopia.domain.dto.Pagination;
import com.app.authopia.domain.dto.PostDTO;
import com.app.authopia.domain.vo.MemberVO;
import com.app.authopia.service.member.MemberService;
import com.app.authopia.service.post.PostService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpSession;
import java.util.List;

@Controller
@RequiredArgsConstructor
public class MainController {
    private final MemberService memberService;
    private final PostService postService;

    @GetMapping("/main")
    public String goToMain(HttpSession session, Model model, Pagination pagination){
        Long memberId = (Long) session.getAttribute("id");
        model.addAttribute("memberId", memberId);
        pagination.setPage(1);
        model.addAttribute("popularMembers", memberService.getPopularMember());
        model.addAttribute("popularPosts", postService.getListMain(pagination));
        model.addAttribute("recommendPost1", postService.read(72l).get());
        model.addAttribute("recommendPost2", postService.read(73l).get());
        model.addAttribute("newMembers", memberService.getNewMember());

        return "/main/main";
    }

    @GetMapping("/main/{page}")
    @ResponseBody
    public List<PostDTO> mainPost(@PathVariable int page){
        Pagination pagination = new Pagination();
        pagination.setPage(page);
        return postService.getListMain(pagination);
    }
}
