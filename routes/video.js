const express = require('express')
const router = express.Router()
const videos = require('../metadata')
const fs=require('fs')
// get the metadata of all videos
router.get('/', (req,res)=>{
    res.json({"videos":videos})
})
module.exports = router;

router.get('/:id/data', (req,res)=> {
    const id = parseInt(req.params.id, 10)
    res.json(videos[id])
})
module.exports = router;

router.get('/video/:id', (req, res) => {
    const videoPath = `assets/${req.params.id}.mp4`;
    const videoStat = fs.statSync(videoPath);
    const fileSize = videoStat.size;
    const videoRange = req.headers.range;
    if (videoRange) {
        const parts = videoRange.replace(/bytes=/, "").split("-");
        const start = parseInt(parts[0], 10);
        const end = parts[1]
            ? parseInt(parts[1], 10)
            : fileSize-1;
        const chunksize = (end-start) + 1;
        const file = fs.createReadStream(videoPath, {start, end});
        const head = {
            'Content-Range': `bytes ${start}-${end}/${fileSize}`,
            'Accept-Ranges': 'bytes',
            'Content-Length': chunksize,
            'Content-Type': 'video/mp4',
        };
        res.writeHead(206, head);
        file.pipe(res);
    } else {
        const head = {
            'Content-Length': fileSize,
            'Content-Type': 'video/mp4',
        };
        res.writeHead(200, head);
        fs.createReadStream(videoPath).pipe(res);
    }
});


  router.post('/api/data',(req,res)=>{
    const data = req.body;
  // Convert JSON to plain text
  let text = JSON.stringify(data);
  // Write the text to a file
  fs.writeFileSync('data.txt', text);
  res.send({ message: 'Data received and saved as text' });
  console.log(body);


  });


   router.post('/data',(req,res) => {
    
    var data = req.body.tejas; // your data 
    data=data+"\n";
	console.log("hello got the request"); 
	console.log(data); 
    fs.appendFile(`${__dirname}/BufferTimeLogs/without_cache.txt`, data, function (err) {
        if (err) throw err;
        console.log('Saved!');
      });
    res.status(200).json({ 
		message: "JSON Data received successfully" 
	}); 

   });