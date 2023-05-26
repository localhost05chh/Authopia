package com.app.authopia.interceptor;

import com.app.authopia.service.message.MessageService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@Slf4j
@Component
public class AlarmInterceptor implements HandlerInterceptor {

    @Autowired
    private MessageService messageService;

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
//        log.info("id===================={}", request.getSession().getAttribute("id"));
//        DB조회 시 안읽은 알람 목록을 request.setAttribute()에 담으면 모든 화면에서 알람 목록 사용 가능
        if(request.getSession().getAttribute("id") != null){
//            log.info("countMessage===================={}", messageService.getAlarm((Long) request.getSession().getAttribute("id")));
            int countMessage = messageService.getAlarm((Long) request.getSession().getAttribute("id"));
            request.setAttribute("countMessage", countMessage);
        }
        return true;
    }

    //    @Override
//    public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, ModelAndView modelAndView) throws Exception {
//        log.info("id===================={}", request.getSession().getAttribute("id"));
////        DB조회 시 안읽은 알람 목록을 request.setAttribute()에 담으면 모든 화면에서 알람 목록 사용 가능
//        if(request.getSession().getAttribute("id") != null){
////            log.info("countMessage===================={}", messageService.getAlarm((Long) request.getSession().getAttribute("id")));
////            int countMessage = messageService.getAlarm((Long) request.getSession().getAttribute("id"));
////            request.setAttribute("countMessage", countMessage);
//        }
//    }
}
