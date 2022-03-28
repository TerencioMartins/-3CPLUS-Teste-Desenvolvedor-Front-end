<template>
  <main>
    <router-link to="/todo/:id">tarefas</router-link>
    <router-link to="/user">Usuários</router-link>
    <router-view :key="$route.path"></router-view>
  </main>
</template>

<script></script>

<style lang="scss"></style>
