export default class Oreh {
    static async compress(string: string) {
        const byteArray = new TextEncoder().encode(string);
        const stream = new CompressionStream("deflate-raw");
        const writer = stream.writable.getWriter();

        writer.write(byteArray);
        writer.close();

        const buffer = await new Response(stream.readable).arrayBuffer();

        return (new Uint8Array(buffer) as any).toBase64({ alphabet: "base64url" });
    }

    static async decompress(b64: string) {
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
}
