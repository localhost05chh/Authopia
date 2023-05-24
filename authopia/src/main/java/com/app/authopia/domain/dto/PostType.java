package com.app.authopia.domain.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@Data
@NoArgsConstructor
public class PostType {
    String type;
    String order;
    String keyword;

    public String[] getTypes(){
        return type.split("");
    }
}
