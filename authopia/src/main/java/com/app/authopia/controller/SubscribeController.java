package com.app.authopia.controller;

import com.app.authopia.domain.vo.SubscribeVO;
import com.app.authopia.service.subscribe.SubscribeService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.view.RedirectView;

import javax.servlet.http.HttpSession;

@Controller
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/subscribe/*")
public class SubscribeController {

    private final SubscribeService subscribeService;

    //    구독 등록
    @PostMapping ("subscribe")
    public RedirectView subscribeTo(SubscribeVO subscribeVO, @RequestParam Long memberId, HttpSession session){
        subscribeVO.setSubscribeCreaterId(memberId);
        if(session.getAttribute("id") == null){
            return new RedirectView("/member/login");
        }
        subscribeVO.setMemberId((Long) session.getAttribute("id"));
        subscribeService.subscribe(subscribeVO);
        return new RedirectView("/post/author-profile");
    }
    //    구독 취소
    @GetMapping("subscribeDelete")
    public RedirectView subscribeRevoke(Long id){
        subscribeService.subscribeDelete(id);
        return new RedirectView("/post/author-profile");
    }

    // 결제창으로 이동
    @GetMapping("pay")
    public String goToPayForm(){
        return "post/subscribe";
    }
}
