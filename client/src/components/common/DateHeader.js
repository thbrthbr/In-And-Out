import { format } from "date-fns";
import { Icon } from "@iconify/react";
import styled from "styled-components";

const Header = styled.div`
  width: 200px;
  height: 7%;
  display: inline-flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: baseline;
`;

const ColFirst = styled.div`
  width: 80%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;

  margin-left: 1%;
`;

const ColEnd = styled.div`
  width: 20%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: baseline;

  svg {
    width: 35%;
    height: fit-content;
    margin-left: 5%;
    color: transparentize(gray, 0.2);
    &:hover {
      cursor: pointer;
      transition: 0.2s ease-in-out;
      transform: scale(1.15);
      color: #686868;
    }
  }
`;

const Text = styled.span`
  margin-right: 5px;
  font-size: 1.6em;
  font-weight: 600;
`;

const DateHeader = ({ type, currentTime, prev, next }) => {
  return (
    <Header>
      <ColFirst>
        <span className="text">
          {type === "month" && <Text>{format(currentTime, "M")}월</Text>}
          <Text>{format(currentTime, "yyyy")}</Text>
        </span>
      </ColFirst>
      <ColEnd>
        <Icon icon="bi:arrow-left-circle-fill" onClick={prev} />
        <Icon icon="bi:arrow-right-circle-fill" onClick={next} />
      </ColEnd>
    </Header>
  );
};

export default DateHeader;
