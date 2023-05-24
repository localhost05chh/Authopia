package com.app.authopia.mapper;

import com.app.authopia.domain.dto.Pagination;
import com.app.authopia.domain.dto.PostDTO;
import com.app.authopia.domain.dto.PostType;
import com.app.authopia.domain.vo.PostVO;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Optional;

@Mapper
public interface PostMapper {
//      게시글 목록
    public List<PostDTO> selectAll(PostType postType);


//      게시글 추가
    public void insert(PostVO postVO);

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

    //      관리자 페이지 게시글 목록
    public List<PostDTO> selectManager();
}
