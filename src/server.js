import {
	createServer,
	Model,

	belongsTo,
	RestSerializer,
	hasMany,
} from 'miragejs';

function makeServer({
	environment = 'development'
} = {}) {
	let server = createServer({
		environment,

		models: {
			user: Model.extend({
				task: hasMany(),
			}),

			task: Model.extend({
				user: belongsTo(),
			}),
		},

		serializers: {
			task: RestSerializer.extend({
				include: ['user'],
				embed: true,
			}),
		},
		seeds(server) {
			let adminList = server.create('user', {
				name: 'admin123',
				mdp: 'azerty123',
			});
			server.create('task', {
				user: adminList,
				title: 'Do things',
				completed: true,
			});

			// commons tasks
			server.create('task', {
				title: 'Go workout',
				completed: false,
			});
			server.create('task', {
				title: 'Do laundry',
				completed: false,
			});
			server.create('task', {
				title: 'Cook food',
				completed: false,
			});
			server.create('task', {
				title: 'Clean up room',
				completed: false,
			});
			server.create('task', {
				title: 'Finish work',
				completed: true,
			});
		},

		routes() {
			this.namespace = 'api';

			this.get('/tasks', (schema) => {
				return schema.tasks.all();
			});
			this.post('/tasks', (schema, request) => {
				let attrs = JSON.parse(request.requestBody);

				return schema.tasks.create(attrs);
			});
			this.delete('/tasks/:id', (schema, request) => {
				let id = request.params.id;

				return schema.tasks.find(id).destroy();
			});
			this.get('/users/:name/:mdp', (schema, request) => {
				let name = request.params.name;
				let mdp = request.params.mdp;
				

				return schema.users.where({
					name: name,
					mdp: mdp
				});
			});
			this.post('/users', (schema, request) => {
				let attrs = JSON.parse(request.requestBody);

				return schema.users.create(attrs);
			});
			this.get('/users/:id/tasks', (schema, request) => {
				let userId = request.params.id;
				let user = schema.users.find(userId);

				return user.tasks;
			});
		},
	});

	return server;
}
export default makeServer;