const {a,add} = require('./local-2');
const { a:a2, add:add2} = require('./local-3');//name alias
console.log(add(2,3));
console.log(a);
console.log(add2(2,3,4));
console.log(a2);


//build-in-modules
const path = require("path");
console.log(path.dirname("D:/web development/Next-level-web-dev\Milestone-2/learnig-node/index3.js"));//path dey

console.log(path.parse("D:/web development/Next-level-web-dev\Milestone-2/learnig-node/index3.js"));//path dey root,dir,base,name,extension

console.log(path.join("D:/web development/Next-level-web-dev\Milestone-2/learnig-node/", "local-1.js"));//path dey // D:\web development\Next-level-web-devMilestone-2\learnig-node\local-1.js
