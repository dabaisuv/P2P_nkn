const client = nkn({
  responseTimeout: 5, // in seconds
  tls: false
});

function init() {

  clientAddr = document.querySelector("#clientAddr");
  clientAddr.textContent = "My address：" + client.addr;
  client.on('connect', () => {
    console.log('Connection opened.');
  });

  client.on('message', (src, payload, payloadType, encrypt) => {
    if (payloadType === nkn.PayloadType.TEXT) {
      revData = document.querySelector("#revData");
      let curDate = new Date();
      revData.append(curDate.toLocaleString() + "\n" +"Destination：" + src + "\n" + "Receive message："  + payload + "\n\n");
    }

  });

}

function sendData() {
  sData = document.querySelector("#sData");
  sAddr = document.querySelector("#sAddr");
  revData = document.querySelector("#revData");
  client.send(sAddr.value, sData.value,);
  let curDate = new Date();
  revData.append(curDate.toLocaleString() + "\n" +"Successfully sent to：" + src + "\n\n");
}

init();