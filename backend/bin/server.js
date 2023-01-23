const app = require('../app/index')
const port = 8088;

// Start server
app.listen(port, (req, res) => console.log(`listening on port ${port}`));