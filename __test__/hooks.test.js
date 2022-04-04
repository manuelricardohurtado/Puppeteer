const puppeteer = require('puppeteer')

describe('Extraer Información',()=> {

    let browser
    let page

    //Ejecuta todas la pruebas al tiempo y reduce codigo:
    beforeAll(async() => {
        browser = await puppeteer.launch({
            headless: false,            
            defaultViewport: null,
    })

    page = await browser.newPage()
    await page.goto('https://formula1.com', { waitUntil: 'networkidle0'})//Espera de carga completa de la pagina

    }, 350000)

    afterAll(async () => {
        await browser.close()
    })

    

    it('Extraer el titulo de la pagina y la URL', async() => {
               
        const titulo = await page.title()
        const url = await page.url()

        console.log('titulo', titulo)
        console.log('url', url)  
        
    }, 350000)


    it('Extraer la información de un elemento', async() => {
           
        
        //Extraer el texto de un boton con Slector
        await page.waitForSelector('.pitch-link')
        const nombreBoton = await page.$eval('.pitch-link', (button) => button.textContent)
        console.log('nombreBoton', nombreBoton)

        //Extraer el texto de un boton con XPath
        const [button] = await page.$x('//*[@id="globalNav"]/div/div[2]/div[1]/div/a[1]/span')
        const propiedad = await button.getProperty('textContent')
        const texto = await propiedad.jsonValue()
        console.log('texto', texto)

        //Otra forma:
        const texto2 = await page.evaluate((name) => name.textContent, button)
        console.log('texto2', texto2)

        //Tercera Forma de extraer texto del boton:
        const button3 = await page.waitForXPath('//*[@id="globalNav"]/div/div[2]/div[1]/div/a[1]/span')
        const texto3 = await page.evaluate((name) => name.textContent, button3)
        console.log('texto3', texto3)   
        
    }, 350000)

    it('Contar los elementos de una pagina', async() => {
        
            
        //Contar las Imagenes de la pagina
        const images = await page.$$eval('img', (imagenes) => imagenes.length)
        console.log('images', images)

        
    }, 50000)
})