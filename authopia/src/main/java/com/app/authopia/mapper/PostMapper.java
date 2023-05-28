package com.app.authopia.mapper;

import com.app.authopia.domain.dto.Pagination;
import com.app.authopia.domain.dto.PostDTO;
import com.app.authopia.domain.dto.PostType;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Optional;

@Mapper
public interface PostMapper {
//      게시글 목록
    public List<PostDTO> selectAll(Pagination pagination,PostType postType);


//      게시글 추가
    public void insert(PostDTO postDTO);

//      게시글 조회
    public Optional<PostDTO> select(Long id);

//      게시글 수정
    public void update(PostDTO postDTO);

//      게시글 삭제
    public void delete(Long id);

//      게시글 복구
    public void restore(Long id);

    // 메인페이지에서 최신 인기 포스트 조회
    public List<PostDTO> selectMain(@Param("pagination") Pagination pagination);

    //    게시글 총 개수
    public int selectCountOfPost(PostType postType);

    //      게시글 조회수 증가
    public void updateViewCount(Long id);

    //  내 게시글 목록
    public List<PostDTO> selectAllMyPost(Pagination pagination, PostType postType);

    //    게시글 총 개수
    public int selectCountOfMyPost(PostType postType, Long memberId);

    //      관리자 페이지 게시글 목록
    public List<PostDTO> selectManager();

}
