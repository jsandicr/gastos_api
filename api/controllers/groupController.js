const GroupModel = require('../models/groupModel');

const getGroupsByEmail = async (req, res) => {
    const { email } = req.params;

    const result = await GroupModel.getAllGroupsByEmail(email);
    if(result.error){
        return res.status(400).json(result);
    }
    return res.status(201).json(result);
};

const joinGroup = async (req, res) => {
    const { code, email } = req.params;

    const result = await GroupModel.joinGroup(code, email);
    if(result && result.error){
        return res.status(400).json(result);
    }
    return res.status(201).json();
};

const addGroup = async (req, res) => {
    const { email, description } = req.body;

    const newGroup = {
        id: generateUniqueId(),
        description,
        users: [email],
        expenses: [],
        createdBy: email,
        status: 'incomplete'
    };

    const result = await GroupModel.addGroup(newGroup);
    if(result && result.error){
        return res.status(400).json(result);
    }
    return res.status(201).json();
};

const leaveGroup = async (req, res) => {
    const { code, email } = req.params;

    const result = await GroupModel.leaveGroup(code, email);
    if(result.error){
        return res.status(400).json(result);
    }
    return res.status(201).json();
};

let groupCounter = 0;

function generateUniqueId() {
    const timestamp = new Date().getTime();
    groupCounter += 1;
    return `${timestamp}-${groupCounter}`;
}

module.exports = {
    getGroupsByEmail,
    joinGroup,
    addGroup,
    leaveGroup
};