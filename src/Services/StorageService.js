import { AsyncStorage } from 'react-native';

export const STORAGE_KEYS = {
    EVENTS: 'events.list',
};

class StorageService {
    async getEvents() {
        try {
            return JSON.parse(await AsyncStorage.getItem(STORAGE_KEYS.EVENTS)) || [];
        } catch (error) {
            console.log(error);
        }

        return [];
    }

    async setEvents(events) {
        try {
            AsyncStorage.setItem(STORAGE_KEYS.EVENTS, JSON.stringify(events));
        } catch (error) {
            console.log(error);
        }
    }
}

export default new StorageService();