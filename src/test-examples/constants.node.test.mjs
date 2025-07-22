import { test, describe } from 'node:test'
import assert from 'node:assert'
import { STORAGE_KEY } from '../utils/constants.js'
import { ROUTES } from '../utils/routes.js'

describe('Constants & Routes Test', () => {
  test('STORAGE_KEY has correct value', () => {
    assert.strictEqual(STORAGE_KEY, 'favoriteCharacters')
    assert.strictEqual(typeof STORAGE_KEY, 'string')
  })

  test('ROUTES has correct internal routes', () => {
    assert.strictEqual(ROUTES.HOME, '/')
    assert.strictEqual(ROUTES.FILMS, '/films')
    assert.strictEqual(ROUTES.CHARACTERS, '/characters')
  })

  test('ROUTES has correct external URLs', () => {
    assert.strictEqual(ROUTES.EXTERNAL.GITHUB_URL, 'https://github.com/thanhhoan-v2/TalentGetGo_Space_Odyssey')
    assert.strictEqual(ROUTES.EXTERNAL.LINKEDIN_URL, 'https://www.linkedin.com/in/phan-dinh-thanh-hoan/')
    assert.strictEqual(ROUTES.EXTERNAL.VERCEL_DOMAIN, 'https://talent-get-go-space-odyssey.vercel.app/')
  })

  test('ROUTES external links have valid URL format', () => {
    const urlPattern = /^https?:\/\/.+/
    assert.match(ROUTES.EXTERNAL.GITHUB_URL, urlPattern)
    assert.match(ROUTES.EXTERNAL.LINKEDIN_URL, urlPattern)
    assert.match(ROUTES.EXTERNAL.VERCEL_DOMAIN, urlPattern)
  })
})
