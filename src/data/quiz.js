export const quiz = {
  topic: "Javascript",
  level: "Beginner",
  totalQuestions: 10,
  perQuestionScore: 5,
  questions: [
    {
      question:
        "Which function is used to serialize an object into a JSON string in Javascript?",
      choices: ["stringify()", "parse()", "convert()", "None of the above"],
      type: "MCQs",
      correctAnswer: "stringify()",
    },
    {
      question:
        "Which of the following keywords is used to define a variable in Javascript?",
      choices: ["var", "let", "var and let", "None of the above"],
      type: "MCQs",
      correctAnswer: "var and let",
    },
    {
      question:
        "Which of the following methods can be used to display data in some form using Javascript?",
      choices: [
        "document.write()",
        "console.log()",
        "window.alert",
        "All of the above",
      ],
      type: "MCQs",
      correctAnswer: "All of the above",
    },
    {
      question: "How can a datatype be declared to be a constant type?",
      choices: ["const", "var", "let", "constant"],
      type: "MCQs",
      correctAnswer: "const",
    },
    {
      question: "What is the result of 2 + 2?",
      choices: ["3", "4", "5", "6"],
      type: "MCQs",
      correctAnswer: "4",
    },
    {
      question:
        "Which method is used to add a new item to the end of an array?",
      choices: ["push()", "pop()", "shift()", "unshift()"],
      type: "MCQs",
      correctAnswer: "push()",
    },
    {
      question:
        "Which operator is used to compare two values for equality in JavaScript?",
      choices: ["==", "===", "!=", "!=="],
      type: "MCQs",
      correctAnswer: "===",
    },
    {
      question: "What does the `typeof` operator return for `null`?",
      choices: ["object", "null", "undefined", "number"],
      type: "MCQs",
      correctAnswer: "object",
    },
    {
      question: "What is the output of `console.log(0.1 + 0.2 === 0.3)`?",
      choices: ["true", "false", "undefined", "NaN"],
      type: "MCQs",
      correctAnswer: "false",
    },
    {
      question: "Which method is used to remove the last item from an array?",
      choices: ["pop()", "push()", "shift()", "unshift()"],
      type: "MCQs",
      correctAnswer: "pop()",
    },
  ],
};
