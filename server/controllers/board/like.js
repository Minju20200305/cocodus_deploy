const { User_like, Post_comment, sequelize } = require("../../models");

module.exports = {
  get: async (req, res) => {
    //내가 좋아요 한 모임 정보를 모아보는 페이지
    // 내가 작성하지 않은 글도 포함되어야 합니다
    {
      /*
      보낼 때 : 헤더에 담겨서 accessToken하고 cocodusid
      {
        accessToken: accessToken,
        cocodusId: cocodusid
      }
    */
    }

    const 토큰하고아이디받는변수 = req.headers.data;

    //시퀄라이즈 db에 User_like 테이블에서 cocodusId로 검색
    //나온 게시물 id를 다 받아서 다시 조회
    {
      /*
      [...{
        postId : 모임 정보 번호          
        tag: [공부할 언어],
        title: 모임 정보 제목
        meetingdate: 일시(모임시간)
        totalLike : 좋아요 수
        totalView: 조회수
        location: 상호명으로 바로 볼 수 있는 모임(위치)
        roadAddress: 도로명주소 (클라는 카멜로 보내주세요 db가 알아서 받겠습니다)
        }
      ]
      //위의 정보를 시퀄라이즈로 조회해서 '내가좋아요모든모임정보변수' = [] 에다가 하나씩 요소로 추가
     */
    }
    //위에서 조회한 내용을 json객체로 받음.
    res.status(200).json("내가좋아요한모든모임정보변수");
  },
  patch: async (req, res) => {
    const { accessToken, user_id, postId, inc } = req.body;

    let postLike;
    if (inc) {
      postLike = await User_like.create(
        {
          user_id,
          post_id: postId,
        },
        {
          fields: ["user_id", "post_id"],
        }
      );
    } else {
      postLike = await User_like.destroy({
        where: {
          user_id,
          post_id: postId,
        },
      });
    }
    console.log(postLike);

    //정보가 다 잘 들어갔으면 딱히 전송해줄 정보는 없음
    res.status(200).send("board yes like patch");
    //글 작성이 완료되면 페이지 이동은 없고 댓글이 바로 보여야함
  },
};
