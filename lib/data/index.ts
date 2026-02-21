import prisma from "../prisma";

export async function getProperty(id: string) {
  return prisma.property.findUnique({
    where: { id },
    include: { packages: true },
  });
}

export async function getPropertyBySlug(slug: string) {
  return prisma.property.findUnique({
    where: { slug },
    include: { packages: true },
  });
}

export async function getAllProperties() {
  return prisma.property.findMany({
    include: { packages: true },
    orderBy: { createdAt: "desc" },
  });
}

export async function getFeaturedProperties() {
  return prisma.property.findMany({
    where: { featured: true },
    include: { packages: true },
    orderBy: { createdAt: "desc" },
  });
}

export async function getThreads() {
  return prisma.thread.findMany({
    include: {
      messages: { orderBy: { createdAt: "asc" } },
      offers: { orderBy: { createdAt: "desc" } },
      property: true,
    },
    orderBy: { createdAt: "desc" },
  });
}

export async function getThread(id: string) {
  return prisma.thread.findUnique({
    where: { id },
    include: {
      messages: { orderBy: { createdAt: "asc" } },
      offers: { orderBy: { createdAt: "desc" } },
      property: true,
    },
  });
}

export async function filterProperties(filters: {
  category?: string;
  region?: string;
  minPrice?: number;
  maxPrice?: number;
}) {
  return prisma.property.findMany({
    where: {
      ...(filters.category && { category: filters.category }),
      ...(filters.region && { region: filters.region }),
      ...(filters.minPrice !== undefined && {
        priceFrom: { gte: filters.minPrice },
      }),
      ...(filters.maxPrice !== undefined && {
        priceFrom: { lte: filters.maxPrice },
      }),
    },
    include: { packages: true },
    orderBy: { createdAt: "desc" },
  });
}
