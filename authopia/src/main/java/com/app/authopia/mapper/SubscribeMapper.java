package com.app.authopia.mapper;


import com.app.authopia.domain.vo.SubscribeVO;
import org.apache.ibatis.annotations.Mapper;

import java.util.Optional;

@Mapper
public interface SubscribeMapper {
    //    구독 추가
    public void insert(SubscribeVO subscribeVO);

    // 구독 여부 검사
    public Optional<Long> selectId(SubscribeVO subscribeVO);

    //    구독 해지
    public void delete(Long Id);

    //  구독자 수
    public int selectCountOfSubscribe(Long id);
}