package com.app.authopia.dao;

import com.app.authopia.domain.vo.SubscribeVO;
import com.app.authopia.mapper.SubscribeMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
@RequiredArgsConstructor
public class SubscribeDAO {
    private final SubscribeMapper subscribeMapper;

    // 구독 추가
    public void subscribeTo(SubscribeVO subscribeVO){subscribeMapper.insert(subscribeVO);}

    //  구독 여부 검사
    public Optional<Long> subscribeOk(SubscribeVO subscribeVO){ return subscribeMapper.selectId(subscribeVO);}

    //    구독 해지
    public void subscribeOut(Long id){subscribeMapper.delete(id);}
}
