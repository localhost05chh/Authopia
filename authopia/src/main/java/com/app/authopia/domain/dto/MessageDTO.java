package com.app.authopia.domain.dto;

import com.app.authopia.domain.vo.FileVO;
import lombok.Data;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
@Data
public class MessageDTO {
    private Long id;
    private Long sendMemberId;
    private Long receiveMemberId;
    private String messageName;
    private Boolean messageView;
    private String messageRegisterDate;
    private String messageContent;
    private String memberName;
    private List<FileVO> postFiles = new ArrayList<>();
    private FileVO memberProfileImage;
    private List<Long> fileIdsForDelete = new ArrayList<>();
}
