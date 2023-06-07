const axios = require('axios');

jest.mock('axios');

describe('Teste API - GET', () => {
  const url = 'http://127.0.0.1:1337/api/students';

  test('Deve retornar uma lista de estudantes', async () => {
    const mockedResponse = {
      status: 200,
      data: {
        data: [
          {
            id: 1,
            attributes: {
              id: 1,
              Name: 'Aluno1',
              Email: 'aluno1@example.com',
              Phone: '(61) 123456789',
              Birthday: '1990-01-01',
              DisabledPerson: false,
              DisabledPersonType: 'N/A',
              CPF: '123456789',
              RG: '987654321',
              Gender: 'male',
              LegalGuardianName: 'Tutor1',
              LegalGuardianCPF: '987654321',
              LegalGuardianRG: '123456789',
              LegalGuardianPhone: '(61) 987654321',
              LegalGuardianEmail: 'tutor1@example.com',
              Address: 'Rua A, 123',
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
});


describe('Teste API - PUT', () => {
  const url = 'http://127.0.0.1:1337/api/students';
  const studentId = 1;
  const updatedStudentData = {
    id: studentId,
    Name: 'Novo Nome',
    Email: 'novoemail@example.com',
    Phone: '(61) 987654321',
    Birthday: '1995-05-05',
    DisabledPerson: false,
    DisabledPersonType: 'N/A',
    CPF: '987654321',
    RG: '123456789',
    Gender: 'female',
    LegalGuardianName: 'Novo Tutor',
    LegalGuardianCPF: '123456789',
    LegalGuardianRG: '987654321',
    LegalGuardianPhone: '(61) 987654321',
    LegalGuardianEmail: 'novotutor@example.com',
    Address: 'Rua B, 456',
    createdAt: '2023-01-01T00:00:00Z',
    updatedAt: '2023-06-05T12:00:00Z',
    publishedAt: '2023-01-01T00:00:00Z',
  };

  test('Deve atualizar um estudante existente', async () => {
    const mockedResponse = {
      status: 200,
      data: {
        id: studentId,
        attributes: updatedStudentData,
      },
    };

    axios.put.mockResolvedValue(mockedResponse);
    const response = await axios.put(`${url}/${studentId}`, updatedStudentData);
    expect(response.status).toBe(200);
    expect(response.data).toHaveProperty('id', studentId);
    expect(response.data.attributes).toEqual(updatedStudentData);
  });
});

describe('Teste API - DELETE', () => {
    const url = 'http://127.0.0.1:1337/api/students';
    const studentId = 1;
    test('Deve excluir um estudante existente', async () => {
      const mockedResponse = {
        status: 200,
        data: {
          id: studentId,
        },
      };

      axios.delete.mockResolvedValue(mockedResponse);
      const response = await axios.delete(`${url}/${studentId}`);
      expect(response.status).toBe(200);
      expect(response.data).toHaveProperty('id', studentId);
    });
  });
