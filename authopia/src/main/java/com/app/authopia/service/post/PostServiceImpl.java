package com.app.authopia.service.post;

import com.app.authopia.dao.FileDAO;
import com.app.authopia.dao.PostDAO;
import com.app.authopia.domain.dto.Pagination;
import com.app.authopia.domain.dto.PostDTO;
import com.app.authopia.domain.dto.PostType;
import com.app.authopia.domain.type.FileType;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class PostServiceImpl implements PostService {
    private final PostDAO postDAO;
    private final FileDAO fileDAO;

    //      게시글 목록
    @Override
    @Transactional(rollbackFor = Exception.class)
    public List<PostDTO> getList(Pagination pagination, PostType postType) {
        final List<PostDTO> posts = postDAO.findAll(pagination, postType);
        posts.forEach(data -> {
            data.setPostFiles(fileDAO.findAllFile(data.getId()));
            if (fileDAO.findProfileImage(data.getMemberId()).isPresent()) {
                data.setMemberProfileImage(fileDAO.findProfileImage(data.getMemberId()).get());
            }
        });
        return posts;
    }

    //      게시글 추가
    @Override
    @Transactional(rollbackFor = Exception.class)
    public void write(PostDTO postDTO) {
        postDAO.save(postDTO);
        for (int i = 0; i < postDTO.getPostFiles().size(); i++) {
            postDTO.getPostFiles().get(i).setPostId(postDTO.getId());
            if(postDTO.getPostFiles().get(i).getFileType() == null){
                postDTO.getPostFiles().get(i).setFileType(FileType.NON_REPRESENTATIVE.name());
            }
            fileDAO.saveFile(postDTO.getPostFiles().get(i));
        }
    }

    //      게시글 조회
    @Override
    @Transactional(rollbackFor = Exception.class)
    public Optional<PostDTO> read(Long id) {
        final Optional<PostDTO> foundPost = postDAO.findById(id);
        if (foundPost.isPresent()) {
            foundPost.get().setPostFiles(fileDAO.findAllFile(foundPost.get().getId()));
            if (fileDAO.findProfileImage(foundPost.get().getMemberId()).isPresent()) {
                foundPost.get().setMemberProfileImage(fileDAO.findProfileImage(foundPost.get().getMemberId()).get());
            }
        }
        postDAO.setViewCount(id);
        return foundPost;
    }

    //      게시글 수정
    @Override
    @Transactional(rollbackFor = Exception.class)
    public void modify(PostDTO postDTO) {
        postDAO.setPostDTO(postDTO);
//      추가
        postDTO.getPostFiles().forEach(file -> {
            if(file.getFileType() == null) {
                file.setFileType(FileType.NON_REPRESENTATIVE.name());
            }
            file.setPostId(postDTO.getId());
            fileDAO.saveFile(file);
        });
//      삭제
        postDTO.getFileIdsForDelete().forEach(fileDAO::deleteFile);
    }

    //      게시글 삭제
    @Override
    @Transactional(rollbackFor = Exception.class)
    public void remove(Long id) {
        postDAO.delete(id);
        fileDAO.deleteAllFile(id);
    }

    //      게시글 복구
    @Override
    public void restore(Long id) {

    }

    //    게시글 전체 개수 조회
    @Override
    public int getTotal(PostType postType) {
        return postDAO.findCountOfPost(postType);
    }

    //      게시글 조회수 증가
    @Override
    public void increaseViewCount(Long id) {
        postDAO.setViewCount(id);
    }

    // 메인페이지에서 최신 인기 포스트 조회
    @Override
    public List<PostDTO> getListMain(Pagination pagination) {

        final List<PostDTO> datas = postDAO.findPostMain(pagination);
        datas.forEach(data -> data.setPostFiles(fileDAO.findAllFile(data.getId())));
        datas.forEach(data -> data.setMemberProfileImage(fileDAO.findProfileImage(data.getMemberId()).isPresent() ? fileDAO.findProfileImage(data.getMemberId()).get() : null));
        return datas;
    }

//        내 게시글 목록
    @Override
    public List<PostDTO> getListMyPost(Long memberId, Pagination pagination, PostType postType) {
        final List<PostDTO> posts = postDAO.findAllMyPost(memberId, pagination, postType);
        posts.forEach(data -> data.setPostFiles(fileDAO.findAllFile(data.getId())));
        return posts;
    }

//      내 게시글 총 개수
    @Override
    public int getTotalMyPost(PostType postType) {
        return postDAO.findCountOfMyPost(postType);
    }

    // 관리자페이지에서 조회
    @Override
    public List<PostDTO> getListManager(Pagination pagination) {
        return postDAO.findPostManager(pagination);
    }

    //      게시글 목록
    @Override
    @Transactional(rollbackFor = Exception.class)
    public List<PostDTO> getListAuthor(Pagination pagination, PostType postType,Long memberId){
        final List<PostDTO> posts = postDAO.findAllAuthor(pagination, postType, memberId);
        posts.forEach(data -> data.setPostFiles(fileDAO.findAllFile(data.getId())));

        return posts;
    }

}
