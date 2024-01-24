package com.example.be.photo.service;

import com.example.be.artistfansign.entity.ArtistFansign;
import com.example.be.artistfansign.repository.ArtistFansignRepository;
import com.example.be.fan.entity.Fan;
import com.example.be.fan.repository.FanRepository;
import com.example.be.memberfansign.entity.MemberFansign;
import com.example.be.memberfansign.repository.MemberFansignRepository;
import com.example.be.photo.dto.PhotoDBDto;
import com.example.be.photo.dto.PhotoResponseDto;
import com.example.be.photo.entity.Photo;
import com.example.be.photo.repository.PhotoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class PhotoService {

    private final PhotoRepository photoRepository;
    private final FanRepository fanRepository;
    private final ArtistFansignRepository artistFansignRepository;
    private final MemberFansignRepository memberFansignRepository;

    // 인생 네컷 페이지 - 전체 조회
    public List<PhotoResponseDto> showPhoto(Long fanId){
//        List<PhotoResponseDto> result;
//        if (keyword==null){ // 키워드에 아무것도 안들어가면 전체 인생네컷 보여줌
//            result = photoRepository.findAllPhotoByArtistFSIdandFanId(fanId);
//        }else{ // 키워드에 뭐라도 있으면 그걸로 필터링한 결과만 보여줘
//            // 이 작업은 repository에서 해야할 듯?
//            result = null;
//        }
//        return result;

        return photoRepository.findAllPhotoByArtistFSIdandFanId(fanId);
    }

    // 필터 - 날짜별, 결제완료, 아티스트 별

    // 인생네컷 결제
    // 인생네컷 삭제
    public Long deletePhoto(Long photoId){
        Photo entity = photoRepository.findById(photoId) // 해당 사진을 가지고 온다
                .orElseThrow(()->new IllegalArgumentException("해당 사진이 없습니다. id="+photoId));

        photoRepository.delete(entity);

        return photoId;
    }

    // 인생네컷 다운로드
    public Long downloadDBPhoto(PhotoDBDto photoDBDto){

        Long fanId = photoDBDto.getFanId();
        Long memberfansignId = photoDBDto.getMemberfansignId();
        Long artistFansignId = photoDBDto.getArtistFansignId();

        Fan fan = fanRepository.findById(fanId)
                .orElseThrow(() -> new IllegalArgumentException("해당 회원 정보가 없습니다."));
        ArtistFansign artistFansign = artistFansignRepository.findById(artistFansignId)
                .orElseThrow(() -> new IllegalArgumentException("해당 팬싸인회 정보가 없습니다."));
        MemberFansign memberFansign = memberFansignRepository.findById(memberfansignId)
                .orElseThrow(() -> new IllegalArgumentException("해당 멤버의 팬싸인회 정보가 없습니다."));

        Photo photo = new Photo(fan, memberFansign, photoDBDto.getPhotoUrl(), false, artistFansign);
        photoRepository.save(photo);
        return photo.getPhotoId();
    }

}