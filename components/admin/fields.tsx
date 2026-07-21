"use client";

import { useRef, useState } from "react";
import { ChevronDown, GripVertical, Plus, Trash2, Upload, X } from "lucide-react";
import { getSupabase, MEDIA_BUCKET } from "@/lib/supabase";

export type FieldType = "text" | "textarea" | "number" | "image" | "tags" | "select" | "multiselect";

export type FieldDef = {
  key: string;
  label: string;
  type: FieldType;
  options?: readonly string[];
  placeholder?: string;
  help?: string;
  accept?: string;
  full?: boolean;
};

type Rec = Record<string, unknown>;

export const inputCls =
  "w-full rounded-lg border border-line bg-bg px-3 py-2 text-[14px] text-txt outline-none transition placeholder:text-muted/60 focus:border-accent focus:ring-2 focus:ring-accent/15";

const str = (v: unknown) => (typeof v === "string" ? v : "");
const arr = (v: unknown) => (Array.isArray(v) ? (v as string[]) : []);

/* Comma-separated string list with an internal buffer so typing a comma
   doesn't fight the cursor. Uses React's adjust-state-during-render pattern to
   resync when the edited item is switched — no setState-in-effect. */
function TagsInput({ value, onChange, placeholder }: { value: string[]; onChange: (v: string[]) => void; placeholder?: string }) {
  const joined = value.join(", ");
  const [text, setText] = useState(joined);
  const [synced, setSynced] = useState(joined);
  if (joined !== synced) {
    setSynced(joined);
    const parsed = text.split(",").map((s) => s.trim()).filter(Boolean);
    if (parsed.join("") !== value.join("")) setText(joined);
  }
  return (
    <input
      className={inputCls}
      value={text}
      placeholder={placeholder || "comma, separated, values"}
      onChange={(e) => {
        setText(e.target.value);
        onChange(e.target.value.split(",").map((s) => s.trim()).filter(Boolean));
      }}
    />
  );
}

function MultiSelect({ value, options, onChange }: { value: string[]; options: readonly string[]; onChange: (v: string[]) => void }) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {options.map((opt) => {
        const on = value.includes(opt);
        return (
          <button
            type="button"
            key={opt}
            onClick={() => onChange(on ? value.filter((v) => v !== opt) : [...value, opt])}
            className={`rounded-full border px-3 py-1 text-[12.5px] font-medium transition ${
              on ? "border-accent bg-accent text-white" : "border-line bg-bg text-muted hover:border-accent"
            }`}
          >
            {opt}
          </button>
        );
      })}
    </div>
  );
}

function ImageUpload({ value, onChange, accept, prefix }: { value: string; onChange: (v: string) => void; accept?: string; prefix: string }) {
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");
  const ref = useRef<HTMLInputElement>(null);

  async function upload(file: File) {
    const sb = getSupabase();
    if (!sb) {
      setErr("Supabase not configured");
      return;
    }
    setBusy(true);
    setErr("");
    const ext = file.name.split(".").pop() || "bin";
    const path = `${prefix}/${crypto.randomUUID()}.${ext}`;
    const { error } = await sb.storage.from(MEDIA_BUCKET).upload(path, file, { upsert: true, cacheControl: "3600" });
    if (error) setErr(error.message);
    else onChange(sb.storage.from(MEDIA_BUCKET).getPublicUrl(path).data.publicUrl);
    setBusy(false);
  }

  const isVideo = accept?.includes("video") || /\.(mp4|webm|mov)$/i.test(value);

  return (
    <div className="space-y-2">
      <div className="flex gap-2">
        <input className={inputCls} value={value} placeholder="Paste a URL or upload" onChange={(e) => onChange(e.target.value)} />
        <button
          type="button"
          disabled={busy}
          onClick={() => ref.current?.click()}
          className="flex shrink-0 items-center gap-1.5 rounded-lg border border-line bg-bg2 px-3 text-[13px] font-medium text-txt transition hover:border-accent disabled:opacity-60"
        >
          <Upload size={14} /> {busy ? "..." : "Upload"}
        </button>
        {value && (
          <button type="button" onClick={() => onChange("")} className="shrink-0 rounded-lg border border-line px-2.5 text-muted transition hover:border-red-400 hover:text-red-500">
            <X size={14} />
          </button>
        )}
      </div>
      <input
        ref={ref}
        type="file"
        accept={accept || "image/*"}
        hidden
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) upload(f);
          e.target.value = "";
        }}
      />
      {err && <p className="text-xs text-red-500">{err}</p>}
      {value && !isVideo && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={value} alt="preview" className="h-24 w-auto rounded-lg border border-line object-cover" />
      )}
    </div>
  );
}

