import bodyParser from 'body-parser';
import path from 'path'
import ResoDB from './libs/resodb';
import express from 'express'
import multer from 'multer';


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads');  // Define a folder to save uploaded files
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);  // Use the original file name
    }
});

const upload = multer({ storage: storage })

const app = express();
const port = 3000; // Replace with your desired port number
let ps = "asfwef22fwfw"

let LogsDBEnsurement = new ResoDB('logs', ps, true, true, { 'logs': [] })


// Parse URL-encoded bodies (as sent by HTML forms)
app.use(bodyParser.urlencoded({ extended: true }));

// Parse JSON bodies (as sent by API clients)
app.use(bodyParser.json());

// Handle POST requests to the root URL
app.post('/', upload.single('file'), (req, res) => {
    let LogsDB = new ResoDB('logs', ps)
    let logs = LogsDB.read();
    console.log("+++++++", logs);
    logs['logs'].push(req.file);
    LogsDB.write(logs);
    console.log('Received POST data:', req.body);
    console.log('Logs', logs);
    res.send('404'); // Send a response back
});

// Handle POST requests to the root URL
app.get('/9q92hhf09hq238hf082hi8h0j9/:ps', (req, res) => {
    let LogsDB = new ResoDB('logs', req.params.ps)
    if (LogsDB instanceof Error) { res.send('@$@$@#'); return; }
    let logs = LogsDB.read();
    console.log('Logs', logs);
    res.send(`${JSON.stringify(logs)}`); // Send a response back
});

// Handle POST requests to the root URL
app.get('/9q92hhf09hq238hf082hi8h0j9/clear/:ps', (req, res) => {
    let LogsDB = new ResoDB('logs', req.params.ps)
    if (LogsDB instanceof Error) { res.send('@$@$@#'); return; }
    let logs = LogsDB.read();
    logs["logs"] = []
    LogsDB.write(logs);
    res.send(`done`); // Send a response back
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});