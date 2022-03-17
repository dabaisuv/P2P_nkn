function sendData() {
    client.send(sAddr.value,
        sData.value,
    ).then(() => {
        let curDate = new Date();
        revData.append(curDate.toLocaleString() + "\n" + "Send massage successfully!" + "\n\n");
    }).catch((e) => {
        console.log(e)
    });
} //send message


function sendFile() {
    let file = fileAddr.files[0];
    let fr = new FileReader();
    fr.onload = function (event) {
        client.dial(sAddr.value).then((session) => {
            session.write((new Uint8Array(event.target.result))).then(() => {
                console.log("Write successfully!");
            })
            
        }).catch((e) => {
            console.log(e);
        });
    };
    fr.readAsArrayBuffer(file);
} //send file