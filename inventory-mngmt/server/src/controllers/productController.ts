import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getProducts = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    //searchbar
    const search = req.query.search?.toString();
    //getting products data
    const products = await prisma.products.findMany({
      // (case for searching certain products if needed if search string not there all products will get fetched)
      where: {
        name: {
          contains: search,
        },
      },
    });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Error fetching Products" });
  }
};
