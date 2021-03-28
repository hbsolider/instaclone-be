import app from 'config';
import connectDB from 'config/connectDB';
connectDB();
app.listen(process.env.PORT, () => {
  console.log(`App listen post ${process.env.PORT}`);
});
