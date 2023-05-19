package com.app.authopia.controller;

import com.app.authopia.domain.vo.MemberVO;
import com.app.authopia.service.member.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;
import org.springframework.web.servlet.view.RedirectView;

import javax.mail.*;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeBodyPart;
import javax.mail.internet.MimeMessage;
import javax.mail.internet.MimeMultipart;
import javax.servlet.http.HttpSession;
import java.util.Date;
import java.util.Optional;
import java.util.Properties;

@Controller
@RequiredArgsConstructor
@RequestMapping("/member/*")
public class MemberController {
    private final MemberService memberService;

    // 이메일 중복검사
    @GetMapping("check-email/{memberEmail}")
    @ResponseBody
    public boolean checkEmail(@PathVariable String memberEmail){
        return memberService.checkEmail(memberEmail).isPresent();
    }


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
        redirectAttributes.addFlashAttribute("login", "false");
        return new RedirectView("/member/login");
    }

    // 비밀번호 찾기
    @GetMapping("find-password")
    public void goToFindPasswordForm(MemberVO memberVO){;}

    @PostMapping("find-password")
    public String sendFindPasswordEmail(String memberEmail, HttpSession session){
        Optional<MemberVO> foundMember = memberService.checkEmail(memberEmail);
        if(foundMember.isPresent()){
            // 메일보내기 api
            session.setAttribute("memberEmail", memberEmail);
            //메일 보내기 시작
            // 메일 인코딩
            String path ="http://localhost:10000/member/setting-password";

            final String bodyEncoding = "UTF-8"; //콘텐츠 인코딩

            //원하는 메일 제목 작성
            String subject = "비밀번호 재설정 본인확인";
            String fromEmail = "Authopia@gmail.com";
            String fromUsername = "Authopia";
            String toEmail = memberEmail; // 콤마(,)로 여러개 나열

            final String username = "ss00.coder@gmail.com"; //구글 계정 이름
            final String password = "smglavghwuxpueoo";

            // 메일에 출력할 텍스트
            String html = null;
            StringBuffer sb = new StringBuffer();
            sb.append("<h3>비밀번호 재설정 페이지 링크입니다</h3>\n");
            sb.append("<a href=" + path + "> 클릭 </a>");
            html = sb.toString();
            // 메일 옵션 설정
            Properties props = new Properties();
            props.put("mail.smtp.starttls.enable", "true");
            props.put("mail.smtp.host", "smtp.gmail.com");
            props.put("mail.smtp.auth", "true");
            props.put("mail.smtp.port", "587");
            props.put("mail.smtp.ssl.trust", "smtp.gmail.com");
            props.put("mail.smtp.ssl.protocols", "TLSv1.2");
            try {
                // 메일 서버  인증 계정 설정
                Authenticator auth = new Authenticator() {
                    protected PasswordAuthentication getPasswordAuthentication() {
                        return new PasswordAuthentication(username, password);
                    }
                };
                // 메일 세션 생성
                Session sessionE = Session.getDefaultInstance(props, auth);
                // 메일 송/수신 옵션 설정
                Message message = new MimeMessage(sessionE);
                message.setFrom(new InternetAddress(fromEmail, fromUsername));
                message.setRecipients(Message.RecipientType.TO, InternetAddress.parse(toEmail, false));
                message.setSubject(subject);
                message.setSentDate(new Date());
                // 메일 콘텐츠 설정
                Multipart mParts = new MimeMultipart();
                MimeBodyPart mTextPart = new MimeBodyPart();
                MimeBodyPart mFilePart = null;
                // 메일 콘텐츠 - 내용
                mTextPart.setText(html, bodyEncoding, "html");
                mParts.addBodyPart(mTextPart);
                // 메일 콘텐츠 설정
                message.setContent(mParts);
                // 메일 발송
                Transport.send( message );
            } catch ( Exception e ) {
                e.printStackTrace();
            }
            //메일보내기 끝
            return "member/find-password2";
        }
        return "member/find-password";
    }

    // 비밀번호 재설정
    @GetMapping("setting-password")
    public void goToSettingPasswordForm(MemberVO memberVO){;}

    @PostMapping("setting-password")
    public RedirectView modifyPassword(String memberPassword, HttpSession session){
        String memberEmail = (String) session.getAttribute("memberEmail");
        memberService.modifyPassword(memberEmail, memberPassword);
        session.invalidate();
        return new RedirectView("/member/login");
    }

    // 로그아웃
    @GetMapping("logout")
    public RedirectView logout(HttpSession session){
        session.invalidate();
        return new RedirectView("/member/login");
    }

}