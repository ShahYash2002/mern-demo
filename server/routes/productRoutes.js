const express = require('express');
const puppeteer = require('puppeteer');
const Product = require('../models/Product');

const router = express.Router();

// Function to fetch product details from Flipkart
async function fetchFlipkartProduct(url) {
    let browser;
    try {
        browser = await puppeteer.launch({ headless: true });
        const page = await browser.newPage();
        await page.goto(url, { waitUntil: 'networkidle2' });

        const title = await page.$eval('span.VU-ZEz', el => el.innerText); // Ensure this is the correct class
        const price = await page.$eval('div.Nx9bqj.CxhGGd', el => el.innerText.replace('₹', '').replace(',', '')); // Ensure this is the correct class
        const description = await page.$eval('div.Xbd0Sd', el => el.innerText) ; // Ensure this is the correct class
        const imageUrl = await page.$eval('img.DByuf4.IZexXJ.jLEJ7H', el => el.src); // Ensure this is the correct class
   
        return {
            title,
            price: parseFloat(price),
            description,
            imageUrl,
        };
    } catch (error) {
        console.error('Error fetching product data:', error.message);
        throw new Error('Unable to fetch product data. Please check the provided URL.');
    } finally {
        if (browser) {
            await browser.close();
        }
    }
}


// Route to fetch product
router.post('/fetch-product', async (req, res) => {
    const { url } = req.body;

    // Basic URL validation
    if (!url || typeof url !== 'string' || !url.startsWith('http')) {
        return res.status(400).json({ error: 'Invalid URL provided.' });
    }

    try {
        const productData = await fetchFlipkartProduct(url);

        let product = await Product.findOne({ url });

        if (!product) {
            product = new Product({
                url,
                title: productData.title,
                description: productData.description,
                imageUrl: productData.imageUrl,
                currentPrice: productData.price,
                priceHistory: [{ price: productData.price, date: new Date() }],
            });
        } else {
            product.priceHistory.push({ price: productData.price, date: new Date() });
        }

        await product.save();
        res.json(product);
    } catch (error) {
        console.error('Error in fetch-product route:', error.message);
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
