package com.app.authopia.service.subscribe;

import com.app.authopia.dao.SubscribeDAO;
import com.app.authopia.domain.vo.SubscribeVO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class SubscribeServiceImpl implements SubscribeService{
    private final SubscribeDAO subscribeDAO;

    //    구독 추가
    @Override
    @Transactional(rollbackFor = Exception.class)
    public void subscribe(SubscribeVO subscribeVO){
        subscribeDAO.subscribeTo(subscribeVO);
    }

    //    구독 여부 검사
    @Override
    @Transactional(rollbackFor = Exception.class)
    public Optional<Long> isSubscribe(SubscribeVO subscribeVO) {return subscribeDAO.subscribeOk(subscribeVO);}


    //    구독 해지
    @Override
    @Transactional(rollbackFor = Exception.class)
    public void subscribeDelete(Long id) {
        subscribeDAO.subscribeOut(id);
    }

    @Override
    public int selectCountOfSubscribe(Long id){
        return subscribeDAO.selectCountOfSubscribe(id);
    }
}
