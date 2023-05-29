package com.app.authopia.service.post;


import com.app.authopia.domain.dto.Pagination;
import com.app.authopia.domain.dto.PaginationMessage;
import com.app.authopia.domain.dto.PostDTO;
import com.app.authopia.domain.dto.PostType;
import com.app.authopia.domain.vo.PostVO;

import java.util.List;
import java.util.Optional;

public interface PostService {
    //      게시글 목록
    public List<PostDTO> getList(Pagination pagination, PostType postType);

    //      게시글 추가
    public void write(PostDTO postDTO);

    //      게시글 조회
    public Optional<PostDTO> read(Long id);

    //      게시글 수정
    public void modify(PostDTO postDTO);

    //      게시글 삭제
    public void remove(Long id);

    //      게시글 복구
    public void restore(Long id);

    //    게시글 전체 개수 조회
    public int getTotal(PostType postType);

    //      게시글 조회수 증가
    public void increaseViewCount(Long id);

    default PostDTO toDTO(PostVO postVO){
        PostDTO postDTO = new PostDTO();
        postDTO.setId(postVO.getId());
        postDTO.setMemberId(postVO.getMemberId());
        postDTO.setPostName(postVO.getPostName());
        postDTO.setPostType(postVO.getPostType());
        postDTO.setPostViewCount(postVO.getPostViewCount());
        postDTO.setPostRecommend(postVO.getPostRecommend());
        postDTO.setPostRegisterDate(postVO.getPostRegisterDate());
        postDTO.setPostUpdateDate(postVO.getPostUpdateDate());
        postDTO.setPostContent(postVO.getPostContent());
        postDTO.setPostIsBlinded(postVO.getPostIsBlinded());
        return postDTO;
    }

    // 메인페이지에서 최신 인기 포스트 조회
    public List<PostDTO> getListMain(Pagination pagination);

    //  내 게시글 목록
    public List<PostDTO> getListMyPost(Pagination pagination, PostType postType);

    //  내 게시글 전체 개수 조회
    public int getTotalMyPost(PostType postType, Long memberId);

    // 관리자페이지에서 조회
    public List<PostDTO> getListManager(Pagination pagination);

    //      게시글 목록
    public List<PostDTO> getListAuthor(Pagination pagination, PostType postType,Long memberId);
}