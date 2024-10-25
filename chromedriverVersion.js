const { exec } = require('child_process');
const fs = require('fs');

function getChromeVersion() {
    return new Promise((resolve, reject) => {
        exec('reg query "HKEY_CURRENT_USER\\Software\\Google\\Chrome\\BLBeacon" /v version', (error, stdout, stderr) => {
            if (error) {
                reject(error);
            } else {
                const matches = stdout.match(/\d+\.\d+\.\d+\.\d+/);
                const version = matches ? matches[0] : 'Version not found';
                resolve(version);
            }
        });
    });
}

async function main() {
    try {
        const chromeVersion = await getChromeVersion();
        console.log(`Chrome version: ${chromeVersion}`);
        const content = `Chrome version: ${chromeVersion}`
        fs.writeFile('LATEST_RELEASE', chromeVersion, 'utf8', (error) => {
            if (error) {
                console.error('Error writing to file:', error);
            } else {
                console.log('Content has been written to the file.');
            }
        });
    } catch (error) {
        console.error('Error:', error);
    }
}

main();