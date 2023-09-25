const fs = require('fs');
const axios = require('axios');

function cat(path) {
    fs.readFile(path, "utf8", function(err, data) {
        if(err) {
            console.log("Error reading", path, "\n", err);
        }
        console.log(data);
    })
}

async function webCat(url) {
    try {
        let res = await axios.get(url);
        console.log(res.data);
        console.log(typeof(res.data));

    } catch(err) {
        console.log("Error fetching", url, "\nERROR:", err['code']);
    }
   
}


if (process.argv) {
    // for(let i = 2; i < process.argv.length; i++) {
    //     cat(process.argv[i]);
    // }

    const arg = process.argv[2];
    if(arg.slice(0, 4) == "http") {
        webCat(arg);
    }
    else {
        cat(arg);
    }
}