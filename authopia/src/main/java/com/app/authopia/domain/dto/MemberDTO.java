package com.app.authopia.domain.dto;

import com.app.authopia.domain.vo.FileVO;
import lombok.Data;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.Optional;

@Component
@Data
public class MemberDTO {
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
    private FileVO memberProfileImage;
    private ArrayList<FileVO> memberProfileImageList = new ArrayList<>();
}
