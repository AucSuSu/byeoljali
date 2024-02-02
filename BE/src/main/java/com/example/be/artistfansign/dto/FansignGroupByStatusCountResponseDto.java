package com.example.be.artistfansign.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class FansignGroupByStatusCountResponseDto {

    private Long READY_COUNT = 0L;
    private Long APPLYING_COUNT = 0L;
    private Long FANSIGN_COUNT = 0L;
    private Long FINISH_COUNT = 0L;

    public void addREADY_COUNT(Long count){
        this.READY_COUNT += count;
    }
    public void addAPPLYING_COUNT(Long count){
        this.APPLYING_COUNT += count;
    }
    public void addFANSIGN_COUNT(Long count){
        this.FANSIGN_COUNT += count;
    }
    public void addFINISH_COUNT(Long count){
        this.FINISH_COUNT += count;
    }
}
