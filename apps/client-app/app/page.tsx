import { PrismaClient } from "@repo/db/client";
const prisma = new PrismaClient();

export default function Page(): JSX.Element {
  return <div className="bg-red-800">Tailwind is working</div>;
}
