import Link from "next/link";

export default function NotFound() {
  return (
    <section className="relative grid min-h-[80vh] place-items-center overflow-hidden pt-[72px]">
      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(40rem 26rem at 60% 20%, rgba(3,181,231,0.1), transparent 62%)",
        }}
        aria-hidden="true"
      />
      <div className="shell py-24 text-center">
        <p className="hud">Error 404 — Layer not found</p>
        <h1 className="display-xl mt-5 !text-[clamp(4rem,2rem+8vw,9rem)]">
          4<span className="text-gradient">0</span>4
        </h1>
        <p className="lead headline-gap mx-auto max-w-md">
          This layer doesn&apos;t exist — or was merged, flattened, and archived.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Link href="/" className="btn btn-primary">Back to the portfolio</Link>
          <Link href="/contact" className="btn btn-ghost">Contact Subrata</Link>
        </div>
      </div>
    </section>
  );
}
