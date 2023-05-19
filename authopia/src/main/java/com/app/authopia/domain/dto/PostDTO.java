package com.app.authopia.domain.dto;

import lombok.Data;
import org.springframework.stereotype.Component;

@Component
@Data
public class PostDTO {
    private Long id;
    private Long memberId;
    private String postType;
    private String postName;
    private Long postViewCount;
    private Long postRecommend;
    private String postRegisterDate;
    private String updateDate;
    private String postContent;
    private Boolean postIsBlinded;
    private String memberName;
}