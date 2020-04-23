var clock = function* () {
    let k = false
    while (true) {
        k = true;
        console.log(k,'Tick!');
        yield;
        k = false;
        console.log(k, 'Tock!');
        yield;
    }
  };

  let c = clock();
setInterval(() => {
    c.next();
}, 1000);