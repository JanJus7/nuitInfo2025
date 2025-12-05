"use client"; 
import Link from "next/link";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import AdbIcon from "@mui/icons-material/Adb";

export default function Header() {
  return (
    <AppBar position="static" color="primary" enableColorOnDark>
      <Toolbar className="flex items-center px-6 w-full">

        {/* LEFT */}
        <AdbIcon />

        {/* RIGHT */}
        <div className="flex gap-6 ml-auto">
          <Link href="/" className="no-underline text-white">
            <Typography variant="h6">Home</Typography>
          </Link>

          <Link href="/page1" className="no-underline text-white">
            <Typography variant="h6">About</Typography>
          </Link>

          <Link href="/page2" className="no-underline text-white">
            <Typography variant="h6">Contact</Typography>
          </Link>

          <Link href="/page3" className="no-underline text-white">
            <Typography variant="h6">Products</Typography>
          </Link>
        </div>

      </Toolbar>
    </AppBar>
  );
}
