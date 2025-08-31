import React from "react";  // 👈 ye line add karo
import UploadForm from "./components/UploadForm";

export default function App() {
  return (
    <div className="max-w-2xl mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4">Auto PPT Generator</h1>
      <UploadForm />
    </div>
  );
}
