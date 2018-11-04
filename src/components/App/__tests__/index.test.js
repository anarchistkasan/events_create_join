import React from 'react';
import App from '../index';

jest.mock("~/styles/main.less");

test('trying out test', () => {
  expect(1 + 2).toBe(3);
});