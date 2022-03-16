const client = nkn({
  responseTimeout: 5, // in seconds
});

function init() {

  clientAddr = document.querySelector("#clientAddr");
  clientAddr.textContent = "我的地址：" + client.addr;
  client.on('connect', () => {
    console.log('Connection opened.');
  });

  client.on('message', (src, payload, payloadType, encrypt) => {
    if (payloadType === nkn.PayloadType.TEXT) {
      revData = document.querySelector("#revData");
      let curDate = new Date();
      revData.append(curDate.toLocaleString() + "\n" +"对方地址：" + src + "\n" + "收到信息："  + payload + "\n\n");
    }

  });

}

function sendData() {
  sData = document.querySelector("#sData");
  sAddr = document.querySelector("#sAddr");
  revData = document.querySelector("#revData");
  client.send(sAddr.value, sData.value,);
  let curDate = new Date();
  revData.append(curDate.toLocaleString() + "\n" +"成功发送到对方地址：" + src + "\n\n");
}

init();