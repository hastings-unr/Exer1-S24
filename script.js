/**
  * Plays Accelerated Tic-Tac-Toe
  * @date:  03-Mar-24
  * author: Jordan T. Hastings
*/

// globals
const wins = [8,123,456,789,147,258,369,159,357]; 
var
  turn = 0,
  mode = document.getElementById("Mode"),
  btns = document.querySelectorAll("td>input");
/*
  for (var n=8; n>=0; n--)
   btns[n].setAttribute("onClick", "postPlay(this)");
//*/
  btns.forEach( (btn) => { btn.setAttribute("onClick", "postPlay(this)")} );
//btns.forEach( (btn) => { btn.addEventListener("onClick", postPlay(this))} );
    
function toggleMode() { //alert("at toggleMode")
// Switch bewween Start and Clear modes; re-initialize
  if (mode.innerText.charAt(0)=="S") {  // at Start
    mode.innerText = "Clear";
    if (turn==0) initMoves();  // computer goes first 
  } else { // M/b Clear, re-Start
  //for (var n=8; n>=0; n--) btns[n].value = "";
  //btns.forEach ( function(btn) { btn.value = "";} );
    btns.forEach ( (btn) => { btn.value = ""; btn.style = "background-color:transparent";} )
     mode.innerText = "Start";
    turn = 0;
  }  
}

function postPlay(e) { //alert("at postPlay"+e.id)
// Post all plays to the game-board
  function markWin(bk) {
  var k, n, w;
    k = parseInt(bk.slice(1));
    w = wins[k];   // for each possible win
    while (w>0) { // cycle thru cells of triad
      n = w%10; w = (w-n)/10; //alert(n+" "+w)
      btns[n-1].style = "background-color:red";
    }
    setTimeout(alert, 500, bk.slice(0,1)+" Wins!")
  }
  if (mode.innerText.charAt(0)=="S") { //user goes first
    if (turn==0) turn = 2; toggleMode(); 
    }
  if (e.value) return;  // cell occupied
  e.value = (turn<=0 ? "O" : "X");
  turn = (turn>1 ? 1 : -turn);  // after opening, swap players
//if (var b = testGame()) alert(b+" Wins!") <-- not JS
  var bk = testGame(); 
  if (bk) markWin(bk); //was: alert(bk+" Wins!"); 
   else if(turn<0) nextMove();  // by computer
}

function initMoves() { //alert("at initMoves")
// Make two intial computer moves, ~randomly
const n2n1 = 0;  // Testing
  var n1 = Math.trunc(9*Math.random()) +1 //alert(n1)
if (n2n1) n1 = n2n1%10;
  postPlay(btns[n1-1]);
  var n2 = n1; while (n2==n1) n2 = Math.trunc(9*Math.random()) +1;
if (n2n1) n2 = (n2n1-n1)/10;
  turn = -1;
  postPlay(btns[n2-1]);
}

function nextMove() { //alert("at nextMove")
// Make next computer move
  var b,b0, k, m, n,n0,n1, w;
  for (var k=1; k<=8; k++) {  
    w = wins[k]; m = 0; b0 = ""; n1 = 0;  // for each possible win
    while (w>0) { // cycle thru cells of triad
      n = w%10; w = (w-n)/10; //alert(n+" "+w)
      b = btns[n-1].value;  // cell content
      if (!b) { n1 = n; if (!n0) n0 = n1;} // note any empty posn
       else if(!b0) b0 = b; // else first non-empty mark
      if (b0 && b==b0) m++;  // count matching marks in triad
    } //alert(k+" "+m+" "+n1+"'"+b0+"'")
    if (m==2 && n1) { // urgent options: block or win
       postPlay(btns[n1-1]);
     //if (b0=="O") alert("O Wins"); //else alert("X Blocked")
       return; // all done now
    }
  } //console.log(k+" "+m+" "+n1); // some open posn;
  if (!n0) {alert("Board full"); return }
   else if (!n1) n1 = n0;
//postPlay(btns[n1-1]);
//*
  if (!btns[5-1].value) {
    postPlay(btns[5-1]); // always prefer center, 4-ways to win
  } else {
out:{for (k=1; k<=2; k++)  // then corners 3-ways, mid-edges 2-ways
     for (n=k; n<=9; n+=2) //NB: bypasses center (taken above)
      if (!btns[n-1].value) break out;
    } //console.log(k+" "+n);
    postPlay(btns[n-1]);
  }
//*/ 
}
  
function testGame() { //alert("at testGame")
// Test whether the game is over
  var b,b0, k, m, n, w;
  for (var k=1; k<=8; k++) {  
    w = wins[k]; m = 0;  // for each possible win
    while (w>0) { // count matching, non-empty cells
      n = w%10; w = (w-n)/10; //alert(n+" "+w)
      b = btns[n-1].value;  // cell content
      if (!b) continue; // empty posn in triad, nogo
      if (m==0) b0 = b;  // note lead mark of non-empty triad
      if (b==b0) m++;  // count marks matching lead
    } //alert(k+" "+m)
    if (m>=3) return b+k;  //NB: early return
  }
  return false;
}
