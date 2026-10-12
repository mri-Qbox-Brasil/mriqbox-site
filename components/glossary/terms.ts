// Term names stay as the FiveM scene writes them; only definitions change per locale.
export const GLOSSARY_GROUPS = [
  {
    letter: "A",
    items: [
      { id: "ace", term: "ACE Permissions" },
      { id: "ambient", term: "ambient" },
    ],
  },
  {
    letter: "C",
    items: [
      { id: "callback", term: "callback (lib.callback)" },
      { id: "cef", term: "CEF (Chromium Embedded Framework)" },
      { id: "createThread", term: "Citizen.CreateThread" },
      { id: "convar", term: "convar" },
    ],
  },
  { letter: "D", items: [{ id: "dui", term: "DUI (Direct UI)" }] },
  { letter: "E", items: [{ id: "esx", term: "ESX" }] },
  {
    letter: "F",
    items: [
      { id: "fxmanifest", term: "fxmanifest.lua" },
      { id: "fxserver", term: "FXServer" },
    ],
  },
  { letter: "G", items: [{ id: "gpl", term: "GPL-3.0" }] },
  { letter: "L", items: [{ id: "lgpl", term: "LGPL-3.0" }] },
  { letter: "N", items: [{ id: "nui", term: "NUI (New UI)" }] },
  {
    letter: "O",
    items: [
      { id: "oxLib", term: "ox_lib" },
      { id: "oxInventory", term: "ox_inventory" },
      { id: "oxmysql", term: "oxmysql" },
    ],
  },
  {
    letter: "Q",
    items: [
      { id: "qbcore", term: "QBCore" },
      { id: "qbox", term: "Qbox" },
    ],
  },
  {
    letter: "R",
    items: [
      { id: "recipe", term: "recipe" },
      { id: "resource", term: "resource" },
      { id: "resmon", term: "resmon" },
    ],
  },
  {
    letter: "S",
    items: [
      { id: "scenario", term: "scenario (GTA V)" },
      { id: "shadcn", term: "shadcn/ui" },
    ],
  },
  {
    letter: "T",
    items: [
      { id: "tebex", term: "Tebex" },
      { id: "txadmin", term: "txAdmin" },
    ],
  },
  { letter: "V", items: [{ id: "vite", term: "Vite" }] },
] as const

export type GlossaryTermId = (typeof GLOSSARY_GROUPS)[number]["items"][number]["id"]
