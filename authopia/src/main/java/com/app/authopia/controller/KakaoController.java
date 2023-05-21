package com.app.authopia.controller;

import com.app.authopia.domain.vo.MemberVO;
import com.app.authopia.service.member.KakaoService;
import com.app.authopia.service.member.MemberService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.view.RedirectView;

import javax.servlet.http.HttpSession;
import java.util.Map;
import java.util.Optional;

@Controller
@RequiredArgsConstructor
@Slf4j
public class KakaoController {
    private final KakaoService kakaoService;
    private final MemberService memberService;

    @ResponseBody
    @GetMapping("/login")
    public RedirectView kakaoCallback(@RequestParam String code, HttpSession session) throws Exception {
        log.info(code);
        String token = kakaoService.getKaKaoAccessToken(code);
        session.setAttribute("token", token);
        String result = kakaoService.getKakaoInfo(token);
        JSONParser parser = new JSONParser();
        JSONObject resultJSON = (JSONObject) parser.parse(result);
        String id = (String) resultJSON.get("id");
        String email = (String) resultJSON.get("email");
        String name = (String) resultJSON.get("name");
        if(!memberService.checkEmail(email).isPresent()) {
            MemberVO memberVO = new MemberVO();
            memberVO.setMemberEmail(email);
            memberVO.setMemberName(name);
            memberVO.setMemberKakaoLogin(id);
            kakaoService.joinKakao(memberVO);
        }
        Optional<Long> foundMember = kakaoService.loginKakao(email, id);
        session.setAttribute("id", foundMember.get());
        return new RedirectView("/main");
    }

    @GetMapping("/logout")
    public RedirectView kakaoLogout(HttpSession session){
        log.info("logout");
        String token = (String)session.getAttribute("token");
        if(token!=null){kakaoService.logoutKakao(token);}
        return new RedirectView("/member/logout");
    }
}
