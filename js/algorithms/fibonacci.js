
function Fibonacci1(n) {
    if (n < 2) {
      return n;
    }
    return Fibonacci1(n - 1) + Fibonacci1(n - 2);
}

function Fibonacci2(n, memory = []) {
    if (n < 2) {
      return n;
    }
    if (!memory[n]) {
      memory[n] = Fibonacci(n - 1, memory) + Fibonacci(n - 2, memory);
    }
    return memory[n];
  }


function Fibonacci2(n){
    if(n<=1){
        return n;
    }
    let i = 1;
    let pre = 0;
    let current = 1;
    let result = 0;
    while(i++ < n){
        result = pre + current;
        pre = current;
        current = result;
    }
    return result;
}

console.log(Fibonacci2(10), 'iii')