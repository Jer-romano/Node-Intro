const fs = require('fs');

function cat(path) {
    fs.readFile(path, "utf8", function(err, data) {
        if(err) {
            console.log("Error reading", path, "\n", err);
        }
        console.log(data);
    })
}

if (process.argv) {
    for(let i = 2; i < process.argv.length; i++) {
        cat(process.argv[i]);
    }
}