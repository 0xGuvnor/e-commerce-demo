import StatusDropdown from "@/components/status-dropdown";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import prisma from "@/lib/db";
import { formatPrice, getDateAgo } from "@/utils/helpers";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { notFound } from "next/navigation";

const WEEKLY_GOAL = 500;
const MONTHLY_GOAL = 2500;

interface Props {}

async function DashboardPage({}: Props) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user || user.email !== process.env.ADMIN_EMAIL!) {
    return notFound();
  }

  const orders = await prisma.order.findMany({
    where: {
      isPaid: true,
      createdAt: {
        gte: new Date(new Date().setDate(new Date().getDate() - 7)),
      },
    },
    orderBy: { createdAt: "desc" },
    include: { user: true, shippingAddress: true },
  });

  const lastWeekRev = await prisma.order.aggregate({
    where: {
      isPaid: true,
      createdAt: {
        gte: getDateAgo(7),
      },
    },
    _sum: { amonut: true },
  });

  const lastMonthRev = await prisma.order.aggregate({
    where: {
      isPaid: true,
      createdAt: {
        gte: getDateAgo(30),
      },
    },
    _sum: { amonut: true },
  });

  return (
    <div className="flex min-h-screen w-full bg-muted/40">
      <div className="mx-auto flex w-full max-w-7xl flex-col sm:gap-4 sm:py-4">
        <div className="flex flex-col gap-16">
          <div className="grid gap-4 sm:grid-cols-2">
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Last Week</CardDescription>
                <CardTitle className="text-4xl">
                  {formatPrice(lastWeekRev._sum.amonut ?? 0)}
                </CardTitle>
              </CardHeader>

              <CardContent>
                <div className="text-sm text-muted-foreground">
                  of {formatPrice(WEEKLY_GOAL)} goal
                </div>
              </CardContent>

              <CardFooter>
                <Progress
                  value={((lastWeekRev._sum.amonut ?? 0) / WEEKLY_GOAL) * 100}
                />
              </CardFooter>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Last Month</CardDescription>
                <CardTitle className="text-4xl">
                  {formatPrice(lastMonthRev._sum.amonut ?? 0)}
                </CardTitle>
              </CardHeader>

              <CardContent>
                <div className="text-sm text-muted-foreground">
                  of {formatPrice(MONTHLY_GOAL)} goal
                </div>
              </CardContent>

              <CardFooter>
                <Progress
                  value={((lastMonthRev._sum.amonut ?? 0) / MONTHLY_GOAL) * 100}
                />
              </CardFooter>
            </Card>
          </div>

          <h1 className="text-4xl font-bold tracking-tight">Incoming orders</h1>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Customer</TableHead>
                <TableHead className="hidden sm:table-cell">Status</TableHead>
                <TableHead className="hidden sm:table-cell">
                  Purchase Date
                </TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id} className="bg-accent">
                  <TableCell>
                    <div className="font-medium">
                      {order.shippingAddress?.name}
                    </div>
                    <div className="hidden text-sm text-muted-foreground md:block">
                      {order.user.email}
                    </div>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    <StatusDropdown id={order.id} orderStatus={order.status} />
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {order.createdAt.toLocaleDateString()}
                  </TableCell>
                  <TableCell className="text-right">
                    {formatPrice(order.amonut)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
export default DashboardPage;
