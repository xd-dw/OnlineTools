const http = require('http');


exports.beautifyJson = function (options) {
    var jsonStr = options.jsonStr || '';

    const opts = {
        hostname: 'localhost',
        port: 9080,
        path: '/tools/json/beautify/',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(jsonStr)
        }
    };

    let data = '';
    const req = http.request(opts, (res) => {
        console.log(`STATUS: ${res.statusCode}`);
        console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
        if (res.statusCode !== 200) {
            console.error(`Did not get an OK from the server. Code: ${res.statusCode}`);
            res.resume();
            return;
        }

        res.setEncoding('utf8');
        res.on('data', (chunk) => {
            console.log(`BODY: ${chunk}`);
            data += chunk;
        });
        res.on('end', () => {
            // this.getEl('ar2').value = data;
            console.log('No more data in response.');
        });
    });

    req.on('error', (e) => {
        console.error(`problem with request: ${e.message}`);
    });

    // Write data to request body
    req.write(jsonStr);
    req.end();

    return new Promise((resolve, reject) => {
        setTimeout(function () {
            resolve(data);
        }, 1000);
    });
};