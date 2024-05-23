
const tasksResolvers = {
    Query: {
        tasks: async (parent, args, { models }) => {
            return await models.tasks.findAll({
                order: [['task_id', 'ASC']],
            });
        },
    },
    Mutation: {
        createTask: async (parent, { task_title, task_description }, { models }) => {
            return await models.tasks.create({ task_title, task_description });
        },
        updateTask: async (_, { task_id, task_title, task_description, completed }, { models }) => {
            await models.tasks.update(
                { task_title, task_description, completed },
                {
                    where: {
                        task_id: task_id,
                    },
                }
            );
            return true
        },
        deleteTask: async (parent, { task_id }, { models}) => {
            await models.tasks.destroy({
                where: {
                    task_id: task_id,
                }
            });
            return true;
        },
    },
};
export default tasksResolvers;
