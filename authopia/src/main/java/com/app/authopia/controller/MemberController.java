package com.app.authopia.controller;

import com.app.authopia.domain.vo.MemberVO;
import com.app.authopia.service.member.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;
import org.springframework.web.servlet.view.RedirectView;

import javax.servlet.http.HttpSession;
import java.util.Optional;

@Controller
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

    @PostMapping("find-password")
    public void sendFindPasswordEmail(){
        
    }

    // 비밀번호 재설정
    @GetMapping("setting-password")
    public void goToSettingPasswordForm(){;}

    @PostMapping("setting-password")
    public void modifyPassword(String memberEmail, String memberPassword){
        memberService.modifyPassword(memberEmail, memberPassword);
    }

    // 로그아웃
    @GetMapping("logout")
    public RedirectView logout(HttpSession session){
        session.invalidate();
        return new RedirectView("/member/login");
    }

}