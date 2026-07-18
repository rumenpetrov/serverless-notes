// Typed event bus for communication between Editor.astro and its host page
// ([templateId].astro). Replaces stringly-typed window CustomEvents with a
// single source of truth for event names and payload shapes.

export type EditorData = Record<string, string>;

export interface EditorEventMap {
  // Fired by Editor.astro on mount. Payload: default key-value form data.
  "editor:ready": EditorData;
  // Fired by the host to populate the editor fields. Payload: stored content.
  "editor:set-data": EditorData;
  // Fired by Editor.astro on input. Payload: current key-value form data.
  "editor:change": EditorData;
  // Fired by the host after it registers its listeners, to request the
  // editor's current data. Used to resolve init-order races between the two
  // deferred module scripts. Payload: unused (null).
  "host:request-data": null;
}

const target: EventTarget =
  typeof window !== "undefined" ? window : (globalThis as unknown as EventTarget);

export function emitEditorEvent<K extends keyof EditorEventMap>(
  type: K,
  detail: EditorEventMap[K],
): void {
  target.dispatchEvent(new CustomEvent(type, { detail }));
}

export function onEditorEvent<K extends keyof EditorEventMap>(
  type: K,
  handler: (detail: EditorEventMap[K]) => void,
): () => void {
  const listener = (event: Event) => {
    handler((event as CustomEvent<EditorEventMap[K]>).detail);
  };
  target.addEventListener(type, listener);
  return () => target.removeEventListener(type, listener);
}
