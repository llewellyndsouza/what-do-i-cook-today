import express from "express";
const router = express.Router();

import { Prisma, PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

router.post("/ingredient", async (req, res) => {
  const ingredient = await prisma.ingredient.create({
    data: {
      name: req.body.name,
    },
  });

  res.json(ingredient);
});

router.get("/ingredient", async (req, res, next) => {
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

router.post("/dish", async (req, res) => {
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

router.get("/dish", async (req, res) => {
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

router.get("/dish/:id", async (req, res) => {
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

export default router;
