song1 = "";
song2 = "";

rightWristX = 0;
rightWristY = 0;

leftWristX = 0;
leftWristY = 0;

scoreLeftWrist = 0;
scoreRightWrist = 0;

songStatus1 = "";
songStatus2 = "";

function preload(){
    song1 = loadSound("music.mp3");
    song2 = loadSound("music2.mp3");
}


function setup(){
    canvas = createCanvas(600, 500);
    canvas.position(665,225);

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on("pose", gotPoses);
}

function modelLoaded(){
    console.log("PoseNet Is Initialized");
}

function gotPoses(results)
{
    if(results.length > 0)
    {
        console.log(results);

        scoreLeftWrist = results[0].pose.keypoints[9].score;
        console.log("Left wrist score: " + scoreLeftWrist);

        scoreRightWrist = results[0].pose.keypoints[10].score;
        console.log("Right wrist score: " + scoreRightWrist);


        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("leftWristX = " + leftWristX + " leftWristY = " + leftWristY);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("rightWristX = " + rightWristX + " rightWristY = " + rightWristY);
    }
}


    function draw() {
        image(video, 0, 0, 600, 500);
    
        fill("#FF0000");
        stroke("#FF0000");
    
        songStatus1 = song1.isPlaying();
        songStatus2 = song2.isPlaying();


        if( scoreLeftWrist > 0.2){
        circle(leftWristX, leftWristY, 20);
        song2.stop();
       
        if(songStatus1 == false)
        {
            song1.play();
            document.getElementById("stop").style.display="inline-block";
            document.getElementById("song_name").style.display="inline-block";

            document.getElementById("song_name").innerHTML= "Harry Potter";
            document.getElementById("stop").innerHTML= "Stop";
        }
        }

        if( scoreRightWrist > 0.2){
            circle(rightWristX, rightWristY, 20);
            song1.stop();
            if(songStatus2 == false)
        {
            song2.play();
            document.getElementById("stop").style.display="inline-block";
            document.getElementById("song_name").style.display="inline-block";

            document.getElementById("song_name").innerHTML= "Peter Pan";
            document.getElementById("stop").innerHTML= "Stop";
        }
            }
    }

function play(){
    song.play();
    song.volume(1);
    song.rate(1);
}

function stop(){
    song1.stop();
    song2.stop();
    document.getElementById("stop").style.display="none";
    document.getElementById("song_name").style.display="none";
    
    
}
