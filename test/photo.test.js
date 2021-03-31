import app from '../src/index';
import request from 'supertest';
import httpStatus from 'http-status';

describe('GET /user/login', () => {
  test('should return message "OK"', () => {
    return request(app).get('/user/login').expect(httpStatus.NOT_FOUND);
  });
});
