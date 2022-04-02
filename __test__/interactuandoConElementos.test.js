const puppeteer = require('puppeteer')

describe('Interactuando Con Elementos',()=> {
    it('Debe de abrir y cerrar el navegador', async() => {
        const browser = await puppeteer.launch({
            headless: false,            
            defaultViewport: null
        })

        const page = await browser.newPage()
        await page.goto('https://demo.guru99.com/test/simple_context_menu.html')

        //Hack para aceptar alerts del navegador(Ventana emergente)
        page.on('dialog', async (dialog) => {
            await page.waitForTimeout(1000)
            await dialog.accept()
        })

        //Click Derecho
        await page.click('.context-menu-one',{ button: 'right', delay: 500 })
        await page.click('.context-menu-one')
        await page.waitForTimeout(1000)
        
        
        //Doble Click
        await page.click('#authentication > button',{ clickCount: 2, delay: 500 })
        await page.waitForTimeout(1000)

        //Navegar a otro sitio
        await page.goto('https://devexpress.github.io/testcafe/example/')
        //Escribir en un Formulario
        await page.type('#developer-name', 'CATHERINE ISABEL', { delay: 100})
        await page.click('#remote-testing')
        await page.click('#tried-test-cafe')        
        await page.select('#preferred-interface', 'JavaScript API')                   
        await page.type('#comments', '¡¡¡Soy Felizmente Casada!!!', { delay: 100 })
        await page.click('#submit-button')
        await page.waitForTimeout(3000)

        await browser.close()
    }, 350000)
})