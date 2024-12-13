import React from "react";
import { Flex } from "@chakra-ui/react";
import QuizTree from "./quiz-tree";

const QuizForm = () => {
  return (
    <Flex justify="center" align="center" height={"700px"}>
      <QuizTree radius={100} />
    </Flex>
  );
};

export default QuizForm;
