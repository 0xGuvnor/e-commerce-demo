import { LoginLink, RegisterLink } from "@kinde-oss/kinde-auth-nextjs";
import Image from "next/image";
import { Dispatch, SetStateAction } from "react";
import Snake1 from "../../public/snake-1.png";
import { buttonVariants } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";

interface Props {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

function LoginModal({ isOpen, setIsOpen }: Props) {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader>
          <Image
            src={Snake1}
            alt="Snake image"
            className="mx-auto mb-2 size-24"
          />
          <DialogTitle className="text-center text-3xl font-bold tracking-tight text-gray-900">
            Log in to continue
          </DialogTitle>
          <DialogDescription className="py-2 text-center text-base">
            <span className="font-medium text-zinc-900">
              Your configuration was saved!
            </span>
            <h4>
              Please log in or create an account to complete your purchase.
            </h4>
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-2 gap-6 divide-gray-200">
          <LoginLink className={buttonVariants({ variant: "outline" })}>
            Login
          </LoginLink>

          <RegisterLink className={buttonVariants({ variant: "default" })}>
            Sign up
          </RegisterLink>
        </div>
      </DialogContent>
    </Dialog>
  );
}
export default LoginModal;
