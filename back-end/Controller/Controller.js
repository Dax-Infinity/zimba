const title = require('../Moduls/Moduls')
const jwt = require('jsonwebtoken');


const postData = async (req, res) => {
    try {
        console.log(req.body);
        const userInfo = new title(req.body);
        const data = await userInfo.save();
        res.status(201).json({ data })
    }
    catch (error) {
        throw error;
    }
}

const getData = async (req, res) => {
    try {
        const data = await title.find();
        res.status(200).json(data)

    }
    catch (error) {
        throw error;
    }

}

const deleteData = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await title.findByIdAndDelete(id);
        res.status(201).json(result);
    }
    catch (error) {
        throw error;
    }

}

const putData = async (req, res) => {
    try {
        const { id } = req.params;
        await title.findByIdAndUpdate(id, req.body)
        res.status(201).json({ Message: "data updated" });
    }
    catch (error) {
        throw error;
    }

}


module.exports = { postData, getData, deleteData, putData }