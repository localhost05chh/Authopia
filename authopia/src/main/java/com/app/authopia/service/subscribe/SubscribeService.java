package com.app.authopia.service.subscribe;

import com.app.authopia.domain.vo.SubscribeVO;

public interface SubscribeService {

    //    구독 추가
    public void subscribe(SubscribeVO subscribeVO);

    //    구독 여부 검사
    public void isSubscribe(SubscribeVO subscribeVO);

    //    구독 해지
    public void subscribeDelete(Long id);
}
