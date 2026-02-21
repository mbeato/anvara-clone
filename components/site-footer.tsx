export function SiteFooter() {
  return (
    <footer className="border-t px-4 py-4">
      <div className="flex flex-col items-center gap-1 text-xs text-muted-foreground sm:flex-row sm:justify-between">
        <p>
          Prototype by{" "}
          <span className="font-medium text-foreground">Max Beato</span>
        </p>
        <p className="flex items-center gap-1.5">
          <span>Built with Next.js, Prisma &amp; Vercel</span>
          <span className="text-border">|</span>
          <a
            href="https://linkedin.com/in/maxbeato"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-2 hover:text-foreground transition-colors"
          >
            LinkedIn
          </a>
          <a
            href="https://github.com/maxbeato"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-2 hover:text-foreground transition-colors"
          >
            GitHub
          </a>
        </p>
      </div>
    </footer>
  )
}
