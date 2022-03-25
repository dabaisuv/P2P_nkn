const revData = document.querySelector("#revData"); //received message
const sAddr = document.querySelector("#sAddr"); //send to address
const sData = document.querySelector("#sData"); //message to be sent
const fileAddr = document.querySelector("#fileAddr"); //file to be sent
const clientAddr = document.querySelector("#clientAddr"); //local address
const numSubClients = 4;
const sessionConfig = { mtu: 16000 };


const client = new nkn.MultiClient({ numSubClients, sessionConfig, tls: false });

function displayLog(content) {
  console.log(content);
  let curDate = new Date();
  let li = document.createElement("li");
  let label = document.createElement("label");
  label.textContent = curDate.toLocaleString() + ": ";
  li.appendChild(label);
  li.append("\n" + content);
  revData.appendChild(li);
}

client.onConnect(() => {
  displayLog(`Successfully connected to nkn network!`);
  clientAddr.textContent = client.addr;  //Show local address on the label
}); //After connecting to the nkn network.

