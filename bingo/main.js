let user = [];
let sys = [];
let activeUser = [];
let activeSys = [];
let sysLog = [];
let userLog = [];
let u = 0;
let s = 0;

let turnState = true;

function start(eleId, player, state, x, arr2, oppPl, fun, arr3) {
  document.querySelector(`.${eleId}`).innerHTML = "";
  let binVal = ranNum();

  for (let i = 0; i < 25; i++) {
    setTimeout(() => {
      let dm = document.createElement("div");
      let em = document.createElement("button");
      em.className = `plBt ${player}`;
      em.id = `${player}${i}`;
      em.textContent = binVal[i];

      em.addEventListener("click", (e) => {
        turnUpdate(binVal[i], e.target.id, arr2, player, oppPl);
        turnState = state;
        play();
        if (player === "user") {
          setTimeout(() => {
            sysChoose(sysLog);
          }, 1000);
        }

        let userCount = countClick(user);
        let sysCount = countClick(sys);
        if (userCount > 5 || sysCount > 5) {
          checkWin(userLog, "user");
          checkWin(sysLog, "sys");
        }
        document.querySelector("#btClick").play();
      });
      dm.appendChild(em);

      let dmEle = dm.firstElementChild;
      document.querySelector(`.${eleId}`).appendChild(dmEle);
      document.querySelector("#btLoad").play();

      x.push({
        val: binVal[i],
        reqBy: "",
        isClick: false,
        id: `${player}${i}`,
        txt: binVal[i],
      });
    }, i * 50);
  }
  update1(x, arr3);

  setTimeout(() => {
    player === "user" ? fun(x, activeUser) : fun(x, activeSys);
  }, 3000);
}

function turnUpdate(value, eleId, arr, reqGive, opp) {
  if (reqGive === "user") {
    for (let u = 0; u < user.length; u++) {
      if (user[u].val === value) {
        document.querySelector(`#user${u}`).style.backgroundColor = "green";
        user[u].isClick = true;
        user[u].reqBy = reqGive;
        break;
      }
    }
    for (let s = 0; s < sys.length; s++) {
      if (sys[s].val === value) {
        document.querySelector(`#sys${s}`).style.backgroundColor = "red";
        sys[s].isClick = true;
        sys[s].reqBy = reqGive;
        break;
      }
    }
  } else {
    for (let s = 0; s < sys.length; s++) {
      if (sys[s].val === value) {
        document.querySelector(`#sys${s}`).style.backgroundColor = "red";
        sys[s].isClick = true;
        sys[s].reqBy = reqGive;
        break;
      }
    }

    for (let u = 0; u < user.length; u++) {
      if (user[u].val === value) {
        document.querySelector(`#user${u}`).style.backgroundColor = "green";
        user[u].isClick = true;
        user[u].reqBy = reqGive;
        break;
      }
    }
  }
}

function update1(arr, arr2) {
  arr2 = [
    [arr[0], arr[1], arr[2], arr[3], arr[4]],
    [arr[5], arr[6], arr[7], arr[8], arr[9]],
    [arr[10], arr[11], arr[12], arr[13], arr[14]],
    [arr[15], arr[16], arr[17], arr[18], arr[19]],
    [arr[20], arr[21], arr[22], arr[23], arr[24]],
  ];
}

function update2(ar1, ar2) {}

function setNum() {
  let num = [];
  for (let i = 1; i <= 25; i++) {
    num.push(i);
  }
  return num;
}

function ranNum() {
  let x = setNum();
  let y = [];
  for (let i = 0; i < 25; i++) {
    let ran = Math.floor(Math.random() * x.length);
    y.push(x[ran]);
    x.splice(ran, 1);
  }

  return y;
}

function tapBt(idName) {
  document.querySelector(`#${idName}`).style.backgroundColor = "red";
  document.querySelector("#btClick").play();
}

function showTurn() {
  if (turnState) {
    document.querySelector(".turnPl").style.display = "flex";
    document.querySelector(".turnSys").style.display = "none";
  } else {
    document.querySelector(".turnPl").style.display = "none";
    document.querySelector(".turnSys").style.display = "flex";
  }
}

function play() {
  if (turnState) {
    showTurn();
    setTimeout(() => {
      let sys = document.querySelectorAll(".sys");
      sys.forEach((ele) => {
        ele.style.pointerEvents = "none";
      });

      let us = document.querySelectorAll(".user");
      us.forEach((ele) => {
        ele.style.pointerEvents = "auto";
      });
    }, 500);
  } else if (!turnState) {
    showTurn();

    let sys = document.querySelectorAll(".sys");
    sys.forEach((ele) => {
      ele.style.pointerEvents = "auto";
    });

    let us = document.querySelectorAll(".user");
    us.forEach((ele) => {
      ele.style.pointerEvents = "none";
    });
  }
}

function alot(arr, q) {
  let p = [
    [arr[0], arr[1], arr[2], arr[3], arr[4]],
    [arr[5], arr[6], arr[7], arr[8], arr[9]],
    [arr[10], arr[11], arr[12], arr[13], arr[14]],
    [arr[15], arr[16], arr[17], arr[18], arr[19]],
    [arr[20], arr[21], arr[22], arr[23], arr[24]],
  ];
  q.push(...p);

  return q;
}

