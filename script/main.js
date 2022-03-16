
const blobSize = 1024 * 1024 * 2;
const fileIndex = "File:";
const revData = document.querySelector("#revData");
const sAddr = document.querySelector("#sAddr");
const sData = document.querySelector("#sData");
const fileAddr = document.querySelector("#fileAddr");

const client = nkn({
});

function init() {

  clientAddr = document.querySelector("#clientAddr");
  clientAddr.textContent = "My address: " + client.addr;
  client.on('connect', () => {
    console.log('Connection opened.');

    let curDate = new Date();
    revData.append(curDate.toLocaleString() + "\n" + "Successfully connected to nkn network!\n\n");
  });

  client.on('message', (src, payload, payloadType, encrypt) => {
    if (payload.indexOf("File:") == 0 && payload.indexOf("infoEnd") != -1) {
      let curDate = new Date();
      revData.append(curDate.toLocaleString() + "\n" + "Receive file:" + payload + "\n\n");
    } else {
      let curDate = new Date();
      revData.append(curDate.toLocaleString() + "\n" + "Destination：" + src + "\n" + "Receive message：" + payload + "\n\n");
    }



  });
}


function sendData() {
  client.send(sAddr.value, sData.value,);
}

function sendFile() {
  let file = fileAddr.files[0];
  let fileInfo = fileIndex + file.name + "(" + (file.size / 1024 / 1024).toString() + "MB)infoEnd";
  let fr = new FileReader();
  let start = 0;
  fr.onload = function (event) {
    //console.log(event.target.result);
    let resultUint8Arry = new Uint8Array(event.target.result);
    client.send(sAddr.value, fileInfo + resultUint8Arry.join(""));

    if (file.size < blobSize) {
      return;
    } else if (start > file.size) {
      let curDate = new Date();
      revData.append(curDate.toLocaleString() + "\n" + "文件发送成功！\n\n");
      console.log("完成");
      return;
    } else {
      let blob = file.slice(start, start + blobSize);
      start = start + blobSize
      fr.readAsArrayBuffer(blob);
    }
  };
  let blob = file.slice(start, start + blobSize);
  start += blobSize;
  let curDate = new Date();
  revData.append(curDate.toLocaleString() + "\n" + "正在发送文件:" + file.name + "(" + (file.size / 1024 / 1024).toString() + "MB)\n\n");

  fr.readAsArrayBuffer(blob);


}

function downFile() {

  // 创建a标签
  let downLoader = document.createElement('downLoader');


  //文件的名称为时间戳加文件名后缀
  downLoader.download = +new Date() + ".tpl";
  downLoader.style.display = 'none';

  //生成一个blob二进制数据，内容为json数据
  let blob = new Blob([JSON.stringify(jsonObj)]);

  //生成一个指向blob的URL地址，并赋值给a标签的href属性
  downLoader.href = URL.createObjectURL(blob);
  document.body.appendChild(downLoader);
  downLoader.click();
  document.body.removeChild(downLoader);
}


init();