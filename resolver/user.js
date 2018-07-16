/**
 * @param {Knex} knex
 * @typedef {import('knex')} Knex
 * @typedef {Object} User
 * @property {number} id
 * @property {string} name
 */
module.exports = function (knex) {
  return {

    /**
     * @param {UserParam}
     * @typedef {Object} UserParam
     * @property {number} id
     * @return {Promise<User>}
     */
    user: async function ({ id }) {
      return knex('user').select().where({ id }).first()
    },

    /**
     * @return {Promise<User[]>}
     */
    users: async function () {
      return knex('user').select()
    },

    /**
     * @param {InsertUserParam}
     * @typedef {Object} InsertUserParam
     * @property {string} name
     * @return {Promise<User[]>}
     */
    insertUser: async function ({ name }) {
      return knex('user').insert({ name }).returning('*')
    },

    /**
     * @param {UpdateUserParam}
     * @typedef {Object} UpdateUserParam
     * @property {number} id
     * @property {string} name
     * @return {Promise<User[]>}
     */
    updateUser: async function ({ id, name }) {
      return knex('user').update({ name }).where({ id }).returning('*')
    },

    /**
     * @param {DeleteUserParam}
     * @typedef {Object} DeleteUserParam
     * @property {number} id
     * @return {Promise<User[]>}
     */
    deleteUser: async function ({ id }) {
      return knex('user').del().where({ id }).returning('*')
    }
  }
}
