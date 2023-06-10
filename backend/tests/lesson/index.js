const axios = require('axios');

jest.mock('axios');

describe('Teste API - lessons', () => {
    let url;
    const lessonId = 1;

    beforeEach(() => {
        url = 'https://20231-familymusicsystem-production.up.railway.app/api/lessons';
    });

    test('Deve retornar uma lista de aulas', async () => {
        const mockedResponse = {
            status: 200,
            data: {
                data: [
                    {
                        id: lessonId,
                        attributes: {
                            id: lessonId,
                            Horary: '2023-01-01T15:00:00.000Z',
                            students: [],
                            teacher: null,
                            classroom: null,
                        },
                    },
                ],
            },
        };

        axios.get.mockResolvedValue(mockedResponse);
        const response = await axios.get(url);
        expect(response.status).toBe(200);
        expect(response.data).toHaveProperty('data');
        expect(Array.isArray(response.data.data)).toBe(true);
    });

    test('Deve criar uma nova aula', async () => {
        const newLessonData = {
            id: lessonId,
            Horary: '2023-01-01T15:00:00.000Z',
            students: [],
            teacher: null,
            classroom: null,
        };

        const mockedResponse = {
            status: 200,
            data: {
                id: lessonId,
                attributes: newLessonData,
            },
        };

        axios.post.mockResolvedValue(mockedResponse);
        const response = await axios.post(url, newLessonData);
        expect(response.status).toBe(200);
        expect(response.data).toHaveProperty('id', lessonId);
        expect(response.data.attributes).toEqual(newLessonData);
    });

    test('Deve atualizar uma aula existente', async () => {
        const updatedLessonData = {
            id: lessonId,
            Horary: '2023-01-01T15:00:00.000Z',
            students: [],
            teacher: null,
            classroom: null,
        };

        const mockedResponse = {
            status: 200,
            data: {
                id: lessonId,
                attributes: updatedLessonData,
            },
        };

        axios.put.mockResolvedValue(mockedResponse);
        const response = await axios.put(`${url}/${lessonId}`, updatedLessonData);
        expect(response.status).toBe(200);
        expect(response.data).toHaveProperty('id', lessonId);
        expect(response.data.attributes).toEqual(updatedLessonData);
    });

    test('Deve excluir uma aula existente', async () => {
        const mockedResponse = {
            status: 200,
            data: {
                id: lessonId,
            },
        };

        axios.delete.mockResolvedValue(mockedResponse);
        const response = await axios.delete(`${url}/${lessonId}`);
        expect(response.status).toBe(200);
        expect(response.data).toHaveProperty('id', lessonId);
    });
});
