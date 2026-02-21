import { getAllProperties } from "@/lib/data";

export default async function LandingPage() {
  const properties = await getAllProperties();

  return (
    <main className="min-h-screen bg-background">
      {/* Landing page sections will be assembled in 06-05 */}
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-muted-foreground">
          Landing page — {properties.length} properties loaded
        </p>
      </div>
    </main>
  );
}
