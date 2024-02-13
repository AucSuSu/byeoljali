package com.example.be.artistfansign.dto;

import com.example.be.artistfansign.entity.ArtistFansign;
import com.example.be.artistfansign.entity.FansignStatus;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class RecentFansignResponseDto {

    private Long artistfansignId;
    private Long artistId;
    private String posterImageUrl;
    private FansignStatus status;

}
