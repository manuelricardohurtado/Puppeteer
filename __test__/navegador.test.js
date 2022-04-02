const puppeteer = require('puppeteer')

describe('Mi Primer Test en Puppeteer',()=> {
    it('Debe de abrir y cerrar el navegador', async() => {
        const browser = await puppeteer.launch({
            headless: false
        })

        const page = await browser.newPage()
        await page.goto('https://mbrain.co')
        await page.waitForTimeout(5000)
        await browser.close()
    }, 10000)
})