import { getAllProperties } from "@/lib/data";

export default async function Home() {
  const properties = await getAllProperties();

  return (
    <div className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center gap-4 p-8">
      <h1 className="text-4xl font-bold tracking-tight">Anvara</h1>
      <p className="text-muted-foreground">Sponsorship Marketplace</p>
      <p className="text-sm text-muted-foreground">
        {properties.length} properties loaded
      </p>
    </div>
  );
}
