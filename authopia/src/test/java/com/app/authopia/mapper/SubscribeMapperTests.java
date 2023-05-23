package com.app.authopia.mapper;

import com.app.authopia.domain.vo.SubscribeVO;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
@Slf4j
public class SubscribeMapperTests {
    @Autowired
    private SubscribeMapper subscribeMapper;

    @Test
    public void subscribeTest(){

        SubscribeVO subscribeVO = new SubscribeVO();
        subscribeVO.setSubscribeCreaterId(33L);
        subscribeVO.setMemberId(34L);
        subscribeMapper.insert(subscribeVO);
    }
}
