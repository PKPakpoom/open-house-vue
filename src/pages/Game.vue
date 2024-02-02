<template>
  <v-sheet class="text-lg-center h-25" color="indigo" z-index="-1">
    <v-progress-linear
      class="align-end"
      color="green"
      striped
      v-bind:model-value="countdown * 100 / time_per_question"
      :height="50"
    />
    <v-card-title>
      <span class="title ml-2 mr-2">{{ usable_questions[question_index].title }}</span>
    </v-card-title>
    <!-- <v-card-title>{{ "timer: " + (time_per_question - timer) }}</v-card-title> -->
    <v-card-title v-if="usable_questions[question_index].nCorrect == 1">{{ `${usable_questions[question_index].nCorrect} correct answer` }}
    </v-card-title>
    <v-card-title v-else>
      {{ `${usable_questions[question_index].nCorrect} correct answers` }}
    </v-card-title>
  </v-sheet>
  <v-container fluid >
    <v-row class="rows" align="center">
      <v-col v-for="(question, i) in usable_questions[question_index].questions" :key="i" cols="12" md="3">
        <v-card
          height="100%"
          :class="{ 'green-card': isCorrect(i) }"
          variant="tonal"
        >
          <v-card-title class="text-h2 text-lg-center pt-3">
            {{ i + 1 }}
          </v-card-title>
          <v-divider></v-divider>

          <v-card-text class="d-flex justify-center align-center">
            <h1 class="text-lg-center text-h3 allow-overflow">{{ question }}</h1>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
  <v-pagination
  v-model="index_show"
  :length="usable_questions.length"
  rounded="circle"
  class="fixed-bottom mb-5"
  >
</v-pagination>
<v-container class="d-flex align-center justify-center pt-5">
  <v-btn color="indigo" @click="showAnswers">Show Answers</v-btn>
</v-container>
</template>

<script setup>
import { ref, watch } from 'vue';
import questions_json from '@/assets/questions.json';

const shuffle = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

let questions = questions_json.questions;
let usable_questions = [];

for (let i = 0; i < questions.length; i++) {
  usable_questions[i] = {
    title: questions[i].question,
    questions: [],
    answers: [],
    nCorrect: questions[i].nCorrect,
  };
  const nCorrect = questions[i].nCorrect;
  const nIncorrect = questions[i].nIncorrect;

  let tempCorrect = shuffle(questions[i].Answer);
  for (let j = 0; j < nCorrect; j++) {
    usable_questions[i].questions.push(tempCorrect[j]);
    usable_questions[i].answers.push(tempCorrect[j]);
  }

  let tempIncorrect = shuffle(questions[i].WrongAnswer);
  for (let j = 0; j < nIncorrect; j++) {
    usable_questions[i].questions.push(tempIncorrect[j]);
  }
}
for (let i = 0; i < usable_questions.length; i++) {
  usable_questions[i].questions = shuffle(usable_questions[i].questions);
}

const index_show = ref(1);
const question_index = ref(0);
const answersRevealed = ref(false);
const clickedCards = ref([]);

const nCorrect = ref(0);
const timer = ref(0);
const countdown = ref(0);
const time_per_question = 10;
let interval;

function resetTimer() {
  countdown.value = 0;
  timer.value = 0;
  interval = setInterval(() => {
    countdown.value += 0.01;
    timer.value = Math.floor(countdown.value);
  }, 10);
}
resetTimer();

watch(index_show, (newVal, oldVal) => {
  question_index.value = newVal - 1;
  answersRevealed.value = false;
  clearInterval(interval);
  resetTimer();
  // todo 

});

const showAnswers = () => {
  answersRevealed.value = true;
};

const isCorrect = (index) => {
  return answersRevealed.value && usable_questions[question_index.value].answers.includes(usable_questions[question_index.value].questions[index]);
};


</script>

<style scoped>

.progress-linear-stream-animation {
  transition: none;
}
.title {
  font-size: 3rem;
}

.green-card {
  background-color: #8BC34A;
}

.icons {
  font-size: 5rem;
}

</style>
