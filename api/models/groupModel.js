const { db } = require("../../firebaseConfig");

const getGroupById = async (groupId) => {
    try {
        const groupRef = db.collection('groups').doc(groupId);
        const groupDoc = await groupRef.get();

        if (!groupDoc.exists) {
            return [];
        }

        const groupData = groupDoc.data();
        const usersData = await Promise.all(groupData.users.map(async (email) => {
            const userRef = await db.collection('users').where('email', '==', email).get();
            if (!userRef.empty) {
                const userInfo = userRef.docs[0].data();
                return { email, name: userInfo.name }; // Suponiendo que el campo 'name' existe
            }
            return null; // Si no se encuentra el usuario
        }));

        return {
            ...groupData,
            users: usersData.filter(user => user !== null) // Filtra los usuarios no encontrados
        };
    } catch (error) {
        return [];
    }
};


const getAllGroupsByEmail = async (email) => {
    try {
        const groupsRef = await db.collection('groups').where('users', 'array-contains', email).get();

        if (groupsRef.empty) {
            return [];
        }

        const groups = await Promise.all(groupsRef.docs.map(async (doc) => {
            const groupData = doc.data();
            const usersData = await Promise.all(groupData.users.map(async (userEmail) => {
                const userRef = await db.collection('users').where('email', '==', userEmail).get();
                if (!userRef.empty) {
                    const userInfo = userRef.docs[0].data();
                    return { email: userEmail, name: userInfo.name }; // Suponiendo que el campo 'name' existe
                }
                return null; // Si no se encuentra el usuario
            }));

            return {
                id: doc.id,
                ...groupData,
                users: usersData.filter(user => user !== null) // Filtra los usuarios no encontrados
            };
        }));

        return groups;
    } catch (error) {
        return [];
    }
};

const joinGroup = async (groupId, email) => {
    try {
        const groupRef = db.collection('groups').doc(groupId);
        const groupDoc = await groupRef.get();

        if (!groupDoc.exists) {
            return { error: true, msg: 'Grupo no encontrado' };
        }

        const groupData = groupDoc.data();

        if (groupData.users.includes(email)) {
            return { error: true, msg: 'El usuario ya está en el grupo' };
        }

        const updatedUsers = [...groupData.users, email];
        
        await groupRef.update({ users: updatedUsers });
    } catch (error) {
        return { error: true, msg: 'Error al unirse al grupo' };
    }
};

const addGroup = async (newGroup) => {
    try {
        await db.collection('groups').doc(newGroup.id).set(newGroup);
    } catch (error) {
        return { error: true, msg: 'Error al crear el grupo' };
    }
};

const updateGroup = async (groupId, updatedData) => {
    try {
        const groupRef = db.collection('groups').doc(groupId);
        const groupDoc = await groupRef.get();

        if (!groupDoc.exists) {
            return { error: true, msg: 'Grupo no encontrado' };
        }

        await groupRef.update(updatedData);
    } catch (error) {
        return { error: true, msg: 'Error al actualizar el grupo' };
    }
};

const leaveGroup = async (groupId, email) => {
    try {
        const groupRef = db.collection('groups').doc(groupId);
        const groupDoc = await groupRef.get();

        if (!groupDoc.exists) {
            return { error: true, msg: 'Grupo no encontrado' };
        }

        const groupData = groupDoc.data();
        const updatedUsers = groupData.users.filter(user => user !== email);

        await groupRef.update({ users: updatedUsers });
        
        if (updatedUsers.length === 0) {
            await groupRef.delete();
            return { error: false, msg: 'Grupo eliminado porque no quedan miembros' };
        }

        return { error: false, msg: 'Usuario eliminado exitosamente del grupo' };
    } catch (error) {
        return { error: true, msg: 'Error al salir del grupo' };
    }
};

module.exports = {
    getAllGroupsByEmail, 
    joinGroup,
    addGroup,
    getGroupById,
    updateGroup,
    leaveGroup
};