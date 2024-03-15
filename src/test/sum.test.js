// import {describe, expect, test} from '@jest/globals';
// import {sum} from './sum';

// describe('sum module', () => {
//   test('adds 1 + 2 to equal 3', () => {
//     expect(sum(1, 2)).toBe(3);
//   });
// });
//jest
// const sum = require('./sum');

// test('adds 1 + 2 to equal 3', () => {
//   expect(sum(1, 2)).toBe(3);
// });
//supertest
const request=require('supertest');
const sum=require('./sum');
const { expect } = require('@jest/globals');
describe('Get/',()=>{
  it('responds with 200',async()=>{
    const response=await request(sum).get('/');
    expect(response.statusCode).toBe(200);
  });
  it('responds with"hello word!"',async()=>{
    const response=await request(sum).get('/');
    expect(response.text).toBe("hello world!");
  })
})

