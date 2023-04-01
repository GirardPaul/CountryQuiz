import { defineStore } from "pinia";
export const useQuizStore = defineStore({
  id: "quiz",
  state: () => ({
    questions: [],
  }),
  actions: {
    addQuestions(questions) {
      this.questions = questions;
    },
    addResponse(questionId, responseId) {
      const question = this.questions.find((q) => q.id === questionId);
      question.isValid = responseId === question.answer;
      question.userAnswer = responseId;

      this.questions = this.questions.map((q) => {
        if (q.id === questionId) {
          return question;
        }
        return q;
      });
    },
  },
});
