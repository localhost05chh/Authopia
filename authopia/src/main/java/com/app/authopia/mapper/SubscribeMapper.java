package com.app.authopia.mapper;

import com.app.authopia.domain.vo.SubscribeVO;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface SubscribeMapper {
//    구독 추가
    public void insert(SubscribeVO subscribeVO);

//    구독 해지
    public void delete(Long Id);
}
