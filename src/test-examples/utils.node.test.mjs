import { test, describe } from 'node:test'
import assert from 'node:assert'
import { cn } from '../lib/utils.js'

describe('Utils Test', () => {
  test('cn function merges classes correctly', () => {
    const result = cn('text-red-500', 'text-blue-500')
    assert.strictEqual(result, 'text-blue-500')
  })

  test('cn function handles conditional classes', () => {
    const isActive = true
    const result = cn('base-class', isActive && 'active-class')
    assert.strictEqual(result, 'base-class active-class')
  })

  test('cn function handles undefined and null values', () => {
    const result = cn('base-class', undefined, null, 'another-class')
    assert.strictEqual(result, 'base-class another-class')
  })

  test('cn function deduplicates classes', () => {
    const result = cn('p-4', 'p-2')
    assert.strictEqual(result, 'p-2')
  })

  test('cn function handles empty input', () => {
    const result = cn()
    assert.strictEqual(result, '')
  })

  test('cn function handles array of classes', () => {
    const result = cn(['class1', 'class2'], 'class3')
    assert.strictEqual(result, 'class1 class2 class3')
  })
})
