package com.app.authopia.domain.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@Data
@NoArgsConstructor
public class PostType {
    private String type;
    private String order;
    private String keyword;
}