function loadLog(arr, arr2) {
  arr2.push(...arr);

  for (let i = 0; i < 5; i++) {
    arr2.push(arr.map((ele) => ele[i]));
  }

  arr2.push(
    arr.map((ele, i) => {
      return ele[i];
    })
  );

  arr2.push(arr.map((ele, i) => ele[4 - i]));
}

function checkWin(arr, pl) {
  if (u >= 5) {
    document.querySelector(".turnShow").innerText = "User Won the Game";
    return;
  } else if (s >= 5) {
    document.querySelector(".turnShow").innerText =
      "Opponent Won the Game & User Loose the Game";
    return;
  }
  // console.log("check is running");
  else {
    arr.forEach((ele, i) => {
      let count = ele.filter((d) => {
        return d.isClick && !["B" && "I" && "N" && "G" && "O"].includes(d.txt);
      }).length;
      console.log(count);
      if (count == 5) {
        pl == "user" ? u++ : s++;
        ch(arr[i]);
      }
    });
    // console.log("keep Playing");
  }
}

function ch(ar) {
  // console.log("check2 is running");
  // console.log(ar, "founded");
  let name = "BINGO";
  ar.forEach((ele, i) => {
    ele.txt = name.charAt(i);
    // document.querySelector(`#${ele.id}`).innerText = name.charAt(i);
    document.querySelector(`#${ele.id}`).style.backgroundColor = "yellow";
    document.querySelector(`#${ele.id}`).style.color = "red";
  });
  setTimeout(() => {
    document.querySelector("#win").play();
  }, 300);
}

function sysChoose(arr) {
  let choosen = -1;
  let bestLine = null;
  arr.forEach((ele, i) => {
    let count = ele.filter((o, m) => {
      return o.isClick && !["B", "I", "N", "G", "O"].includes(o.txt);
    }).length;
    if (count > choosen && count < 5) {
      choosen = count;
      bestLine = arr[i];
    }
  });
  // console.log(choosen);
  // console.log(bestLine);
  chooseItem(bestLine);
}

function chooseItem(arr) {
  console.log(arr);
  let a = arr.find((ele) => {
    return !ele.isClick;
  });
  console.log(a);
  document.querySelector(`#${a.id}`).click();
}

function countClick(arr) {
  let com = arr.filter((ele) => {
    return ele.isClick;
  }).length;
  return com;
}

// -----------------------------
// 1. Represent the Board
// -----------------------------
// let board = [
//   [1, 2, 3, 4, 5],
//   [6, 7, 8, 9, 10],
//   [11, 12, 13, 14, 15],
//   [16, 17, 18, 19, 20],
//   [21, 22, 23, 24, 25],
// ];

// -----------------------------
// 2. Track chosen numbers
// -----------------------------
// let chosen = new Set();

// -----------------------------
// 3. Define all winning lines
// -----------------------------
// let winningLines = [
//   // Rows
//   [1, 2, 3, 4, 5],
//   [6, 7, 8, 9, 10],
//   [11, 12, 13, 14, 15],
//   [16, 17, 18, 19, 20],
//   [21, 22, 23, 24, 25],
//   // Columns
//   [1, 6, 11, 16, 21],
//   [2, 7, 12, 17, 22],
//   [3, 8, 13, 18, 23],
//   [4, 9, 14, 19, 24],
//   [5, 10, 15, 20, 25],
//   // Diagonals
//   [1, 7, 13, 19, 25],
//   [5, 9, 13, 17, 21],
// ];

// // -----------------------------
// // 4. Computer Strategy Function
// // -----------------------------
// function computerChoose() {
//   let bestLine = null;
//   let maxChosen = -1;

//   // Find the line closest to completion
//   for (let line of winningLines) {
//     let chosenCount = line.filter((num) => chosen.has(num)).length;
//     if (chosenCount > maxChosen && chosenCount < line.length) {
//       maxChosen = chosenCount;
//       bestLine = line;
//     }
//   }

//   // Pick first unchosen number from best line
//   let nextNum = bestLine.find((num) => !chosen.has(num));
//   chosen.add(nextNum);
//   return nextNum;
// }

// // -----------------------------
// // 5. Utility: Check if a line is complete
// // -----------------------------
// // function checkWin() {
// //   for (let line of winningLines) {
// //     if (line.every((num) => chosen.has(num))) {
// //       return true; // Winning line found
// //     }
// //   }
// //   return false;
// // }

// // -----------------------------
// // 6. Example Run
// // -----------------------------
// // console.log("Computer starts choosing...");

// // chosen.add(1);
// // chosen.add(2);
// // chosen.add(3);

// // let move = computerChoose();
// // console.log("Computer chose:", move);

// // if (checkWin()) {
// //   console.log("Computer completed a line! 🎉");
// // } else {
// //   console.log("No win yet, keep playing...");
// // }
