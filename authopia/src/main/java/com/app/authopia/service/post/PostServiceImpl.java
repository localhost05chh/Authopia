package com.app.authopia.service.post;

import com.app.authopia.dao.PostDAO;
import com.app.authopia.domain.dto.PostDTO;
import com.app.authopia.domain.dto.PostType;
import com.app.authopia.domain.vo.PostVO;
import com.app.authopia.service.post.PostService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class PostServiceImpl implements PostService {
    private final PostDAO postDAO;

    //      게시글 목록
    @Override
    public List<PostDTO> getList(PostType postType){
        return postDAO.findAll(postType);
    }

    //      게시글 추가
    @Override
    public void write(PostVO postVO){
        postDAO.save(postVO);
    }

    //      게시글 조회
    @Override
    public Optional<PostDTO> read(Long id){
        return postDAO.findById(id);
    }

    //      게시글 수정
    @Override
    public void modify(PostVO postVO){
        postDAO.setPostDTO(toDTO(postVO));
    }

    //      게시글 삭제
    @Override
    public void remove(Long id){
        postDAO.delete(id);
    }

    //      게시글 복구
    @Override
    public void restore(Long id){

    }
}
