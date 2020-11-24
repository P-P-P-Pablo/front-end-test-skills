
<template>
  <div id="todoApp">
    <TodoList v-bind:todos="todos" v-on:delete-todo="deleteTodo" />
    <AddTodo v-on:add-todo="addTodo" />
  </div>
</template>

<script>
import TodoList from "../components/TodoList";
import AddTodo from "../components/AddTodo";
export default {
  name: "TodoApp",
  components: { TodoList, AddTodo },
  data() {
    return {
      todos: [],
    };
  },
  methods: {
    async addTodo(newTodoObj) {
      await fetch(`/api/users/${this.$route.params.id}/tasks`, {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          ...newTodoObj,
        }),
      })
        .then((res) => res.json())
        .catch((error) => {
          console.log(error);
        });
      await fetch(`/api/users/${this.$route.params.id}/tasks`)
        .then((res) => res.json())
        .then((json) => {
          if (json.error) {
            this.serverError = json.error;
          } else {
            this.todos = json.tasks;
            console.log("todos", json);
          }
        });
    },
    async deleteTodo(todoId) {
      await fetch(`/api/users/${this.$route.params.id}/tasks/${todoId}`, {
        method: "delete",
      })
        .then((res) => res.json())
        .catch((error) => {
          console.log(error);
        });

      await fetch(`/api/users/${this.$route.params.id}/tasks`)
        .then((res) => res.json())
        .then((json) => {
          if (json.error) {
            this.serverError = json.error;
          } else {
            this.todos = json.tasks;
            console.log("todos", json);
          }
        });
    },
  },
  async created() {
    await fetch(`/api/users/${this.$route.params.id}/tasks`)
      .then((res) => res.json())
      .then((json) => {
        if (json.error) {
          this.serverError = json.error;
        } else {
          this.todos = json.tasks;
          console.log("todos", json);
        }
      });
  },
};
</script>

<style scoped>
#todoApp {
  background-color: #ffffff;
  border: 1px solid #cccccc;
  padding: 20px;
  margin-top: 10px;
}
</style>