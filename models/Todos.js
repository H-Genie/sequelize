module.exports = (sequelize, DataTypes) => {
    const Todos = sequelize.define('Todos',
        {
            id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
            todo: { type: DataTypes.STRING },
        }
    );
    return Todos;
} 