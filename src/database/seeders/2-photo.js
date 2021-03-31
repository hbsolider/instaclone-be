'use strict';

const fakerData = require('./0-fakerData');

const { photo } = fakerData;

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('Photos', [...photo], {});
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('Photos', null, {});
  },
};
