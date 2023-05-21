package com.app.authopia.controller;

import com.app.authopia.domain.vo.MemberVO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpSession;

@Controller
@RequiredArgsConstructor
public class MainController {

    @GetMapping("/main")
    public String goToMain(HttpSession session, Model model){
        Long memberId = (Long) session.getAttribute("id");
        model.addAttribute("memberId", memberId);
        return "/main/main";
    }
}
