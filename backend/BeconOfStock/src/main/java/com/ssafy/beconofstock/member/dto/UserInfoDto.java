package com.ssafy.beconofstock.member.dto;

import com.ssafy.beconofstock.contest.dto.ContestHistoryDto;
import com.ssafy.beconofstock.member.entity.Member;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Setter
public class UserInfoDto {
    private String nickname;
    private Long followNum;
    private Long followerNum;
    private Long postNum;
    private String profileImg;
    List<ContestHistoryDto> contestHistory;

    public UserInfoDto(Member member) {
        this.nickname = member.getNickname();
        this.followNum = member.getFollowNum();
        this.followerNum = member.getFollowerNum();
        this.profileImg = member.getProfileImg();
    }

}
