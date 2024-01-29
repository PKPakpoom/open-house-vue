<template>
  <v-container class="fill-height">
    <v-container class= "d-flex justify-center align-center">
      <v-card class="auto-height text-lg-center" color="indigo">
        <v-card-title>Click START to begin</v-card-title>
        <v-card-actions class="d-flex justify-center align-center">
          <v-btn variant="outlined" @click="goto_game">Start</v-btn>
        </v-card-actions>
      </v-card>
    </v-container>
  </v-container>
</template>

<script lang="ts" setup>
  import router from '@/router';

  const goto_game = () => {
    router.push('/game');
  }
</script>
