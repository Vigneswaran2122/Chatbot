const chatInput = document.querySelector(".chat-input textarea");
const sendChatBtn = document.querySelector(".chat-input span");
const chatbox = document.querySelector(".chatbox");

click_to_convert.addEventListener('click',function(){
    var speech = true;
    window.SpeechRecognition = window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.interimResults = true;
    recognition.addEventListener('result', e=>{
        const transcript = Array.from(e.results)
        .map(result =>result[0])
        .map(result => result.transcript)

        text.innerHTML = transcript;
    })

    if(speech == true){
        recognition.start();
    }
})



let speech = new SpeechSynthesisUtterance();

let voices = [];
let voiceSelect = document.querySelector("select");

window.speechSynthesis.onvoiceschanged = () => {
    voices = window.speechSynthesis.getVoices();
    speech.voice = voices[0];

    voices.forEach((voice,i) => (voiceSelect.options[i] = new Option(voice.name, i)));
};

document.querySelector(".answer").addEventListener("click", () =>{
     speech.text = document.querySelector(".tf").value;
    window.speechSynthesis.speak(speech);
});

document.querySelector(".question").addEventListener("click", () =>{
    speech.text = document.querySelector(".tx").value;
   window.speechSynthesis.speak(speech);
});
voiceSelect.addEventListener("change", () =>{
    speech.voice = voices[voiceSelect.value];
});








let data ={
    ["which tag is used to create a hyperlink"]:"&lt;a&gt;tag",["which tag is used to create a table row"]:"&lt;tr&gt;",
    ["HTML stands for"]:"HyperText Markup Language",["unordered list tag is"]:"&lt;ul&gt",
    ["how to insert an image in HTML"]:"&lt;img src = &quot;jtp.png&quot; /&gt;",["unique name to element class or id"]:"id",
    ["which HTML tag used to display the text with scrolling effect"]:"&lt;marquee&gt;",["the tags in HTML are"]:"not case sensitive",
    ["root tag of the HTML document"]:"&lt;html&gt;", ["comment tag in HTML"]:"&lt;!-- and --!&gt;",
    ["how many days in a week"]:"7 days", ["7 days names"]:"Monday,\n Tuesday,\n Wednesday,\nThursday,Friday,Saturday,Sunday"
}

let userMessage;
const createChatLi = (message, className) => {
    const chatLi = document.createElement("li");
    chatLi.classList.add("chat",className); 
    let chatContent = className === "outgoing" ? `<p>${message}</p> ` : `<span class="material-symbols-outlined">smart_toy</span>  <p>${message}  </p>  `;
    
    chatLi.innerHTML = chatContent;
    return chatLi;
}
console.log(chatInput,"m");



// const generateResponse = (incomingChatLi) => {
//     const API_URL ="https://659b7fe7d565feee2dab1ee0.mockapi.io/userData";
//      const messageElement = incomingChatLi.querySelector("p");
//     const requestOptions = {
//         method: "POST",
//         headers:{
//             "Content-Type" : "application/json",
//              "Authorization" : `Bearer ${API_URL}`
//         },
//         body: JSON.stringify({
//             model: "gpt-3.5-turbo",
//     messages: [
//       {\n 
//         role: "user",
//         content: userMessage
//       }
//     ]
//         })
//     }
    // fetch( ).then(res => res.json()).then(data => {
    //      messageElement.textContent = data.choices[0].message.content;
    // }).catch((error)=> {
    //     for(let a in data){
    //             if(a == a){
    //                messageElement.textContent = "oops something went wrong";
    //         }
    //      }
         
    // })
    

const handleChat = () => {
    userMessage = chatInput.value.trim();
    if(!userMessage) return;
    chatbox.appendChild(createChatLi(userMessage, "outgoing"));
    


    setTimeout(()=> {

        for(let a in data){
            if(chatInput.value == a){
                const incomingChatLi = createChatLi(data[a]);  
        //const incomingChatLi = createChatLi("Thinking", "incoming");
        chatbox.appendChild(incomingChatLi);
        document.getElementById("hi").innerHTML= data[a];


        
         generateResponse(incomingChatLi);

            }else if (chatInput.value == data[a]){
                
                const incomingChatLi = createChatLi("Your answer is correct 😊"); 
                chatbox.appendChild(incomingChatLi);
                document.getElementById("hi").innerHTML= "Your answer";
                
                
                
            } 
            
        }{
            const incomingChatLi = createChatLi (eval(chatInput.value)); 
            chatbox.appendChild((incomingChatLi));
            document.getElementById("hi").innerHTML= (eval(chatInput.value));
        }
    },600);

}
console.log(chatInput.value,"jjj")

// document.getElementById("btn").addEventListener("click", ()=>{
//     var msg = document.getElementById("outgoing" );
//     const utterance = new SpeechSynthesisUtterance(msg);
//     utterance.pitch = 0.5;
//     utterance.rate = 1;
//     speechSynthesis.speak(utterance);
// });


        

sendChatBtn.addEventListener("click", handleChat); 