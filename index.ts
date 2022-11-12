import { Prisma, PrismaClient } from "@prisma/client";
import express from "express";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";

const prisma = new PrismaClient();
const app = express();

app.use(morgan("dev"));
app.use(cors());
app.use(helmet({ contentSecurityPolicy: false }));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hey");
});

app.get("/feed", async (req, res) => {
  const { searchString, skip, take, orderBy } = req.query;

  const or: Prisma.DishWhereInput = searchString
    ? {
        name: { contains: searchString as string },
      }
    : {};

  const posts = await prisma.dish.findMany({
    where: {
      ...or,
    },
    take: Number(take) || undefined,
    skip: Number(skip) || undefined,
    orderBy: {},
  });

  res.json(posts);
});

app.listen(3000, () => console.log(`🚀 Server ready at: http://localhost:3000`));
