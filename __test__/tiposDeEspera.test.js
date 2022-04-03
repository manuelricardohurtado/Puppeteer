const puppeteer = require('puppeteer')

describe('Tipos de Espera',()=> {
    it('Mostrar todos los diferentes tipos de espera', async() => {
        const browser = await puppeteer.launch({
            headless: false,            
            defaultViewport: null,
            slowMo: 500
        })

        const page = await browser.newPage()
        await page.goto('https://www.platzi.com', { waitUntil: 'networkidle0'})//Espera de carga completa de la pagina

        //Espera Explicita
        //await page.waitForTimeout(5000)

        //Espera por un selector CSS
        //await page.waitForSelector('.LogoHeader-container > figure:nth-child(1) > img:nth-child(1)')

        //Esperar por un XPath
        await page.waitForXPath('//*[@id="home-public"]/div/div[1]/header/nav/div[1]/div/a/div/figure[2]/img')

        //Ir a otra Web
        await page.goto('https://demoqa.com/modal-dialogs', {waitUntil: 'networkidle2'})
        //await page.waitForSelector('#showSmallModal', {visible: true})
        const button = await page.waitForXPath('//*[@id="showSmallModal"]', {visible: true})
        await button.click()
        
        //Esperar por una Funcion
        await page.waitForFunction(() => document.querySelector('#example-modal-sizes-title-sm').innerText === 'Small Modal')

        await page.click('#closeSmallModal')
        await page.waitForFunction(() => !document.querySelector('#example-modal-sizes-title-sm'))

        //Ejemplo para observar el viewport
        const observarResize = page.waitForFunction('window.innerWidth < 100')
        await page.setViewport({width: 50, height:50})

        await observarResize


        await browser.close()
    }, 350000)
})