const util = require('util');
const exec = util.promisify(require('child_process').exec);

async function lsExample() {
//   const { stdout, stderr } = await exec('wmic LogicalDisk where \"Caption=\'C:\'\" get FreeSpace/value');
  const { stdout, stderr } = await exec('df -h');

  console.log('stdout:', stdout);

  console.log(Math.floor(stdout.split('=')[1]));
  console.log('stderr:', stderr);
}

  function Uint8ArrayToString(fileData){
    var dataString = "";
    for (var i = 0; i < fileData.length; i++) {
      dataString += String.fromCharCode(fileData[i]);
    }
   
    return dataString
  
  }
lsExample();