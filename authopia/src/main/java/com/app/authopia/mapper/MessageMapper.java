package com.app.authopia.mapper;

import com.app.authopia.domain.dto.MessageDTO;
import com.app.authopia.domain.dto.PaginationMessage;
import com.app.authopia.domain.dto.PostDTO;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Optional;

@Mapper
public interface MessageMapper {
    // 받은 쪽지 목록
    public List<MessageDTO> selectReceiveAll(@Param("pagination") PaginationMessage pagination, @Param("memberId") Long memberId);

    // 보낸 쪽지 목록
    public List<MessageDTO> selectSendAll(@Param("pagination") PaginationMessage pagination, @Param("memberId") Long memberId);

    // 받은 쪽지 총 개수
    public int selectCountOfReceiveMessage(Long memberId);

    // 보낸 쪽지 총 개수
    public int selectCountOfSendMessage(Long memberId);

    // 쪽지 추가
    public void insert(MessageDTO messageDTO);

    // 이메일로 멤버 Id 검색
    public Long selectIdByEmail(@Param("memberEmail") String memberEmail);

    // 받은 쪽지 상세보기
    public Optional<MessageDTO> selectReceive(Long id);

    // 보낸 쪽지 상세보기
    public Optional<MessageDTO> selectSend(Long id);

    // 쪽지 삭제
    public void delete(Long id);

    // 쪽지 읽음으로 표시
    public void update(Long id);
}
