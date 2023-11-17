import React, {useEffect} from 'react';
import './home.css'
import logo from '../../assets/logo.svg'
import search from '../../assets/bi_send-fill.svg'
import microphone from '../../assets/Vector.svg'
import Navbar from '../components/navbar/navbar'

const Home = () => {

    const port = "http://localhost:3001";

    let isRecording = false;
    let mediaRecorder;
    let audioChunks = [];
    let audioContext;
    let source;

    async function toggleRecording() {
        if (isRecording) {
          stopRecording();
        } else {
          startRecording();
        }
      }
        
    
        async function startRecording() {
            console.log("Starting recording");
            isRecording = true;

            audioContext = new AudioContext({ sampleRate: 16000 });
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            source = audioContext.createMediaStreamSource(stream);
            mediaRecorder = new MediaRecorder(stream); // Remove mimeType option
            mediaRecorder.ondataavailable = (event) => audioChunks.push(event.data);
            mediaRecorder.onstop = sendAudio;
            mediaRecorder.start();
            
            isRecording = true;
        }
    
        function stopRecording() {
            console.log("Stopping recording")
            if (mediaRecorder) {
                mediaRecorder.stop();
                }
                isRecording = false;
                mediaRecorder.stop();
                source.disconnect();
                audioContext.close();
                sendAudio();
                
            isRecording = false;
        }

        function sendAudio() {
            const audioBlob = new Blob(audioChunks, { type: "audio/mpeg" }); // Updated the type
            const formData = new FormData();
            formData.append("audio", audioBlob);
          
            console.log("Sending audio to server:", audioBlob); // Log the audio blob
          
            // Directly sending the audio to the /speech-to-text endpoint
            fetch(port + "/speech-to-text", { method: "POST", body: formData })
              .then((response) => {
                console.log("Response from server:", response);
                if (!response.ok) {
                  throw new Error("Failed to convert speech to text");
                }
                return response.json();
              })
              .then((data) => {
                document.getElementById("transcription-response").innerHTML = "Transcrição: " + data. transcription;
                return fetch(port + "/analyze", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({ text: data.transcription }),
                });
              })
              .then((response) => {
                if (!response.ok) {
                  throw new Error("Failed to analyze text with NLU");
                }
                return response.json();
              })
              .then((data) => {
                console.log(JSON.stringify(
                  data,
                  null,
                  2
                  ));
                document.getElementById("main").style.display = "none";
                document.getElementById("response-page").style.display = "flex";

                document.getElementById("nlu-response").innerHTML = "Categorias: " +  JSON.stringify(data.categories[0].label);
              })
              .catch((err) => {
                console.error("Error:", err);
              });
          }
    
        const audioButton = document.getElementById('audio-button');
    
        // return () => {
        //   // Remova o ouvinte de clique quando o componente for desmontado
        //   audioButton.removeEventListener('click', toggleRecording);
        // };
  return (
    <div>
      <div className='main' id='main'>
          <img src={logo} className='logo-home'></img>
          <p style={{textAlign: "center", marginBottom: "100px", marginTop: "50px"}}>COMO POSSO <span>AJUDAR</span> VOCÊ HOJE?</p>
          {/* <p style={{textAlign: "center", marginBottom: "100px", marginTop: "50px"}}>{typedText}</p> */}
          <div>
              <div className='line'>
                  <div className='input'>
                      <input className="input-margin"placeholder='Faça uma pergunta'></input>
                      <button className='inputButton'>
                        <img src={search} style={{backgroundColor: "#36175A", width: "30px", height: "30px"}}></img>
                      </button>
                  </div> 
                  <div>
                      <p>OU</p>
                  </div>
                  
                  <div style={{display: "flex", flexDirection: "row",  alignItems: "center"}}>
                      <button className='audio-button' style={{backgroundColor: "#36175A", borderRadius: "500px", border:"none",padding:"20px"}} onClick={toggleRecording}>
                        <img src={microphone} style={{backgroundColor: "#36175A", width: "30px", height: "30px"}}></img>
                      </button>
                  </div>
              </div>
          </div>
      </div>
      <div className='response-page' id='response-page'>
        <div className='response-container'>
          <p id='transcription-response' className='response-text'></p><br></br>
          <p id='nlu-response' className='response-text'></p>
        </div>
      </div>
    </div>
  )
}
export default Home