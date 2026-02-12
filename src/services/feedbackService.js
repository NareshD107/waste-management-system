import api from './api';

const feedbackService = {
    getFeedbacks: async () => {
        return [
            { id: 1, subject: 'Damaged bin', type: 'complaint', priority: 'high', status: 'open' },
            { id: 2, subject: 'New pickup point', type: 'suggestion', priority: 'medium', status: 'closed' },
        ];
    },
    submitFeedback: async (feedbackData) => {
        console.log('Mock feedback submitted:', feedbackData);
        return { id: Math.random(), ...feedbackData };
    },
};

export default feedbackService;
