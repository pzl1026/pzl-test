var path = require('path');
var fs = require('fs');
const request = require('request');
const vlan = '10.30.60.';
const api = 'http://10.30.60.63/usapi?method=get-info';
let apis = [];
for (var i = 1; i < 100; i++) {
    let host = vlan + i;
    apis.push(host); 
}
let requestCount = 0;
let sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

function delayRequest(host) {
    console.log(host, 'host')
    request
        .get(`http://${host}/usapi?method=get-info`)
        .on('response', function(response) {
          console.log(item, response.statusCode, 'status') // 200
        //   console.log(response.headers['content-type']) 
            setTimeout(() => {
                requestCount++;
                delayRequest(apis[requestCount]);
            }, 100);
        })
        .on('error', function (err) {
            console.log(err, 'err')
        });
}

delayRequest(apis[0]);

// for (var i = 1; i < apis.length; i++) {
//     request
//     .get(`http://${item}/usapi?method=get-info`)
//     .on('response', function(response) {
//       console.log(item, response.statusCode, 'status') // 200
//     //   console.log(response.headers['content-type']) 
//     })
// }

// apis.forEach(item => {
//     try{
//         request
//         .get(`http://${item}/usapi?method=get-info`)
//         .on('response', function(response) {
//           console.log(item, response.statusCode, 'status') // 200
//         //   console.log(response.headers['content-type']) 
//         })
//     } catch(e) {
// console.log(e)
//     }

// })
