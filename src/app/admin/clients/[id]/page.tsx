import ClientDetails from "@/components/Admin/pages/ClientDetails";

export const metadata = {
  title: "Admin Dashboard | TalkCure",
};

type Props = {
  params: {
    id: string;
  };
};

export default function AdminClientDetails({ params }: Props) {
  const { id } = params;

  return (
    <div>
      <ClientDetails id={id} />
    </div>
  );
}