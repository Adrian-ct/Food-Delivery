import React, { useState } from "react";
import Logo from "../public/img/logo.png";
import Image from "next/image";
import { MdShoppingBasket, MdLogin, MdLogout, MdAdd } from "react-icons/md";
import Avatar from "../public/img/avatar.png";
import { motion } from "framer-motion";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/router";
const Header = (props) => {
  const router = useRouter();
  const { data: session } = useSession();
  const [showMenu, setshowMenu] = useState(false);

  return (
    <header className="fixed z-50 w-screen  p-3 px-4 md:p-6 md:px-16 bg-primary">
      {/*desktop & tablet*/}
      <div className="hidden md:flex items-center justify-between w-full h-full ">
        <div className="flex items-center gap-2">
          <Link href="/">
            <Image
              src={Logo}
              height={60}
              width={60}
              alt="logo"
              className="object-cover cursor-pointer"
            />
          </Link>
          <p className="text-headingColor text-xl font-bold">City</p>
        </div>

        <div className="flex items-center gap-8">
          <motion.ul
            initial={{ opacity: 0, x: 200 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 200 }}
            className="flex items-center gap-8 "
          >
            <li className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer">
              Home
            </li>
            <li className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer">
              Menu
            </li>
            <li className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer">
              About
            </li>
            <li className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer">
              Service
            </li>
          </motion.ul>

          <motion.div
            initial={{ opacity: 0, scale: 0.1 }}
            animate={{ opacity: [0.5, 1, 1], scale: [0.5, 1.5, 1] }}
            exit={{ opacity: 0, scale: 0.1 }}
            transition={{ duration: 0.5 }}
            className="relative flex justify-center items-center"
          >
            <MdShoppingBasket className="text-textColor text-2xl  cursor-pointer" />
            <div className="absolute -top-1 -right-4 w-5 h-5 rounded-full bg-red-500 flex justify-center items-center">
              <p className="text-xs  text-white font-semibold">2</p>
            </div>
          </motion.div>

          <div
            className="relative"
            onClick={() => setshowMenu((show) => !show)}
          >
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 0.6 }}
            >
              <Image
                src={session ? session.user.image : Avatar}
                className="cursor-pointer rounded-full"
                height={40}
                width={40}
                alt="avatar"
              />
            </motion.div>
            {showMenu && (
              <motion.div
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.6 }}
                className="w-40 bg-gray-50 shadow-xl flex flex-col rounded-lg absolute top-12
                 right-0"
              >
                {session ? (
                  <p
                    onClick={() => signOut()}
                    className="px-4 py-2 flex items-center rounded-lg gap-3 cursor-pointer hover:bg-slate-100
              transition-all duration-100 ease-in-out text-textColor text-base"
                  >
                    Logout <MdLogout />
                  </p>
                ) : (
                  <p
                    onClick={() => signIn()}
                    className="px-4 py-2 flex items-center rounded-lg gap-3 cursor-pointer hover:bg-slate-100
              transition-all duration-100 ease-in-out text-textColor text-base"
                  >
                    LogIn <MdLogin />
                  </p>
                )}
                 <p
                 onClick={() => router.push("/AddItem")}
                    href="/add"
                    className="px-4 py-2 flex items-center rounded-lg gap-3 cursor-pointer hover:bg-slate-100
              transition-all duration-100 ease-in-out text-textColor text-base"
                  >
                    Add Item <MdAdd />
                  </p>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/*mobile*/}
      <div className="flex items-center justify-between md:hidden w-full h-full ">
        <motion.div
          initial={{ opacity: 0, scale: 0.1 }}
          animate={{ opacity: [0.5, 1, 1], scale: [0.5, 1.5, 1] }}
          exit={{ opacity: 0, scale: 0.1 }}
          transition={{ duration: 0.5 }}
          className="relative flex justify-center items-center"
        >
          <MdShoppingBasket className="text-textColor text-2xl  cursor-pointer" />
          <div className="absolute -top-1 -right-4 w-5 h-5 rounded-full bg-red-500 flex justify-center items-center">
            <p className="text-xs  text-white font-semibold">2</p>
          </div>
        </motion.div>
        <div className="flex items-center gap-2">
          <Link href="/">
            <Image
              src={Logo}
              height={60}
              width={60}
              alt="logo"
              className="object-cover cursor-pointer"
            />
          </Link>
          <p className="text-headingColor text-xl font-bold">City</p>
        </div>

        <div className="relative" onClick={() => setshowMenu((show) => !show)}>
          <motion.div
            whileTap={{ scale: 0.1 }}
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 0.5 }}
          >
            <Image
              src={session ? session.user.image : Avatar}
              className="cursor-pointer rounded-full"
              height={40}
              width={40}
              alt="avatar"
            />
          </motion.div>

          {showMenu && (
            <motion.div
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              className="w-40 bg-gray-50 shadow-xl flex flex-col rounded-lg absolute top-12
                 right-0"
            >
              <ul className="flex flex-col  ">
                <li className="text-base text-textColor hover:text-headingColor hover:bg-slate-100 duration-100 transition-all ease-in-out cursor-pointer px-4 py-2">
                  Home
                </li>
                <li className="text-base text-textColor hover:text-headingColor hover:bg-slate-100 duration-100 transition-all ease-in-out cursor-pointer px-4 py-2">
                  Menu
                </li>
                <li className="text-base text-textColor hover:text-headingColor hover:bg-slate-100 duration-100 transition-all ease-in-out cursor-pointer px-4 py-2">
                  About
                </li>
                <li className="text-base text-textColor hover:text-headingColor hover:bg-slate-100 duration-100 transition-all ease-in-out cursor-pointer px-4 py-2">
                  Service
                </li>
              </ul>
              {session ? (
                <p
                  onClick={() => signOut()}
                  className="px-4  py-2 flex items-center items- rounded-lg gap-3 cursor-pointer hover:bg-slate-100
              transition-all duration-100 ease-in-out text-textColor text-base"
                >
                  Logout <MdLogout />
                </p>
              ) : (
                <p
                  onClick={() => signIn()}
                  className="px-4 py-2 flex text-blue-600  bg-slate-200 justify-center items-center rounded-lg gap-3 cursor-pointer 
               text-base"
                >
                  LogIn <MdLogin />
                </p>
              )}
              <p
                className="px-4 py-2 flex text-blue-600  bg-slate-200 justify-center items-center rounded-lg gap-3 cursor-pointer 
               text-base"
              >
                Add Item
              </p>
            </motion.div>
          )}
        </div>
      </div>
      {props.children}
    </header>
  );
};

export default Header;
