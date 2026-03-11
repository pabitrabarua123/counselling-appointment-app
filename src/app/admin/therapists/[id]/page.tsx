import TherapistDetails from "@/components/Admin/pages/TherapistDetails";

export const metadata = {
  title: "Admin Dashboard | TalkCure",
};

type Props = {
  params: Promise<{ id: string }>
};

export default async function AdminTherapistDetails({ params }: Props) {
  const { id } = await params;

  return (
    <div>
      <TherapistDetails id={id} />
    </div>
  );
}