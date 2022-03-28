<template>
  <main>
    <form action="">
      <div class="mb-3">
        <label for="exampleFormControlInput1" class="form-label"></label>
        <input
          type="text"
          class="form-control"
          v-model="subject"
          id="exampleFormControlInput1"
          placeholder="Titulo da tarefa"
          v-on:input="handleLog"
        />
      </div>
      <button type="button" @click="filterTasks">buscar</button>
      <select
        class="form-select"
        aria-label="Default select example"
        @change="handleTeste"
      >
        <option selected>Selecione um usuário</option>
        <option v-for="(user, index) in users" :key="index" :value="user.id">
          {{ user.name }}
        </option>
      </select>
    </form>
    <form @submit.prevent="addNewTodo" action="" id="teste">
      <label for=""> Titulo: </label>
      <input
        v-model.lazy="newTodo.titulo"
        v-on:input="handleLog"
        name="newTodo"
        type="text"
        required
      />
      <label for=""> Tarefa: </label>
      <textarea v-model="newTodo.nome" name="newTodo" type="text" required />
      <button>Adicionar nova tarefa</button>
    </form>
    <button @click="removeAllTodos">Remover todas as tarefas</button>

    <button @click="doneAllTodos">Completar todas as tarefas</button>
    <ul v-for="(todo, index) in todos" v-bind:key="todo.id" class="todo">
      <li v-if="todo.status === 'pending'">
        <h2
          class="teste"
          :class="{ done: todo.done }"
          @click="toggleDone(todo)"
        >
          {{ todo.titulo || todo.title }}
        </h2>
        <p :class="{ done: todo.done }" @click="toggleDone(todo)">
          {{ todo.content }}
        </p>
        
        <button @click="removeTodo(index)">Remover tarefa</button>
      </li>
    </ul>
    <ul v-for="(todo, index) in todos" v-bind:key="todo.id" class="todo">
      <li v-if="todo.status === 'completed'">
        <h2
          class="teste"
          :class="{ done: todo.done }"
          @click="toggleDone(todo)"
        >
          {{ todo.titulo || todo.title }}
        </h2>
        <p :class="{ done: todo.done }" @click="toggleDone(todo)">
          {{ todo.content }}
        </p>
        
        <button @click="removeTodo(index)">Remover tarefa</button>
      </li>
    </ul>
  </main>
</template>

<script>
import { onMounted, ref, reactive, onUpdated } from "vue";
import api from "../services/api";
import user from "./user.vue";
import { useLink, useRoute, useRouter } from "vue-router";

export default {
  props: {
    subject: "",
  },
  // data() {
  //    return{todos: [] }
  // },
  setup(props, { emit, forceUpdate }) {
    const newTodo = ref({
      titulo: "",
      nome: "",
    });
    let todos = ref([]);
    const usersTodos = ref({});
    const filter = ref([]);
    const route = useRoute();
    const router = useRouter();
    let users = reactive(ref([]));
    let search = ref("");
    let state = [];
    let filteredState = [];
    let todosBackUp = ref([]);

    const fetchUsers = () => {
      api.get("/users").then((response) => {
        users.value = response.data.data;
        // console.log(users.value);
      });
    };
    const fetchTodo = async () => {
      api.get(`/users/${route.params.id}/todos`).then((response) => {
        todos.value = response.data.data;
        todosBackUp.value = response.data.data;
        // state.push(response.data.data);
        console.log(todos);
      });
    };

    const filterTasks = () => {
      emit("btn-click");
      // console.log(props.subject);
      let filteredTodo = todosBackUp.value.filter((e) => {
        return e.title.includes(props.subject || '');
      });
      todos.value = [];
      todos.value.push(...filteredTodo);
      console.log(todos);
    };

    const handleLog = (event) => {
      //     search = event.target.value;
      //     let filteredTodo = state.filter((e) => {
      //       return e.title.includes(search);
      //   })
      //   todos = filteredTodo;
    };
    const handleTeste = (event) => {
      // console.log(event.target.value);
      router.push(`/todo/${event.target.value}`);
    };
    function addNewTodo(event) {
      todos.value.push({
        id: Date.now(),
        status: "pending",
        title: newTodo.value.titulo,
        content: newTodo.value.nome,
      });
      //   state.push({
      //     id: Date.now(),
      //     status: "pending",
      //     title: newTodo.value.titulo,
      //     content: newTodo.value.nome,
      //   })
      console.log(state);
      console.log(todos.value);
      newTodo.value.nome = "";
      newTodo.value.titulo = "";
    }

    function toggleDone(todo) {
      if (todo.status === "pending") {
        todo.status = "completed";
      } else {
        todo.status = "pending";
      }
      console.log(todo);
    }

    function removeTodo(index) {
      todos.value.splice(index, 1);
    }

    function doneAllTodos() {
      todos.value.forEach((todo) => (todo.done = true));
    }

    function removeAllTodos() {
      todos.value = [];
    }

    onMounted(fetchTodo);
    onMounted(fetchUsers);
    // onUpdated(todos);
    return {
      todos,
      state,
      filterTasks,
      search,
      handleTeste,
      users,
      handleLog,
      removeAllTodos,
      doneAllTodos,
      removeTodo,
      toggleDone,
      addNewTodo,
      newTodo,
    };
  },
};
</script>

<style lang="scss">
.done {
  text-decoration: line-through;
}
.todo {
  cursor: pointer;
}
.teste {
  color: blue;
}
</style>
