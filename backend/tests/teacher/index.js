const axios = require('axios');

jest.mock('axios');

describe('Teste API - teachers', () => {
    let url;
    const teacherId = 1;

    beforeEach(() => {
        url = 'https://20231-familymusicsystem-production.up.railway.app/api/teachers';
    });

    test('Deve retornar uma lista de professores', async () => {
        const mockedResponse = {
            status: 200,
            data: {
                data: [
                    {
                        id: teacherId,
                        attributes: {
                            id: teacherId,
                            Name: 'Professor1',
                            Phone: '(61) 123456789',
                            CPF: '123456789',
                            RG: '987654321',
                            Gender: 'male',
                            Instruments: 'Singing',
                            Email: 'professor1@example.com',
                            createdAt: '2023-01-01T00:00:00Z',
                            updatedAt: '2023-01-01T00:00:00Z',
                            publishedAt: '2023-01-01T00:00:00Z',
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

    test('Deve atualizar um professor existente', async () => {
        const updatedTeacherData = {
            id: teacherId,
            Name: 'Novo Nome',
            Phone: '(61) 987654321',
            CPF: '987654321',
            RG: '123456789',
            Gender: 'female',
            Instruments: 'Guitars',
            Email: 'novoemail@example.com',
            createdAt: '2023-01-01T00:00:00Z',
            updatedAt: '2023-06-05T12:00:00Z',
            publishedAt: '2023-01-01T00:00:00Z',
        };

        const mockedResponse = {
            status: 200,
            data: {
                id: teacherId,
                attributes: updatedTeacherData,
            },
        };

        axios.put.mockResolvedValue(mockedResponse);
        const response = await axios.put(`${url}/${teacherId}`, updatedTeacherData);
        expect(response.status).toBe(200);
        expect(response.data).toHaveProperty('id', teacherId);
        expect(response.data.attributes).toEqual(updatedTeacherData);
    });

    test('Deve excluir um professor existente', async () => {
        const mockedResponse = {
            status: 200,
            data: {
                id: teacherId,
            },
        };

        axios.delete.mockResolvedValue(mockedResponse);
        const response = await axios.delete(`${url}/${teacherId}`);
        expect(response.status).toBe(200);
        expect(response.data).toHaveProperty('id', teacherId);
    });
});
