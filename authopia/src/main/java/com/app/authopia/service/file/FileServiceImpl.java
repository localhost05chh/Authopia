package com.app.authopia.service.file;

import com.app.authopia.dao.FileDAO;
import com.app.authopia.dao.MemberDAO;
import com.app.authopia.domain.vo.FileVO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class FileServiceImpl implements FileService {

    private final FileDAO fileDAO;

    @Override
    public Optional<FileVO> getProfileImage(Long memberId) {
        return fileDAO.findProfileImage(memberId);
    }
}
