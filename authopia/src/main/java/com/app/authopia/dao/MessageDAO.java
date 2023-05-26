package com.app.authopia.dao;

import com.app.authopia.domain.dto.MessageDTO;
import com.app.authopia.domain.dto.PaginationMessage;
import com.app.authopia.domain.dto.PostDTO;
import com.app.authopia.mapper.MessageMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
@RequiredArgsConstructor
public class MessageDAO {
    private final MessageMapper messageMapper;

    // 받은 쪽지 목록
    public List<MessageDTO> findReceiveAll(PaginationMessage pagination, Long memberId){
        return messageMapper.selectReceiveAll(pagination, memberId);
    }

    // 보낸 쪽지 목록
    public List<MessageDTO> findSendAll(PaginationMessage pagination, Long memberId){
        return messageMapper.selectSendAll(pagination, memberId);
    }

    // 받은 쪽지 총 개수
    public int findCountOfReceiveMessage(Long memberId){
        return messageMapper.selectCountOfReceiveMessage(memberId);
    }

    // 보낸 쪽지 총 개수
    public int findCountOfSendMessage(Long memberId){
        return messageMapper.selectCountOfSendMessage(memberId);
    }

    // 쪽지 추가
    public void save(MessageDTO messageDTO){
        messageMapper.insert(messageDTO);
    }

    // 이메일로 멤버 Id 검색
    public Long findIdByEmail(String memberEmail){
        return messageMapper.selectIdByEmail(memberEmail);
    }

    // 받은 쪽지 상세보기
    public Optional<MessageDTO> findReceiveById(Long id){
        return messageMapper.selectReceive(id);
    }

    // 보낸 쪽지 상세보기
    public Optional<MessageDTO> findSendById(Long id){
        return messageMapper.selectSend(id);
    }

    // 쪽지 삭제
    public void delete(Long id){
        messageMapper.delete(id);
    }

    // 쪽지 읽음으로 표시
    public void modify(Long id){
        messageMapper.update(id);
    }

    // 안 읽은 쪽지 총 개수
    public int findCountOfReceiveMessageUnRead(Long memberId){
        return messageMapper.selectCountOfReceiveMessageUnRead(memberId);
    }
}
