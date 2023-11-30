const express = require('express');
require('dotenv').config();
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.i9zoefc.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();
    // Send a ping to confirm a successful connection

     const userCollection = client.db("touristGuideDB").collection("users");
    const serviceCollection =client.db('touristGuideDB').collection('service');
    const guideCollection =client.db('touristGuideDB').collection('guide');


     app.get('/users', async (req, res) => {
      const user =req.body;
      const result = await userCollection.insertOne(user);
      res.send(result);
    });

    app.get('/service',async(req,res)=>{
      const cursor = serviceCollection.find();
      const result = await cursor.toArray();
      res.send(result); 
    })

    app.get('/guide',async(req,res)=>{
      const cursor = guideCollection.find();
      const result = await cursor.toArray();
      res.send(result); 
    })


       app.get('/service/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) }

         const result = await serviceCollection.findOne(query);
            res.send(result);
        })







    // await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);






app.get('/',(req,res) =>{
    res.send('guide is running')
})

app.listen(port,()=>{
    console.log(`tourist guide is running on port ${port}`);
})