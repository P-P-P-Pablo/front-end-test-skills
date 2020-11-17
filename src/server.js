import {
  createServer,
  Model
} from "miragejs"

export function makeServer({
  environment = "development"
} = {}) {
  let server = createServer({
    environment,

    models: {
      user: Model,
    },

    seeds(server) {
      server.create("task", {
        id: 1,
        title: "Go workout",
        completed: false,
      })
      server.create("task", {
        id: 2,
        title: "Do laundry",
        completed: false,
      })
      server.create("task", {
        id: 3,
        title: "Cook food",
        completed: false,
      })
      server.create("task", {
        id: 4,
        title: "Clean up room",
        completed: false,
      })
      server.create("task", {
        i: 5,
        title: "Finish work",
        completed: true,
      })
    },

    routes() {
      this.namespace = "api"

      this.get("/tasks", (schema) => {
        return schema.tasks.all()
      })
    },
  })

  return server
}