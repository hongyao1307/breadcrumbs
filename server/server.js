const express = require('express')
const app = express()

var structure = {"root":["home"], "home":["myname"], "myname":["filea.txt", "fileb.txt", "projects"], "projects":["mysupersecretproject"], "mysupersecretproject":["mysupersecretfile"]}

function is_dir(file_name) {
    if((file_name) in structure) {
        return 1 
    } else {
        return 0
    }
}

app.get("/path/:mypath", (req, res) =>{
    let last_path = req.params.mypath.split("/")
    res.json({"children": structure[last_path], "isfile":is_dir(last_path)})
})

app.listen(5000, () => {console.log("server started")})
//npm run dev