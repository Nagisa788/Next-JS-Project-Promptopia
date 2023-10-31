"use client";

import Link from "next/link"; //this will allow us to move to other locations of our application
import Image from "next/image"; //will automatically optimize the images for us
import { useState, useEffect } from "react";
import { signIn, signOut, getProviders, useSession } from "next-auth/react";

const Nav = () => {
  const { data: session } = useSession();

  // initializing providers
  const [providers, setProviders] = useState(null);
  const [toggleDropDown, setToggleDropDown] = useState(false);

  useEffect(() => {
    const setAllProviders = async () => {
      const response = await getProviders();
      setProviders(response);
    };
    setAllProviders();
  }, []);

  console.log(session, providers, "providers");

  return (
    <nav className="flex-between w-full mb-16 pt-3">
      <Link href="/" className="flex flex-center gap-2">
        <Image
          src="/assets/images/logo.svg"
          width={30}
          height={30}
          alt="Promptopia Logo"
          className="object-contain"
        />
        <p className="logo_text">Promptopia</p>
      </Link>

      {/* Desktop Navigation */}
      <div className="sm:flex hidden">
        {session?.user ? (
          <div className="flex gap-3 md:gap-5">
            <Link href="/create-prompt" className="black_btn">
              Create Post
            </Link>
            <button type="button" onClick={signOut} className="outline_btn">
              Sign Out
            </button>

            <Link href="/profile">
              <Image
                src={session?.user?.image}
                width={37}
                height={37}
                className="rounded-full"
                alt="profile"
              />
            </Link>
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type="button"
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                  className="black_btn"
                >
                  Sign In
                </button>
              ))}
          </>
        )}
      </div>

      {/* Mobile Navigation */}
      <div className="sm:hidden flex relative">
        {session?.user ? (
          <div>
            <Image
              src={session?.user?.image}
              width={37}
              height={37}
              className="rounded-full cursor-pointer"
              alt="profile"
              onClick={() => setToggleDropDown((prev) => !prev)}
            />

            {toggleDropDown && (
              <div className="dropdown">
                <Link
                  href="/profile"
                  className="dropdown_link"
                  onClick={() => toggleDropDown(false)}
                >
                  My Profile
                </Link>

                <Link
                  href="/create-prompt"
                  className="dropdown_link"
                  onClick={() => toggleDropDown(false)}
                >
                  Create Prompt
                </Link>
                <button
                  type="button"
                  className="black_btn w-full mt-5"
                  onClick={() => {
                    setToggleDropDown(false);
                    signOut();
                  }}
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type="button"
                  key={provider.name}
                  onClick={(e) => signIn(provider.id)}
                  className="black_btn"
                >
                  Sign In
                </button>
              ))}
          </>
        )}
      </div>
    </nav>
  );
};

export default Nav;
