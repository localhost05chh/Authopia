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

    //  구독 여부 검사
    public void subscribeOk(SubscribeVO subscribeVO){subscribeMapper.selectId(subscribeVO);}

    //    구독 해지
    public void subscribeOut(Long id){subscribeMapper.delete(id);}
}
