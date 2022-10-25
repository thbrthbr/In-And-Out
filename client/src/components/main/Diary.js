import React, { useState, useEffect } from "react";
import styled from "styled-components";
import DatePicker from "react-datepicker";

const Container = styled.div`
  display: flex;
  background-color: white;
  margin-top: 35px;

  > div:first-child {
    text-align: center;
    flex: 0.5;
    border-right: 3px solid gray;
    height: 700px;
  }
  > div:last-child {
    text-align: center;
    flex: 1;
  }
`;

export default function Diary({ newDiary, writtenDiary, diaryDate }) {
  const [textValue, setTextValue] = useState("");
  const [startDate, setStartDate] = useState(new Date());

  const handleSetValue = (e) => {
    setTextValue(e.target.value);
  };

  // diaryDate가지고 데이터 요청

  return (
    <div>
      {writtenDiary && (
        <Container>
          <div>
            <textarea value={"12312312312312"} disabled></textarea>
          </div>
          <div>
            <div>{diaryDate}</div>
            <div>
              <img
                style={{ width: "80%", height: "300px", marginTop: "15px" }}
                src="https://t2.daumcdn.net/thumb/R720x0/?fname=http://t1.daumcdn.net/brunch/service/user/TRE/image/jSbbIDabdmD5S54u1gX-1W64ok0"
                alt="이미지"
              />
            </div>
            <div>
              <textarea
                placeholder="여기에 입력하세요"
                value={textValue}
                onChange={(e) => handleSetValue(e)}
              ></textarea>
            </div>
            <div>
              <button>수정하기</button>
            </div>
          </div>
        </Container>
      )}

      {newDiary && (
        <Container>
          <div>
            <textarea value={"12312312312312"} disabled></textarea>
          </div>
          <div>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
            />
            <div
              style={{
                width: "80%",
                height: "300px",
                marginTop: "15px",
                border: "1px solid red",
              }}
            >
              <img src="" alt="이미지" />
            </div>
            <div>
              <textarea
                placeholder="여기에 입력하세요"
                value={textValue}
                onChange={(e) => handleSetValue(e)}
              ></textarea>
            </div>
            <div>
              <button>이미지 등록</button>
              <button>완료</button>
            </div>
          </div>
        </Container>
      )}
    </div>
  );
}
