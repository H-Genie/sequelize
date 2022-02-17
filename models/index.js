const Sequelize = require('sequelize');
const path = require('path');
const fs = require('fs');
const dotenv = require('dotenv');

dotenv.config();

//config.json파일의 설정 값을 읽어 sequelize를 생성
const config = require('../config/key');
const sequelize = new Sequelize(
    config.DATABASE,
    config.DB_USER,
    config.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: 'mysql',
        timezone: '+09:00', //한국 시간 셋팅
        operatorsAliases: Sequelize.Op,
        pool: {
            max: 5,
            min: 0,
            idle: 10000
        }
    }
);

let db = [];

// models 폴더 아래에 존재하는 js파일을 모두 로딩
fs.readdirSync(__dirname)
    .filter(function (file) {
        return (file.indexOf(".") !== 0) && (file !== "index.js");
    })
    .forEach((file) => {
        const model = require(path.join(__dirname, file))(
            sequelize,
            Sequelize.DataTypes
        )
        db[model.name] = model
    })

// DB 객체에 Model을 정의하여 반환
Object.keys(db).forEach(modelName => {
    if ("associate" in db[modelName]) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;