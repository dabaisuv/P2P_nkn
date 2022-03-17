
client.onMessage(({ src, payload }) => {
    let curDate = new Date();
    revData.append(curDate.toLocaleString() + "\n" + "Destination：" + src + "\n" + "Receive message：" + payload + "\n\n");
    return "Well received!";
}); //When receiving the message.

client.listen(); //listening session
client.onSession((session) => {
    session.read(-1).then((data) => {
        console.log('read', data);
        onFile(data.buffer);
      });
});

function onFile(arrbuffer) {
    let downLoader = document.createElement('a');
    downLoader.download = (new Date()).toLocaleString(); //file name
    downLoader.style.display = 'none'; //invisiable

    let blob = new Blob([arrbuffer]);   //convert ArrayBuffer to Blob
    downLoader.href = URL.createObjectURL(blob);    //create a url to Blob
    document.body.appendChild(downLoader);
    downLoader.click(); //Download!
    document.body.removeChild(downLoader);
} //receiving file




function fileSlice(file, piece = 1024 * 1024 * 5) {
    let totalSize = file.size;
    let start = 0;
    let end = start + piece;
    let chunks = []
    while (start < totalSize) {
        let blob = file.slice(start, end);
        chunks.push(blob)
        start = end;
        end = start + piece;
    }
    return chunks
} //file slice


