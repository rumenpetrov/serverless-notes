export default class Oreh {
  constructor() { }

  version: string = "0.0.1";

  async compress(string: string) {
    const byteArray = new TextEncoder().encode(string);
    const stream = new CompressionStream("deflate-raw");
    const writer = stream.writable.getWriter();

    writer.write(byteArray);
    writer.close();

    const buffer = await new Response(stream.readable).arrayBuffer();

    return (new Uint8Array(buffer) as any).toBase64({ alphabet: "base64url" });
  }

  async decompress(b64: string) {
    const byteArray = (Uint8Array as any).fromBase64(b64, {
      alphabet: "base64url",
    });
    const stream = new DecompressionStream("deflate-raw");
    const writer = stream.writable.getWriter();

    writer.write(byteArray);
    writer.close();

    const buffer = await new Response(stream.readable).arrayBuffer();

    return new TextDecoder().decode(buffer);
  }

  async readState() {
    if (typeof window === "undefined") return null;

    const hash = window.location.hash.replace("#", "");
    const fallback = {};

    if (!hash) {
      return fallback;
    }

    try {
      const decompressed = await this.decompress(hash);

      if (decompressed) {
        const systemStateDefaults = {
          mode: "viewer",
        };
        const parsed = JSON.parse(decodeURI(decompressed)) || fallback;

        return {
          ...parsed,
          system: {
            ...systemStateDefaults,
            ...parsed?.system,
          },
        };
      }
    } catch (e) {
      console.error("Failed to load state:", e);
    }

    return fallback;
  }

  async writeState(data: { content: Object, system: { mode: 'viewer' | 'editor' } }) {
    if (typeof window === "undefined" || typeof history === "undefined") return;

    try {
      const json = JSON.stringify({
        content: data?.content,
        system: data?.system,
      });
      const encoded = encodeURI(json);
      const compressed = await this.compress(encoded);

      history.replaceState(null, "", `#${compressed}`);
    } catch (e) {
      console.error("Failed to save state:", e);
    }
  }

  async writeContentState(content: Object) {
    const state = await this.readState();

    await this.writeState({ ...state, content });
  }

  async setSystemState(propertyName: string, value: any) {
    const state = await this.readState();

    await this.writeState({ ...state, system: { ...state?.system, [propertyName]: value } });
  }

  checkStateSize() {
    if (typeof window === "undefined") {
      return {
        currentLength: 0,
        maxLength: 8000,
        status: "ok" as const
      };
    }

    // 8000 is a sensible maximum URL length that is safely supported by 
    // the last 2 versions of all popular browsers (Chrome, Firefox, Safari, Edge).
    const maxLength = 8000;
    const currentLength = window.location.href.length;

    let status: "ok" | "warning" | "critical" = "ok";

    if (currentLength >= maxLength) {
      status = "critical";
    } else if (currentLength >= maxLength * 0.9) {
      status = "warning";
    }

    return {
      currentLength,
      maxLength,
      status
    };
  }
}
