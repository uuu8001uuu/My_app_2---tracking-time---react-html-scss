let startTime;
let elapsedTime = 0;
  
startTime = Date.now() - elapsedTime;



function timeToString(time) {
    const diffInHrs = time / 3600000;
    const hh = Math.floor(diffInHrs);
  
    const diffInMin = (diffInHrs - hh) * 60;
    const mm = Math.floor(diffInMin);
  
    const diffInSec = (diffInMin - mm) * 60;
    const ss = Math.floor(diffInSec);
  
    const formattedHH = hh.toString().padStart(2, "0");
    const formattedMM = mm.toString().padStart(2, "0");
    const formattedSS = ss.toString().padStart(2, "0");
  
    console.log(`${formattedHH}:${formattedMM}:${formattedSS}`);
  }
  
setInterval(function printTime() {
    elapsedTime = Date.now() - startTime;
    console.log('elapsedTime===', elapsedTime)
    timeToString(elapsedTime);
}, 1000);
  



