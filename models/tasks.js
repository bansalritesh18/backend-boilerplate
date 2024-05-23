export default (sequelize, DataTypes) => {
  const Tasks = sequelize.define(
    "tasks",
    {
      task_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      task_title: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      task_description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      completed: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
    },
    {
      timestamps: false,
      tableName: "tasks",
    },
  );

  return Tasks;
};