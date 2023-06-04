const request = require('supertest');

describe('Testes da API', () => {
    it('Deve retornar o JSON esperado', async () => {
        const res = await request(strapi.server.httpServer).get('/api/students');

        // Verifica se a resposta contém uma string JSON válida
        expect(res.text).not.toBeUndefined();
        expect(() => JSON.parse(res.text)).not.toThrow();

        const responseObj = JSON.parse(res.text);

        expect(responseObj).toEqual({ "data": [{ "id": 1, "attributes": { "Name": "Aluno2", "Email": "aluno1@email.com", "Birthdate": "2001-01-18", "DisabledPerson": false, "createdAt": "2023-06-04T04:50:38.019Z", "updatedAt": "2023-06-04T04:51:06.152Z", "publishedAt": "2023-06-04T04:50:45.440Z" } }, { "id": 2, "attributes": { "Name": "Aluno1", "Email": "aluno1@email.com", "Birthdate": "2001-01-01", "DisabledPerson": false, "createdAt": "2023-06-04T04:51:30.775Z", "updatedAt": "2023-06-04T04:51:34.119Z", "publishedAt": "2023-06-04T04:51:34.112Z" } }], "meta": { "pagination": { "page": 1, "pageSize": 25, "pageCount": 1, "total": 2 } } });
    });
});
