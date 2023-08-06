//this page is basically your home. Each file structure will have a page.tsx, kind of like an index.html, exceept this one is the main main main home one.
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row">
          <div className="flex flex-col justify-center items-center" >
            <h1 className="text-5xl text-center font-bold">Free Resume Generator</h1>
            <p className="py-6">
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
            <h3>
                DONE - re-made directory structure
            </h3>
            <h4>
                CURRENTLY - make sure functions work
            </h4>
            <h5>
                FINALLY - clean up code
            </h5>
          </div>
        </div>
      </div>
      <footer className="footer p-10 bg-base-200 text-base-content">
footer will go here lol
      </footer>
    </>
  );
}
