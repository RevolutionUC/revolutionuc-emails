'use strict'

require('dotenv').config()

const assert = require('chai').assert
const Email = require('../')

describe('Email', () => {
  describe('#sendMail', () => {
    it('should return data when no emails are given', (done) => {
      const email = new Email()
      email.build('welcome', { subject: 'Test email', shortDescription: 'Simple test email...' })
        .then(result => {
          assert.ok(result.text)
          assert.ok(result.html)
          done()
        })
        .catch(error => {
          throw new Error(error)
        })
    })
  })
})
