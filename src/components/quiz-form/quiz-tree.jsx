import { faculties } from "@/constants/quiz";
import { Box } from "@chakra-ui/react";
import React, { useState } from "react";

const calculateAngle = (startAngle, index, itemsLength) => {
  let angle = startAngle + 40 * (index - Math.floor(itemsLength / 2));
  return angle < 0 ? 360 + angle : angle;
};

const CircleContainer = ({ children }) => (
  <Box className="circle-container">
    <Box
      borderStyle={"solid"}
      className="circle-item"
      fontWeight="bold"
      fontSize={24}
    >
      ?
    </Box>
    {children}
  </Box>
);

const CircleItem = ({
  active,
  onClick,
  angle,
  radius,
  children,
  label,
  top,
  left,
  lineHeightOffset,
  radiusOffset = 1,
}) => (
  <Box
    onClick={onClick}
    color={active ? undefined : "GrayText"}
    borderStyle={active ? "solid" : undefined}
    className="circle-item"
    transform={`rotate(${angle}deg) translate(${
      radius * radiusOffset
    }px) rotate(-${angle}deg)`}
    top={top}
    left={left}
  >
    <ConnectorLine
      angle={angle}
      active={active}
      radius={radius}
      heightOffset={lineHeightOffset}
    />
    {label}
    {active && children}
  </Box>
);

const ConnectorLine = ({ angle, active, heightOffset, radius }) => (
  <Box
    className="line"
    borderStyle={active ? "solid" : undefined}
    transform={`rotate(${angle + 90}deg)`}
    style={{
      height: `calc(${radius}px - ${heightOffset}px)`,
    }}
    top={`${50 + Math.sin((Math.PI / 180) * angle) * (radius - 160)}%`}
    left={`${50 + Math.cos((Math.PI / 180) * angle) * (radius - 160)}%`}
  />
);

const QuizTree = ({ radius }) => {
  const [activeFaculties, setActiveFaculties] = useState([]);
  const [activeSpecialties, setActiveSpecialties] = useState([]);
  const [activeEducationalPrograms, setActiveEducationalPrograms] = useState(
    []
  );

  return (
    <CircleContainer>
      {faculties.map((faculty, index) => {
        const isFacultyActive = activeFaculties.includes(faculty.abbr);
        const facultyAngle = (360 / faculties.length) * index;

        return (
          <CircleItem
            key={faculty.abbr}
            label={faculty.abbr}
            onClick={() =>
              setActiveFaculties((prev) => [...prev, faculty.abbr])
            }
            radius={radius}
            active={isFacultyActive}
            angle={facultyAngle}
            lineHeightOffset={66}
          >
            {faculty?.specialties?.map((specialty, index) => {
              const isSpecialtyActive = activeSpecialties.includes(
                specialty.abbr
              );
              const specialtyAngle = calculateAngle(
                facultyAngle,
                index,
                faculty.specialties.length
              );
              return (
                <CircleItem
                  key={specialty.abbr}
                  label={specialty.abbr}
                  onClick={() =>
                    setActiveSpecialties((prev) => [...prev, specialty.abbr])
                  }
                  top={0}
                  left={0}
                  radius={radius}
                  active={isSpecialtyActive}
                  angle={specialtyAngle}
                  lineHeightOffset={36}
                  radiusOffset={1.3}
                >
                  {specialty?.educationalPrograms?.map(
                    (educationalProgram, index) => {
                      const isEducationalProgramActive =
                        activeEducationalPrograms.includes(
                          educationalProgram.abbr
                        );
                      const educationalProgramAngle = calculateAngle(
                        specialtyAngle,
                        index,
                        specialty.educationalPrograms.length
                      );

                      return (
                        <CircleItem
                          key={educationalProgram.abbr}
                          label={educationalProgram.abbr}
                          onClick={() =>
                            setActiveEducationalPrograms((prev) => [
                              ...prev,
                              educationalProgram.abbr,
                            ])
                          }
                          radius={radius}
                          angle={educationalProgramAngle}
                          active={isEducationalProgramActive}
                          top={0}
                          left={0}
                          lineHeightOffset={66}
                        />
                      );
                    }
                  )}
                </CircleItem>
              );
            })}
          </CircleItem>
        );
      })}
    </CircleContainer>
  );
};

export default QuizTree;
