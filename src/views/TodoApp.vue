
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
    addTodo(newTodoObj) {
      this.todos = [...this.todos, newTodoObj];
    },
    deleteTodo(todoId) {
      this.todos = this.todos.filter((todo) => todo.id !== todoId);
    },
  },
  created() {
      fetch("/api/tasks")
        .then((res) => res.json())
        .then((json) => {
          this.todos = json.tasks
        })
    },
};
</script>

<style scoped>
    #todoApp {
        background-color: #FFFFFF;
        border: 1px solid #CCCCCC;
        padding: 20px;
        margin-top: 10px;
    }
</style>