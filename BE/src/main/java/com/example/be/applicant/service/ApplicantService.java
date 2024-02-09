package com.example.be.applicant.service;

import com.example.be.applicant.dto.*;
import com.example.be.applicant.entity.Applicant;
import com.example.be.applicant.repository.ApplicantRepository;
import com.example.be.applicant.repository.CustomApplyPageRepository;
import com.example.be.artist.entity.Artist;
import com.example.be.artistfansign.dto.FansignResponseDto;
import com.example.be.artistfansign.entity.ArtistFansign;
import com.example.be.artistfansign.repository.ArtistFansignRepository;
import com.example.be.config.oauth.FanPrincipalDetails;
import com.example.be.fan.entity.Fan;
import com.example.be.fan.repository.FanRepository;
import com.example.be.fan.service.FanService;
import com.example.be.memberfansign.entity.MemberFansign;
import com.example.be.memberfansign.repository.MemberFansignRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class ApplicantService {

    private final ApplicantRepository applicantRepository;
    private final MemberFansignRepository memberFansignRepository;
    private final ArtistFansignRepository artistFansignRepository;

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
        Fan fan = getFan();
        ArtistFansign artistFansign = artistFansignRepository.findById(artistFSId)
                .orElseThrow(() -> new IllegalArgumentException("해당 팬싸인 정보가 없습니다."));
        MemberFansign memberFansign = memberFansignRepository.findById(memberFSId)
                .orElseThrow(() -> new IllegalArgumentException("해당 멤버 팬싸인 정보가 없습니다."));

        Applicant applicant = new Applicant(fan, memberFansign, requestDto.getBoughtAlbum(), artistFansign);
        applicantRepository.save(applicant);
        return applicant.getApplicantId();
    }

    // 응모페이지 전체 조회
    public List<ApplyPageDto> findAllApplyPageById(){
        Fan fan = getFan();
        List<ApplyPageDto> result = applicantRepository.findAllApplyPageById(fan);

        return result;
    }

    public List<SeparatedApplyPageDto> findAllApplyPageById2(boolean isWon){

        List<SeparatedApplyPageDto> result;
        Fan fan = getFan();
        if (isWon == false){
            // 응모한 페이지만
            result = applicantRepository.findApplyingPageById(fan);
        }else{
            // 당첨만
            result = applicantRepository.findWonPageById(fan);
        }

        return result;
    }

    // 응모 페이지 상세 조회
    public ApplyPageDetailDto getDetailApplyFansign(Long memberFansignId){
        Fan fan = getFan();
        return
                applicantRepository.findDetailFSBymemberFSId(memberFansignId,fan);
    }

    private Fan getFan(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        FanPrincipalDetails fanPrincipalDetails = (FanPrincipalDetails) authentication.getPrincipal();
        return fanPrincipalDetails.getFan();
    }

}
