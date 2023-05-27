package com.app.authopia.mapper;

import com.app.authopia.domain.dto.MessageDTO;
import com.app.authopia.domain.dto.PaginationMessage;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.assertj.core.api.Assertions.*;

@SpringBootTest
@Slf4j
public class MessageMapperTests {
    @Autowired
    private MessageMapper messageMapper;

    @Test
    public void insertTest(){
        MessageDTO messageDTO = new MessageDTO();
        messageDTO.setSendMemberId(30l);
        messageDTO.setReceiveMemberId(61l);
        messageDTO.setMessageName("쪽지 테스트~~");
        messageDTO.setMessageContent("테스트 중 입니다.");
        messageMapper.insert(messageDTO);
    }

    @Test
    public void selectReceiveAllTest(){
        PaginationMessage pagination = new PaginationMessage();
        pagination.setPage(1);
        pagination.progress();
        log.info(messageMapper.selectReceiveAll(pagination,61l,"예뻐").toString());
    }

//    @Test
//    public void selectSendAllTest(){
//        assertThat(messageMapper.selectSendAll(30l)).hasSize(9);
//    }

    @Test
    public void selectIdByEmailTest(){
        log.info(messageMapper.selectIdByEmail("gmatn97@naver.com").toString());
    }

    @Test
    public void selectReceiveTest(){
        log.info(messageMapper.selectReceive(1l).toString());
    }

    @Test
    public void selectSendTest(){
        log.info(messageMapper.selectSend(1l).toString());
    }

    @Test
    public void deleteTest(){
        messageMapper.delete(1l);
//        assertThat(messageMapper.selectReceiveAll(61l)).hasSize(2);
    }

    @Test
    public void selectCountOfReceiveMessage(){
//        assertThat(messageMapper.selectCountOfReceiveMessage(61l, "")).isEqualTo(2);
        log.info(String.valueOf(messageMapper.selectCountOfReceiveMessage(61l, "슈")));
    }

    @Test
    public void updateTest(){
        messageMapper.update(37l);
    }

    @Test
    public void selectCountOfReceiveMessageUnRead(){
        assertThat(messageMapper.selectCountOfReceiveMessageUnRead(61l)).isEqualTo(2);
    }
}
