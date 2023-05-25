package com.app.authopia.service.message;

import com.app.authopia.domain.dto.MessageDTO;
import com.app.authopia.domain.dto.PaginationMessage;
import com.app.authopia.domain.dto.PostDTO;

import java.util.List;
import java.util.Optional;

public interface MessageService {
    // 받은 쪽지 목록
    public List<MessageDTO> getReceiveList(PaginationMessage pagination, Long memberId);

    // 보낸 쪽지 목록
    public List<MessageDTO> getSendList(PaginationMessage pagination, Long memberId);

    // 받은 쪽지 총 개수
    public int getReceiveTotal(Long memberId);

    // 보낸 쪽지 총 개수
    public int getSendTotal(Long memberId);

    // 쪽지 추가
    public void write(MessageDTO messageDTO);

    // 이메일로 멤버 Id 검색
    public Long checkIdByEmail(String memberEmail);

    // 받은 쪽지 상세보기
    public Optional<MessageDTO> getReceive(Long id);

    // 보낸 쪽지 상세보기
    public Optional<MessageDTO> getSend(Long id);

    // 쪽지 삭제
    public void remove(Long id);

    // 쪽지 읽음으로 표시
    public void modify(Long id);
}
