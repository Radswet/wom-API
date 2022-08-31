const { v4 } = require('uuid');
const { AWS } = require("aws-sdk");

const addForm = async (event) => {
    const dynamodb = new AWS.DynamoDB.DocumentClient();

    const { IDTemplate, IDUser, IDEstado, Sitio } = event.body;
    const createdAt = new Date();
    const id = v4();

    console.log("created id: ", id);

    const newForm = {
        id,
        IDTemplate,
        IDUser,
        IDEstado,
        Sitio,
        createdAt
    };

    await dynamodb.put({
        TableName: 'FormularioTable',
        Item: newForm,
    }).promise()

    return {
        statusCode: 200,
        body: JSON.stringify(newForm),
    };
};

module.exports = {
    addForm
};