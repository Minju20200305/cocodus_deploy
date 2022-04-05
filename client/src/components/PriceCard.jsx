import React, { useEffect, useState } from "react";
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

function PriceCard({ stack }) {
  const [data, data변경] = useState(Data);
  return (
    <div>
      {stack.length
        ? data
            .filter((x) => stack.indexOf(x.icon) > -1)
            .map((x, i, a) => {
              return <CardSection data={x} key={"CardSection" + i} />;
            })
        : data.map((x, i) => {
            return <CardSection data={x} key={"CardSection" + i} />;
          })}
    </div>
  );
}

function CardSection(props) {
  const [like, setLike] = useState(0);
  return (
    <Container>
      <Flex>
        <Card>
          <BackgroundSqure />
          <ContentDiv>
            <DivContainer>
              <Icon src="React-icon.svg.png" />
            </DivContainer>
            <DivContainer>
              <PlanTitle>{props.data.title}</PlanTitle>
              <FeatureListItem>
                <span>{props.data.content}</span>
              </FeatureListItem>

              <span
                onClick={() => {
                  setLike(like + 1);
                }}
              >
                ♥️{like}
              </span>
              <span>👀</span>
            </DivContainer>
            <DivContainer>
              일자: {props.data.date}
              <br></br>
              위치: {props.data.placeName}
            </DivContainer>
            <MapButton>상세 보기</MapButton>
          </ContentDiv>
        </Card>
      </Flex>
    </Container>
  );
}

export default PriceCard;
