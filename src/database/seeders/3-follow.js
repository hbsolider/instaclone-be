'use strict';

const fakerData = require('./0-fakerData');

const { follow } = fakerData;

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('Follows', [...follow], {});
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('Follows', null, {});
  },
};
