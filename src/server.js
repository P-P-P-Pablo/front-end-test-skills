import {
  createServer
} from "miragejs"

export function makeServer({
  environment = "development"
} = {}) {
  let server = createServer({
    environment,
    routes() {
      this.get("/api/tasks", () => ({
        tasks: [{
          id: 1,
          title: "Go workout",
          completed: false,
        }, {
          id: 2,
          title: "Do laundry",
          completed: false,
        }, {
          id: 3,
          title: "Cook food",
          completed: false,
        }, {
          id: 4,
          title: "Clean up room",
          completed: false,
        }, {
          i: 5,
          title: "Finish work",
          completed: true,
        }],
      }))

      this.post("/api/tasks", (schema, request) => {
        let attrs = JSON.parse(request.requestBody)
        console.log(attrs)
        

        return { reminder: attrs }
      })
    },
  })

  return server
}


/*import {
  createServer,
  Model
} from "miragejs"

export default function makeServer({
  environment = "development"
} = {}) {
  let server = createServer({
    environment,

    models: {
      task: Model,
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
}*/