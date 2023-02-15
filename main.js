Webcam.set({
    width:350,
    height :300,
    image_format:'png',
    png_qualtiy:90
});
camera=document.getElementById("camera");
Webcam.attach(camera);
function take_snapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML='<img id="captured_image"src="'+data_uri+'">';
    });
}
console.log("ml5 version:",ml5.version);
classifier=ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/-uyeeYk49/modal.json',modelLoaded);
function modelLoaded(){
    console.log("Model Loaded ");
}
prediction1="";


function speak(){
    var synth=window.speechSynthesis;
    speak_data_1="The First Prediction is "+prediction1;
    
    var utterThis= new SpeechSynthesisUtterance(speak_data_1);
    synth.speak(utterThis);
}
function check(){
    img = document.getElementById("captured_image");
    classifier.classify( img ,gotResult);
}
function gotResult(error,results){
    if(error){
        console.log(error);
    }
    else {
        console.log(results);
        document.getElementById("result_emotion_name").innerHTML=results[0].label;

        prediction1=results[0].label;
       
        speak();
        if (results[0].label=="VICTORY"){
            document.getElementById("update_emoji").innerHTML= " &#9996;";
        }
        if (results[0].label=="GOOD"){
            document.getElementById("update_emoji").innerHTML= "&#128076;";
        }
        if (results[0].label=="NICE"){
            document.getElementById("update_emoji").innerHTML= "&#128077;";

        }
     

        


    }

}