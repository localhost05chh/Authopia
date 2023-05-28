package com.app.authopia.domain.vo;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

@Component
@Slf4j
@Data
@NoArgsConstructor
public class PostVO {
    private Long id;
    private Long memberId;
    private String postType;
    private String postName;
    private Long postViewCount;
    private Long postRecommend;
    private String postRegisterDate;
    private String postUpdateDate;
    private String postContent;
    private Boolean postIsBlinded;
}