import puppeteer from 'puppeteer';
import { FingerprintInjector } from 'fingerprint-injector';
import { FingerprintGenerator } from 'fingerprint-generator'
import fs from 'fs'

let fingerprintGenerator = new FingerprintGenerator()

let arr = []

for (let i = 0; i < 50000; i++) {
    arr.push(fingerprintGenerator.getFingerprint())
}

// Save the array to a file as json
fs.writeFile('fingerprint.json', JSON.stringify(arr), (err) => {
    if (err) {
        throw err;
    }
    console.log("JSON data is saved.");
});




// (async () => {
//     const browser = await puppeteer.launch({
//         headless: false,
//     });
//
//
//     let fingerPrintInjector = new FingerprintInjector()
//     let fingerPrintGenerator = new FingerprintGenerator()
//
//     const fingerprint = fingerPrintGenerator.getFingerprint()
//     console.log(fingerprint)
//
//     const page = await browser.newPage()
//
//     await fingerPrintInjector.attachFingerprintToPuppeteer(page, fingerprint)
//
//     // ... your code using `page` here
//     await page.goto('https://sarpsahinalp.github.io/fingerprint-frontend/');
// })();