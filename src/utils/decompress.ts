export const decompress = async (b64) => {
  const byteArray = Uint8Array.fromBase64(b64, { alphabet: "base64url" });
  const stream = new DecompressionStream("deflate-raw");
  const writer = stream.writable.getWriter();

  writer.write(byteArray);
  writer.close();

  const buffer = await new Response(stream.readable).arrayBuffer();

  return new TextDecoder().decode(buffer);
};

export default decompress;
