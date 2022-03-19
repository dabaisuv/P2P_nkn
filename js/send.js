async function sendData() {
    if (!sAddr.value) {
        alert("Please enter receiver's address");
        return;
    }
    if(!sData.value)
    {
        alert("Please enter message to be sent.")
        return;
    }
    try{
        await client.send(sAddr.value,sData.value);
        displayLog(`Send message successfully!`)
    }
    catch(e){
        console.log(e);
    }
} //send message


async function sendFile() {
    if (!sAddr.value) {
        alert("Please enter receiver's address.");
        return;
    }

    let file = fileAddr.files[0];
    if (!file) {
        alert("Please select file to send.");
        return;
    }

    let session = await client.dial(sAddr.value);
    session.setLinger(-1);
    console.log(session.localAddr, 'dialed a session to', session.remoteAddr);

    let fileNameEncoded = new TextEncoder().encode(file.name);
    await writeUint32(session, fileNameEncoded.length);
    await session.write(fileNameEncoded);
    await writeUint32(session, file.size);

    displayLog(`Start sending ${file.name} (${file.size} bytes) to ${session.remoteAddr}`);

    let uploadStream = file.stream();
    let sessionStream = session.getWritableStream(true);
    let timeStart = Date.now();
    uploadStream.pipeTo(sessionStream).then(() => {
        displayLog(`Finish sending file ${file.name} (${file.size} bytes, ${file.size / (1 << 20) / (Date.now() - timeStart) * 1000} MB/s)`);
    }, console.error);
} //send file


async function writeUint32(session, n) {
    let buffer = new ArrayBuffer(4);
    let dv = new DataView(buffer);
    dv.setUint32(0, n, true);
    await session.write(new Uint8Array(buffer));
}

