export const MODELS = [
  {
    id: "stepfun/step-3.5-flash:free",
    label: "StepFun: Step 3.5 Flash ",
    shortLabel: "StepFun 3.5 Flash",
  },
  {
    id: "arcee-ai/trinity-large-preview:free",
    label: "Arcee AI: Trinity Large Preview ",
    shortLabel: "Trinity Large Preview",
  },
  {
    id: "nvidia/nemotron-3-nano-30b-a3b:free",
    label: "NVIDIA: Nemotron 3 Nano 30B A3B ",
    shortLabel: "NVIDIA Nemotron 3 Nano",
  },
  {
    id: "arcee-ai/trinity-mini:free",
    label: "Arcee AI: Trinity Mini ",
    shortLabel: "Trinity Mini",
  },
  {
    id: "nvidia/nemotron-nano-12b-v2-vl:free",
    label: "NVIDIA: Nemotron Nano 12B V2 VL ",
    shortLabel: "NVIDIA Nemotron Nano",
  },
  {
    id: "nvidia/nemotron-nano-9b-v2:free",
    label: "NVIDIA: Nemotron Nano 9B V2 ",
    shortLabel: "NVIDIA Nemotron Nano 9B V2",
  },
  {
    id: "z-ai/glm-4.5-air:free",
    label: "Z AI: GLM 4.5 Air ",
    shortLabel: "GLM 4.5 Air",
  },
  {
    id: "google/gemma-3n-e2b-it:free",
    label: "Google: Gemma 3N E2B IT ",
    shortLabel: "Google Gemma 3N E2B",
  },
  {
    id: "deepseek/deepseek-r1-0528:free",
    label: "DeepSeek: DeepSeek R1 0528 ",
    shortLabel: "DeepSeek R1",
  },
  {
    id: "google/gemma-3n-e4b-it:free",
    label: "Google: Gemma 3N E4B IT ",
    shortLabel: "Google Gemma 3N E4B",
  },
  {
    id: "google/gemma-3-4b-it:free",
    label: "Google: Gemma 3-4B IT ",
    shortLabel: "Google Gemma 3-4B",
  },
  {
    id: "google/gemma-3-12b-it:free",
    label: "Google: Gemma 3-12B IT ",
    shortLabel: "Google Gemma 3-12B",
  },
  {
    id: "google/gemma-3-27b-it:free",
    label: "Google: Gemma 3-27B IT ",
    shortLabel: "Google Gemma 3-27B",
  },
];

// Image analysis models
export const VISION_MODEL_IDS = new Set([
  "amazon/nova-2-lite-v1:free",
  "nvidia/nemotron-nano-12b-v2-vl:free",
  "mistralai/mistral-small-3.1-24b-instruct:free",
  "google/gemma-3-4b-it:free",
  "google/gemma-3-12b-it:free",
  "google/gemma-3-27b-it:free",
]);

// File attachmemnt models
export const NOVA_FILE_MODEL_IDS = new Set(["amazon/nova-2-lite-v1:free"]);
