import { useState, useEffect, useRef, useMemo } from "react";
import { API_URL, fallbackHeaders, MAX_FILE_CHARS } from "./constants/api";
import {
  MODELS,
  NOVA_FILE_MODEL_IDS,
  VISION_MODEL_IDS,
} from "./constants/models";
import AssistantResponse from "./components/AssistantResponse";
import ErrorBanner from "./components/ErrorBanner";
import Header from "./components/Header";
import PromptForm from "./components/PromptForm";
import QuickActions from "./components/quickActions";
import Footer from "./components/Footer";

function App() {
  const [selectedModel, setSelectedModel] = useState(MODELS[0]);
  const [prompt, setPrompt] = useState("");
  const [answer, setAnswer] = useState("");
  const [displayedAnswer, setDisplayedAnswer] = useState("");
  const [imageData, setImageData] = useState(null);
  const [fileAttachment, setFileAttachment] = useState(null);
  const imageInputRef = useRef(null);
  const fileInputRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const apiHeaders = useMemo(() => {
    const key = import.meta.env.VITE_OPENROUTER_API_KEY;
    const referer = typeof window !== "undefined" ? window.location.origin : "";
    return {
      ...fallbackHeaders,
      ...(referer ? { "HTTP-Referer": referer } : {}),
      ...(key ? { Authorization: `Bearer ${key}` } : {}),
    };
  }, []);
  const isVisionModel = useMemo(
    () => VISION_MODEL_IDS.has(selectedModel.id),
    [selectedModel.id],
  );
  const isNovaFileModel = useMemo(
    () => NOVA_FILE_MODEL_IDS.has(selectedModel.id),
    [selectedModel.id],
  );
  const clearImage = () => {
    setImageData(null);
    if (imageInputRef.current) imageInputRef.current.value = "";
  };
  const clearFile = () => {
    setFileAttachment(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };
  const resetAttachments = () => {
    clearImage();
    clearFile();
  };
  const clearAll = () => {
    setPrompt("");
    resetAttachments();
  };
  const handleImagechange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => setImageData(reader.result);
    reader.readAsDataURL(file);
  };
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) {
      setError("File size exceeds 2MB limit.");
      clearFile();
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      const content = typeof reader.result === "string" ? reader.result : "";
      const truncated = content.slice(0, MAX_FILE_CHARS);
      const notice =
        content.length > MAX_FILE_CHARS
          ? `\n\n[File content truncated to ${MAX_FILE_CHARS} characters]`
          : "";
      setFileAttachment({
        name: file.name,
        content: `${truncated}${notice}`,
      });
      setError("");
    };
    reader.readAsText(file);
  };
  useEffect(() => {
    if (!isNovaFileModel) {
      clearFile();
    }
  }, [isNovaFileModel]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const hasText = !!prompt.trim();
    const hasImage = !!imageData;
    const hasFile = isNovaFileModel && !!fileAttachment?.content;
    if (loading) return;
    if (!hasText && !hasImage && !hasFile) return;
    setError("");
    setAnswer("");
    setDisplayedAnswer("");
    if (!apiHeaders.Authorization) {
      setError("You're not Authorized");
      return;
    }
    setLoading(true);
    try {
      const parts = [];
      const hasAttachment = isVisionModel && hasImage;
      const fallbackText =
        !hasText && (hasAttachment || hasFile)
          ? "Please analyze the attached item(s)"
          : "";
      if (hasText || fallbackText) {
        parts.push({
          type: "text",
          text: hasText ? prompt.trim() : fallbackText,
        });
      }
      if (isVisionModel && hasImage) {
        parts.push({
          type: "image_url",
          image_url: {
            url: imageData,
          },
        });
      }
      if (hasFile) {
        parts.push({
          type: "text",
          text: `File: ${fileAttachment.name}\n\n${fileAttachment.content}`,
        });
      }
      const messageContent =
        parts.length > 0 ? parts : [{ type: "text", text: prompt.trim() }];
      const response = await fetch(API_URL, {
        method: "POST",
        headers: apiHeaders,
        body: JSON.stringify({
          model: selectedModel.id,
          messages: [
            {
              role: "user",
              content: messageContent,
            },
          ],
          stream: false,
        }),
      });
      if (!response.ok) {
        const errJSON = await response.json().catch(() => null);
        const errMsg =
          errJSON?.error?.message ||
          response.statusText ||
          "An unexpected error occurred...";
        throw new Error(errMsg);
      }
      const data = await response.json();
      const choice = data?.choices?.[0];
      if (choice?.error?.message) {
        throw new Error(choice.error.message);
      }
      let reply = choice?.message?.content;
      if (Array.isArray(reply)) {
        reply = reply
          .map((part) => {
            if (typeof part === "string") return part;
            if (part?.text) return part.text;
            if (part?.output_text) return part.output_text;
            return "";
          })
          .filter(Boolean)
          .join("\n");
      }
      if (!reply || (typeof reply === "string" && reply.trim() === "")) {
        const backendError =
          data?.error?.message || "No response generated from the model.";
        throw new Error(backendError);
      }
      setAnswer(reply);
      resetAttachments();
    } catch (err) {
      setError(
        err?.message || "An error occurred while processing your request.",
      );
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (!answer) {
      setDisplayedAnswer("");
      return;
    }
    let i = 0;
    const id = setInterval(() => {
      i += 1;
      setDisplayedAnswer(answer.slice(0, i));
      if (i >= answer.length) {
        clearInterval(id);
      }
    }, 12);
    return () => clearInterval(id);
  }, [answer]);
  const handleModelChange = (modelId) => {
    const nextModel = MODELS.find((m) => m.id === modelId);
    if (nextModel) {
      setSelectedModel(nextModel);
    }
  };
  const handleQuickActionSelect = (text) => setPrompt(text);
  return (
    <div className="min-h-screen bg-zinc-950 text-white relative overflow-hidden">
      <div className="relative z-10 flex flex-col min-h-screen">
        <Header selectedModel={selectedModel} />
        <main className="flex-1 flex items-center justify-center p-4 sm:p-6">
          <div className="w-full max-w-4xl space-y-4 sm:space-y-6">
            <ErrorBanner message={error} />
            <AssistantResponse
              answer={answer}
              displayedAnswer={displayedAnswer}
              selectedModel={selectedModel}
            />
            <PromptForm
              prompt={prompt}
              onPromptChange={setPrompt}
              onSubmit={handleSubmit}
              onClearAll={clearAll}
              models={MODELS}
              selectedModel={selectedModel}
              onModelChange={handleModelChange}
              isVisionModel={isVisionModel}
              isNovaFileModel={isNovaFileModel}
              onImageChange={handleImagechange}
              onFileChange={handleFileChange}
              imageData={imageData}
              fileAttachment={fileAttachment}
              clearImage={clearImage}
              clearFile={clearFile}
              loading={loading}
              imageInputref={imageInputRef}
              fileInputref={fileInputRef}
            />
            <QuickActions onSelect={handleQuickActionSelect} />
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default App;
