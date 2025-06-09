// Simulador de base de datos local
const LocalStorage = {
    // Simular trickleCreateObject
    async createObject(objectType, objectData) {
        const objects = this.getObjects(objectType);
        const newObject = {
            objectId: Date.now().toString() + Math.random().toString(36).substr(2, 9),
            objectType: objectType,
            objectData: objectData,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };
        
        objects.push(newObject);
        localStorage.setItem(`crm_${objectType}`, JSON.stringify(objects));
        return newObject;
    },
    
    // Simular trickleListObjects
    async listObjects(objectType, limit = 100, descent = true) {
        const objects = this.getObjects(objectType);
        let sortedObjects = [...objects];
        
        if (descent) {
            sortedObjects.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        } else {
            sortedObjects.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        }
        
        return {
            items: sortedObjects.slice(0, limit),
            nextPageToken: null
        };
    },
    
    // Simular trickleGetObject
    async getObject(objectType, objectId) {
        const objects = this.getObjects(objectType);
        return objects.find(obj => obj.objectId === objectId);
    },
    
    // Simular trickleUpdateObject
    async updateObject(objectType, objectId, objectData) {
        const objects = this.getObjects(objectType);
        const index = objects.findIndex(obj => obj.objectId === objectId);
        
        if (index !== -1) {
            objects[index] = {
                ...objects[index],
                objectData: { ...objects[index].objectData, ...objectData },
                updatedAt: new Date().toISOString()
            };
            localStorage.setItem(`crm_${objectType}`, JSON.stringify(objects));
            return objects[index];
        }
        throw new Error('Objeto no encontrado');
    },
    
    // Simular trickleDeleteObject
    async deleteObject(objectType, objectId) {
        const objects = this.getObjects(objectType);
        const filteredObjects = objects.filter(obj => obj.objectId !== objectId);
        localStorage.setItem(`crm_${objectType}`, JSON.stringify(filteredObjects));
    },
    
    // Método auxiliar para obtener objetos
    getObjects(objectType) {
        const stored = localStorage.getItem(`crm_${objectType}`);
        return stored ? JSON.parse(stored) : [];
    }
};

// Definir funciones globales para compatibilidad
window.trickleCreateObject = LocalStorage.createObject.bind(LocalStorage);
window.trickleListObjects = LocalStorage.listObjects.bind(LocalStorage);
window.trickleGetObject = LocalStorage.getObject.bind(LocalStorage);
window.trickleUpdateObject = LocalStorage.updateObject.bind(LocalStorage);
window.trickleDeleteObject = LocalStorage.deleteObject.bind(LocalStorage);

// Definir reportError globalmente
window.reportError = function(error) {
    console.error('Error reportado:', error);
};
