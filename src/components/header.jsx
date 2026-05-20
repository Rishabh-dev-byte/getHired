import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  SignedIn,
  SignedOut,
  UserButton,
  SignIn,
  useUser,
} from "@clerk/clerk-react";
import { Button } from "./ui/button";
import { BriefcaseBusiness, Heart, PenBox } from "lucide-react";
import { ModeToggle } from "./mode-toggle.jsx";

const Header = () => {
  const [showSignIn, setShowSignIn] = useState(false);
  const [search, setSearch] = useSearchParams();
  const { user } = useUser();

  // Open modal if ?sign-in=true is present
  useEffect(() => {
    if (search.get("sign-in") === "true") {
      setShowSignIn(true);
    } else {
      setShowSignIn(false);
    }
  }, [search]);

  // Lock scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = showSignIn ? "hidden" : "auto";
  }, [showSignIn]);

  const closeModal = () => {
    setShowSignIn(false);
    search.delete("sign-in");
    setSearch(search);
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  return (
    <>
      <nav className="py-4 flex justify-between items-center">
        <Link to="/">
          <img src="/logo.svg" className="h-20" alt="Hirrd Logo" />
        </Link>

        <div className="flex items-center gap-6">
          <ModeToggle />

          <SignedOut>
            <Button
              variant="outline"
              onClick={() => setShowSignIn(true)}
            >
              Login
            </Button>
          </SignedOut>

          <SignedIn>
            {user?.unsafeMetadata?.role === "recruiter" && (
              <Link to="/post-job">
                <Button variant="destructive" className="rounded-full">
                  <PenBox size={18} className="mr-2" />
                  Post a Job
                </Button>
              </Link>
            )}

            <UserButton
              appearance={{
                elements: {
                  avatarBox: "w-10 h-10",
                },
              }}
            >
              <UserButton.MenuItems>
                <UserButton.Link
                  label="My Jobs"
                  labelIcon={<BriefcaseBusiness size={15} />}
                  href="/my-jobs"
                />
                <UserButton.Link
                  label="Saved Jobs"
                  labelIcon={<Heart size={15} />}
                  href="/saved-jobs"
                />
                <UserButton.Action label="manageAccount" />
              </UserButton.MenuItems>
            </UserButton>
          </SignedIn>
        </div>
      </nav>

      {/* Sign In Modal */}
      {showSignIn && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
          onClick={handleOverlayClick}
        >
          <div className="bg-white dark:bg-gray-900 p-4 rounded-xl shadow-lg">
            <SignIn
              signUpForceRedirectUrl="/onboarding"
              fallbackRedirectUrl="/onboarding"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Header;