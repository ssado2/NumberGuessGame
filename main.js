//랜덤번호지정
//유저가 번를 입력한다 그고 go라는 버튼을 누름
//만약에 유저가 랜덤번호를 맞추면, 맞췄습니다!
//랜덤번호가 < 유저번호 Down!!
//랜덤번호가 > 유저번호 Up!!
//Reset버튼을 누르면 게임이 리셋된다
//5번 기회흫 다쓰면 게임이 끝난다 (더이상 추측불가, 버튼이 disable)
//유저가 1~100 범위 밖에 숫자를 입력하면 알려준다. 기회를 깎지 않는다
//유저가 이미 입력한 숫자를 또 입력하면 알려준다. 기회를 깎지 않는다

let computerNum = 0;
let playButton = document.getElementById("playButton");
let userInput = document.getElementById("userInput");
let resultArea = document.getElementById("resultArea");
let resetButton = document.getElementById("resetButton");
let chanceArea = document.getElementById("chanceArea");

const chanceLimit = 5;

let chances = 0;
let prevNums = [];
let gameOver = false;

playButton.addEventListener("click", play);
userInput.addEventListener("focus", function () {
  userInput.value = "";
});
resetButton.addEventListener("click", reset);

function pickRandomNum() {
  computerNum = Math.floor(Math.random() * 100) + 1;
  console.log("정답", computerNum);
}

function play() {
  let userValue = userInput.value;

  if (userValue < 1 || userValue > 100) {
    resultArea.textContent = "1과 100사이의 숫자를 입력해 주세요";
    return;
  }

  if (prevNums.includes(userValue)) {
    resultArea.textContent =
      "이미 입력한 숫자입니다. 다른 숫자를 입력해 주세요";
    return;
  }

  prevNums.push(userValue);
  chances = chanceLimit - prevNums.length;

  chanceArea.textContent = `남은 기회 : ${chances}번`;

  if (userValue < computerNum) {
    resultArea.textContent = "Guess Bigger Number!!!";
  } else if (userValue > computerNum) {
    resultArea.textContent = "Guess Smaller Number!!!";
  } else {
    resultArea.textContent = "YOU GOT THE CORRECT NUMBER!!";
    gameOver=true;
  }

  if (chances < 1) {
    gameOver = true;
  }

  if (gameOver) {
    playButton.disabled = true;
  }
}

function reset() {
  //user input이 깨끗하게 정리되고 결과부분과 남은기회가 리셋된다
  userInput.value = "";
  resultArea.textContent = "결과가 여기 나옵니다";
  chanceArea.textContent = "남은 기회 : 5번";
  playButton.disabled = false;
  //새로운 번호가 생성되고
  pickRandomNum();
  //변수를 리셋한다
  chances = 0;
  prevNums = [];
  gameOver = false;
}

pickRandomNum();
