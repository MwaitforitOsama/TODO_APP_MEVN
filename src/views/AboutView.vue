<template>
  
  <div >
    <v-alert bored="left" close-text="Close Alert" color="green accent-4" dark dismissable v-if="this.$route.params.message">{{ this.$route.params.message }}</v-alert>

    <h1>Created for Cowlar by Mohammad Osama</h1>
  </div>
</template>
