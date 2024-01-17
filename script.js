const chatInput = document.querySelector(".chat-input textarea");
const sendChatBtn = document.querySelector(".chat-input span");
const chatbox = document.querySelector(".chatbox");


// To speak ask a question to chatbot (SpeechRecognition)to chatbot start
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

//To speak ask a question to chatbot  (SpeechRecognition)to chatbot end



//Voice for Question and Answer Code Start
let speech = new SpeechSynthesisUtterance();
let voices = [];
let voiceSelect = document.querySelector("select");

window.speechSynthesis.onvoiceschanged = () => {
    voices = window.speechSynthesis.getVoices();
    speech.voice = voices[0];

    voices.forEach((voice,i) => (voiceSelect.options[i] = new Option(voice.name, i)));
};

document.querySelector(".answer").addEventListener("click", () =>{
     speech.text = document.querySelector(".answerInput").value;
    window.speechSynthesis.speak(speech);
});

document.querySelector(".question").addEventListener("click", () =>{
    speech.text = document.querySelector(".questionInput").value;
   window.speechSynthesis.speak(speech);
});
voiceSelect.addEventListener("change", () =>{
    speech.voice = voices[voiceSelect.value];
});
//Voice for Question and Answer Code end


//Object data to store the Question and answer in key value pair start
let data ={
    ["which tag is used to create a hyperlink"]:"&lt;a&gt;tag",["which tag is used to create a table row"]:"&lt;tr&gt;",
    ["HTML stands for"]:"HyperText Markup Language",["unordered list tag is"]:"&lt;ul&gt",
    ["how to insert an image in HTML"]:"&lt;img src = &quot;jtp.png&quot; /&gt;",["unique name to element class or id"]:"id",
    ["which HTML tag used to display the text with scrolling effect"]:"&lt;marquee&gt;",["the tags in HTML are"]:"not case sensitive",
    ["root tag of the HTML document"]:"&lt;html&gt;", ["comment tag in HTML"]:"&lt;!-- and --!&gt;",
    ["how many days in a week"]:"7 days", ["7 days names"]:"Monday,\n Tuesday,\n Wednesday,\nThursday,Friday,Saturday,Sunday"
}

//Object data to store the Question and answer in key value pair end


//Use to show the Question and Answer in Chatbot code start
let userMessage;
const createChatLi = (message, className) => {
    const chatLi = document.createElement("li");
    chatLi.classList.add("chat",className); 
    let chatContent = className === "outgoing" ? `<p>${message}</p> ` : `<span class="material-symbols-outlined">smart_toy</span>  <p>${message}  </p>  `;
    chatLi.innerHTML = chatContent;
    return chatLi;
}

const handleChat = () => {
    userMessage = chatInput.value.trim();
    if(!userMessage) return;
    chatbox.appendChild(createChatLi(userMessage, "outgoing"));
    

//set time out use to delay the output time
    setTimeout(()=> {
        for(let a in data){
            //compare the object key and our input question
            if(chatInput.value == a){
                //print the value in the object particular expected question answer
                const incomingChatLi = createChatLi(data[a]);  
        chatbox.appendChild(incomingChatLi);
        //  Text area for Answer input
        document.getElementById("textAnswer").innerHTML= data[a];

               //or compare the input answer and object value answer
            }else if (chatInput.value == data[a]){
                //if answer is correct it will print answer is correct
                const incomingChatLi = createChatLi("Your answer is correct 😊"); 
                chatbox.appendChild(incomingChatLi);
                 //  Text area for Answer input
                document.getElementById("textAnswer").innerHTML= "Your answer is correct 😊";
            } 
            
        }
        // Is used to Arithmetic  Operation Code just we used eval key to perform
        {
            const incomingChatLi = createChatLi (eval(chatInput.value)); 
            chatbox.appendChild((incomingChatLi));
             //  Text area for Answer input
            document.getElementById("textAnswer").innerHTML= (eval(chatInput.value));
        }
    },600);

}

//Use to show the Question and Answer in Chatbot code start end

sendChatBtn.addEventListener("click", handleChat); 