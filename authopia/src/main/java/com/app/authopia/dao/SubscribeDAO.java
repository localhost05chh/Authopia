package com.app.authopia.dao;

import com.app.authopia.domain.vo.SubscribeVO;
import com.app.authopia.mapper.SubscribeMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class SubscribeDAO {
    private final SubscribeMapper subscribeMapper;

    // 구독 추가
    public void subscribeTo(SubscribeVO subscribeVO){subscribeMapper.insert(subscribeVO);}
}
