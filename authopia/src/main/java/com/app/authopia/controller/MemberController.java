package com.app.authopia.controller;

import com.app.authopia.domain.vo.MemberVO;
import com.app.authopia.service.member.MemberService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;
import org.springframework.web.servlet.view.RedirectView;

import javax.servlet.http.HttpSession;
import java.util.Optional;

@Controller
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/member/*")
public class MemberController {
    private final MemberService memberService;

    // 이메일 중복검사

    // 회원가입
    @GetMapping("join")
    public void goToJoinForm(MemberVO memberVO){;}

    @PostMapping("join")
    public RedirectView join(MemberVO memberVO){
        memberService.join(memberVO);
        return new RedirectView("/member/login");
    }

    // 로그인
    @GetMapping("login")
    public void goToLoginForm(MemberVO memberVO){;}

    @PostMapping("login")
    public RedirectView login(String memberEmail, String memberPassword, HttpSession session, RedirectAttributes redirectAttributes){
        final Optional<Long> foundMember = memberService.login(memberEmail, memberPassword);
        if(foundMember.isPresent()){
            session.setAttribute("id", foundMember.get());
            return new RedirectView("/main/main");
        }
        redirectAttributes.addFlashAttribute("login", "fail");
        return new RedirectView("/member/login");
    }

    // 비밀번호 찾기
    @GetMapping("find-password")
    public void goToFindPasswordForm(){;}

    // 로그아웃
    @GetMapping("logout")
    public RedirectView logout(HttpSession session){
        session.invalidate();
        return new RedirectView("/member/login");
    }

}