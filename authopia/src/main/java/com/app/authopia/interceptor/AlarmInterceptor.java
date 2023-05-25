package com.app.authopia.interceptor;

import lombok.extern.slf4j.Slf4j;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@Slf4j
public class AlarmInterceptor implements HandlerInterceptor {
    @Override
    public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, ModelAndView modelAndView) throws Exception {
        log.info("id===================={}", request.getSession().getAttribute("id"));
//        DB조회 시 안읽은 알람 목록을 request.setAttribute()에 담으면 모든 화면에서 알람 목록 사용 가능
    }
}
