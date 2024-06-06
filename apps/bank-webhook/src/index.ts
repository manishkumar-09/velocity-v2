import express, { Request, Response } from "express";
import prisma from "@repo/db/src";

const app = express();

app.get("/bank-webhook", async (req: Request, res: Response) => {
  //zod validation section need
  const paymentInfo: { token: string; userId: string; amount: number } = {
    token: req.body.token,
    userId: req.body.userId,
    amount: req.body.amount,
  };
  //we will wrap the both the request in the tansactions so both quaries are success only than go forward otherwise
  // send the error response
  try {
    await prisma.$transaction([
      prisma.balance.update({
        where: { userId: paymentInfo.userId },
        data: {
          amount: {
            increment: paymentInfo.amount,
          },
        },
      }),
      //updating the status on OnRamping

      prisma.onRampTransaction.update({
        where: {
          token: paymentInfo.token,
        },
        data: {
          status: "Success",
        },
      }),
    ]);
    res.json({ message: "Captured" });
  } catch (err) {
    console.log(err);
  }
});

app.listen(() => {
  console.log(`Server is listening at 4000`);
});
