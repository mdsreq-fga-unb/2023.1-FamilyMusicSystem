const axios = require('axios');

jest.mock('axios');

describe('Teste API - classrooms', () => {
    let url;
    const classroomId = 1;

    beforeEach(() => {
        url = 'https://20231-familymusicsystem-production.up.railway.app/api/classroms';
    });

    test('GET - Deve retornar uma lista de salas de aula', async () => {
        const mockedResponse = {
            status: 200,
            data: {
                data: [
                    {
                        id: classroomId,
                        attributes: {
                            id: classroomId,
                            Name: 'Sala A',
                            Capacity: 30,
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

    test('PUT - Deve atualizar uma sala de aula existente', async () => {
        const updatedClassroomData = {
            id: classroomId,
            Name: 'Sala B',
            Capacity: 40,
        };

        const mockedResponse = {
            status: 200,
            data: {
                id: classroomId,
                attributes: updatedClassroomData,
            },
        };

        axios.put.mockResolvedValue(mockedResponse);
        const response = await axios.put(`${url}/${classroomId}`, updatedClassroomData);
        expect(response.status).toBe(200);
        expect(response.data).toHaveProperty('id', classroomId);
        expect(response.data.attributes).toEqual(updatedClassroomData);
    });

    test('DELETE - Deve excluir uma sala de aula existente', async () => {
        const mockedResponse = {
            status: 200,
            data: {
                id: classroomId,
            },
        };

        axios.delete.mockResolvedValue(mockedResponse);
        const response = await axios.delete(`${url}/${classroomId}`);
        expect(response.status).toBe(200);
        expect(response.data).toHaveProperty('id', classroomId);
    });
});
