
client.onMessage(async ({ src, payload }) => {
    displayLog(`Destination: ${src} \nReceive message：${payload}`)
    
    return "Well received!";
}); //When receiving the message.

client.listen(); //listening session

client.onSession(async (session) => {
    console.log(session.localAddr, 'accepted a session from', session.remoteAddr);

    let fileNameLen = await readUint32(session);
    let fileNameEncoded = await readN(session, fileNameLen);
    let fileName = new TextDecoder().decode(fileNameEncoded);
    let fileSize = await readUint32(session);

    displayLog(`Start receiving ${fileName} (${fileSize} bytes) from ${session.remoteAddr}`);
    let sessionStream = session.getReadableStream();
    let downloadStream = streamSaver.createWriteStream(fileName, { size: fileSize });
    let timeStart = Date.now();

    curDate = new Date();
    sessionStream.pipeTo(downloadStream).then(() => {
        displayLog(`Finish receiving file ${fileName} (${fileSize} bytes, ${fileSize / (1<<20) / (Date.now() - timeStart) * 1000} MB/s)`);
    }, console.error);
  });   //When receiving the file.


async function readN(session, n) {
    let buf = new Uint8Array(0);
    while (buf.length < n) {
      buf = mergeUint8Array(buf, await session.read(n - buf.length));
    }
    return buf;
  }
  
  async function readUint32(session) {
    let buf = await readN(session, 4);
    let dv = new DataView(buf.buffer);
    return dv.getUint32(0, true);
  }

  function mergeUint8Array(head, tail) {
    let merged = new Uint8Array(head.length + tail.length);
    merged.set(head);
    merged.set(tail, head.length);
    return merged;
  };