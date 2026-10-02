import AdminDashboard from "@/components/admin/AdminDashboard";

export const metadata = {
  title: "Admin | CSS AMU",
  robots: { index: false, follow: false },
};

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-6xl px-6 py-16 lg:px-8">
        <AdminDashboard />
      </div>
    </div>
  );
}
