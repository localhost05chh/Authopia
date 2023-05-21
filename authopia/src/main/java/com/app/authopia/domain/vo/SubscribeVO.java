package com.app.authopia.domain.vo;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

@Component
@Slf4j
@Data
@NoArgsConstructor
public class SubscribeVO {
    private Long id;
    private Long creatorId;
    private Long memberId;
    private String registerDate;
    private String UpdateDate;

}
