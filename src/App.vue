<template>
  <main class="main__body">
    <aside class="aside__bar">
      <h5>FrontEnd Test</h5>
      <hr />
      <router-link class="router__link" to="/todo/:id">Tarefas</router-link>
      <router-link class="router__link" to="/user">Usuários</router-link>
      
    </aside>
    <router-view :key="$route.path"></router-view>
  </main>
</template>

<script>

</script>

<style lang="scss">
.main__body {
  display: flex;
}
.aside__bar {
  background-color: #1f1f1f;
  flex: 0.2;
  height: 100vh;
  min-width: 150px;
  padding-left: 10px;
  padding-right: 10px;
}
.aside__bar > hr {
  border: 1px solid #ececec;
  width: 90%;
}
.router__link,
h5 {
  align-items: center;
  color: grey;
  cursor: pointer;
  display: flex;
  height: 40px;
  text-decoration: none;
  border-radius: 3px;
}
.h5 {
  align-content: center;
}
.router__link:hover {
  color: white;
  background-color: rgb(43, 43, 151);
}
</style>
