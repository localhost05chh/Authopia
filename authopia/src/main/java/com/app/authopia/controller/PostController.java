package com.app.authopia.controller;

import com.app.authopia.service.post.PostService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/post/*")
public class PostController{
    private final PostService postService;

    @GetMapping("list")
    public void list(Model model){
        model.addAttribute("posts", postService.getList());
    }

    @GetMapping("read")
    public void read(Long id, Model model){
        model.addAttribute("post", postService.read(id));
    }
}