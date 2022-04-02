const puppeteer = require('puppeteer')

describe('Mi Primer Test en Puppeteer',()=> {
    it('Debe de abrir y cerrar el navegador', async() => {
        const browser = await puppeteer.launch({
            headless: false,
            slowMo: 0,
            devtools: false,
            /* defaultViewport:{
                width: 2100,
                height: 1080
            } */
            /* args: ['--window-size=1920,1080']//tamaño de la ventana */
            defaultViewport: null
        })

        const page = await browser.newPage()
        await page.goto('https://mbrain.co')
        await page.waitForTimeout(5000)
        //Esperar por un selector
        await page.waitForSelector('img')
        //Recargar la Pagina
        await page.reload()
        await page.waitForSelector('img')

        //Navegar a otro sitio
        await page.goto('https://platzi.com')
        await page.waitForSelector('#home-public > div > div.BaseLayout > header > nav > div.Logo > div > a > div > figure:nth-child(1) > img')

        //Navegar hacia atras
        await page.goBack()        
        //Navegar hacia andelante
        await page.goForward()
        
        //Abrir otra pagina
        const page2 = await browser.newPage()
        await page2.goto('https://smart.mbrain.co')
        await page2.waitForTimeout(2000)


        await browser.close()
    }, 30000)
})