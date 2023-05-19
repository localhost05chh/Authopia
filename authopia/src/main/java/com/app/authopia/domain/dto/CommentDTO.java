package com.app.authopia.domain.dto;

import lombok.Data;
import org.springframework.stereotype.Component;

@Component
@Data
public class CommentDTO {
    private Long id;
    private Long memberId;
    private Long postId;
    private String commentContent;
    private String commentRegisterDate;
    private String commentUpdateDate;
    private String memberName;
}
