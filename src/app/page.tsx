//this page is basically your home. Each file structure will have a page.tsx, kind of like an index.html, exceept this one is the main main main home one.
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="hero h-30 bg-base-100">
        <div className="hero-content flex-col lg:flex-row">
          <div className="flex flex-col justify-center items-center" >
            <h1 className="text-5xl text-center font-bold">Free Resume Generator</h1>
            <p className="py-6 text-lg">
              Make a new resume fast, easy and free
            </p>
            <div className="w-full flex flex-row items-center justify-center gap-6 md:gap-10">
                <Link href="/new">
                  <button className="btn btn-primary">Get Started</button>
                </Link>
                <Link href="/print">
                  <button className="btn btn-primary">View Preview</button>
                </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
