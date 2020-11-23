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
      v-model="input.passwordconfirmation"
      placeholder="Password confirmation"
    />
    <button type="button" v-on:click="signin()">Sign in</button>
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
    async signin() {
      if (
        this.input.username != "" &&
        this.input.password != "" &&
        this.input.passwordconfirmation != ""
      ) {
        let newUser = await fetch(`/api/users`, {
          method: "post",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },

          //make sure to serialize your JSON body
          body: JSON.stringify({
            name: this.input.username,
            mdp: this.input.password,
          }),
        })
          .then((res) => res.json())
          .catch((error) => {
            console.log(error);
          });
        console.log("aaaa", newUser);

        if (newUser.user.name && newUser.user.mdp) {
          this.$emit("authenticated", true);
          this.$router.replace({ name: "Todo App" });
        } else {
          console.log("The username and / or password is incorrect");
        }
      } else {
        console.log("please complete the form");
      }
    },
  },
};
</script>

