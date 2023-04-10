const router = require("express").Router();
const { asyncErrorHandler } = require("./utils");
const prisma = require("../prisma/prisma");

router.get(
  "/",
  asyncErrorHandler(async (req, res, next) => {
    const orders = await prisma.documents.findMany();
    res.send(orders);
  })
);

router.get(
  "/me",
  asyncErrorHandler(async (req, res, next) => {
    const myOrders = await prisma.documents.findMany({
      where: { userId: req.user.id },
    });

    res.send(myFiles);
  })
);

router.get(
  "/:documentId",
  asyncErrorHandler(async (req, res, next) => {
    const singleFile = await prisma.documents.findUnique({
      where: {
        id: +req.params.documentId,
      },
    });
    res.send(singleFile);
  })
);

router.post(
  "/",
  asyncErrorHandler(async (req, res, next) => {
    const { userId, name, content } = req.body;
    const createdFile = await prisma.documents.create({
      data: { userId: userId, name: name, content: content },
    });

    res.send(createdFile);
  })
);

module.exports = router;
