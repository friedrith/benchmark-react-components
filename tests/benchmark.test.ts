import { test, expect } from '@playwright/test'
import data from '../src/data'
import { addMetrics, getMetrics } from './utils/metrics'

const versions = ['versionA', 'versionB']

test.describe('Benchmark', () => {
  Array.from({ length: 10 }).forEach((_, index) => {
    versions.forEach(version => {
      test(`Get performance metrics ${version} ${index}`, async ({ page }) => {
        const session = await page.context().newCDPSession(page)
        await page.goto(`/?component=${version}`)

        await session.send('Performance.enable')

        await page.screenshot({ path: 'screenshot.png' })

        await page.getByTestId(`start`).isVisible()
        await page.getByTestId('start').click()

        await page.getByTestId(`component-${data.length - 1}`).isVisible()

        await page.getByTestId('rerender').click()
        await page.getByTestId(`component-${data.length}`).isVisible()

        const performanceMetrics = await session.send('Performance.getMetrics')

        addMetrics(version, performanceMetrics.metrics)
      })
    })
  })

  test.afterAll(() => {
    console.log(getMetrics())
  })
})
