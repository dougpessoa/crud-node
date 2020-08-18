
export default function welcomeMessage(name, randomNumber) {
  const html = `
    <div>
      <h2>Olá ${name}, </h2>

      <p>Seja muito bem-vindo a plataforma.</p>
    </div>
    <div>
    <p>Ficamos felizes por você se cadastrar em nosso aplicativo!</p><br />

      <p>Mas para o nosso sistema saiba que você tem um e-mail certinho, copie e cole esse número em nossa plataforma.</p>
    </div>

    <div align="center" style="font-weight: bold; font-size: 25px;">
      ${randomNumber}
    </div>
    <br />

    <hr />
    <small>Ah, não responda essa mensagem, belezinha? Ela é automática!</small>
  `;

  return html;
}