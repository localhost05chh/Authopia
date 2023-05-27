package com.app.authopia.controller;

import com.app.authopia.domain.dto.CommentDTO;
import com.app.authopia.domain.vo.CommentVO;
import com.app.authopia.domain.dto.Pagination;
import com.app.authopia.service.comment.CommentService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/commentes/*")
public class CommentController {

    private final CommentService commentService;

    @PostMapping("write")
    public void write(@RequestBody CommentVO commentVO){
        commentService.write(commentVO);
    }

    @GetMapping("list/{postId}/{page}")
    public List<CommentDTO> getList(@PathVariable int page, @PathVariable Long postId){
        final Pagination pagination = new Pagination();
        pagination.setPage(page);
        pagination.progress();
        return commentService.getList(postId, pagination);
    }

    @PutMapping("modify")
    public void modify(@RequestBody CommentVO commentVO){
        commentService.modify(commentVO);
    }

    @DeleteMapping("{id}")
    public void remove(@PathVariable Long id){
        commentService.remove(id);
    }
}






















