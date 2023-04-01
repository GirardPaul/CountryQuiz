<script setup>
defineProps({
  quiz: Object,
});
const emit = defineEmits(["next", "sendAnswer"]);
</script>

<template>
  <div class="flex column">
    <img v-if="quiz.flagPicture" :src="quiz.flagPicture" alt="flag" />
    <h2>{{ quiz.question }}</h2>
    <div class="grid">
      <button
        v-for="(question, index) in quiz.possibleAnswers"
        :key="question.id"
        :class="[
          'pointer',
          'flex',
          'align-center',
          quiz.userAnswer && question.id === quiz.answer
            ? 'btn-success'
            : quiz.userAnswer &&
              question.id === quiz.userAnswer &&
              !quiz.isValid
            ? 'btn-error'
            : 'btn',
        ]"
        @click="emit('sendAnswer', quiz.id, question.id)"
      >
        <div class="full flex align-center justify-between">
          <div class="flex align-center">
            <span v-if="index === 0">A</span>
            <span v-else-if="index === 1">B</span>
            <span v-else-if="index === 2">C</span>
            <span v-else>D</span>

            <p>{{ question.answer }}</p>
          </div>
          <div
            class="flex align-center justify-center"
            v-if="
              (quiz.userAnswer && question.id === quiz.answer) ||
              (quiz.userAnswer &&
                question.id === quiz.userAnswer &&
                !quiz.isValid)
            "
          >
            <span class="material-icons">
              {{
                quiz.userAnswer && question.id === quiz.answer
                  ? "check_cirle"
                  : "cancel"
              }}
            </span>
          </div>
        </div>
      </button>
    </div>

    <div class="flex justify-end mt-24">
      <button @click="emit('next')" class="btn-next pointer flex align-center">
        <span>Valider</span>
      </button>
    </div>
  </div>
</template>

<style scoped>
img {
  margin-bottom: 2.8rem;
  max-width: 12.4rem;
}
p {
  text-align: left;
}
.material-icons {
  max-width: 2rem;
}
.btn-success {
  background: #60bf88 !important;
  border: 2px solid transparent !important;
  padding: 1rem 1.9rem;
  border-radius: 1.2rem;
}
.btn-error {
  background: #ea8282 !important;
  border: 2px solid transparent !important;
  padding: 1rem 1.9rem;
  border-radius: 1.2rem;
}
.mt-24 {
  margin-top: 2.4rem;
}
.btn span {
  font-weight: 500;
  width: 1rem;
  font-size: 2.4rem;
  color: rgba(96, 102, 208, 0.8);
}

.btn p {
  font-weight: 500;
  font-size: 1.8rem;
  color: rgba(96, 102, 208, 0.8);
  margin-left: 4.6rem;
}

.btn-error p,
.btn-success p {
  color: #fff !important;
  font-weight: 500;
  font-size: 1.8rem;
  margin-left: 4.6rem;
}

.btn-error span,
.btn-success span {
  color: #fff !important;
  font-weight: 500;
  font-size: 2.4rem;
}

.btn:hover {
  background: #f9a826;
  border: 2px solid transparent;
  transition: 0.7s;
}

.btn:hover span {
  color: #fff;
}
.btn:hover p {
  color: #fff !important;
}
h2 {
  font-size: 2.4rem;
  color: #2f527b;
  font-weight: 700;
}

.grid {
  display: grid;
  gap: 2.5rem;
  margin-top: 3.2rem;
}

.btn {
  padding: 1rem 1.9rem;
  border-radius: 1.2rem;
  border: 2px solid rgba(96, 102, 208, 0.7);
  background: #fff;
}

.btn-next {
  padding: 1.5rem 3.7rem;
  border-radius: 1.2rem;
  background: #f9a826;
  box-shadow: 0px 2px 4px rgba(252, 168, 47, 0.4);
  border: none;
}

.btn-next span {
  font-weight: 500;
  font-size: 1.8rem;
  color: #fff;
}
</style>
