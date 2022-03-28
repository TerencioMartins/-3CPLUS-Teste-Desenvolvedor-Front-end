<script>
import { onMounted, ref } from "vue";
import api from "../services/api";
import APItoken from "../services/token";
import { useRoute, useRouter } from "vue-router";

export default {
  props: {
    subject: "",
  },
  setup(props) {
    const route = useRoute();
    const router = useRouter();

    let users = ref([]);
    let todos = ref([]);
    let todosBackUp = ref([]);
    const newTask = ref({
      titulo: "",
      nome: "",
    });
    /* REQUISIÇÃO DE USUÁRIOS PARA FILTRO SELECT */
    const fetchUsers = () => {
      api.get("/users").then((response) => {
        users.value = response.data.data;
      });
    };

    /* REQUISIÇÃO DE TAREFAS POR USUÁRIO */
    const fetchTodo = async () => {
      api.get(`/users/${route.params.id}/todos`).then((response) => {
        todos.value = response.data.data;
        todosBackUp.value = response.data.data;
      });
    };

    /* FILTROS */
    const filterTasks = () => {
      let filteredTodo = todosBackUp.value.filter((e) => {
        return e.title.includes(props.subject || "");
      });
      todos.value = [];
      todos.value.push(...filteredTodo);
    };

    const userRedirect = (event) => {
      router.push(`/todo/${event.target.value}`);
    };
    
    /* ADICIONAR TAREFA */
    function addNewTask() {
        todos.value.push({
        id: route.params.id,
        status: "pending",
        title: newTask.value.titulo,
        content: newTask.value.nome,
      });
      api
        .post(
          `/users/${route.params.id}/todos`,
          {
            id: route.params.id,
            status: "pending",
            title: newTask.value.titulo,
            content: newTask.value.nome,
          },
          {
            headers: {
              Authorization: APItoken,
            },
          }
        )
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
      newTask.value.nome = "";
      newTask.value.titulo = "";
    }

    /* GERENCIAMENTO DE TAREFAS */
    function doneTask(todo) {
      todo.status = todo.status === "pending" ? "completed" : "pending";
    }

    function doneAllTask() {
      todos.value.forEach((todo) => (todo.status = "completed"));
      todosBackUp.value.forEach((todo) => (todo.status = "completed"));
    }

    function removeTask(task) {
      let notRemovedTask = todos.value.filter((e) => e.title != task.title);
      todos.value = [];
      todosBackUp.value = [];
      todos.value.push(...notRemovedTask);
      todosBackUp.value.push(...notRemovedTask);
    }

    function removeAllTask() {
      todos.value = [];
      todosBackUp.value = [];
    }

    onMounted(fetchTodo);
    onMounted(fetchUsers);
    return {
      todos,
      filterTasks,
      userRedirect,
      users,
      removeAllTask,
      doneAllTask,
      removeTask,
      doneTask,
      addNewTask,
      newTask,
    };
  },
};
</script>

<template>
  <main class="body__todo">
    <h1 class="todo__title">Tarefas</h1>
    <form class="form__filter" action="">
      <label for="exampleFormControlInput1" class="form-label"></label>
      <input
        type="text"
        class="form-control"
        v-model="subject"
        id="input__filter"
        placeholder="Titulo da tarefa"
        v-on:input="filterTasks"
      />
      <!-- <button type="button" @click="filterTasks">buscar</button> -->
      <select
        class="form-select"
        aria-label="Default select example"
        id="select__filter"
        @change="userRedirect"
      >
        <option selected>Selecione um usuário</option>
        <option v-for="(user, index) in users" :key="index" :value="user.id">
          {{ user.name }}
        </option>
      </select>
    </form>
    <div class="div__tasks">
      <div class="div__newTask">
        <h4 class="div__newTask__title">Nova Tarefa</h4>
        <form @submit.prevent="addNewTask" action="" class="form__newTask">
          <input
            v-model.lazy="newTask.titulo"
            name="newTask"
            type="text"
            placeholder="Titulo"
            class="newTask__title"
            required
          />
          <textarea
            v-model="newTask.nome"
            name="newTask"
            type="text"
            placeholder="Descrição da tarefa..."
            class="newTask__description"
            required
          />
          <button class="btn btn-primary">Adicionar nova tarefa</button>
        </form>
        <div class="btn__addRemove">
          <button class="btn btn-primary" @click="removeAllTask">
            Remover todas as tarefas
          </button>
          <button class="btn btn-primary" @click="doneAllTask">
            Completar todas as tarefas
          </button>
        </div>
      </div>
      <div class="div__pendindTask">
        <h4 class="div__pendingTask__title">Pendentes</h4>
        <div v-for="todo in todos" v-bind:key="todo.id" class="todo">
          <div class="tasks__li" v-if="todo.status === 'pending'">
            <h6 :class="todo.status" @click="doneTask(todo)">
              <p class="li__title">
                <i>Usuário: {{ todo.user_id || todo.id}}</i>
              </p>
              {{ todo.titulo || todo.title }}
            </h6>
            <p :class="todo.done" @click="doneTask(todo)">
              {{ todo.content }}
            </p>

            <button class="btn btn-primary" @click="removeTask(todo)">
              Remover tarefa
            </button>
          </div>
        </div>
      </div>
      <div class="div__completedTask">
        <h4 class="div__completedTask__title">Completas</h4>
        <div v-for="todo in todos" v-bind:key="todo.id" class="todo">
          <div class="tasks__li" v-if="todo.status === 'completed'">
            <h6 :class="todo.status" @click="doneTask(todo)">
              <p class="li__title">
                <i>Usuário: {{ todo.user_id || todo.id}}</i>
              </p>
              {{ todo.titulo || todo.title }}
            </h6>
            <p :class="todo.done" @click="doneTask(todo)">
              {{ todo.content }}
            </p>

            <button class="btn btn-primary" @click="removeTask(todo)">
              Remover tarefa
            </button>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<style lang="scss">
.btn {
  margin: 2px;
}
.todo {
  cursor: pointer;
  padding-left: 5px;
  padding-right: 5px;
}
.todo__title{
  padding-left: 10px;
}
.li > button {
  align-items: center;
}
.body__todo {
  width: 100%;
  height: 100vh;
  background-color: rgb(219, 219, 219);
}
.form__filter {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
}
#input__filter {
  display: inline-block;
  width: 75%;
}
#select__filter {
  display: inline-block;
  width: 25%;
}
.div__tasks {
  display: flex;
  justify-content: space-between;
}

.div__newTask__title,
.div__pendingTask__title,
.div__completedTask__title {
  font-weight: 300;
  padding: 10px;
  color: white;
}
.div__newTask__title {
  background-color: rgb(158, 158, 158);
}
.div__pendingTask__title {
  background-color: #0d6efd;
}
.div__completedTask__title {
  background-color: rgb(93, 199, 93);
}
.div__newTask,
.div__pendindTask,
.div__completedTask {
  margin-top:20px;
  display: flex;
  flex-direction: column;
  background-color: white;
  width: 33%;
  overflow-y: scroll;
}
.div__newTask{
  height: 30%;
}
.div__pendindTask,
.div__completedTask {
  height: 80vh;
}
.form__newTask {
  display: flex;
  flex-direction: column;
}
.btn__addRemove {
  display: flex;
  justify-content: space-between;
}
.newTask__title,
.newTask__description {
  margin: 3px;
}
.tasks__li {
  background-color: rgba(224, 224, 224, 0.75);
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.125);
  padding-left: 10px;
  margin-bottom: 5px;
}
.li__title {
  font-weight: 200;
}
</style>
