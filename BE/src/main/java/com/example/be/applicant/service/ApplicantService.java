package com.example.be.applicant.service;

import com.example.be.applicant.dto.*;
import com.example.be.applicant.entity.Applicant;
import com.example.be.applicant.repository.ApplicantRepository;
import com.example.be.applicant.repository.CustomApplyPageRepository;
import com.example.be.artist.entity.Artist;
import com.example.be.artistfansign.dto.FansignResponseDto;
import com.example.be.artistfansign.entity.ArtistFansign;
import com.example.be.artistfansign.repository.ArtistFansignRepository;
import com.example.be.fan.entity.Fan;
import com.example.be.fan.repository.FanRepository;
import com.example.be.memberfansign.entity.MemberFansign;
import com.example.be.memberfansign.repository.MemberFansignRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class ApplicantService {

    private final ApplicantRepository applicantRepository;
    private final FanRepository fanRepository;
    private final ArtistFansignRepository artistFansignRepository;
    private final MemberFansignRepository memberFansignRepository;

    // 팬싸인회 응모 폼을 만드는 거 - 프론트에 보내줄 값
    public ApplyFormResponseDto makeApplyForm(Long artistfansign_id){
        ArtistFansign entity = artistFansignRepository.findById(artistfansign_id).
                orElseThrow(() -> new IllegalArgumentException("해당 아티스트 팬싸인회 정보가 없습니다."));

        return new ApplyFormResponseDto(entity);
    }

    // 팬싸인회 응모 폼 제출
    public Long submitApplyForm(ApplyFormRequestDto requestDto){
        // 응모를 하면 결국 applicant에 저장이 된다
        Long memberId = requestDto.getMemberId();
        Long artistFSId = requestDto.getArtistFansignId();

        // 어떤 멤버 팬싸인 아이디인지 찾기
        Long memberFSId = applicantRepository.findMemberFSIdByMemberIdandArtistFSId(artistFSId, memberId);

        // id 값으로 객체 찾기
        Fan fan = fanRepository.findById(requestDto.getFanId())
                .orElseThrow(() -> new IllegalArgumentException("해당 회원 정보가 없습니다."));
        ArtistFansign artistFansign = artistFansignRepository.findById(artistFSId)
                .orElseThrow(() -> new IllegalArgumentException("해당 팬싸인 정보가 없습니다."));
        MemberFansign memberFansign = memberFansignRepository.findById(memberFSId)
                .orElseThrow(() -> new IllegalArgumentException("해당 멤버 팬싸인 정보가 없습니다."));

        Applicant applicant = new Applicant(fan, memberFansign, requestDto.getBoughtAlbum(), artistFansign);
        applicantRepository.save(applicant);
        return applicant.getApplicantId();
    }

    // 응모페이지 전체 조회
    public List<ApplyPageDto> findAllApplyPageById(Long fanId){

        List<ApplyPageDto> result = applicantRepository.findAllApplyPageById(fanId);

        return result;
    }

    public List<SeparatedApplyPageDto> findAllApplyPageById2(Long fanId, boolean isWon){

        List<SeparatedApplyPageDto> result;
        if (isWon == false){
            // 응모한 페이지만
            result = applicantRepository.findApplyingPageById(fanId);
        }else{
            // 당첨만
            result = applicantRepository.findWonPageById(fanId);
        }

        return result;
    }

    // 응모 페이지 상세 조회
    public ApplyPageDetailDto getDetailApplyFansign(Long memberFansignId, Long fanId){
        return
                applicantRepository.findDetailFSBymemberFSId(memberFansignId, fanId);
    }

}
