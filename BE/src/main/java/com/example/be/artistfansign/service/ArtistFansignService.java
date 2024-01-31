package com.example.be.artistfansign.service;

import com.example.be.artist.entity.Artist;
import com.example.be.artist.repository.ArtistRepository;
import com.example.be.artistfansign.dto.AddArtistFansignRequestDto;
import com.example.be.artistfansign.dto.ArtistsMyFansignResponseDto;
import com.example.be.artistfansign.dto.FansignResponseDto;
import com.example.be.artistfansign.dto.RecentFansignResponseDto;
import com.example.be.artistfansign.entity.ArtistFansign;
import com.example.be.artistfansign.entity.FansignStatus;
import com.example.be.artistfansign.repository.ArtistFansignRepository;
import com.example.be.config.auth.PrincipalDetails;
import com.example.be.config.oauth.FanPrincipalDetails;
import com.example.be.fan.entity.Fan;
import com.example.be.member.entity.Member;
import com.example.be.member.repository.MemberRepository;
import com.example.be.memberfansign.entity.MemberFansign;
import com.example.be.memberfansign.repository.MemberFansignRepository;
import com.example.be.s3.S3Uploader;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class ArtistFansignService {

    private final ArtistFansignRepository artistFansignRepository;
    private final MemberFansignRepository memberFansignRepository;
    private final ArtistRepository artistRepository;
    private final MemberRepository memberRepository;
    private final S3Uploader s3Uploader;

    // 팬싸인회 개설하기
    public Long addFansign(AddArtistFansignRequestDto dto, MultipartFile image){
        // artist 조회
        Artist artist = getArtist();
        LocalDateTime startApplyTime = convertDateTime(dto.getStartApplyTime());
        LocalDateTime endApplyTime = convertDateTime(dto.getEndApplyTime());
        LocalDateTime startFansignTime = convertDateTime(dto.getStartFansignTime());

        try {
            String imageUrl = s3Uploader.uploadPoster(image, "fansignPoster", artist.getName(), startFansignTime);
            // artistFansign 개설
            ArtistFansign artistFansign = new ArtistFansign(dto.getTitle(), imageUrl, dto.getInformation(), startApplyTime
                    , endApplyTime, startFansignTime, FansignStatus.READY_APPLYING, dto.getMode(), artist);
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
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    // 팬싸인회 최근 3개 리스트 가져오기
    public List<RecentFansignResponseDto> getRecent3Fansign(){
        List<RecentFansignResponseDto> list =
        artistFansignRepository.findTop3ByOrderByCreatedDateDesc();

        return list;
    }

    // 팬싸인회 리스트 가져오기
    public List<FansignResponseDto> getFansign(String keyword, String orderCondition, FansignStatus status){
        Fan fan = getFan();
        List<FansignResponseDto> list =
                artistFansignRepository.findArtistFansignAndApplyInfo(fan, keyword, orderCondition, status);

        return list;
    }

    // 아티스트가 내가 개설한 팬싸 목록 가져오기 (아티스트가 속한 멤버의 팬싸인회)
    public List<ArtistsMyFansignResponseDto> getArtistsFansign(FansignStatus status){
        List<ArtistsMyFansignResponseDto> list
                = artistFansignRepository.findArtistsMyFansign(getArtist(), status);
        return list;
    }

    private Artist getArtist(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        PrincipalDetails principalDetails = (PrincipalDetails) authentication.getPrincipal();
        return principalDetails.getArtist();
    }

    private LocalDateTime convertDateTime(String dateString){
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        return LocalDateTime.parse(dateString, formatter);
    }

    private Fan getFan(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        FanPrincipalDetails fanPrincipalDetails = (FanPrincipalDetails) authentication.getPrincipal();
        return fanPrincipalDetails.getFan();
    }
}
