package com.example.BE.applicant.service;

import com.example.BE.applicant.dto.ApplyFormRequestDto;
import com.example.BE.applicant.dto.ApplyPageDto;
import com.example.BE.applicant.Applicant;
import com.example.BE.applicant.repository.ApplicantRepository;
import com.example.BE.artistfansign.entity.ArtistFansign;
import com.example.BE.artistfansign.repository.ArtistFansignRepository;
import com.example.BE.fan.entity.Fan;
import com.example.BE.fan.repository.FanRepository;
import com.example.BE.memberfansign.MemberFansign;
import com.example.BE.memberfansign.repository.MemberFansignRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
public class ApplicantService {

    private final ApplicantRepository applicantRepository;
    private final FanRepository fanRepository;
    private final ArtistFansignRepository artistFansignRepository;
    private final MemberFansignRepository memberFansignRepository;

    // 팬싸인회 응모 폼 제출
    public Long submitApplyForm(ApplyFormRequestDto requestDto){
        // 응모를 하면 결국 applicant에 저장이 된다
        Long memberId = requestDto.getMemberId();
        Long artistFSId = requestDto.getArtistFansignId();

        // 어떤 멤버 팬싸인 아이디인지 찾기
        Long memberFSId = applicantRepository.asdasdss(artistFSId, memberId);

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

    public ApplyPageDto findById(Long id){

        Applicant applicant = applicantRepository.findById(id).
                orElseThrow(() -> new IllegalArgumentException("해당 응모자 정보가 없습니다."));

        List<ApplyPageDto> result = applicantRepository.findAllFetchJoin(applicant.getApplicantId());

        return new ApplyPageDto(entity.getPosterImageUrl(), entity.getTitle(), entity.get);
    }

}
