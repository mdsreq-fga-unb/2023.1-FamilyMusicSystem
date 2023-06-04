'use strict';

/**
 * teacher service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::teacher.teacher');
