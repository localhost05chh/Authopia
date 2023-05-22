package com.app.authopia.domain.dto;

import lombok.Data;

@Data
public class Pagination {
    private Integer page;
    private int rowCount;
    private int pageCount;
    private int startPage;
    private int endPage;
    private int total;

    public Pagination() {
        this.page = page == null? 1 : page;
        this.rowCount = 4;
        this.pageCount = 5;
        this.total = 20;
        this.endPage = 5;
        this.startPage = 1;
    }
}
