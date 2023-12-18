import { useEffect } from "react";
import { useRouter } from "next/router";
import { isAdmin } from "../utils/session";

export const useRedirectUnauthorizedUser = (session) => {
  const router = useRouter();
  const isRoleAdmin = isAdmin(session?.user.role);

  useEffect(() => {
    if (!session) {
      router.push("/login?login=signin");

      return;
    }

    if (!isRoleAdmin) {
      router.back();
    }
  }, []);
};
