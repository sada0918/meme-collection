import { signIn } from "@/auth";
import { Button } from "@/components/ui/button";

export default function SignIn() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <form
        action={async () => {
          "use server";
          await signIn("github", { redirectTo: "/admin" });
        }}
      >
        <Button type="submit">Signin with GitHub</Button>
      </form>
    </div>
  );
}
