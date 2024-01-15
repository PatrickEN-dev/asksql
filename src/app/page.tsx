"use client";

import "./globals.css";
import LogoImage from "@/assets/logo.svg";
import { Trash2, Stars } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import Editor from "react-simple-code-editor";

import { useCompletion } from "ai/react";

import { highlight, languages } from "prismjs";
import "prismjs/components/prism-sql";
import "prismjs/themes/prism-dark.css";

export default function Home() {
  const [schema, setSchema] = useState("");

  const { completion, handleSubmit, input, handleInputChange } = useCompletion({
    api: "/api/generate-sql",
    body: {
      schema,
    },
  });
  const result = completion;

  return (
    <div className="max-w-[430px] mx-auto pt-12 pb-4 px-4">
      <header className="flex items-center justify-between">
        <Image src={LogoImage} alt="Logo" />
        <button type="button">
          <Trash2 className="h-8 w-8 text-snow" strokeWidth={0.8} />
        </button>
      </header>

      <form className="py-8 w-full flex flex-col text-foam" onSubmit={handleSubmit}>
        <label htmlFor="schema" className="text-lg font-light">
          Cole seu códiugo SQL aqui:
        </label>

        <Editor
          value={schema}
          onValueChange={(code) => setSchema(code)}
          highlight={(code) => highlight(code, languages.sql, "sql")}
          padding={16}
          textareaId="schema"
          textareaClassName="outline-none"
          className="h-40 font-mono my-4 bg-blueberry-600 border border-blueberry-300 rounded-md outline-none focus-within:ring-1 focus-within:ring-lime-600"
        />

        <label htmlFor="schema" className="text-lg font-light">
          Faça uma pergunta sobre o código
        </label>
        <textarea
          className="my-4 bg-blueberry-600 border-blueberry-300 rounded-md px-4 py-3 outline-none focus:ring-1 focus:ring-lime-600"
          name="question"
          id="question"
          value={input}
          onChange={handleInputChange}
        ></textarea>

        <button
          type="submit"
          className="text-pistachio flex items-center justify-center rounded-lg border border-pistachio h-14 gap-2"
        >
          <Stars className="w-6 h-6 " />
          Perguntar à inteligencia artificial
        </button>
      </form>

      <div className="mt-6">
        <span className="text-lg font-light text-foam">Resposta</span>
        <textarea
          readOnly
          value={result}
          onChange={() => {}}
          className="w-full text-foam h-40 my-4 bg-blueberry-600 border border-blueberry-300 rounded-md px-4 py-3 outline-none"
        />
      </div>
    </div>
  );
}