function FieldInput({ field, value, onChange, prefix }: { field: FieldDef; value: unknown; onChange: (v: unknown) => void; prefix: string }) {
  switch (field.type) {
    case "textarea":
      return <textarea rows={3} className={`${inputCls} resize-y`} value={str(value)} placeholder={field.placeholder} onChange={(e) => onChange(e.target.value)} />;
    case "number":
      return <input type="number" className={inputCls} value={typeof value === "number" ? value : 0} onChange={(e) => onChange(Number(e.target.value) || 0)} />;
    case "select":
      return (
        <select className={inputCls} value={str(value)} onChange={(e) => onChange(e.target.value)}>
          {(field.options ?? []).map((o) => (
            <option key={o} value={o}>{o}</option>
          ))}
        </select>
      );
    case "multiselect":
      return <MultiSelect value={arr(value)} options={field.options ?? []} onChange={onChange} />;
    case "tags":
      return <TagsInput value={arr(value)} onChange={onChange} placeholder={field.placeholder} />;
    case "image":
      return <ImageUpload value={str(value)} onChange={onChange} accept={field.accept} prefix={prefix} />;
    default:
      return <input className={inputCls} value={str(value)} placeholder={field.placeholder} onChange={(e) => onChange(e.target.value)} />;
  }
}

export function RecordEditor({ fields, value, onChange, prefix }: { fields: FieldDef[]; value: Rec; onChange: (v: Rec) => void; prefix: string }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {fields.map((f) => (
        <div key={f.key} className={f.full || f.type === "textarea" || f.type === "multiselect" || f.type === "image" ? "sm:col-span-2" : ""}>
          <label className="mb-1 block text-[12.5px] font-semibold text-txt">{f.label}</label>
          <FieldInput field={f} value={value[f.key]} prefix={prefix} onChange={(v) => onChange({ ...value, [f.key]: v })} />
          {f.help && <p className="mt-1 text-[11.5px] text-muted">{f.help}</p>}
        </div>
      ))}
    </div>
  );
}

export function CollectionEditor({
  fields,
  items,
  onChange,
  newItem,
  titleKey,
  prefix,
}: {
  fields: FieldDef[];
  items: Rec[];
  onChange: (items: Rec[]) => void;
  newItem: () => Rec;
  titleKey: string;
  prefix: string;
}) {
  const [open, setOpen] = useState<number | null>(items.length ? 0 : null);
  const move = (i: number, d: number) => {
    const j = i + d;
    if (j < 0 || j >= items.length) return;
    const next = [...items];
    [next[i], next[j]] = [next[j], next[i]];
    onChange(next);
  };

  return (
    <div className="space-y-3">
      {items.map((item, i) => {
        const expanded = open === i;
        return (
          <div key={i} className="overflow-hidden rounded-xl border border-line bg-card">
            <div className="flex items-center gap-2 px-3 py-2.5">
              <GripVertical size={15} className="text-muted" />
              <button type="button" className="flex-1 truncate text-left text-[14px] font-medium text-txt" onClick={() => setOpen(expanded ? null : i)}>
                {str(item[titleKey]) || `Item ${i + 1}`}
              </button>
              <button type="button" onClick={() => move(i, -1)} className="px-1 text-muted hover:text-accent" aria-label="Move up">↑</button>
              <button type="button" onClick={() => move(i, 1)} className="px-1 text-muted hover:text-accent" aria-label="Move down">↓</button>
              <button type="button" onClick={() => onChange(items.filter((_, x) => x !== i))} className="px-1 text-muted hover:text-red-500" aria-label="Delete">
                <Trash2 size={15} />
              </button>
              <button type="button" onClick={() => setOpen(expanded ? null : i)} className="px-1 text-muted">
                <ChevronDown size={16} className={expanded ? "rotate-180 transition" : "transition"} />
              </button>
            </div>
            {expanded && (
              <div className="border-t border-line p-4">
                <RecordEditor fields={fields} value={item} prefix={prefix} onChange={(v) => onChange(items.map((it, x) => (x === i ? v : it)))} />
              </div>
            )}
          </div>
        );
      })}
      <button
        type="button"
        onClick={() => {
          onChange([...items, newItem()]);
          setOpen(items.length);
        }}
        className="flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-line py-3 text-[13.5px] font-medium text-muted transition hover:border-accent hover:text-accent"
      >
        <Plus size={16} /> Add
      </button>
    </div>
  );
}
