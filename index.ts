import express from "express";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";
import router from "./routes";

const app = express();

app.use(morgan("dev"));
app.use(cors());
app.use(helmet({ contentSecurityPolicy: false }));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hey there");
});

app.use(router);

app.listen(3000, () => console.log(`🚀 Server ready at: http://localhost:3000`));
