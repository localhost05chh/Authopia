package com.app.authopia.controller;

import com.app.authopia.dao.PostDAO;
import com.app.authopia.domain.dto.Pagination;
import com.app.authopia.domain.dto.PostDTO;
import com.app.authopia.domain.dto.PostType;
import com.app.authopia.domain.vo.PostVO;
import com.app.authopia.service.member.MemberService;
import com.app.authopia.service.post.PostService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;
import org.springframework.web.servlet.view.RedirectView;

import javax.servlet.http.HttpSession;
import java.util.List;

@Controller
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/post/*")
public class PostController{
    private final PostService postService;
    private final MemberService memberService;

    //      게시글 목록
    @GetMapping("list")
    public void gotoList(Model model, HttpSession session, PostType postType, @RequestParam(defaultValue = "writing")String type, @RequestParam(defaultValue = "new")String order, @RequestParam(defaultValue ="")String keyword){
        Long memberId = (Long) session.getAttribute("id");
        model.addAttribute("memberId", memberId);
        postType.setType(type);
        postType.setOrder(order);
        postType.setKeyword(keyword);
        session.setAttribute("postType", postType);
    }


    @PostMapping("list/{page}")
    @ResponseBody
    public List<PostDTO> gotoList(HttpSession session, @PathVariable int page, Pagination pagination, PostType postType){
        postType = (PostType) session.getAttribute("postType");
        pagination.setTotal(postService.getTotal(postType));
        pagination.setPage(page);
        pagination.progress();
        return postService.getList(pagination , postType);
    }


    //      게시글 추가
    @GetMapping("write")
    public void goToWrite(PostVO postVO, Model model, HttpSession session){
        model.addAttribute("memberName", memberService.getMemberInfo((Long)session.getAttribute("id")).get().getMemberName());
    }

    @PostMapping("write")
    public RedirectView write(PostDTO postDTO, HttpSession session){
        postDTO.setMemberId((Long)session.getAttribute("id"));
        postService.write(postDTO);
        return new RedirectView("/post/list");
    }

    //      게시글 조회, 수정
    @GetMapping(value = {"detail", "modify"})
    public void read(@RequestParam(defaultValue = "")Long id, Model model, HttpSession session){
        Long memberId = (Long) session.getAttribute("id");
        if(memberId != null){
            model.addAttribute("memberName",memberService.getMemberInfo((Long)session.getAttribute("id")).get().getMemberName());
        }
        System.out.println(model.getAttribute("memberName"));
        model.addAttribute("memberId", memberId);
        postService.increaseViewCount(id);
        model.addAttribute("post", postService.read(id).get());
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

    //   작가  게시글 목록
    @GetMapping("author-profile")
    public void gotoListAuthor(@RequestParam(defaultValue = "")Long postId,PostDTO postDTO,Model model, HttpSession session, PostType postType, @RequestParam(defaultValue = "writing")String type, @RequestParam(defaultValue = "new")String order, @RequestParam(defaultValue ="")String keyword){
        session.setAttribute("postId", postId);
        postType.setType(type);
        postType.setOrder(order);
        postType.setKeyword(keyword);
        session.setAttribute("postType", postType);
    }


    @PostMapping("author-profile/{page}")
    @ResponseBody
    public List<PostDTO> gotoListAuthor(Long memberId, HttpSession session, @PathVariable int page, Pagination pagination, PostType postType){
        postType = (PostType) session.getAttribute("postType");
        memberId = postService.read((Long) session.getAttribute("postId")).get().getMemberId();
        pagination.setTotal(postService.getTotal(postType));
        pagination.setPage(page);
        pagination.progress();
        return postService.getListAuthor(pagination , postType, memberId);
    }

//    복구는 필요한사람이 작성해주세용!!

}