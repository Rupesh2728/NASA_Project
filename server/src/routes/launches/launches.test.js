const request = require('supertest');
const app = require('../../app');

describe('Test GET /launches',()=>{
    test('It should respond with 200 Success',async ()=>{
       const response = await request(app).get('/launches').expect(200);
    //    expect(response.statusCode).toBe(200);
    })

    test('It should catch errors if there are empty fields',()=>{});

    test('It should catch errors when invalid date is send to the server',()=>{})
})

describe('Test POST /launches',()=>{
    test('It should respond with 201 success',async ()=>{
        const response = await request(app).post('/launches').send({
            mission : "USS Enterprise",
            rocket: 'NCC 150',
            target :'Kepler 96F',
            launchDate : 'January 6,2030',
        }).expect('Content-Type',/json/).expect(201);
    })
})