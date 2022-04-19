var prisoner, prisonerIdleImg, prisonerLeftImg, prisonerRightImg;
var bgImg;
var invisibleGround;
var platformLeftImg, platformImg, platformRightImg;
var startingPlatform, platformGroup, platform;

function preload(){
    prisonerIdleImg = loadImage("assets/Prisoner_Idle-removebg-preview.png");
    prisonerLeftImg = loadImage("assets/Prisoner_Running-removebg-preview(1).png");
    prisonerRightImg = loadImage("assets/Prisoner_Running-removebg-preview.png");
    bgImg = loadImage("assets/Background.png");
    platformLeftImg = loadImage("assets/tile1.png");
    platformImg = loadImage("assets/tile2.png");
    platformRightImg = loadImage("assets/tile3.png");
}

function setup(){
    createCanvas(windowWidth,windowHeight);
    
    invisibleGround = createSprite(windowWidth/2, windowHeight-20, windowWidth, 10);

    startingPlatform = createSprite(windowWidth/2, windowHeight-50, 20, 20)
    
    
    prisoner = createSprite(startingPlatform.x,windowHeight-80,20,20);
    prisoner.addImage("idle",prisonerIdleImg);
    prisoner.addImage("left",prisonerLeftImg);
    prisoner.addImage("right",prisonerRightImg);

    startingPlatform.addImage("middle",platformImg);
    
    prisoner.scale = 0.3;

}

function draw(){
    background(bgImg);

    spawnPlatform();

    

    if(keyIsDown(UP_ARROW)){
        prisoner.y = prisoner.y -5;
    }

    if(keyIsDown(LEFT_ARROW)){
        prisoner.changeImage("left");
        prisoner.x = prisoner.x -5;
    }

    if(keyWentUp(LEFT_ARROW)){
        prisoner.changeImage("idle");
    }

    if(keyIsDown(RIGHT_ARROW)){
        prisoner.changeImage("right");
        prisoner.x = prisoner.x +5;
    }

    if(keyWentUp(RIGHT_ARROW)){
        prisoner.changeImage("idle");
    }

    if(keyIsDown(DOWN_ARROW)){
        prisoner.y = prisoner.y +5
    }

    prisoner.y = prisoner.y + 2.5;

    prisoner.collide(invisibleGround);
    prisoner.collide(startingPlatform);

    platformGroup = new Group;

    //Platform collision not working, tweak spawn time and locations:
    function spawnPlatform(){
        if(frameCount % 100 === 0){
            platform = createSprite(60,60,20,20);
            platform.x = round(random(prisoner.x-500, prisoner.x+500));
            platform.y = round(random(prisoner.y-200, prisoner.y-50));
            platform.addImage(platformImg);
            platformGroup.add(platform);
        }
    }

    //Work in progress:
    if(prisoner.y < 0){
        prisoner.y = windowHeight-20;
        platformGroup.removeSprites();
    }



    drawSprites()
}