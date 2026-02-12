import api from './api';

const wasteService = {
    getLogs: async () => {
        return [
            { id: 1, weight_kg: 45, category_id: 1, created_at: '2024-02-10T09:00:00' },
            { id: 2, weight_kg: 30, category_id: 2, created_at: '2024-02-10T10:00:00' },
        ];
    },
    createLog: async (logData) => {
        console.log('Mock log created:', logData);
        return { id: Math.random(), ...logData };
    },

    getSchedules: async () => {
        return [
            { id: 1, date: '2024-02-12', time_slot: 'morning', category: 'General', status: 'Upcoming' },
            { id: 2, date: '2024-02-14', time_slot: 'afternoon', category: 'Recyclables', status: 'Upcoming' },
        ];
    },
    createSchedule: async (scheduleData) => {
        console.log('Mock schedule created:', scheduleData);
        return { id: Math.random(), ...scheduleData };
    },
};

export default wasteService;
