import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FieldGroup, Field, FieldLabel, FieldDescription } from "@/components/ui/field";
import { supabase } from "@/lib/supabase";
import { useNavigate } from "react-router";

export default function Auth() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleAuth() {
    if (isLogin) {
      const { error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });

      if (error) {
        setError(error.message);
      } else {
        navigate("/dashboard");
      }
    } else {
      const { error } = await supabase.auth.signUp({
        email: email,
        password: password,
      });

      if (error) {
        setError(error.message);
      } else {
        navigate("/dashboard");
      }
    }
  }

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) {
        navigate("/dashboard");
      }
    });
  }, []);

  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <Card className="w-1/3 h-3/5 p-12">
        <CardHeader>
          <div className="flex flex-row items-center justify-center gap-1 py-8 select-none">
            <svg
              width="80"
              height="80"
              viewBox="0 0 44 45"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M9.00052 6.3584H16.3467V20.2046C16.3467 23.8864 13.3619 26.8712 9.68002 26.8712H6.50053V8.8584C6.50053 7.47769 7.61981 6.3584 9.00052 6.3584ZM35.32 17.8456C31.6381 17.8456 28.6533 20.8303 28.6533 24.5122V38.3584H35.9995C37.3802 38.3584 38.4995 37.2391 38.4995 35.8584V17.8456H35.32ZM24.654 16.2046C20.9721 16.2046 17.9873 13.2198 17.9873 9.53792V6.35844L36.0001 6.35844C37.3808 6.35844 38.5001 7.47772 38.5001 8.85844L38.5001 16.2046H24.654ZM6.5 35.8584C6.5 37.2391 7.61929 38.3584 9 38.3584H27.0128V35.1789C27.0128 31.497 24.0281 28.5122 20.3462 28.5122H6.5V35.8584Z"
                className="fill-black dark:fill-white"
              />
            </svg>
            <p className="text-5xl font-semibold">MDT</p>
          </div>
          <CardTitle>{isLogin ? "Login to your account" : "Register your account"}</CardTitle>
          <CardDescription>
            {isLogin
              ? "Enter your email below to login to your account"
              : "Enter your email below to register your account"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="password">Password</FieldLabel>
                <Input
                  id="password"
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </Field>
              <Field>
                <Button
                  className="cursor-pointer hover:bg-emerald-600 transition-colors"
                  type="button"
                  onClick={handleAuth}
                >
                  {isLogin ? "Login" : "Register"}
                </Button>
                <FieldDescription className="text-center">
                  Don't have an account?{" "}
                  <a
                    className="cursor-pointer transition-colors"
                    onClick={() => setIsLogin(!isLogin)}
                  >
                    {isLogin ? "Sign up" : "Login"}
                  </a>
                  {error && <p className="mt-2 text-red-400">{error}</p>}
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
