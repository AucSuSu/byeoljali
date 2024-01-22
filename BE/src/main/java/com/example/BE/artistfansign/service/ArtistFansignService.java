package com.example.BE.artistfansign.service;

import com.example.BE.artistfansign.dto.AddArtistFansignRequestDto;
import com.example.BE.artistfansign.entity.ArtistFansign;
import com.example.BE.artistfansign.entity.FansignStatus;
import com.example.BE.artistfansign.repository.ArtistFansignRepository;
import com.example.BE.fan.entity.Fan;
import com.example.BE.member.Member;
import com.example.BE.member.repository.MemberRepository;
import com.example.BE.memberfansign.MemberFansign;
import com.example.BE.memberfansign.repository.MemberFansignRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class ArtistFansignService {

    ArtistFansignRepository artistFansignRepository;
    MemberFansignRepository memberFansignRepository;
    MemberRepository memberRepository;

    // 팬싸인회 개설하기
    public Long addFansign(AddArtistFansignRequestDto dto){
        // artistFansign 개설
        ArtistFansign artistFansign = new ArtistFansign(dto.getTitle(), dto.getPostImageUrl(), dto.getInformation(), dto.getStartApplyTime()
                ,dto.getEndApplyTime(), dto.getStartFansignTime(), FansignStatus.READY_APPLYING, dto.getMode());
        artistFansignRepository.save(artistFansign);
        Long artisFansignId = artistFansign.getArtistfansignId();

        // memberFansign 개설
        for(Long memberId : dto.getMemberIdList()){
            // 멤버 조회
            Member member = memberRepository.findById(memberId).
                    orElseThrow(() -> new IllegalArgumentException("해당 멤버가 없습니다."));

            MemberFansign memberFansign = new MemberFansign(artistFansign, member);
            memberFansignRepository.save(memberFansign);
        }
        return artisFansignId;
    }
}
