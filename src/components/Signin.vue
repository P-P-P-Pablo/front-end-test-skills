<template>
  <div id="login">
    <h1>Sign in</h1>
    <input
      type="text"
      name="username"
      v-model="input.username"
      placeholder="Username"
    />
    <input
      type="password"
      name="password"
      v-model="input.password"
      placeholder="Password"
    />
    <input
      type="password"
      name="passwordconfirmation"
      v-model="input.password"
      placeholder="Password confirmation"
    />
    <button type="button" v-on:click="Signin()">Sign in</button>
  </div>
</template>

<script>
export default {
  name: "Signin",
  data() {
    return {
      input: {
        username: "",
        password: "",
        passwordconfirmation: "",
      },
    };
  },
  methods: {
    login() {
      if (this.input.username != "" && this.input.password != "") {
        if (
          this.input.username == this.$parent.$parent.mockAccount.username &&
          this.input.password == this.$parent.$parent.mockAccount.password
        ) {
          this.$emit("authenticated", true);
          this.$router.replace({ name: "secure" });
        } else {
          console.log("The username and / or password is incorrect");
        }
      } else {
        console.log("A username and password must be present");
      }
    },
  },
};
</script>

<style scoped>
#login {
  width: 500px;
  border: 1px solid #CCCCCC;
  background-color: #FFFFFF;
  margin: auto;
  margin-top: 200px;
  padding: 20px;
}
</style>