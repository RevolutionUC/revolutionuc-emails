'use strict';

const assert = require('chai').assert
const Email = require('../')

describe('Email', () => {
  describe('#compileTemplate', () => {
    it('should build html given template data', () => {
      const email = new Email()
      const source = `<p>Hi, {{ name }}!</p>`
      const templateData = { name: 'Foo' }
      const result = email.compileTemplate(source, templateData)
      const expected = `<p>Hi, Foo!</p>`

      assert.equal(result, expected)
    })
  })

  describe('#compileInky', () => {
    it('should generate valid html', () => {
      const email = new Email()
      const source = `<button href="#" class="myClass">Button</button>`
      const result = email.compileInky(source)
      const expected = `<table class="button myClass"><tr><td><table><tr><td><a href="#">Button</a></td></tr></table></td></tr></table>`

      assert.equal(result, expected)
    })
  })

  describe('#compileSass', () => {
    it('should compile sass to css')
  })

  describe('#inlineCss', () => {
    it('should inline css', () => {
      const email = new Email()
      const source = `<style>p { color: red; }</style><div><p>content</p>`
      const result = email.inlineCss(source)
      const expected = `<div><p style="color: red;">content</p></div>`

      assert.equal(result, expected)
    })
  })

  describe('#minifyHtml', () => {
    it('should minify html', () => {
      const email = new Email()
      const source = `<div class="yo">  hello</div>
                      <p>world</p>`
      const result = email.minifyHtml(source)

      assert.equal(result, '<div class="yo">hello</div><p>world</p>')
    })
  })
})
