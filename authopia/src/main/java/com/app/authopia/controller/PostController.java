package com.app.authopia.controller;

import com.app.authopia.dao.PostDAO;
import com.app.authopia.domain.dto.Pagination;
import com.app.authopia.domain.dto.PostDTO;
import com.app.authopia.domain.dto.PostType;
import com.app.authopia.domain.vo.PostVO;
import com.app.authopia.domain.vo.SubscribeVO;
import com.app.authopia.service.comment.CommentService;
import com.app.authopia.service.file.FileService;
import com.app.authopia.service.member.MemberService;
import com.app.authopia.service.post.PostService;
import com.app.authopia.service.subscribe.SubscribeService;
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
public class PostController {
    private final PostService postService;
    private final MemberService memberService;
    private final CommentService commentService;
    private final FileService fileService;
    private final SubscribeService subscribeService;

    //      게시글 목록
    @GetMapping("list")
    public void gotoList(Model model, HttpSession session, PostType postType, @RequestParam(defaultValue = "writing") String type, @RequestParam(defaultValue = "new") String order, @RequestParam(defaultValue = "") String keyword) {
        Long memberId = (Long) session.getAttribute("id");
        model.addAttribute("memberId", memberId);
        if(memberId != null && fileService.getProfileImage(memberId).isPresent()) {
            model.addAttribute("memberProfileImage", fileService.getProfileImage(memberId).get());
        }
        postType.setType(type);
        postType.setOrder(order);
        postType.setKeyword(keyword);
        session.setAttribute("postType", postType);
    }


    @PostMapping("list/{page}")
    @ResponseBody
    public List<PostDTO> gotoList(HttpSession session, @PathVariable int page, Pagination pagination, PostType postType) {
        postType = (PostType) session.getAttribute("postType");
        pagination.setTotal(postService.getTotal(postType));
        pagination.setPage(page);
        pagination.progress();
        return postService.getList(pagination, postType);
    }


    //      게시글 추가
    @GetMapping("write")
    public void goToWrite(PostVO postVO, Model model, HttpSession session) {
        Long memberId = (Long) session.getAttribute("id");
        model.addAttribute("memberId", memberId);
        model.addAttribute("memberName", memberService.getMemberInfo((Long) session.getAttribute("id")).get().getMemberName());
        if(memberId != null && fileService.getProfileImage(memberId).isPresent()) {
            model.addAttribute("memberProfileImage", fileService.getProfileImage(memberId).get());
        }
    }

    @PostMapping("write")
    public RedirectView write(PostDTO postDTO, HttpSession session) {
        postDTO.setMemberId((Long) session.getAttribute("id"));
        postService.write(postDTO);
        return new RedirectView("/post/list");
    }

    //      게시글 조회, 수정
    @GetMapping(value = {"detail", "modify"})
    public void read(@RequestParam(defaultValue = "")Long id, Model model, HttpSession session) {
        postService.increaseViewCount(id);
        Long memberId = (Long) session.getAttribute("id");
        if (memberId != null) {
            model.addAttribute("memberName", memberService.getMemberInfo((Long)session.getAttribute("id")).get().getMemberName());
        }
        model.addAttribute("postId", id);
        session.setAttribute("postId", id);
        model.addAttribute("memberId", memberId);
        model.addAttribute("post", postService.read(id).get());
        model.addAttribute("memberIntroduce", memberService.getMemberInfo(postService.read(id).get().getMemberId()).get().getMemberIntroduce());
        if(memberId != null && fileService.getProfileImage(memberId).isPresent()) {
            model.addAttribute("memberProfileImage", fileService.getProfileImage(memberId).get());
        }

        //구독 관련
        SubscribeVO subscribeVO = new SubscribeVO();
        if(session.getAttribute("id") == null){
            model.addAttribute("isSubscribe", false);
        }else{
            subscribeVO.setMemberId((Long) session.getAttribute("id"));
            subscribeVO.setSubscribeCreaterId(postService.read((Long) model.getAttribute("postId")).get().getMemberId());
            if(subscribeService.isSubscribe(subscribeVO).isPresent()){
                model.addAttribute("isSubscribe", true);
            } else{
                model.addAttribute("isSubscribe", false);
            }
        }
    }


    @PostMapping("modify")
    public RedirectView modify(PostDTO postDTO, RedirectAttributes redirectAttributes, HttpSession session) {
        postDTO.setId((Long)session.getAttribute("postId"));
        session.removeAttribute("postId");
        postService.modify(postDTO);
        redirectAttributes.addAttribute("id", postDTO.getId());
        return new RedirectView("/post/detail");
    }

    @RequestMapping(value = "/remove", method = RequestMethod.GET)
    public RedirectView remove(Long id) {
        commentService.removeAll(postService.read(id).get().getId());
        postService.remove(id);
        return new RedirectView("/post/list");
    }

    //   작가  게시글 목록
    @GetMapping("author-profile")
    public void gotoListAuthor(@RequestParam(defaultValue = "")Long memberId, PostDTO postDTO,Model model, HttpSession session, PostType postType, @RequestParam(defaultValue = "writing")String type, @RequestParam(defaultValue = "new")String order, @RequestParam(defaultValue ="")String keyword){
        session.setAttribute("memberId", memberId);
        model.addAttribute("memberId", memberId);
        model.addAttribute("memberName", memberService.getMemberInfo((Long)session.getAttribute("memberId")).get().getMemberName());
        model.addAttribute("memberIntroduce", memberService.getMemberInfo((Long)session.getAttribute("memberId")).get().getMemberIntroduce());
        if(memberId != null && fileService.getProfileImage(memberId).isPresent()) {
            model.addAttribute("memberProfileImage", fileService.getProfileImage(memberId).get());
        }
        postType.setType(type);
        postType.setOrder(order);
        postType.setKeyword(keyword);
        session.setAttribute("postType", postType);

        //구독 관련
        SubscribeVO subscribeVO = new SubscribeVO();
        if(session.getAttribute("id") == null){
            model.addAttribute("isSubscribe", false);
        }else{
            subscribeVO.setMemberId((Long) session.getAttribute("id"));
            subscribeVO.setSubscribeCreaterId((Long)session.getAttribute("memberId"));
            if(subscribeService.isSubscribe(subscribeVO).isPresent()){
                model.addAttribute("isSubscribe", true);
            } else{
                model.addAttribute("isSubscribe", false);
            }
        }
    }


    @PostMapping("author-profile/{page}")
    @ResponseBody
    public List<PostDTO> gotoListAuthor(Long memberId, HttpSession session, @PathVariable int page, Pagination pagination, PostType postType){
        postType = (PostType) session.getAttribute("postType");
        memberId = (Long) session.getAttribute("memberId");
        pagination.setTotal(postService.getTotal(postType));
        pagination.setPage(page);
        pagination.progress();
        return postService.getListAuthor(pagination , postType, memberId);
    }

//    복구는 필요한사람이 작성해주세용!!

}