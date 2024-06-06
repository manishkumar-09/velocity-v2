import prisma from "@repo/db/client";
import bcrypt from "bcrypt";

//creating seed for dummy users

async function main() {
  const john = await prisma.user.upsert({
    where: { phone: "9876543210" },
    update: {},
    create: {
      phone: "9876543210",
      password: await bcrypt.hash("john", 10),
      name: "john",
      email: "john@mail.com",
      Balance: {
        create: {
          amount: 20000,
          locked: 0,
        },
      },

      OnRampTransaction: {
        create: {
          startTime: new Date(),
          status: "Success",
          amount: 20000,
          token: "token1",
          provider: "Axis Bank",
        },
      },
    },
  });
  const tom = await prisma.user.upsert({
    where: { phone: "9876543210" },
    update: {},
    create: {
      phone: "9876543210",
      password: await bcrypt.hash("tom", 10),
      name: "tom",
      email: "tom@mail.com",
      Balance: {
        create: {
          amount: 2000,
          locked: 0,
        },
      },

      OnRampTransaction: {
        create: {
          startTime: new Date(),
          status: "Success",
          amount: 20000,
          token: "token1",
          provider: "Axis Bank",
        },
      },
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (err) => {
    console.log(err);
    await prisma.$connect();
    process.exit(1);
  });
