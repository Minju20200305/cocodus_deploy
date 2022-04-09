import React, { useEffect, useState, useCallback } from "react";
import {
  Card,
  ContentDiv,
  PlanTitle,
  FeatureListItem,
  Icon,
  BackgroundSqure,
  DivContainer,
  Align,
  MapButton,
} from "./styles/PriceCard.styled";

import { Container } from "./styles/Container.styled";
import { Flex } from "./styles/Flex.styled";
import Data from "../api/DummyData";
import axios from "axios";
import { accessTokenStore } from "../Store/accesstoken-zustand";
import { registerUserInfoStore } from "../Store/RegisterUserInfo-zustand";
import { postData } from "../Store/postData-zustand";
import { useNavigate } from "react-router-dom";
import { registerStore } from "../Store/Register-zustand";

function PriceCard({ stack = [] }) {
  const [howMany, setHowMany] = useState([0, 3]); //첫번째가 시작인덱스 2번째가 몇개 받아올지 개수
  const [km, setKm] = useState(30);
  const { jsonData, chgJsonData } = postData();
  const { isLogin, accessToken, cocodusId } = accessTokenStore();
  const { nickName, chgInput } = registerUserInfoStore();
  // console.log({ isLogin, accessToken, cocodusId, nickName });
  useEffect(async () => {
    let temp = await axios({
      url: "http://localhost:8080/board/all",
      params: {
        isLogin: isLogin,
        accessToken,
        cocodusId,
        nickName,
        howMany,
        km,
      },
    });
    if (temp.data.length) {
      chgJsonData(temp.data);
    }
  }, [isLogin, nickName, howMany, km]);

  return (
    <div>
      {"stack=" + "[" + `${stack}` + "]"}
      {"시작인덱스=" + `${howMany[0]}` + "  총게시물=" + `${howMany[1]}`}
      <button onClick={() => setHowMany([howMany[0] + 1, howMany[1]])}>
        시작인덱스 증가
      </button>
      <button onClick={() => setHowMany([howMany[0] - 1, howMany[1]])}>
        시작인덱스 감소
      </button>
      <button onClick={() => setHowMany([howMany[0], howMany[1] + 1])}>
        총개수 증가
      </button>
      <button onClick={() => setHowMany([howMany[0], howMany[1] - 1])}>
        총개수 감소
      </button>
      {km}
      <button onClick={() => setKm(km + 1)}>km증가</button>
      <button onClick={() => setKm(km - 1)}>km감소</button>

      {jsonData
        .map((x) =>
          typeof x.jsonfile === "string"
            ? { jsonfile: JSON.parse(x.jsonfile), id: x.id }
            : x
        )
        .filter((x) =>
          stack.length
            ? stack.filter((y) => x.jsonfile.tag.indexOf(y) > -1).length
            : true
        )
        .map((x, i) => {
          return <CardSection data={x} key={x.id} stack={stack}></CardSection>;
        })}
    </div>
  );
}

function CardSection({ data, stack }) {
  const [like, setLike] = useState(0);
  const { jsonData, specificdata, chgSpecificData } = postData();
  const {
    chgInput,
    chgOnline,
    chgTag,
    chgMsg,
    chgYear,
    chgHour,
    chgMin,
    chgPlaceName,
  } = registerStore();
  let navigate = useNavigate();

  const topThree = (tag, stack) => {
    let temp = tag
      .filter((x, i) => (stack.indexOf(x) > -1 ? true : false))
      .slice(0, 3);
    if (temp.length < 3) {
      temp.push(
        ...tag
          .filter((x) => stack.indexOf(x) === -1 && temp.indexOf(x) === -1)
          .slice(0, 3 - temp.length)
      );
    }
    return temp.map((x) => {
      if (x === "Node.js")
        return <Icon src={"Node" + ".png"} key={"Node" + ".png"} />;
      else if (x === "C++")
        return <Icon src={"CPlus" + ".png"} key={"CPlus" + ".png"} />;
      else if (x === "C#")
        return <Icon src={"CSharp" + ".png"} key={"CSharp" + ".png"} />;
      else return <Icon src={x + ".png"} key={x + ".png"} />;
    });
    {
      /* <Icon src="React-icon.svg.png" /> */
    }
  };
  const findData = (id) => {
    chgSpecificData(
      jsonData.filter((el) => {
        return el.id === id;
      })
    );
    console.log(specificdata);
    chgInput("title", specificdata[0].jsonfile.title);
    chgOnline("online", specificdata[0].jsonfile.online);
    chgTag(specificdata[0].jsonfile.tag);
    chgMsg(specificdata[0].jsonfile.content);
    chgPlaceName(specificdata[0].jsonfile);
    const date = specificdata[0].jsonfile.date;
    let arr = date.split(" ");
    let year = arr.slice(0, 3);
    year = year.join(" ");
    chgYear(year);
    let hour = arr.slice(3, 5);
    if (hour[0] === "오후") {
      let h = hour[1].split("");
      h[0] = Number(h[0]) + 12;
      chgHour(h[0]);
    } else {
      let h = hour[1].split("");
      h[0] = Number(h[0]);
      chgHour(h[0]);
    }
    let min = arr.slice(5);
    if (min.length > 0) {
      min = min.join("");
      let m = min.split("");
      if (m.length === 3) {
        m = Number(`${m[0]}${m[1]}`);
        chgMin(m);
      } else {
        m = Number(`${m[0]}`);
        chgMin(m);
      }
    }
    navigate("/RegisterContentViewPage");
  };

  return (
    <Container>
      {console.log(data)}
      <Flex>
        <Card>
          <BackgroundSqure />
          <ContentDiv>
            <DivContainer>{topThree(data.jsonfile.tag, stack)}</DivContainer>
            <DivContainer onClick={() => findData(data.id)}>
              <PlanTitle>{data.jsonfile.title}</PlanTitle>
              <FeatureListItem>
                <span>{data.jsonfile.content}</span>
              </FeatureListItem>
              <span>♥️{data.total_like}</span>
              <span>👀{data.veiw_count}</span>
            </DivContainer>
            <DivContainer>
              {data.jsonfile.date}
              <br></br>
              {data.jsonfile.roadAddress}
              {/*//도로명으로 바꾸고, 도로명 주소를 길게 보게 하고 버튼 여백 줄이기 cd */}
            </DivContainer>
          </ContentDiv>
        </Card>
      </Flex>
    </Container>
  );
}

export default PriceCard;
