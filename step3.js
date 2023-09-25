const fs = require('fs');
const axios = require('axios');

function cat(path, fileToWrite) {
    fs.readFile(path, "utf8", function(err, data) {
        if(err) {
            console.log("Error reading", path, "\n", err);
            process.exit(1);
        }
        if(fileToWrite) {
            outputToFile(fileToWrite, data)
        }
        else console.log(data);
    })
}

function outputToFile(path, content) {
    fs.writeFile(path, content, "utf8", function(err) {
        if(err) {
            console.log("Error writing to", path, "\n", err);
            process.exit(1);
        }
        console.log(`Successfully wrote to ${path}`)
    })
}


async function webCat(url, path) {
    if(url.slice(0, 4) != "http") {
        console.log(`Error: ${url} is not a valid URL`);
        return "ERROR";
    }
    try {
        let res = await axios.get(url);
        if(path) {
            outputToFile(path, res.data)
        }
        else console.log(res.data);
      
          
        
    } catch(err) {
        console.log("Error fetching", url, "\nERROR:", err['code']);
        process.exit(1);
    }
   
}


if (process.argv) {

    if(process.argv[2] == "--out") {
        const fileToWrite = process.argv[3];
        const fileToRead = process.argv[4];

        if(fileToRead.slice(0, 4) == "http") {
            webCat(fileToRead, fileToWrite);
        }
        else {
            cat(fileToRead, fileToWrite);
        }

    }
    else {
        const arg = process.argv[2];
        if(arg.slice(0, 4) == "http") {
            webCat(arg);
        }
        else {
            cat(arg);
        }
    }

}