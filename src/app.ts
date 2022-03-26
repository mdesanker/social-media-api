import express from "express";
import "dotenv/config";

const app = express();

const PORT = (process.env.PORT as string) || process.env.PORT_DEV;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
