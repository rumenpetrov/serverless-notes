const compress = async (string: string) => {
  const byteArray = new TextEncoder().encode(string);
  const stream = new CompressionStream("deflate-raw");
  const writer = stream.writable.getWriter();

  writer.write(byteArray);
  writer.close();

  const buffer = await new Response(stream.readable).arrayBuffer();

  return new Uint8Array(buffer).toBase64({ alphabet: "base64url" });
};

export default compress;
