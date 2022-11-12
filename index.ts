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
  res.send("Hey there");
});

app.post("/ingredient", async (req, res) => {
  const ingredient = await prisma.ingredient.create({
    data: {
      name: req.body.name,
    },
  });

  res.json(ingredient);
});

app.get("/ingredient", async (req, res, next) => {
  const { searchString, skip, take, orderBy } = req.query;

  const or: Prisma.IngredientWhereInput = searchString
    ? {
        name: { contains: searchString as string },
      }
    : {};

  const ingredients = await prisma.ingredient.findMany({
    where: {
      ...or,
    },
    take: Number(take) || undefined,
    skip: Number(skip) || undefined,
    orderBy: {
      name: "asc",
    },
  });

  res.json(ingredients);
});

app.post("/dish", async (req, res) => {
  const dish = await prisma.dish.create({
    data: {
      name: req.body.name,
      ingredients: {
        connect: req.body.ingredients.map((id: string) => ({ id })),
      },
    },
  });

  res.json(dish);
});

app.get("/dish", async (req, res) => {
  const { searchString, skip, take, orderBy } = req.query;

  const or: Prisma.DishWhereInput = searchString
    ? {
        name: { contains: searchString as string },
      }
    : {};

  const dishes = await prisma.dish.findMany({
    where: {
      ...or,
    },
    take: Number(take) || undefined,
    skip: Number(skip) || undefined,
    orderBy: {
      name: "asc",
    },
  });

  res.json(dishes);
});

app.get("/dish/:id", async (req, res) => {
  const { id } = req.params;

  const dish = await prisma.dish.findUnique({
    where: {
      id,
    },
    include: {
      ingredients: true,
    },
  });

  res.json(dish);
});

app.listen(3000, () => console.log(`🚀 Server ready at: http://localhost:3000`));
