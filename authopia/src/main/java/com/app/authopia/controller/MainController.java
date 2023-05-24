package com.app.authopia.controller;

import com.app.authopia.domain.dto.MemberDTO;
import com.app.authopia.domain.dto.Pagination;
import com.app.authopia.domain.dto.PostDTO;
import com.app.authopia.service.file.FileService;
import com.app.authopia.service.member.MemberService;
import com.app.authopia.service.post.PostService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpSession;
import java.util.List;

@Controller
@RequiredArgsConstructor
public class MainController {
    private final MemberService memberService;
    private final PostService postService;
    private final FileService fileService;

    @GetMapping("/main")
    public String goToMain(HttpSession session, Model model, Pagination pagination){
        Long memberId = (Long) session.getAttribute("id");
        model.addAttribute("memberId", memberId);
        if(memberId != null && fileService.getProfileImage(memberId).isPresent()) {
            model.addAttribute("memberProfileImage", fileService.getProfileImage(memberId).get());
        } else {
            model.addAttribute("memberProfileImage", null);
        }
        pagination.setPage(1);
        model.addAttribute("popularMembers", memberService.getPopularMember());
        model.addAttribute("popularPosts", postService.getListMain(pagination));
        if(postService.read(71l).isPresent()) {
            model.addAttribute("recommendPost1", postService.read(71l).get());
        } else {
            model.addAttribute("recommendPost1", null);
        }
        if(postService.read(73l).isPresent()) {
            model.addAttribute("recommendPost2", postService.read(73l).get());
        } else {
            model.addAttribute("recommendPost2", null);
        }
        model.addAttribute("newMembers", memberService.getNewMember());
        model.addAttribute("allMembers", memberService.getAllMember());

        return "/main/main";
    }

    @GetMapping("/main/post/{page}")
    @ResponseBody
    public List<PostDTO> mainPost(@PathVariable int page){
        Pagination pagination = new Pagination();
        pagination.setPage(page);
        return postService.getListMain(pagination);
    }

    @GetMapping("/main/category/{category}")
    @ResponseBody
    public List<MemberDTO> mainMember(@PathVariable String category){
        return memberService.getMemberByCategory(category);
    }

    @GetMapping("/main/all")
    @ResponseBody
    public List<MemberDTO> mainallMember(){
        return memberService.getAllMember();
    }
}
