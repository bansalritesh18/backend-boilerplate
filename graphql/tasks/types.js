import { gql } from "apollo-server-express";

const tasksTypes = gql`
 

  type Task {
    task_id: Int
    task_title: String
    task_description: String
    completed: Boolean
  }

  type Query {
    tasks: [Task]
  }

  type Mutation {
    createTask(task_title: String, task_description: String): Task
    updateTask(task_id: Int, task_title: String, task_description: String, completed: Boolean): Task
    deleteTask(task_id: Int): Boolean
  }
`;

export default tasksTypes;