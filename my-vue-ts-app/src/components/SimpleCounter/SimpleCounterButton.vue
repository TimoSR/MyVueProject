<template>
  <div class="simple-counter-container">
    <h2>Counter: {{ counter }}</h2>
    <button @click="increment">Increment</button>
    <button @click="decrement">Decrement</button>
    <button @click="reset">Reset</button>
  </div>
</template>

<script setup lang="ts">
import {ref} from "vue";

const counter = ref<number>(0);

const increment = () => {
  counter.value++;
}

const decrement = () => {
  if (counter.value > 0) {
    counter.value--;
  }
}

const reset = () => {
  counter.value = 0;
}

</script>

<style scoped>
.counter-container {
  text-align: center;
  font-size: 1.5rem;
  margin-top: 20px;
}

button {
  margin: 5px;
  padding: 10px 20px;
  font-size: 1rem;
  cursor: pointer;
}
</style>
