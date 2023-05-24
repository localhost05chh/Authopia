package com.app.authopia.domain.vo;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@Data
@NoArgsConstructor
public class MessageVO {
    private Long id;
    private Long sendMemberId;
    private Long receiveMemberId;
    private String messageName;
    private Boolean messageView;
    private String messageRegisterDate;
    private String messageContent;
}
