<template>
  <div id="app">
    <div id="nav">
      <h1 v-if="authenticated">
        Welcome {{ connecteduser.name + " #" + connecteduser.id }}
      </h1>
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link v-if="authenticated" :to="'/todoapp/' + connecteduser.id"
        >Todo App</router-link
      >{{ authenticated ? " |" : "" }}
      <router-link v-if="!authenticated" to="/login">Log In</router-link
      >{{ !authenticated ? " |" : "" }}
      <router-link v-if="!authenticated" to="/signin">SignIn</router-link
      >{{ !authenticated ? " |" : "" }}
      <router-link
        v-if="authenticated"
        to="/login"
        v-on:click.native="logout()"
        replace
        >Logout</router-link
      >
    </div>
    <router-view @authenticated="setAuthenticated" @connecteduser="setUser" />
  </div>
</template>
<script>
export default {
  name: "App",
  data() {
    return {
      authenticated: false,
      connecteduser: { name: "", mdp: "", id: "" },
    };
  },
  mounted() {
    if (!this.authenticated) {
      this.$router.replace({ name: "login" });
    }
  },
  methods: {
    setAuthenticated(status) {
      this.authenticated = status;
    },
    setUser(status) {
      this.connecteduser.name = status.name;
      this.connecteduser.mdp = status.mdp;
      this.connecteduser.id = status.id;
    },
    logout() {
      this.authenticated = false;
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

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
