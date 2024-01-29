<template>
  <v-card class="d-flex justify-center align-center" color="indigo">
    <v-card-title>
      <span class="title ml-2 mr-2">{{ usable_questions[question_index].title }}</span>
    </v-card-title>
  </v-card>
  <v-container>
    <v-row>
      <v-col v-for="(question, index) in usable_questions[question_index].questions" :key="index" cols="12" md="3">
        <v-card
          :class="{ 'green-card': isCorrect(index)}"
          @click="handleCardClick(index)"
        >
          <v-card-text>
            <v-card-title>{{ question }}</v-card-title>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
  <div class="d-flex align-center justify-center">
    <v-btn color="indigo" @click="showAnswers">Show Answers</v-btn>
  </div>
  <v-pagination
    v-model="index_show"
    :length="usable_questions.length"
    rounded="circle"
  ></v-pagination>
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
    title: questions[i].info.question,
    questions: [],
    answers: [],
  };
  const nCorrect = questions[i].info.nCorrect;
  const nIncorrect = questions[i].info.nIncorrect;

  let tempCorrect = shuffle(questions[i].correctBucket.correctBucketList);
  for (let j = 0; j < nCorrect; j++) {
    usable_questions[i].questions.push(tempCorrect[j]);
    usable_questions[i].answers.push(tempCorrect[j]);
  }

  let tempIncorrect = shuffle(questions[i].incorrectBucket.incorrectBucketList);
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

watch(index_show, (newVal, oldVal) => {
  question_index.value = newVal - 1;
  answersRevealed.value = false;
  clickedCards.value = [];
});

const showAnswers = () => {
  answersRevealed.value = true;
};

const isCorrect = (index) => {
  return answersRevealed.value && usable_questions[question_index.value].answers.includes(usable_questions[question_index.value].questions[index]);
};

const handleCardClick = (index) => {
  if (!clickedCards.value.includes(index)) {
    clickedCards.value.push(index);
  }
};

</script>

<style scoped>
.green-card {
  background-color: #8BC34A;
}
</style>
