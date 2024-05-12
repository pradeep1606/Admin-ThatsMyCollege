import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="container flex flex-col justify-center gap-4 items-center h-screen">
      <span className="text-xl font-bold">ThatMyCollege Admin Dashboard</span>
      <Link className="py-2 px-4 bg-[#b7bac1] text-[#151c2c] font-semibold rounded-md hover:text-[#182237] hover:bg-white" href='/login' >Login</Link>
    </div>
  );
}
