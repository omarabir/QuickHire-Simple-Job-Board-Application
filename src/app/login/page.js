import { Suspense } from "react";
import Login from "../../components/authPage/login";

export default function LoginPage() {
  return (
    <Suspense>
      <Login />
    </Suspense>
  );
}
