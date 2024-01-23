package com.example.be.artistfansign.service;

import com.example.be.artistfansign.dto.AddArtistFansignRequestDto;
import com.example.be.artistfansign.dto.ArtistsMyFansignResponseDto;
import com.example.be.artistfansign.dto.FansignResponseDto;
import com.example.be.artistfansign.dto.RecentFansignResponseDto;
import com.example.be.artistfansign.entity.ArtistFansign;
import com.example.be.artistfansign.entity.FansignStatus;
import com.example.be.artistfansign.repository.ArtistFansignRepository;
import com.example.be.member.Member;
import com.example.be.member.repository.MemberRepository;
import com.example.be.memberfansign.entity.MemberFansign;
import com.example.be.memberfansign.repository.MemberFansignRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class ArtistFansignService {

    private final ArtistFansignRepository artistFansignRepository;
    private final MemberFansignRepository memberFansignRepository;
    private final MemberRepository memberRepository;

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

    // 팬싸인회 최근 3개 리스트 가져오기
    public List<RecentFansignResponseDto> getRecent3Fansign(){
        List<ArtistFansign> list =
        artistFansignRepository.findTop3ByOrderByCreatedDateDesc();
        List<RecentFansignResponseDto> top3List = new ArrayList<>();
        for(ArtistFansign artistFansign : list){
            top3List.add(new RecentFansignResponseDto(artistFansign));
        }
        return top3List;
    }

    // 팬싸인회 리스트 가져오기
    public List<FansignResponseDto> getFansign(Long fanId){
        List<FansignResponseDto> list =
                artistFansignRepository.findArtistFansignAndApplyInfo(fanId);

        return list;
    }

    // 아티스트가 내가 개설한 팬싸 목록 가져오기 (아티스트가 속한 멤버의 팬싸인회)
    public List<ArtistsMyFansignResponseDto> getArtistsFansign(Long artistId, FansignStatus status){
        List<ArtistsMyFansignResponseDto> list
                = artistFansignRepository.findArtistsMyFansign(artistId, status);
        return list;
    }
}
