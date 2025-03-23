import { Application, Assets, Text, TextStyle } from "pixi.js";
import { Spine } from "@esotericsoftware/spine-pixi-v8";

(async () => {
  // Create a new application
  const app = new Application();
  // Initialize the application
  await app.init({ background: "#1099bb", resizeTo: window });
  document.getElementById("pixi-container")!.appendChild(app.canvas);

  let loop = false;

  const onButtonClick = (animate: string, loop: boolean) => {
    GlassData.state.addAnimation(0, animate, false);
    GlassData.state.addAnimation(0, "static", false);
    loop ? GlassData.state.addAnimation(0, animate, loop) : "";
  };

  const style = new TextStyle({
    fillGradientType: 1,
    fontFamily: "Courier New",
    fontSize: 66,
    fontWeight: "600",
    miterLimit: 33,
    padding: "",
    stroke: "#a69191",
    strokeThickness: 28,
  });

  const redLoop = new TextStyle({
    fillGradientType: 1,
    fontFamily: "Courier New",
    fontSize: 66,
    fontWeight: "600",
    miterLimit: 33,
    padding: "",
    stroke: "#e14747",
    strokeThickness: 28,
  });

  const greenLoop = new TextStyle({
    fillGradientType: 1,
    fontFamily: "Courier New",
    fontSize: 66,
    fontWeight: "600",
    miterLimit: 33,
    padding: "",
    stroke: "#47e175",
    strokeThickness: 28,
  });

  //glass data
  Assets.add([{ alias: "lowpayJson", src: "/assets/lowpay/lowpay3.json" }]);
  Assets.add([{ alias: "lowpayAtlas", src: "/assets/lowpay/lowpay3.atlas" }]);
  
  //background data
  Assets.add([{ alias: "BaseGameJson", src: "/background/BaseGame_BG.json" }]);
  Assets.add([{ alias: "BaseGameAtlas", src: "/background/BaseGame_BG.atlas" }]);
  
  //load all glass assets
  await Assets.load(["lowpayImage", "lowpayJson", "lowpayAtlas"]);
  
  //load all background asste
  await Assets.load(["BaseGameImage", "BaseGameJson", "BaseGameAtlas"]);
  
  const GlassData = Spine.from({
    atlas: "lowpayAtlas",
    skeleton: "lowpayJson",
  });

  const Background = Spine.from({
    atlas: "BaseGameAtlas",
    skeleton: "BaseGameJson"
  })

  Background.y = window.innerHeight/2
  Background.x = window.innerHeight
  Background.state.addAnimation(0, "animation", true)
  console.log("Background", Background)


  app.stage.addChild(Background)

  GlassData.x = window.innerWidth / 2;
  GlassData.y = window.innerHeight / 2;
  GlassData.width = 200
  GlassData.height= 200
  console.log("SpineData", GlassData);

  //destroy text button
  const destroy = new Text({
    text: "destroy",
    style,
  });

  destroy.cursor = "pointer";
  destroy.eventMode = "static";
  destroy.on("click", () => onButtonClick("destroy", loop));
  destroy.x = 100;
  destroy.y = 100
  app.stage.addChild(destroy);

  //static text button
  const staticc = new Text({
    text: "static",
    style,
  });
  staticc.x = window.innerWidth - 400;
  staticc.y = 100
  staticc.cursor = "pointer";
  staticc.eventMode = "static";
  staticc.on("click", () => onButtonClick("static", loop));
  app.stage.addChild(staticc);

  //land text button
  const land = new Text({
    text: "land",
    style,
  });
  land.x = window.innerWidth - 400;
  land.y = window.innerHeight - 200
  land.cursor = "pointer";
  land.eventMode = "static";
  land.on("click", () => onButtonClick("land", loop));
  app.stage.addChild(land);

  //match text button
  const match = new Text({
    text: "match",
    style,
  });
  match.x = 100;
  match.y = window.innerHeight - 200
  match.cursor = "pointer";
  match.eventMode = "static";
  match.on("click", () => onButtonClick("match", loop));
  app.stage.addChild(match);
  
  //loop button
  const loopBut = new Text({
    text: "loop",
    style: redLoop
  });
  loopBut.x = window.innerWidth /2 - 100;
  loopBut.y = 100
  loopBut.cursor = "pointer";
  loopBut.eventMode = "static";
  loopBut.on("click", () => {
    loop = !loop
    if(loop){
      loopBut.style = greenLoop
    }
    else{
      loopBut.style = redLoop
    }
  });

  app.stage.addChild(loopBut);


  //adding glass spine in last
  app.stage.addChild(GlassData);

  // Listen for animate update
  app.ticker.add((time) => {});
})();
