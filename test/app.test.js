const app = require('../app');
const expect = require('chai').expect;

const request = require('supertest');

describe('Playstore API', () => {
    describe('GET /apps', () => {
        it('Returns an array', () => {
            return request(app)
                .get('/apps')
                .expect(200)
                .then(res => {
                    expect(res.body).to.be.an('array');
                });
        });
        it('GET /apps returns sorted array of ratings in descending order', () => {
            return request(app)
                .get('/apps')
                .query({sorting: "Rating"})
                .expect(200)
                .expect('Content-Type', /json/)
                .then(res => {
                    expect(res.body).to.be.an('array'); 
                    let i = 0;
                    let sorted = true;
                    while (sorted && i < res.body.length - 1){
                        sorted = sorted && res.body[i].Rating <= res.body[i + 1].Rating
                        i++;
                    }
                    
                    expect(sorted).to.be.true;
                });
        });
    });

    
})