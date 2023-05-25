package com.app.authopia.controller;

import com.app.authopia.domain.dto.MemberDTO;
import com.app.authopia.domain.dto.MessageDTO;
import com.app.authopia.domain.dto.Pagination;
import com.app.authopia.domain.dto.PaginationMessage;
import com.app.authopia.service.message.MessageService;
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
@RequestMapping("/message/*")
@Slf4j
public class MessageController {
    private final MessageService messageService;

    @GetMapping("list")
    public String listReceive(PaginationMessage paginationMessage, @RequestParam(defaultValue = "receive")String type, Model model, HttpSession session){
        Long memberId = (Long)session.getAttribute("id");
        if(type.equals("receive")){
            paginationMessage.setTotal(messageService.getReceiveTotal(memberId));
            paginationMessage.progress();
            model.addAttribute("messages", messageService.getReceiveList(paginationMessage, memberId));
            model.addAttribute("count", messageService.getReceiveTotal(memberId));
        } else{
            paginationMessage.setTotal(messageService.getSendTotal(memberId));
            paginationMessage.progress();
            model.addAttribute("messages", messageService.getSendList(paginationMessage, memberId));
            model.addAttribute("count", messageService.getSendTotal(memberId));
        }
        model.addAttribute("countReceive", messageService.getReceiveTotal(memberId));
        model.addAttribute("countSend", messageService.getSendTotal(memberId));
        return "mypage/mypage-message";
    }

//    @GetMapping("list/send")
//    public String listSend(PaginationMessage paginationMessage, Model model, HttpSession session){
//        Long memberId = (Long)session.getAttribute("id");
//        paginationMessage.setTotal(messageService.getSendTotal(memberId));
//        paginationMessage.progress();
//        model.addAttribute("messages", messageService.getSendList(paginationMessage, memberId));
//        model.addAttribute("countReceive", messageService.getReceiveTotal(memberId));
//        model.addAttribute("countSend", messageService.getSendTotal(memberId));
//        model.addAttribute("count", messageService.getSendTotal(memberId));
//        return "mypage/mypage-message";
//    }

//    @GetMapping("list/{type}")
//    @ResponseBody
//    public List<MessageDTO> messageType(@PathVariable String type, PaginationMessage paginationMessage, HttpSession session){
//        Long memberId = (Long)session.getAttribute("id");
//        if(type.equals("receive")){
//            paginationMessage.setTotal(messageService.getReceiveTotal(memberId));
//            paginationMessage.progress();
//            return messageService.getReceiveList(paginationMessage, memberId);
//        } else {
//            paginationMessage.setTotal(messageService.getSendTotal(memberId));
//            paginationMessage.progress();
//            return messageService.getSendList(paginationMessage, memberId);
//        }
//    }

    @GetMapping("read")
    public String read(Long id, Model model, @RequestParam(defaultValue = "receive")String type){
        if(type.equals("receive")) {
            messageService.modify(id);
            model.addAttribute("message", messageService.getReceive(id).get());
        } else {
            model.addAttribute("message", messageService.getSend(id).get());
        }
        return "mypage/mypage-message-detail";
    }

    @GetMapping("write")
    public String goToWriteForm(MessageDTO messageDTO){
        return "mypage/mypage-message-write";
    }

    @PostMapping("write")
    public RedirectView write(MessageDTO messageDTO, HttpSession session, String memberEmail){
        messageDTO.setSendMemberId((Long)session.getAttribute("id"));
        messageDTO.setReceiveMemberId(messageService.checkIdByEmail(memberEmail));
        messageService.write(messageDTO);
        return new RedirectView("/message/list?type=send");
    }

    @GetMapping("remove")
    public RedirectView remove(Long id, String type){
        messageService.remove(id);
        return type.equals("send") ? new RedirectView("/message/list?type=send") : new RedirectView("/message/list?type=receive");
    }
}
