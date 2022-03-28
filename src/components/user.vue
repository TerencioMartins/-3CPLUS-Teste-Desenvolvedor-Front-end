<template>
  <div>
    <button
      type="button"
      class="btn btn-primary"
      data-bs-toggle="modal"
      data-bs-target="#exampleModal"
      data-bs-whatever="@mdo"
    >
      Novo Usuário
    </button>
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
                <label for="recipient-name" class="col-form-label">Nome:</label>
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
      <tr>
        <th>ID</th>
        <th>Nome</th>
        <th>E-mail</th>
        <th>Gênero</th>
        <th>Status</th>
      </tr>
      <tr v-for="(item, index) in users" :key="index">
        <td>{{ item.id }}</td>
        <td>{{ item.name }}</td>
        <td>{{ item.email }}</td>
        <td>{{ item.gender }}</td>
        <td :class="item.status != 'active' ? 'inactive' : 'active'" id="">
          {{ item.status }}
        </td>
        <button>
          <router-link :to="`/todo/${item.id}`"> Abrir</router-link>
        </button>
      </tr>
    </table>
    <nav>
      <button @click="decreaseCounter(1)">Página anterior</button>
      <!-- <ul class="nav_list" v-for="(item, index) in pages" :key="index">
        <button @click="setCounter(item)">{{ item }}</button>
      </ul> -->
      <button @click="increaseCounter(1)">Próxima página</button>
    </nav>
  </div>
</template>

<script>
import {
  ref,
  onMounted,
  reactive,
  onUpdated,
  computed,
} from "@vue/runtime-core";
import api from "../services/api";

export default {
  props: {
    input_name: "",
    input_email: "",
    input_gender: "",
    input_isActive: "",
  },
  setup(props) {
    let users = reactive(ref([]));
    let pages = ref([]);
    
    const counterData = reactive({
      l: 1,
    });

    const increaseCounter = (amount) => {
      counterData.l += amount;
    };
    const decreaseCounter = (amount) => {
      counterData.l -= amount;
    };

    const setCounter = (amount) => {
      counterData.l = amount;
    };

    const fetchUsers = () => {
      api.get(`/users?page=${counterData.l}`).then((response) => {
        users.value = response.data.data;
        pages.value = response.data.meta.pagination.pages;
      });
    };
    const submitForm = () => {
      //   const teste = JSON.stringify({
      //     name: props.input_name,
      //     email: props.input_email,
      //     gender: props.input_gender_male === true ? "male" : "female",
      //     status: props.input_isActive === true ? "active" : "inactive",
      //   });
      const teste = {
        name: props.input_name,
        email: props.input_email,
        gender: props.input_gender,
        status: props.input_isActive === true ? "active" : "inactive",
      };
      const teste2 = {
        name: "Deevsadakar Rana",
        email: "defbbaasdvbhgnfevakar_rana@keeling.info",
        gender: "female",
        status: "active",
      };
      console.log(teste);
      console.log(teste2);
    };

    const fetchNewUser = () => {
      const stringified = {
        name: props.input_name,
        email: props.input_email,
        gender: props.input_gender_male === true ? "male" : "female",
        status: props.input_isActive === true ? "active" : "inactive",
      };
      api
        .post(`/users`, stringified, {
          headers: {
            Authorization:
              "Bearer 6bb91088b0718d13be29cf24e5e29d859657fb889fab93dcd0875eb0b52eb435",
          },
        })
        .then((response) => {
          console.log(response);
          console.log(stringified);
        })
        .catch((error) => {
          console.log(error);
        });
    };

    onMounted(fetchUsers);
    onUpdated(fetchUsers);
    return {
      submitForm,
      fetchNewUser,
      setCounter,
      increaseCounter,
      decreaseCounter,
      fetchUsers,
      pages,
      users,
    };
  },
};
</script>

<style lang="scss">
.active {
  color: green;
}
.inactive {
  color: rgb(185, 185, 185);
}
</style>
