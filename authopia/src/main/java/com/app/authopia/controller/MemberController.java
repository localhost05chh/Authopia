package com.app.authopia.controller;

import com.app.authopia.domain.dto.*;
import com.app.authopia.domain.vo.FileVO;
import com.app.authopia.domain.vo.MemberVO;
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

import javax.mail.*;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeBodyPart;
import javax.mail.internet.MimeMessage;
import javax.mail.internet.MimeMultipart;
import javax.servlet.http.HttpSession;
import javax.swing.*;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.Properties;

@Controller
@RequiredArgsConstructor
@RequestMapping("/member/*")
@Slf4j
public class MemberController {
    private final MemberService memberService;
    private final PostService postService;

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
            Long id = foundMember.get();
            session.setAttribute("id", id);
            if(memberService.getMemberInfo(id).get().getMemberEmail().equals("bcy313195ba@gmail.com")){
                return new RedirectView("/manager-page");
            }else{
                return new RedirectView("/main");
            }
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

    // 회원 조회
    // 회원 정보 수정
    @GetMapping("member-info")
    public String modifyMemberInfo(HttpSession session, Model model){
        Long memberId = (Long)session.getAttribute("id");
        model.addAttribute("member", memberService.getMemberInfo(memberId).get());
        return "mypage/mypage-info";
    }

    // 회원 페이지 조회/수정
    @GetMapping("member-page")
    public String modifyMemberPage(HttpSession session, Model model){
        Long memberId = (Long)session.getAttribute("id");
        model.addAttribute("member", memberService.getMemberInfo(memberId).get());
        return "mypage/mypage-setting";
    }

    // 회원 정보 수정 완료
    @PostMapping("info-modify")
    public RedirectView modifyMemberInfo(MemberVO memberVO){
        memberService.modifyMemberInfo(memberVO);
        return new RedirectView("/member/member-info");
    }

    // 회원 페이지 수정 완료
    @PostMapping("page-modify")
    public RedirectView modifyMemberPage(HttpSession session, MemberDTO memberDTO){
        memberDTO.getMemberProfileImageList().stream().forEach(m -> m.setMemberId((Long)session.getAttribute("id")));
        log.info(memberDTO.toString());
        memberService.modifyMemberPage(memberDTO);
        return new RedirectView("/member/member-page");
    }

    // 회원 탈퇴
    @GetMapping("delete-member")
    public RedirectView deleteMember(HttpSession session, Model model){
        Long memberId = (Long)session.getAttribute("id");
        memberService.deleteMember(memberId);
        session.invalidate();
        return new RedirectView("/member/login");
    }

    // 내 게시글 목록
    @GetMapping("member-mypost")
    public String gotoMyList(HttpSession session, Model model, PostType postType, @RequestParam(defaultValue = "writing")String type, @RequestParam(defaultValue = "new")String order){
        Long memberId = (Long) session.getAttribute("id");
        model.addAttribute("member", memberService.getMemberInfo(memberId).get());
        model.addAttribute("memberId", memberId);
        postType.setMemberId(memberId);
        postType.setType(type);
        postType.setOrder(order);
        session.setAttribute("postType", postType);
        model.addAttribute("count", postService.getTotalMyPost(postType, memberId));
        return "mypage/mypage-post";
    }

    @PostMapping("member-mypost/{page}")
    @ResponseBody
    public List<PostDTO> gotoMyList(HttpSession session, @PathVariable int page, Pagination pagination, PostType postType){
        System.out.println(page);
        Long memberId = (Long) session.getAttribute("id");
        postType = (PostType) session.getAttribute("postType");
        pagination.setTotal(postService.getTotalMyPost(postType, memberId));
        System.out.println(pagination.getTotal());
        pagination.setPage(page);
        pagination.progress();
        return postService.getListMyPost(pagination , postType);
    }

    // URL 중복 검사
    @GetMapping("check-url/{memberUrl}")
    @ResponseBody
    public boolean checkMemberUrl(@PathVariable String memberUrl){
        return memberService.checkMemberUrl(memberUrl).isPresent();
    }

}