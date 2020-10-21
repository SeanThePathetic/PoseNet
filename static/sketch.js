var video;
var poseNet;
var poses=[];
var pose;
var skeleton;
var keypoints=[];
var skeletonNew;
let mobileFlag = false;
let switchFlag = false;
let modelLoadedFlag = false;
let switchBtn;

var poseNetOption_C = {
  architecture: 'ResNet50',
  imageScaleFactor: 0.3,
  outputStride: 32,
  flipHorizontal: false,
  minConfidence: 0.5,
  maxPoseDetections: 5,
  scoreThreshold: 0.5,
  nmsRadius: 20,
  detectionType: 'multiple',
  inputResolution: 257,
  multiplier: 0.75,
  quantBytes: 2,
};
var poseNetOption_M = {
  architecture: 'ResNet50',
  imageScaleFactor: 0.2,
  outputStride: 32,
  flipHorizontal: false,
  minConfidence: 0.5,
  maxPoseDetections: 5,
  scoreThreshold: 0.5,
  nmsRadius: 20,
  detectionType: 'multiple',
  inputResolution: 161,
  multiplier: 0.75,
  quantBytes: 1,
};

var displayOption;

function modelLoaded() {
  console.log('Model Loaded!');
  if(modelLoadedFlag){
    modelLoadedFlag = false;
  }else{
    modelLoadedFlag = true;
  }
}

function getPoses(capturedPoses){
  //for(let bodies = 0; bodies<capturedPoses.length; bodies++){
  //  poses[bodies] = capturedPoses[bodies].pose;
  //}
  if(capturedPoses.length>0){
    pose = capturedPoses[0].pose;
    skeleton = capturedPoses[0].skeleton;
    //console.log(pose);
    //console.log(skeleton);
  }
}

function switchCamera() {
  
  switchFlag = !switchFlag;
  if(mobileFlag){
    if(switchFlag){
      //poseNet.removeListener('pose', modelLoaded);
      video.remove();    
      displayOption = {
        video: {
          facingMode: {
            exact: "environment"
          }
        }        
      };
    }
    else
    {   
      //poseNet.removeListener('pose', modelLoaded);
      video.remove();
      displayOption = {
        video: {
          facingMode: {
            exact: "user"
          }
        }
      };
    }
    
    video = createCapture(displayOption);
    video.hide();
    poseNet = ml5.poseNet(video, poseNetOption_M, modelLoaded);
    poseNet.on('pose', getPoses);
  //resizeCanvas(windowWidth, windowHeight);
  }  
  clear();
}

