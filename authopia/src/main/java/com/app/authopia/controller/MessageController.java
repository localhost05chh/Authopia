package com.app.authopia.controller;

import com.app.authopia.domain.dto.MemberDTO;
import com.app.authopia.domain.dto.MessageDTO;
import com.app.authopia.domain.dto.Pagination;
import com.app.authopia.domain.dto.PaginationMessage;
import com.app.authopia.service.file.FileService;
import com.app.authopia.service.member.MemberService;
import com.app.authopia.service.message.MessageService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.view.RedirectView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.List;

@Controller
@RequiredArgsConstructor
@RequestMapping("/message/*")
@Slf4j
public class MessageController {
    private final MessageService messageService;
    private final MemberService memberService;
    private final FileService fileService;

    @GetMapping("list")
    public String listReceive(PaginationMessage paginationMessage, @RequestParam(defaultValue = "") String keyword, @RequestParam(defaultValue = "receive")String type, Model model, HttpSession session){
        Long memberId = (Long)session.getAttribute("id");
        model.addAttribute("member", memberService.getMemberInfo(memberId).get());
        model.addAttribute("keyword", keyword);
        if(type.equals("receive")){
            paginationMessage.setTotal(messageService.getReceiveTotal(memberId, keyword));
            paginationMessage.progress();
            model.addAttribute("messages", messageService.getReceiveList(paginationMessage, memberId, keyword));
            model.addAttribute("count", messageService.getReceiveTotal(memberId, keyword));
        } else{
            paginationMessage.setTotal(messageService.getSendTotal(memberId, keyword));
            paginationMessage.progress();
            model.addAttribute("messages", messageService.getSendList(paginationMessage, memberId, keyword));
            model.addAttribute("count", messageService.getSendTotal(memberId, keyword));
        }
        model.addAttribute("countReceive", messageService.getReceiveTotal(memberId, ""));
        model.addAttribute("countSend", messageService.getSendTotal(memberId,""));
        if(fileService.getProfileImage(memberId).isPresent()) {
            model.addAttribute("memberProfileImage", fileService.getProfileImage(memberId).get());
        } else{
            model.addAttribute("memberProfileImage", null);
        }
        return "mypage/mypage-message";
    }

    @GetMapping("read")
    public String read(HttpSession session, Long id, Model model, @RequestParam(defaultValue = "receive")String type){
        Long memberId = (Long)session.getAttribute("id");
        model.addAttribute("member", memberService.getMemberInfo(memberId).get());
        if(type.equals("receive")) {
            messageService.modify(id);
            model.addAttribute("message", messageService.getReceive(id).get());
        } else {
            model.addAttribute("message", messageService.getSend(id).get());
        }
        if(fileService.getProfileImage(memberId).isPresent()) {
            model.addAttribute("memberProfileImage", fileService.getProfileImage(memberId).get());
        } else{
            model.addAttribute("memberProfileImage", null);
        }
        return "mypage/mypage-message-detail";
    }

    @GetMapping("write")
    public String goToWriteForm(MessageDTO messageDTO, HttpSession session, Model model){
        Long memberId = (Long)session.getAttribute("id");
        model.addAttribute("member", memberService.getMemberInfo(memberId).get());
        if(fileService.getProfileImage(memberId).isPresent()) {
            model.addAttribute("memberProfileImage", fileService.getProfileImage(memberId).get());
        } else{
            model.addAttribute("memberProfileImage", null);
        }
        return "mypage/mypage-message-write";
    }

    @PostMapping("write")
    public RedirectView write(MessageDTO messageDTO, HttpSession session, String memberEmail, Model model){
        Long memberId = (Long)session.getAttribute("id");
        model.addAttribute("member", memberService.getMemberInfo(memberId).get());
        messageDTO.setSendMemberId(memberId);
        messageDTO.setReceiveMemberId(messageService.checkIdByEmail(memberEmail));
        messageService.write(messageDTO);
        if(fileService.getProfileImage(memberId).isPresent()) {
            model.addAttribute("memberProfileImage", fileService.getProfileImage(memberId).get());
        } else{
            model.addAttribute("memberProfileImage", null);
        }
        return new RedirectView("/message/list?type=send");
    }

    @GetMapping("remove")
    public RedirectView remove(Long id, String type, HttpSession session, Model model){
        Long memberId = (Long)session.getAttribute("id");
        model.addAttribute("member", memberService.getMemberInfo(memberId).get());
        if(fileService.getProfileImage(memberId).isPresent()) {
            model.addAttribute("memberProfileImage", fileService.getProfileImage(memberId).get());
        } else{
            model.addAttribute("memberProfileImage", null);
        }
        messageService.remove(id);
        return type.equals("send") ? new RedirectView("/message/list?type=send") : new RedirectView("/message/list?type=receive");
    }
}
