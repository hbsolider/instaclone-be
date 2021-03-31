'use strict';

const fakerData = require('./0-fakerData');

const { like } = fakerData;

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('Likes', [...like], {});
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('Likes', null, {});
  },
};
