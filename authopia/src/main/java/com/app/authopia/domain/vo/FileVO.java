package com.app.authopia.domain.vo;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@Data
@NoArgsConstructor
public class FileVO {
    private Long id;
    private Long memberId;
    private Long postId;
    private Long messageId;
    private String fileType;
    private String filePath;
    private String fileUuid;
    private String fileName;
    private Long fileSize;
}
