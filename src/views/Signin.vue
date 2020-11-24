<template>
  <div id="login">
    <form>
    <h1>Sign in</h1>
    <input
      type="text"
      name="username"
      v-model="input.username"
      placeholder="Username"
      autocomplete="username"
    />
    <input
      type="password"
      name="password"
      v-model="input.password"
      placeholder="Password"
      autocomplete="new-password"
    />
    <input
      type="password"
      name="passwordconfirmation"
      v-model="input.passwordconfirmation"
      placeholder="Password confirmation"
      autocomplete="new-password"
    />
    <button type="button" v-on:click="signin()">Sign in</button>

    </form>
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
        let newUser = {name : this.input.username , mdp :this.input.password }
        
        const postReq = await fetch(`/api/users`, {
          method: "post",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },

          //make sure to serialize your JSON body
          body: JSON.stringify({
            ...newUser,
          }),
        })
          .then((res) => res.json())
          .catch((error) => {
            console.log(error);
          });
        
        let user = {name: postReq.user.name, mdp: postReq.user.mdp, id: postReq.user.id}


        if (postReq.user.name && postReq.user.mdp) {
          this.$emit("authenticated", true);
          this.$emit("connecteduser", user);
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
