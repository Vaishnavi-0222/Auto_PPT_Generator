import { useState } from "react";
import { generatePPT } from "../api";

export default function UploadForm() {
  const [inputText, setInputText] = useState("");
  const [tone, setTone] = useState("");
  const [provider, setProvider] = useState("openai");
  const [apiKey, setApiKey] = useState("");
  const [template, setTemplate] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const blob = await generatePPT({
        input_text: inputText,
        tone,
        provider,
        api_key: apiKey,
        template,
      });
      const url = window.URL.createObjectURL(new Blob([blob]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "generated.pptx");
      document.body.appendChild(link);
      link.click();
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 space-y-4">
      <textarea
        placeholder="Paste your text or Markdown..."
        className="border w-full h-40 p-2"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        required
      />
      <input
        placeholder="Tone (e.g. investor pitch)"
        className="border p-2 w-full"
        value={tone}
        onChange={(e) => setTone(e.target.value)}
      />
      <select
        className="border p-2 w-full"
        value={provider}
        onChange={(e) => setProvider(e.target.value)}
      >
        <option value="openai">OpenAI</option>
        <option value="anthropic">Anthropic</option>
        <option value="gemini">Gemini</option>
      </select>
      <input
        type="password"
        placeholder="API Key"
        className="border p-2 w-full"
        value={apiKey}
        onChange={(e) => setApiKey(e.target.value)}
        required
      />
      <input
        type="file"
        accept=".pptx,.potx"
        onChange={(e) => setTemplate(e.target.files[0])}
        required
      />
      <button
        type="submit"
        disabled={loading}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        {loading ? "Generating..." : "Generate PPT"}
      </button>
    </form>
  );
}
