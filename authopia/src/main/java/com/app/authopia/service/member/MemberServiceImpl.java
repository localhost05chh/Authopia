package com.app.authopia.service.member;

import com.app.authopia.dao.FileDAO;
import com.app.authopia.dao.MemberDAO;
import com.app.authopia.domain.dto.MemberDTO;
import com.app.authopia.domain.dto.PostDTO;
import com.app.authopia.domain.type.FileType;
import com.app.authopia.domain.vo.MemberVO;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class MemberServiceImpl implements MemberService {
    private final MemberDAO memberDAO;
    private final FileDAO fileDAO;

    @Override
    public Optional<MemberVO> checkEmail(String memberEmail) {
        return memberDAO.findByMemberEmail(memberEmail);
    }

    @Override
    public void join(MemberVO memberVO) {
        memberDAO.save(memberVO);
    }

    @Override
    public Optional<Long> login(String memberEmail, String memberPassword) {
        return memberDAO.findByMemberEmailAndMemberPassword(memberEmail, memberPassword);
    }

    @Override
    public void modifyPassword(String memberEmail, String memberPassword) {
        memberDAO.setPassword(memberEmail, memberPassword);
    }

    @Override
    public List<MemberDTO> getNewMember() {
        final List<MemberDTO> datas = memberDAO.findAll();
        datas.forEach(data -> data.setMemberProfileImage(fileDAO.findProfileImage(data.getId()).isPresent() ? fileDAO.findProfileImage(data.getId()).get() : null));
        return datas;
    }

    @Override
    public List<MemberDTO> getPopularMember() {
        final List<MemberDTO> datas = memberDAO.findPopular();
        datas.forEach(data -> data.setMemberProfileImage(fileDAO.findProfileImage(data.getId()).isPresent() ? fileDAO.findProfileImage(data.getId()).get() : null));
        return datas;
    }

    @Override
    public List<MemberDTO> getAllMember() {
        final List<MemberDTO> datas = memberDAO.findAllMember();
        datas.forEach(data -> data.setMemberProfileImage(fileDAO.findProfileImage(data.getId()).isPresent() ? fileDAO.findProfileImage(data.getId()).get() : null));
        return datas;
    }

    @Override
    public List<MemberDTO> getMemberByCategory(String category) {
        final List<MemberDTO> datas = memberDAO.findMemberByCategory(category);
        datas.forEach(data -> data.setMemberProfileImage(fileDAO.findProfileImage(data.getId()).isPresent() ? fileDAO.findProfileImage(data.getId()).get() : null));
        return datas;
    }

    @Override
    public Optional<MemberVO> getMemberInfo(Long id) {
        return memberDAO.findByMemberId(id);
    }

    @Override
    public void modifyMemberInfo(MemberVO memberVO) {
        memberDAO.setMemberInfo(memberVO);
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public void modifyMemberPage(MemberDTO memberDTO) {
        log.info(memberDTO.toString());
        for(int i=0; i<memberDTO.getMemberProfileImageList().size(); i++) {
            memberDTO.getMemberProfileImageList().get(i).setMemberId(memberDTO.getId());
            memberDTO.getMemberProfileImageList().get(i).setFileType(i == 0 ? FileType.REPRESENTATIVE.name() : FileType.NON_REPRESENTATIVE.name());
            fileDAO.saveProfileImage(memberDTO.getMemberProfileImageList().get(i));
        }
        memberDAO.setMemberPage(memberDTO);
    }

    @Override
    public void deleteMember(Long id) {
        memberDAO.cancelMember(id);
    }

    // 프로필 사진 추가

    @Override
    public List<MemberVO> getMember() {
        return memberDAO.findMember();
    }

    @Override
    public Optional<MemberVO> checkMemberUrl(String memberUrl) {
        return memberDAO.findByMemberUrl(memberUrl);
    }
}
