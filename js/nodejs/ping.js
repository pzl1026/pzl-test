var ping = require('ping');
const request = require('request');

// const api = 'http://10.30.60.63/usapi?method=get-info';

const pinging = (function () {
    let requestCount = 0;
    let pingCount = 0;
    let hosts = [];
    let hostAlives = [];
    let vlan = '10.30.60.';
    let pingCb = () => {};
    let pingStatusCb = () => {}
    const ipsLength = 256;

    function startPing(vlanIp, opt) {
        pingCb = opt.pingCb;
        pingStatusCb = opt.pingStatusCb;
        vlan = vlanIp;
        for (var i = 1; i < ipsLength; i++) {
            let host = vlan + i;
            hosts.push(host);
        }
        // var hosts = ['192.168.1.1', 'google.com', 'yahoo.com'];
        hosts.forEach(function (host) {
        
            ping.promise.probe(host, {
                timeout: 10,
                // extra: ["-i 2"],
            }).then(function (res) {
                // console.log(host, res, 'isAlive');
                pingCount++;
                if (res.alive) {
                    hostAlives.push(host);
                }
                if (pingCount >= ipsLength - 1) {
                    // console.log(hostAlives, 'hostAlives');
                    requestHostApi(hostAlives[0]);
                }
            });
            // ping.sys.probe(host, function(isAlive){
            //     var msg = isAlive ? 'host ' + host + ' is alive' : 'host ' + host + ' is dead';
            //     console.log(msg);
            //     pingCount++;
            //     if (isAlive) {
            //         hostAlives.push(host);
            //     }
            //     if (pingCount >= 99) {
            //         console.log(hostAlives, 'hostAlives')
            //         requestHostApi(hostAlives[0])
            //     }
            // },{
            //     timeout: 100,
            //     extra: ["-i 2"],
            // });
        });
    }
    
    function requestHostApi(host) {
        if (requestCount == hostAlives.length) {
            return;
        }
        findUseHost(host);
    }
    
    function delayRequest() {
        setTimeout(() => {
            requestCount++;
            requestHostApi(hostAlives[requestCount]);
        }, 100);
    }
    
    function findUseHost(host) {
        return new Promise((resolve) => {
            request
                .get(`http://${host}/usapi?method=get-info`)
                .on('response', function (response) {
                    console.log(host, response.statusCode, 'status') // 200
                    //   console.log(response.headers['content-type']) 
                    delayRequest();
                })
                .on('error', function (err) {
                    console.log(err, 'err'),
                        delayRequest();
                });
        });
    
    }

    return startPing;
})();

pinging('10.30.60.', {
    pingCb: () => {},
    pingStatusCb: () => {}
});


