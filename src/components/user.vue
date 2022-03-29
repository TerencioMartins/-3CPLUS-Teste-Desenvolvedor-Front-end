<script>
import { ref, onMounted, reactive } from "@vue/runtime-core";
import APItoken from "../services/token";
import api from "../services/api";

export default {
  props: {
    input_name: "",
    input_email: "",
    input_gender: "",
    input_isActive: "",
  },

  setup(props) {
    let users = ref([]);
    let pages = ref([]);
    const counterData = reactive({ l: 1 });

    /* REQUISIÇÃO USUÁRIOS E NUMERO DE PÁGINAS */
    const fetchUsers = () => {
      api.get(`/users?page=${counterData.l}`).then((response) => {
        users.value = response.data.data;
        pages.value = response.data.meta.pagination.pages;
      });
    };

    onMounted(fetchUsers);

    /* GERENCIAMENTO DAS PAGINAS*/
    const increaseCounter = (amount) => {
      counterData.l += amount;
      fetchUsers();
    };
    const decreaseCounter = (amount) => {
      counterData.l -= amount;
      fetchUsers();
    };

    /* FUNÇÃO CRIAR NOVO USUÁRIO */
    const fetchNewUser = () => {
      api
        .post(
          `/users`,
          {
            name: props.input_name,
            email: props.input_email,
            gender: props.input_gender,
            status: props.input_isActive === true ? "active" : "inactive",
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
    };
    return {
      counterData,
      fetchNewUser,
      increaseCounter,
      decreaseCounter,
      users,
    };
  },
};
</script>

<template>
  <div class="body__user">
    <div class="body__user__header">
      <h1 class="body__title">Usuário</h1>
      <button
        type="button"
        class="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
        data-bs-whatever="@mdo"
        id="button__novoUsuario"
      >
        Novo Usuário
      </button>
    </div>
    <div class="body__user">
      <div
        class="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">Informações</h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <form @submit.prevent="fetchNewUser">
                <div class="mb-3">
                  <label for="recipient-name" class="col-form-label"
                    >Nome:</label
                  >
                  <input
                    v-model="input_name"
                    type="text"
                    class="form-control"
                    id="recipient-name"
                    required
                  />
                </div>
                <div class="mb-3">
                  <label for="email-text" class="col-form-label">Email:</label>
                  <input
                    v-model="input_email"
                    type="email"
                    class="form-control"
                    id="email-text"
                    required
                  />
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="radio"
                      v-model="input_gender"
                      name="exampleRadios"
                      id="exampleRadios1"
                      value="male"
                      required
                    />
                    <label class="form-check-label" for="exampleRadios1">
                      Masculino
                    </label>
                  </div>
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="radio"
                      v-model="input_gender"
                      name="exampleRadios"
                      id="exampleRadios2"
                      value="female"
                      required
                    />
                    <label class="form-check-label" for="exampleRadios2">
                      Feminino
                    </label>
                  </div>
                  <div class="form-check form-switch">
                    <label class="form-check-label" for="flexSwitchCheckDefault"
                      >Está ativo?</label
                    >
                    <input
                      v-model="input_isActive"
                      class="form-check-input"
                      type="checkbox"
                      role="switch"
                      id="flexSwitchCheckDefault"
                    />
                  </div>
                </div>
                <div class="modal-footer">
                  <button
                    type="button"
                    class="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Fechar
                  </button>
                  <button type="submit" class="btn btn-primary">Criar</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>E-mail</th>
            <th>Gênero</th>
            <th>Status</th>
            <th>Tarefas</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in users" :key="index">
            <td>{{ item.id }}</td>
            <td>{{ item.name }}</td>
            <td>{{ item.email }}</td>
            <td>{{ item.gender }}</td>
            <td :class="item.status != 'active' ? 'inactive' : 'active'" id="">
              {{ item.status }}
            </td>
            <div class="button__abrir">
            <button class="btn btn-primary btn__abrir">
              <router-link class="router__abrir" :to="`/todo/${item.id}`">
                Abrir</router-link
              >
            </button>
            </div>
          </tr>
        </tbody>
      </table>
      <nav class="nav__pages">
        <button class="btn btn-primary" @click="decreaseCounter(1)" :disabled="(counterData.l <= 1)">
          Página anterior
        </button>
        <h4>{{ counterData.l }}</h4>
        <button class="btn btn-primary" @click="increaseCounter(1)">
          Próxima página
        </button>
      </nav>
    </div>
  </div>
</template>

<style lang="scss">
.active {
  width: 35px;
  background-color: rgb(93, 199, 93);
}
.inactive {
  width: 35px;
  background-color: rgb(129, 129, 129);
}
.body__user {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100vh;
}
.body__user__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  background-color: #363636;
}
#button__novoUsuario{
  margin-right: 35px;
}
.body__title {
  display: inline-block;
  color: rgb(204, 204, 204);
  padding-left: 10px;
}
table {
  width: 100%;
  height: 50%;
}
th {
  padding: 8px;
  font-size: 15px;
  background-color: rgb(199, 199, 199);
  text-align: center;
}
tr{
    FONT-WEIGHT: 300;
    line-height: 10px;
}
td {
  margin: 5px;
  text-align: center;
  color: black;
  font-size: 16px;
  line-height: 1px;
}
table tr:nth-child(odd) {
  background-color: rgb(255, 255, 255);
}
table tr:nth-child(odd):hover {
  background-color: rgb(235, 235, 235);
}
table tr:nth-child(even) {
  background-color: rgb(235, 235, 235);
}
table tr:nth-child(even):hover {
  background-color: rgb(224, 224, 224);
}
.button__abrir{
  display: flex;
  align-items: center;
  justify-content: center;
}
.router__abrir {
  color: white;
  text-decoration: none;
}
.router__abrir:hover {
  color: white;
}
.nav__pages {
  padding-top: 3px ;
  width: 100%;
  display: flex;
  justify-content: space-around;
}
</style>
