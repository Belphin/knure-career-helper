import { faculties } from "@/constants/quiz";
import { Box } from "@chakra-ui/react";
import { motion } from "framer-motion";
import React, { useState } from "react";

const MotionBox = motion(Box);

const PingQuestionMark = ({ ping }) => {
  return (
    <motion.div
      style={{
        display: "inline-block",
        textAlign: "center",
      }}
      animate={ping ? { scale: [1, 1.6, 1] } : { scale: 1 }}
      transition={{
        duration: ping ? 2 : 0.5,
        repeat: ping ? Infinity : 0,
        repeatType: "loop",
      }}
    >
      ?
    </motion.div>
  );
};

const CircularBorderBox = ({ active, angle, size = 68 }) => {
  const radius = (size - 10) / 2;
  const circumference = 2 * Math.PI * radius;

  return (
    active && (
      <>
        <motion.svg
          style={{
            position: "absolute",
            top: (60 - size) / 2,
            left: (60 - size) / 2,
            transform: `rotate(${angle + 180}deg)`,
          }}
          width={`${size}px`}
          height={`${size}px`}
          viewBox={`0 0 ${size} ${size}`}
          xmlns="http://www.w3.org/2000/svg"
          initial={{ strokeDashoffset: circumference }}
          animate={{
            strokeDashoffset: active ? circumference / 2 : circumference,
          }}
          transition={{ duration: 1 }}
        >
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeDasharray={circumference}
          />
        </motion.svg>

        <motion.svg
          style={{
            position: "absolute",
            top: (60 - size) / 2,
            left: (60 - size) / 2,
            transform: `rotate(${angle + 180}deg)`,
          }}
          width={`${size}px`}
          height={`${size}px`}
          viewBox={`0 0 ${size} ${size}`}
          xmlns="http://www.w3.org/2000/svg"
          initial={{ strokeDashoffset: circumference }}
          animate={{
            strokeDashoffset: active ? circumference * 1.5 : circumference,
          }}
          transition={{ duration: 1 }}
        >
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeDasharray={circumference}
          />
        </motion.svg>
      </>
    )
  );
};

const calculateAngle = (startAngle, index, itemsLength) => {
  let angle = startAngle + 40 * (index - Math.floor(itemsLength / 2));
  return angle < 0 ? 360 + angle : angle;
};

const CircleContainer = ({ children, ping }) => (
  <Box className="circle-container">
    <Box borderStyle={"solid"} className="circle-item-position">
      <Box className="circle-item start-item">
        <PingQuestionMark ping={ping} />
      </Box>
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
  <MotionBox
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.5 }}
  >
    <Box
      onClick={onClick}
      className="circle-item-position"
      transform={`rotate(${angle}deg) translate(${
        radius * radiusOffset
      }px) rotate(-${angle}deg)`}
      top={top}
      left={left}
      color={active ? undefined : "GrayText"}
    >
      <CircularBorderBox angle={angle} active={active} />
      <ConnectorLine
        angle={angle}
        active={active}
        radius={radius}
        heightOffset={lineHeightOffset}
      />
      <Box className="circle-item" style={{ borderColor: "GrayText" }}>
        {label}
      </Box>
      {active && children}
    </Box>
  </MotionBox>
);

const ConnectorLine = ({ angle, active, heightOffset, radius }) => {
  const topPosition = 50 + Math.sin((Math.PI / 180) * angle) * (radius - 154);
  const leftPosition = 50 + Math.cos((Math.PI / 180) * angle) * (radius - 154);
  const lineHeight = `${radius - heightOffset}px`;

  const boxStyle = {
    height: lineHeight,
    top: `${topPosition}%`,
    left: `${leftPosition}%`,
    transform: `rotate(${angle + 90}deg)`,
    overflow: "hidden",
  };

  return (
    <>
      <Box className="line" borderColor={"GrayText"} style={boxStyle} />

      {active && (
        <MotionBox
          borderStyle={"solid"}
          className="line"
          style={boxStyle}
          initial={{ height: lineHeight }}
          animate={{
            height: 0,
            transition: { duration: 1, ease: "easeOut" },
          }}
        />
      )}
    </>
  );
};

const QuizTree = ({ radius }) => {
  const [activeFaculties, setActiveFaculties] = useState([]);
  const [activeSpecialties, setActiveSpecialties] = useState([]);
  const [activeEducationalPrograms, setActiveEducationalPrograms] = useState(
    []
  );

  return (
    <CircleContainer ping={!activeFaculties.length}>
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
