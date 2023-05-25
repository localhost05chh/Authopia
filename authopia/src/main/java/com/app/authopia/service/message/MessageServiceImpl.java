package com.app.authopia.service.message;

import com.app.authopia.dao.FileDAO;
import com.app.authopia.dao.MessageDAO;
import com.app.authopia.domain.dto.MessageDTO;
import com.app.authopia.domain.dto.PaginationMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class MessageServiceImpl implements MessageService {
    private final MessageDAO messageDAO;
    private final FileDAO fileDAO;

    @Override
    @Transactional(rollbackFor = Exception.class)
    public List<MessageDTO> getReceiveList(PaginationMessage pagination, Long memberId) {
        final List<MessageDTO> datas = messageDAO.findReceiveAll(pagination, memberId);
        datas.forEach(data -> data.setMessageFiles(fileDAO.findAllMessageFile(data.getId())));
//        datas.forEach(data -> data.setMemberProfileImage(fileDAO.findProfileImage(data.getSendMemberId()).isPresent() ? fileDAO.findProfileImage(data.getSendMemberId()).get() : null));
        return datas;
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public List<MessageDTO> getSendList(PaginationMessage pagination, Long memberId) {
        final List<MessageDTO> datas = messageDAO.findSendAll(pagination, memberId);
        datas.forEach(data -> data.setMessageFiles(fileDAO.findAllMessageFile(data.getId())));
//        datas.forEach(data -> data.setMemberProfileImage(fileDAO.findProfileImage(data.getReceiveMemberId()).isPresent() ? fileDAO.findProfileImage(data.getReceiveMemberId()).get() : null));
        return datas;
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
    @Transactional(rollbackFor = Exception.class)
    public Optional<MessageDTO> getReceive(Long id) {
        final Optional<MessageDTO> foundMessage = messageDAO.findReceiveById(id);
        if(foundMessage.isPresent()){
            foundMessage.get().setMessageFiles(fileDAO.findAllMessageFile(foundMessage.get().getId()));
        }
        return foundMessage;
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public Optional<MessageDTO> getSend(Long id) {
        final Optional<MessageDTO> foundMessage = messageDAO.findSendById(id);
        if(foundMessage.isPresent()){
            foundMessage.get().setMessageFiles(fileDAO.findAllMessageFile(foundMessage.get().getId()));
        }
        return foundMessage;
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public void remove(Long id) {
        messageDAO.delete(id);
        fileDAO.deleteAllMessageFile(id);
    }

    @Override
    public void modify(Long id) {
        messageDAO.modify(id);
    }
}
