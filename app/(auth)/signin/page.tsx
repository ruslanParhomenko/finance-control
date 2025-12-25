"use client";

import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { firebaseAuth } from "@/lib/firebase-client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signIn } from "next-auth/react";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const firebaseUser = await signInWithEmailAndPassword(firebaseAuth, email, password);
      await signIn("credentials", { email, uid: firebaseUser.user.uid, redirect: false });
      router.push("/home"); // редирект после успешного входа
    } catch (err: any) {
      switch (err.code) {
        case "auth/user-not-found":
          setError("Пользователь не найден");
          break;
        case "auth/wrong-password":
          setError("Неверный пароль");
          break;
        case "auth/invalid-email":
          setError("Неверный email");
          break;
        default:
          setError("Ошибка входа");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen ">
      <div className="w-full max-w-md p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Вход</h1>

        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <Label htmlFor="password">Пароль</Label>
            <Input
              id="password"
              type="password"
              placeholder="Пароль"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && <p className="text-red-500">{error}</p>}

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Вход..." : "Войти"}
          </Button>
        </form>

        <div className="flex justify-between mt-4 text-sm">
          <a href="/signup" className="text-blue-600 hover:underline">
            Создать аккаунт
          </a>
          <a href="/reset-password" className="text-blue-600 hover:underline">
            Сбросить пароль
          </a>
        </div>
      </div>
    </div>
  );
}
