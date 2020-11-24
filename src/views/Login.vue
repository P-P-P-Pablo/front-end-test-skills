<template>
  <form id="login">
    <h1>Login</h1>
    <input
      type="text"
      name="username"
      v-model="input.username"
      placeholder="Username"
      Autocomplete
    />
    <input
      type="password"
      name="password"
      v-model="input.password"
      placeholder="Password"
      Autocomplete
    />
    <button type="button" v-on:click="login()">Login</button>
  </form>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      input: {
        username: "",
        password: "",
      },
    };
  },
  methods: {
    async login() {
      if (this.input.username != "" && this.input.password != "") {
        let requete = await fetch(
          `/api/users/${this.input.username}/${this.input.password}`
        )
          .then((res) => res.json())
          .catch((error) => {
            console.log(error);
          });

        let user = {name: requete.users[0].name, mdp: requete.users[0].mdp, id: requete.users[0].id}
        
        if (
          this.input.username == user.name &&
          this.input.password == user.mdp
        ) {
          this.$emit("authenticated", true);
          this.$emit("connecteduser", user);
          this.$router.replace({ path: `/todoapp/${user.id}` });
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
  border: 1px solid #cccccc;
  background-color: #ffffff;
  margin: auto;
  margin-top: 200px;
  padding: 20px;
}
</style>