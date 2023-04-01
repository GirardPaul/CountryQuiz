<script setup>
import { computed, onMounted, ref } from "vue";
import { initQuizContent } from "./services/QuizService.js";
import Quiz from "./components/Quiz.vue";
import { useQuizStore } from "./store/store.js";
const url = "https://restcountries.com/v3.1/all";
const countries = ref([]);
const end = ref(false);
const nbQuestions = ref(10);
const store = useQuizStore();
const question = ref(null);

const isFinished = computed(() => {
  const restQuestions = store.questions.filter(
    (question) => !question.userAnswer
  );
  return restQuestions && !restQuestions.length;
});
const result = computed(() => {
  const correctAnswers = store.questions.filter((question) => question.isValid);
  return correctAnswers.length || 0;
});
function initQuiz() {
  let quizContent = initQuizContent(nbQuestions.value, countries.value);
  console.log(quizContent);
  store.addQuestions(quizContent);
  nextQuestion();
}

function nextQuestion() {
  const restQuestions = store.questions.filter(
    (question) => !question.userAnswer
  );
  question.value =
    restQuestions && restQuestions.length ? restQuestions[0] : null;
  end.value = isFinished.value;
}

function initNbQuests() {
  store.addQuestions([]);
  end.value = false;
  nbQuestions.value = 10;
  question.value = null;
}

function sendAnswer(questionId, answerId) {
  store.addResponse(questionId, answerId);
}

function checkMaxQuestions() {
  if (nbQuestions.value > countries.value.length) {
    nbQuestions.value = countries.value.length;
  }
}

onMounted(async () => {
  let response = await fetch(url).then((res) => res.json());
  countries.value = response.filter(
    (country) =>
      country.capital &&
      country.capital.length &&
      country.flags &&
      country.flags.svg &&
      country.translations &&
      country.translations.fra &&
      country.translations.fra.common
  );
});
</script>

<template>
  <section class="container flex column">
    <h1>QUIZ PAYS</h1>
    <div class="quiz-content">
      <img
        v-if="!end"
        class="quiz-logo transition"
        src="./assets/undraw_adventure_4hum1.svg"
        alt="quiz-logo"
      />
      <div v-if="!question && !end" class="flex column transition">
        <label for="text-questions">Nombre de questions</label>
        <input
          class="text-questions"
          type="number"
          v-model="nbQuestions"
          :max="countries.length"
          @keyup="checkMaxQuestions"
        />
        <button class="btn-init pointer" @click="initQuiz">Commencer</button>
      </div>
      <Quiz
        class="transition"
        v-else-if="!end"
        :quiz="question"
        @next="nextQuestion()"
        @sendAnswer="sendAnswer"
      />

      <div v-else class="flex column align-center transition">
        <img src="./assets/undraw_winners_ao2o2.svg" alt="quiz-logo-response" />
        <div class="flex column align-center margin-results">
          <h2 class="result-title">Résultats</h2>
          <p class="result-text">
            Vous avez obtenu
            <span class="result-number">{{ result }}</span>
            {{ result <= 1 ? "bonne réponse" : "bonnes réponses" }}.
          </p>
        </div>
        <button class="btn-init pointer" @click="initNbQuests()">
          Recommencer
        </button>
      </div>
    </div>
  </section>
</template>

<style scoped>
.margin-results {
  margin: 7rem 0;
}
.result-number {
  font-size: 3.6rem;
  color: #6fcf97;
  font-weight: 700;
}
.result-text {
  font-size: 1.8rem;
  color: #1d355d;
  font-weight: 400;
}
.result-title {
  font-size: 4.8rem;
  color: #1d355d;
  font-weight: 700;
}
label {
  font-size: 1.6rem;
  color: #2f527b;
  font-weight: 700;
}
.text-questions {
  padding: 1rem 1.9rem;
  border-radius: 1.2rem;
  border: 2px solid rgba(96, 102, 208, 0.7);
  color: #2f527b;
  font-size: 1.6rem;
  margin-top: 1rem;
}
.btn-init {
  padding: 1.5rem 3.7rem;
  border-radius: 1.2rem;
  background: #f9a826;
  box-shadow: 0px 2px 4px rgba(252, 168, 47, 0.4);
  border: none;
  color: #fff;
  margin-top: 1rem;
}

h1 {
  font-size: 3.6rem;
  color: #fff;
  font-weight: 700;
}
.quiz-content {
  position: relative;
  background: #fff;
  padding: 6.8rem 3.2rem 3.2rem 3.2rem;
  border-radius: 2.4rem;
  margin-top: 1rem;
  width: 46rem;
}
</style>
