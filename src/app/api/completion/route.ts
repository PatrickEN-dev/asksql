import OpenAI from "openai";
import { OpenAIStream, StreamingTextResponse } from "ai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const runtime = "edge";

export async function POST(req: Request) {
  const { schema, prompt } = await req.json();

  const message = `
  Dado o seguinte schema SQL:
  
  \`\`\`sql
  ${schema}
  \`\`\`
  
  Crie uma consulta SQL para atender à seguinte solicitação:
  
  **Solicitação:**
  ${prompt}
  
  **Instruções adicionais (se aplicável):**
  - [Inclua/exclua/mostre/etc.] os campos [nome do campo] da tabela [nome da tabela].
  - Considere [condições adicionais, se houver].
  - Mantenha a consulta otimizada para [desempenho/tempo de execução/etc.].
  
  **Exemplo (se aplicável):**
  \`\`\`sql
  -- Sua consulta SQL aqui
  \`\`\`
  
  Por favor, forneça uma consulta SQL clara e eficiente com base nas informações fornecidas no schema. Certifique-se de abordar todas as especificações da solicitação.
  É obrigatório me retornar somente o código SQL como resposta nada além disso.
  
  `.trim();

  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    stream: true,
    messages: [
      {
        role: "user",
        content: message,
      },
    ],
  });

  const stream = OpenAIStream(response);

  return new StreamingTextResponse(stream);
}
