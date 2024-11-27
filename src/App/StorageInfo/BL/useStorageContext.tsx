import React, { createContext, useContext } from 'react';

// Создаем контекст
const StorageContext = createContext<any>(null);

// Хук для использования контекста
export const useMyContext = () => {
    return useContext(StorageContext);
};

export default StorageContext;