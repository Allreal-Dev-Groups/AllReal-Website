import React from "react";
import { TitleText } from "./Effects";

const SectionTitle = ({
  Line_1 = "Text1",
  Line_2 = "Text2",
  fontSize = "8rem",
  color = "#00E0FF",
}) => {
  return (
    <>
      <TitleText
        text={Line_1}
        isLeft={false}
        baseColor={color}
        fillColor="#333"
        fontSize={fontSize}
      />
      <TitleText
        text={Line_2}
        isLeft={true}
        baseColor={color}
        fillColor="#333"
        fontSize={fontSize}
      />
    </>
  );
};

export default SectionTitle;
