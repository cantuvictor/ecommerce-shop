import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'react-toastify';
import { supabase } from '@/lib/supabase-client';

export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        toast.error('Credenciais inválidas. Verifique seu e-mail e senha.');
        return;
      }

      localStorage.setItem(
        'user',
        JSON.stringify({ id: data.user?.id, token: data.session?.access_token }) || ''
      );

      toast.success('Login realizado com sucesso!');
      navigate('/products');
    } catch (err) {
      toast.error('Ocorreu um erro ao fazer login.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center bg-gray-50 p-10">
      <div className="max-w-lg w-full">
        <h1 className="text-3xl font-bold text-blue-900 mb-8">Bem-vindo de volta</h1>

        <Card className="shadow-lg border rounded-2xl p-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl font-semibold text-blue-900">Login</CardTitle>
            <CardDescription className="text-gray-600">
              Insira suas credenciais para continuar
            </CardDescription>
          </CardHeader>

          <CardContent className="mt-4">
            <form onSubmit={handleLogin} className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">E-mail</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Digite seu e-mail"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="password">Senha</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="************"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <CardFooter className="flex flex-col gap-4 px-0">
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full cursor-pointer bg-blue-600 hover:bg-blue-700"
                >
                  {isLoading ? 'Entrando...' : 'Login'}
                </Button>

                <a
                  href="/register"
                  className="text-sm text-blue-700 hover:underline text-center"
                >
                  Não possui uma conta? Registre-se
                </a>
              </CardFooter>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default Login;