function mobileCheck() {
  let check = false;
  (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
  return check;
}

function setup() {
  
  mobileFlag = mobileCheck();
  if(mobileFlag){
    createCanvas(displayWidth, displayHeight).parent('canvasHolder');
    displayOption = {
        video: {
          facingMode: {
            exact: "user"
          }
        }      
      };
    video = createCapture(displayOption);
    video.hide();
    poseNet = ml5.poseNet(video, poseNetOption_M, modelLoaded).parent('canvasHolder');
    poseNet.on('pose', getPoses);
  }else{
    createCanvas(displayWidth, displayHeight);
    video = createCapture(VIDEO);
    video.hide();
    poseNet = ml5.poseNet(video, poseNetOption_C, modelLoaded);
    poseNet.on('pose', getPoses);
  }
  
  for(let i=0;i<17;i++){
    keypoints[i] = {x:0,y:0};
  }  
  switchBtn = createButton('Switch Camera').parent('nParticles');
  switchBtn.position(10, 10);
  switchBtn.mousePressed(switchCamera);  
  
}

function draw() {
  if(mobileFlag){
    if(switchFlag)image(video,0,0);
    else{
      translate(video.width,0); // move to far corner
      scale(-1.0,1.0);    // flip x-axis backwards
      image(video,0,0);}
  }
  else{
    translate(video.width,0); // move to far corner
    scale(-1.0,1.0);    // flip x-axis backwards
    image(video,0,0); 
  }
  //console.log(pose);
  if(pose){
        for(let i =0; i<skeleton.length;i++){
      let a = skeleton[i][0];
      let b = skeleton[i][1];
      strokeWeight(2);
      stroke(255);
          if(a.position.x<video.width-8&&b.position.x<video.width-8&&
             a.position.y<video.height-8&&b.position.y<video.height-8){
            line(a.position.x,a.position.y,b.position.x,b.position.y);
          }      
    }
    //for(let bodies = 0; bodies<poses.length; bodies++){
    for(let keypoint = 0; keypoint<pose.keypoints.length;keypoint++){
      let x = pose.keypoints[keypoint].position.x;
      let y = pose.keypoints[keypoint].position.y;
      keypoints[keypoint].x = round(lerp(keypoints[keypoint].x,x,0.5));
      keypoints[keypoint].y = round(lerp(keypoints[keypoint].y,y,0.5));
      //console.log(keypoints);
      if(keypoints[keypoint].x<video.width-8 &&keypoints[keypoint].y<video.height-8){
        fill(50,150,255);
        ellipse(keypoints[keypoint].x,keypoints[keypoint].y,15,15);
          }            
    }
  //}
    let vectorStandard = createVector(1,0);
    let vectorLeftUpperArm = 
        createVector( pose.keypoints[5].position.x - pose.keypoints[7].position.x,
                      pose.keypoints[5].position.y - pose.keypoints[7].position.y );
    let vectorLeftLowerArm = 
        createVector( pose.keypoints[9].position.x - pose.keypoints[7].position.x,
                      pose.keypoints[9].position.y - pose.keypoints[7].position.y );
    let angleLeftElbow = abs(degrees(vectorLeftUpperArm.angleBetween(vectorLeftLowerArm)));
    let angleLeftUpperArm = vectorStandard.angleBetween(vectorLeftUpperArm);
    let angleLeftLowerArm = vectorStandard.angleBetween(vectorLeftLowerArm);
    
    noFill();
    if(angleLeftUpperArm>angleLeftLowerArm){
      if(angleLeftUpperArm-angleLeftLowerArm>PI){
        arc(pose.keypoints[7].position.x,pose.keypoints[7].position.y,50,50,
        vectorStandard.angleBetween(vectorLeftUpperArm),vectorStandard.angleBetween(vectorLeftLowerArm));
      }
      else{
        arc(pose.keypoints[7].position.x,pose.keypoints[7].position.y,50,50,
        vectorStandard.angleBetween(vectorLeftLowerArm),vectorStandard.angleBetween(vectorLeftUpperArm));
      }
    }
    else{
      if(angleLeftLowerArm-angleLeftUpperArm<PI){
        arc(pose.keypoints[7].position.x,pose.keypoints[7].position.y,50,50,
        vectorStandard.angleBetween(vectorLeftUpperArm),vectorStandard.angleBetween(vectorLeftLowerArm));
      }
      else{
        arc(pose.keypoints[7].position.x,pose.keypoints[7].position.y,50,50,
        vectorStandard.angleBetween(vectorLeftLowerArm),vectorStandard.angleBetween(vectorLeftUpperArm));
      }
    }    

    textSize(30);
    stroke(color(0, 0, 0));
    fill(color(255, 255, 255));
    if(mobileFlag){
      if(switchFlag){   
        text(round(angleLeftElbow), keypoints[7].x,keypoints[7].y - 20); 
      }else{  
        scale(-1,1);    
        text(round(angleLeftElbow), -keypoints[7].x,keypoints[7].y - 20); 
      }    
    }
    else{
      scale(-1,1);
      text(round(angleLeftElbow), -keypoints[7].x,keypoints[7].y - 20)
    }
  }else{
    for(let i=0;i<17;i++){
    keypoints[i] = {x:0,y:0};
    }
    console.log("No poses detected!");
  }  
}