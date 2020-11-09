<template>
  <div class="post" v-bind:class="{ completed: todo.completed }">
    <p
      :style="{ 'text-decoration': todo.completed ? 'line-through' : 'none' }"
      v-on:click="markComplete"
    >
      {{ todo.title }}
    </p>
    <div class="label">
      <input type="checkbox" v-model="todo.completed" />
      <label
        for="checkbox"
        :style="{ color: todo.completed ? 'green' : 'red' }"
        >{{ todo.completed ? "Done" : "Pending" }}</label
      >
      <button @click="$emit('delete-todo', todo.id)">Delete</button>
      
    </div>
  </div>
</template>
<script>
export default {
  name: "Todo",
  props: ["todo"],
  methods: {
    markComplete() {
      this.todo.completed = !this.todo.completed;
    },
  },
};
</script>
<style scoped>
.post {
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-items: center;
  text-align: center;
}

.label {
  margin-left: 10px;
  display: flex;
  flex-flow: column-reverse nowrap;
  align-items: center;
  justify-items: center;
  text-align: center;
  font-size: 60%;
}
</style>