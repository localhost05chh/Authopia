package com.app.authopia.domain.vo;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

@Component
@Data
@NoArgsConstructor
@Slf4j
public class SubscribeVO {
    private Long id;
    private Long subscribeCreaterId;
    private Long memberId;
    private String subscribeRegisterDate;
    private String subscribeUpdateDate;
}
