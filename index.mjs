import express from 'express';
import 'dotenv/config'

const server = express();
const port = 4000;

server.get('/api/image/random', async(req, res)=>{
  console.log();
  // Now i need to make api request to unsplash
  try {
    let request =  `https://api.unsplash.com/photos/random/?client_id=${process.env.UNSPLASH_ACCESS_KEY}`;
    let response = await fetch(request);
    let imgData = {};
    if(response){
      response = await response.json();
      imgData.url = response.urls.regular; 
      imgData.description = response.alt_description; 
      console.log(imgData);
      res.json({'randomImage': imgData});
    }else{
      throw new Error('Unable to fetch data from API, something went wrong!');
    }
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error!"
    })
  }

  
});

server.listen(port, ()=>{
  console.log(`Express server is running at port ${port}`);
});

