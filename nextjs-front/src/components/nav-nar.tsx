import Link from "next/link";
import { SearchBar } from "./search-bar";

function NavBar() {
  return (
    <nav className="fixed top-0 w-full border-b">
      <div className="flex items-center justify-between p-4 bg-white text-gray-900 text-sm">
        <Link href="/" className="font-bold">
          Code Commerce
        </Link>
        <div>
          <SearchBar />
        </div>
        <div className="flex items-center gap-4">
          <Link href="/cart">Cart</Link>
          <Link href="/account">User</Link>
          <Link href="/products">Products</Link>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
