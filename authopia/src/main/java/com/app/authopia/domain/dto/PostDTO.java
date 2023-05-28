package com.app.authopia.domain.dto;

import com.app.authopia.domain.vo.FileVO;
import lombok.Builder;
import lombok.Data;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Component
@Data
public class PostDTO {
    private Long id;
    private Long memberId;
    private String postType;
    private String postName;
    private Long postViewCount;
    private Long postRecommend;
    private String postRegisterDate;
    private String postUpdateDate;
    private String postContent;
    private Boolean postIsBlinded;
    private String memberName;
    private List<FileVO> postFiles = new ArrayList<>();
    private FileVO memberProfileImage;
    private List<Long> fileIdsForDelete = new ArrayList<>();
}