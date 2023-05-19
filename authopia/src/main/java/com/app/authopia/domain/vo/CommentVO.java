package com.app.authopia.domain.vo;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@Data
@NoArgsConstructor
public class CommentVO {
    private Long id;
    private Long memberId;
    private Long postId;
    private String commentContent;
    private String commentRegisterDate;
    private String commentUpdateDate;
}