<template>
  <div id="app">
    <TodoList v-bind:todos="todos" v-on:delete-todo="deleteTodo" />
    <AddTodo v-on:add-todo="addTodo" />
  </div>
</template>

<script>
import TodoList from "./components/TodoList";
import AddTodo from "./components/AddTodo";

export default {
  name: "App",
  components: { TodoList, AddTodo },
  data() {
    return {
      todos: [
        {
          id: 1,
          title: "Go workout",
          completed: false,
        },
        {
          id: 2,
          title: "Do laundry",
          completed: false,
        },
        {
          id: 3,
          title: "Cook food",
          completed: false,
        },
        {
          id: 4,
          title: "Clean up room",
          completed: false,
        },
        {
          i: 5,
          title: "Finish work",
          completed: true,
        },
      ],
    };
  },
  methods: {
    addTodo(newTodoObj) {
      this.todos = [...this.todos, newTodoObj];
    },
    deleteTodo(todoId) {
      this.todos = this.todos.filter((todo) => todo.id !== todoId);
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-items: center;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
