'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState('alexandre.coelho@ubi.co.mz');
  const [password, setPassword] = useState('ubidev987');
  const [erro, setErro] = useState('');

  const fazerLogin = async (e) => {
    e.preventDefault();
    setErro('');

    try {
      const resposta = await fetch(
        'https://sonil-dev.void.co.mz/api/v4/users/login',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username, password }),
        }
      );

      if (!resposta.ok) {
        throw new Error('Erro na requisição de login.');
      }

      const dados = await resposta.json();
      console.log('Resposta da API:', dados);

      const token =
        dados.token ||
        dados.access_token ||
        dados.jwt ||
        (dados.data && dados.data.token);

      if (!token) {
        console.error('Resposta completa da API:', dados);
        throw new Error('Token não retornado pela API.');
      }

      localStorage.setItem('token', token);

      router.push('/dashboard');
    } catch (error) {
      let mensagemErro = 'Erro ao fazer login.';
      if (error instanceof Error) {
        mensagemErro = error.message;
      }
      console.error('Erro ao fazer login:', error);
      setErro(mensagemErro);
    }
  }

  return (
    <div style={{ maxWidth: 400, margin: '50px auto', textAlign: 'center' }}>
      <h1>Login</h1>
      <form onSubmit={fazerLogin}>
        <div style={{ marginBottom: 10 }}>
          <label>Usuário (Email)</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{ width: '100%', padding: 8 }}
          />
        </div>

        <div style={{ marginBottom: 10 }}>
          <label>Senha</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: '100%', padding: 8 }}
          />
        </div>

        {erro && <div style={{ color: 'red', marginBottom: 10 }}>{erro}</div>}

        <button
          type="submit"
          style={{
            width: '100%',
            padding: 10,
            background: '#0070f3',
            color: 'white',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          Entrar
        </button>
      </form>
    </div>
  );
}
