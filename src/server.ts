import connectToDatabase from "./util/dbConnection";
import app from "./app";
const port = 5000;
connectToDatabase();

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
