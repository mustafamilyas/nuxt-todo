<script setup lang="ts">
const currentDateString = dateToReadable(new Date());
</script>

<template>
  <main :class="$style.container">
    <div :class="$style.header">
      <h1 :class="$style.title">My Task</h1>
      <p :class="$style.date">{{ currentDateString }}</p>
    </div>
  </main>
</template>

<style module>
.container {
  margin: 2.4rem 7.2rem;
}
</style>
