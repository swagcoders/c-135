

objects=[];


status="";

function preload(){

    video = createVideo('video.mp4');
  }
  
  
  function setup() {
    canvas = createCanvas(480, 380);
    canvas.center();
video.hide();
  }

  function start(){
    objectDetector=ml5.objectDetector("cocossd",modelLoaded);
    document.getElementById("status").innerHTML="status: detecting objects";
    
  }

  
  function modelLoaded(){
    console.log("modelLoaded");
    status=true;
    video.loop();
    video.speed(1);
    video.volume(0);
    
  }

  function gotResult(error,results){
    if(error){
        console.log(error);
    }

    console.log(results);
    objects=results;
  }

  function draw(){
    image(video, 0, 0, 480,380);
    if(status!=""){
      objectDetector.detect(video,gotResult);
      for(var i=0; i <objects.length; i++){
        document.getElementById("status").innerHTML="status: Objects detected";
        document.getElementById("number_of_Objects").innerHTML="number of  Objects detected are: " + objects.length;

        fill("black");
        percent=floor(objects[i].confidence * 100);
        text(objects[i].label + "" + percent + "%",objects[i].x+15, objects[i].y+15);  
        noFill();
        stroke("blue");
        rect(objects[i].x, objects[i].y,objects[i].width,objects[i].height );
      }

    }

   
  }