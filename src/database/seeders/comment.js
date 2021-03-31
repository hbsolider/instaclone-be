'use strict';

const fakerData = require('./0-fakerData');

const { comment } = fakerData;

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('Comments', [...comment], {});
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('Comments', null, {});
  },
};
