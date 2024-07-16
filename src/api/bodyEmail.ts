export const bodyEmail = ({ code, email }: { code: string; email: string }) => {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Code Bingo</title>
    </head>
    <body style="font-family: 'Courier New', Courier, monospace; text-align: center; margin: 10px 0; width: 100%;">

      <header>
        <h1 style="font-size: 1.5rem; margin: 0;">Código de ativação Bingo educacional</h1>
      </header>

      <main>
        <p style="font-size: 0.8rem; margin: 20px 0;">
          Seu código de ativação é:
          <span style="background-color: #ff1100; padding: 5px; color: white;">${code}</span>
        </p>
        <p style="font-size: 1rem; margin: 45px 0; font-weight: bold;">
          Por favor, clique no botão logo abaixo para ativar sua conta.
        </p>
        <a href="http://localhost:3000/code_register?code=${code}&email=${email}"
          style="display: inline-block; padding: 10px 15px; border-radius: 15px; border: none; background-color: #3d4efb; color: white; font-weight: bold; text-decoration: none;">
          Clique aqui para ativar
        </a>
      </main>

    </body>
    </html>

`;
};
