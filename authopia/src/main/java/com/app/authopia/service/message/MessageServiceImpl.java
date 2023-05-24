package com.app.authopia.service.message;

import com.app.authopia.dao.MessageDAO;
import com.app.authopia.domain.dto.MessageDTO;
import com.app.authopia.domain.dto.PaginationMessage;
import com.app.authopia.domain.dto.PostDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class MessageServiceImpl implements MessageService {
    private final MessageDAO messageDAO;

    @Override
    public List<MessageDTO> getReceiveList(PaginationMessage pagination, Long memberId) {
        return messageDAO.findReceiveAll(pagination, memberId);
    }

    @Override
    public List<MessageDTO> getSendList(PaginationMessage pagination, Long memberId) {
        return messageDAO.findSendAll(pagination, memberId);
    }

    @Override
    public int getReceiveTotal(Long memberId) {
        return messageDAO.findCountOfReceiveMessage(memberId);
    }

    @Override
    public int getSendTotal(Long memberId) {
        return messageDAO.findCountOfSendMessage(memberId);
    }

    @Override
    public void write(MessageDTO messageDTO) {
        messageDAO.save(messageDTO);
    }

    @Override
    public Long checkIdByEmail(String memberEmail) {
        return messageDAO.findIdByEmail(memberEmail);
    }

    @Override
    public Optional<PostDTO> getReceive(Long id) {
        return messageDAO.findReceiveById(id);
    }

    @Override
    public Optional<PostDTO> getSend(Long id) {
        return messageDAO.findSendById(id);
    }

    @Override
    public void remove(Long id) {
        messageDAO.delete(id);
    }

    @Override
    public void modify(Long id) {
        messageDAO.modify(id);
    }
}
