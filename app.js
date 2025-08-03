    // app.js
    const express = require('express');
    const app = express();
    const port = 3000;

    app.use(express.json()); // Enable JSON body parsing

    // Import routes (defined in the next step)
    const userRoutes = require('./routes/users');

    app.get('/', (req, res) => res.status(200).send('OK'));

    
    app.get('/healthz', (req, res) => {
        console.log("health endpoint called");
        res.status(200).send('OK');
      });

    
      
    app.use('/api/users', userRoutes); // Mount user routes under /api/users

    app.listen(port, () => {
        console.log(`Server running on port ${port}`);
    });