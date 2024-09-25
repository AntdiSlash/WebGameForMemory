const menu = document.createElement("div");

menu.append(title = document.createElement("div"));

startButton = document.createElement("button");
startButton.addEventListener("click", startGame, {once: true});

restartButton = document.createElement("button");
restartButton.className = "startButt";

createMenu();

let pred = '';
let container = document.createElement("div");
let konec = 0;

function createMenu()
{
    menu.className = "menu";
     
    title.className = "header";
    title.textContent= "ИГРА НА ПАМЯТЬ";

    startButton.textContent = "Начать";
    startButton.className = "startButt";
    
    document.addEventListener("keydown", (event)=>{
        if(event.key == 'Enter')        
            startButton.click();
    });
    
    document.body.append(menu);

    menu.append(startButton)

}

function startGame()
{
    menu.remove();
    
    let green = 6; let blue = 6; let red = 6; let yellow = 6; let brown = 6;
    container.className = "container";
    document.body.append(container);
    for(let i = 0; i<30; i++)
    {
        let sq = document.createElement("div");
        while (green != 0 || blue != 0 || red != 0 || yellow != 0 || brown != 0)
        {
            let t =getRandomInt(5);
            if (t == 0 && green != 0) {sq.className = "square green square_close";  green--; break;}
            else if (t == 1 && blue != 0) {sq.className = "square blue square_close"; blue--; break; }
            else if (t == 2 && red != 0) {sq.className = "square red square_close"; red--;break;}
            else if (t == 3 && yellow != 0) {sq.className = "square yellow square_close"; yellow--;break;}
            else if (t == 4 && brown != 0) {sq.className = "square brown square_close"; brown--;break;}
        }
        container.append(sq);
    }
   
    container.addEventListener('click', play_game, {once: true});

}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function play_game(event)
{
    
    
    let tek = event.target;
        if (tek.classList.contains("square_close")) {
            tek.classList.remove("square_close");
            container.removeEventListener('click', play_game);
            
            if(pred == '') {
                pred = tek;
                container.addEventListener('click', play_game);
            } 
            else if(pred.className == tek.className)
                {
                   setTimeout(()=>{
                       tek.remove();
                       pred.remove();
                      
                       pred = '';
                       konec++; 
                   container.addEventListener('click', play_game);
                   if(konec == 15)
                    {
                        container.remove();
                        cong = document.createElement("div");
                        cong.textContent = "Поздравляю. Вы прошли игру";
                        cong.className = "header";
                        restartButton.textContent = "Перезапустить";
                        document.body.append(cong);
                        document.body.append(restartButton);
        
                        restartButton.addEventListener('click', ()=>{
                            document.body.append(menu);
                            konec = 0;
                            pred = '';
                            cong.remove();
                            restartButton.remove();
                            startButton.addEventListener("click", startGame, {once: true});
                        });
                    }}, 1000);
                }
            else {
                setTimeout(()=>{
                    pred.classList.add("square_close");
                    tek.classList.add("square_close");
                    pred = '';
                container.addEventListener('click', play_game);}, 1000);
            }
        }
}