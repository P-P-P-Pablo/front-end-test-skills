<template>
  <div>
    <form @submit="addTodo">
      <input type="text" v-model="title" name="title" id="title" />
      <button type="submit">Add something to do</button>
    </form>
  </div>
</template>

<script>


export default {
  name: "AddTodo",
  data() {
    return {
      title: "",
    };
  },
  methods: {
    addTodo(e) {
      e.preventDefault();

      const newTodoObj = {
        title: this.title,
        completed: false,
      };
      this.$emit("add-todo", newTodoObj);
      this.title = "";
    },
  },
};
</script>

<style scoped>
#title {
  width: auto;
}
</style>