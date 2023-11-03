<script setup lang="ts">
const runtimeConfig = useRuntimeConfig();
</script>

<template>
  <NuxtPage />
</template>

<style>
html,
body {
  font-family: "Lato", sans-serif;
}

html {
  font-size: 62.5%;
  /* 1 rem = 10px; 10px/16px = 62.5% */
}

@media screen and (max-width: 1200px) {
  html {
    font-size: 56.25%;
  }
}

@media screen and (max-width: 900px) {
  html {
    font-size: 50%;
  }
}

* {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}
</style>
