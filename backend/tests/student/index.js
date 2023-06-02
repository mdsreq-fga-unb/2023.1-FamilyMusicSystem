const request = require('supertest');
const app = require('../../config/server');

// Dados mock para o teste
const mockStudentData = {
    Name: 'John Doe',
    Email: 'john.doe@example.com',
    Password: '123456',
    Birthdate: '1990-01-01',
    DisabledPerson: false,
    ProfilePicture: null,
};

let studentId;

it('Deve criar um novo estudante', async () => {
    const response = await request(app)
        .post('/students')
        .send(mockStudentData);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    studentId = response.body.id;
});

it('Deve obter um estudante existente', async () => {
    const response = await request(app).get(`/students/${studentId}`);

    expect(response.status).toBe(200);
    expect(response.body.id).toBe(studentId);
    expect(response.body.Name).toBe(mockStudentData.Name);
    // Adicione outras validações conforme necessário
});

it('Deve atualizar um estudante existente', async () => {
    const updatedStudentData = {
        ...mockStudentData,
        Name: 'Jane Smith',
        Email: 'jane.smith@example.com',
        // Outros campos a serem atualizados
    };

    const response = await request(app)
        .put(`/students/${studentId}`)
        .send(updatedStudentData);

    expect(response.status).toBe(200);
    expect(response.body.id).toBe(studentId);
    expect(response.body.Name).toBe(updatedStudentData.Name);
    // Adicione outras validações conforme necessário
});

it('Deve excluir um estudante existente', async () => {
    const response = await request(app).delete(`/students/${studentId}`);

    expect(response.status).toBe(204);

    const verifyResponse = await request(app).get(`/students/${studentId}`);
    expect(verifyResponse.status).toBe(404);
});