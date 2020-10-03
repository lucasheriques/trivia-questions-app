import { Question } from "@constants/types";
import { shuffleArray } from "@utils/arrays";
import { Html5Entities } from "html-entities";
import React, { useEffect } from "react";
import { StyleSheet } from "react-native";
import { Card, Paragraph, RadioButton } from "react-native-paper";

interface QCProps {
  question: Question;
  answer: string;
  setAnswer: any;
}

export default function QuestionComponent({
  question,
  answer,
  setAnswer,
}: QCProps) {
  useEffect(() => {
    answers = shuffleArray(answers);
  }, [question?.correct_answer]);

  let answers = [
    <RadioButton.Item
      key={question?.incorrect_answers[0]}
      label={question?.incorrect_answers[0]}
      value="FALSE"
      labelStyle={styles.answer}
    />,
    <RadioButton.Item
      key={question?.correct_answer}
      label={question?.correct_answer}
      labelStyle={styles.answer}
      value="TRUE"
    />,
  ];

  return (
    <>
      <Paragraph>{question?.category}</Paragraph>
      <Card style={styles.card}>
        <Card.Content style={styles.cardContent}>
          <Paragraph style={styles.question}>
            {Html5Entities.decode(question?.question)}
          </Paragraph>
          <RadioButton.Group
            onValueChange={(value) => setAnswer(value)}
            value={answer}
          >
            {answers.map((answer) => answer)}
          </RadioButton.Group>
        </Card.Content>
      </Card>
    </>
  );
}

const styles = StyleSheet.create({
  card: {
    maxHeight: "60%",
  },
  cardContent: {
    display: "flex",
    alignContent: "flex-end",
  },
  answer: {
    fontSize: 16,
    color: "#52606D",
  },
  question: {
    fontSize: 16,
    color: "#52606D",
  },
});
