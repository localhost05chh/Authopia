package com.app.authopia.service.file;

import com.app.authopia.domain.vo.FileVO;
import com.app.authopia.domain.vo.MemberVO;

import java.util.Optional;

public interface FileService {
    // 프로필 사진 가져오기
    public Optional<FileVO> getProfileImage(Long memberId);
}
