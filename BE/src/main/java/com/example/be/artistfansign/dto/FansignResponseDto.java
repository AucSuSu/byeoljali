package com.example.be.artistfansign.dto;

import com.example.be.artistfansign.entity.FansignStatus;
import lombok.Data;
import lombok.Getter;

@Getter
@Data
public class FansignResponseDto {

    private Long artistfansignId;
    private String title;
    private String posterImageUrl;
    private Boolean isApplyed;
    private FansignStatus status;

    public FansignResponseDto(Long artistfansignId, String title, String posterImageUrl, Boolean isApplyed, FansignStatus status) {
        this.artistfansignId = artistfansignId;
        this.title = title;
        this.posterImageUrl = posterImageUrl;
        this.isApplyed = isApplyed;
        this.status = status;
    }
}