<template>
  <div>
    <h2>My To Do List</h2>
    <ul>
      <li v-bind:key="todo.id" v-for="todo in todos">
        <Todo v-bind:todo="todo" v-on:delete-todo="$emit('delete-todo', todo.id)"/>
      </li>
    </ul>
  </div>
</template>

<script>
import Todo from "./Todo";
export default {
  name: "TodoList",
  components: { Todo },
  props: ["todos"],
};
</script>

<style scoped>
div{
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    justify-items: center;
    text-align: center;
}

ul {
  list-style-type: none;
}
</style>