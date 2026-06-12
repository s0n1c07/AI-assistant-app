import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import DashboardClient from "@/components/DashboardClient";

export default async function DashboardPage() {
  const user = await currentUser();
  if (!user) redirect("/sign-in");

  const firstName = user.firstName || "there";
  const userId = user.id;

  return <DashboardClient firstName={firstName} userId={userId} />;
}
