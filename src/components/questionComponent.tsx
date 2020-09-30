import { Question } from "@constants/types";
import { Html5Entities } from "html-entities";
import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import {
  ActivityIndicator,
  Card,
  FAB,
  Paragraph,
  RadioButton,
} from "react-native-paper";

interface QCProps {
  question: Question;
  isLoading: boolean;
  lastQuestion: boolean;
  nextQuestion: any;
  value: string;
  setValue: any;
  computeResults: () => void;
}

export default function QuestionComponent({
  question,
  lastQuestion,
  isLoading,
  nextQuestion,
  value,
  setValue,
  computeResults,
}: QCProps) {
  useEffect(() => {
    answers = shuffleArray(answers);
  }, [question?.correct_answer]);

  function shuffleArray<T>(array: T[]): T[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }

    return array;
  }

  let answers = [
    <RadioButton.Item
      key={question?.incorrect_answers[0]}
      label={question?.incorrect_answers[0]}
      value="incorrect"
      uncheckedColor="#fff"
    />,
    <RadioButton.Item
      key={question?.correct_answer}
      label={question?.correct_answer}
      value="correct"
      uncheckedColor="#fff"
    />,
  ];

  const renderQuestion = () => {
    if (isLoading) return undefined;
    return (
      <>
        <Card style={styles.card}>
          <Card.Content style={styles.cardContent}>
            <Paragraph>{Html5Entities.decode(question?.question)}</Paragraph>
            <RadioButton.Group
              onValueChange={(value) => setValue(value)}
              value={value}
            >
              {answers.map((answer) => answer)}
            </RadioButton.Group>
          </Card.Content>
        </Card>
        <FAB
          style={styles.fab}
          icon={lastQuestion ? "check" : "share"}
          onPress={() => {
            setValue("");
            if (lastQuestion) computeResults();
            else nextQuestion();
          }}
        />
      </>
    );
  };
  return <>{renderQuestion() ?? <ActivityIndicator />}</>;
}

const styles = StyleSheet.create({
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: "#5467fc",
  },
  card: {
    maxHeight: "50%",
  },
  cardContent: {
    display: "flex",
    alignContent: "flex-end",
  },
});