import ClientDetails from "@/components/Admin/pages/ClientDetails";

export const metadata = {
  title: "Admin Dashboard | TalkCure",
};

type Props = {
  params: Promise<{ id: string }>;
};

export default async function AdminClientDetails({ params }: Props) {
  const { id } = await params;

  return (
    <div>
      <ClientDetails id={id} />
    </div>
  );
}