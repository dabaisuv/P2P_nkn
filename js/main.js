const fileIndex = "File:";
const revData = document.querySelector("#revData"); //received message
const sAddr = document.querySelector("#sAddr"); //send to address
const sData = document.querySelector("#sData"); //message to be sent
const fileAddr = document.querySelector("#fileAddr"); //file to be sent
clientAddr = document.querySelector("#clientAddr"); //local address

const client = new nkn.MultiClient({
  numSubClients: 4,
  originalClient: false,
});

client.onConnect(() => {
  console.log('Client ready.');
  let curDate = new Date();
  revData.append(curDate.toLocaleString() + "\n" + "Successfully connected to nkn network!\n\n");
  clientAddr.textContent = "My address: " + client.addr;  //Show local address on the label
}); //After connecting to the nkn network.

