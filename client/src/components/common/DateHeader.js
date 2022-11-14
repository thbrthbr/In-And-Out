import { format, subMonths, subYears } from "date-fns";
import { Icon } from "@iconify/react";
import styled from "styled-components";

const Header = styled.div`
  width: 300px;
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

const Spacer = styled.span`
  font-weight: 800;
  margin-right: 10px;
`;

const DateHeader = ({ type, currentTime, prev, next }) => {
  return (
    <>
      {type === "month" && (
        <Header>
          <ColFirst>
            <span className="text">
              <Text>{format(currentTime, "M")}월</Text>
              <Text>{format(currentTime, "yyyy")}</Text>
            </span>
          </ColFirst>
          <ColEnd>
            <Icon icon="bi:arrow-left-circle-fill" onClick={prev} />
            <Icon icon="bi:arrow-right-circle-fill" onClick={next} />
          </ColEnd>
        </Header>
      )}
      {type === "year" && (
        <Header>
          <ColFirst>
            <span className="text">
              <Text>{format(currentTime, "M")}월</Text>
              <Text>{format(subYears(currentTime, 1), "yyyy")}</Text>
            </span>
          </ColFirst>
          <Spacer>-</Spacer>
          <ColFirst>
            <span className="text">
              <Text>{format(subMonths(currentTime, 1), "M")}월</Text>
              <Text>{format(currentTime, "yyyy")}</Text>
            </span>
          </ColFirst>
        </Header>
      )}
    </>
  );
};

export default DateHeader;
