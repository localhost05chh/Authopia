package com.app.authopia.domain.vo;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@Data
@NoArgsConstructor
public class MemberVO {
    private Long id;
    private String memberName;
    private String memberEmail;
    private String memberPassword;
    private String memberRegisterDate;
    private boolean memberIsRemaining;
    private String memberBriefIntroduce;
    private String memberIntroduce;
    private String memberCategory;
    private String memberUrl;
    private String memberKakaoLogin;
}
