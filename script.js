const element = document.getElementById("text");
const buttons = document.getElementById("buttons");
const music = document.getElementById("music");
const heartContainer = document.getElementById("heart-container");
const rainContainer = document.getElementById("rain-container");
const form = document.getElementById("response-form");
const inputResposta = document.getElementById("input-resposta");

const phrases = [
  "i ala, que gay mano, af, confessso q to com sdd de vc :(",
  "minha vidinha ta muito parada, af",
  "adoraria se a gente pudesse voltar a se ver",
  ":>"
];

let phraseIndex = 0;
let charIndex = 0;

function typePhrase() {
  if (charIndex < phrases[phraseIndex].length) {
    element.textContent += phrases[phraseIndex].charAt(charIndex);
    charIndex++;
    setTimeout(typePhrase, 70);
  } else {
    if (phraseIndex < phrases.length - 1) {
      setTimeout(() => {
        element.textContent = "";
        charIndex = 0;
        phraseIndex++;
        typePhrase();
      }, 1500);
    } else {
      setTimeout(() => {
        buttons.classList.remove("hidden");
        buttons.classList.add("show");

        const btnSim = buttons.querySelector(".choice:nth-child(1)");
        const btnNao = buttons.querySelector(".choice:nth-child(2)");

        btnSim.addEventListener("click", () => {
          playMusic("musica/careless_whisper.mp3");
          activateRomanticMode();
          enviarResposta("sim");
        });

        btnNao.addEventListener("click", () => {
          playMusic("musica/naruto_triste.mp3");
          activateSadMode();
          enviarResposta("não");
        });
      }, 1000);
    }
  }
}

function playMusic(src) {
  music.pause();
  music.src = src;
  music.currentTime = 0;
  music.play();
}

function activateRomanticMode() {
  document.body.classList.add("romantic");
  buttons.style.display = "none";
  startHeartRain();
}

function activateSadMode() {
  document.body.classList.add("sad");
  buttons.style.display = "none";
  startRain();
}

function startHeartRain() {
  setInterval(() => {
    const heart = document.createElement("div");
    heart.classList.add("heart");
    heart.textContent = "❤️";
    heart.style.left = `${Math.random() * 100}%`;
    heart.style.fontSize = `${16 + Math.random() * 24}px`;
    heartContainer.appendChild(heart);

    setTimeout(() => {
      heart.remove();
    }, 4000);
  }, 300);
}

function startRain() {
  setInterval(() => {
    const drop = document.createElement("div");
    drop.classList.add("raindrop");
    drop.style.left = `${Math.random() * 100}%`;
    rainContainer.appendChild(drop);

    setTimeout(() => {
      drop.remove();
    }, 4000);
  }, 100);
}

function enviarResposta(resposta) {
  inputResposta.value = resposta;

  const formData = new FormData(form);

  fetch(form.action, {
    method: form.method,
    body: formData,
    headers: {
      'Accept': 'application/json'
    }
  })
  .then(response => {
    if (response.ok) {
      console.log('Resposta enviada com sucesso!');
      // Aqui você pode mostrar mensagem customizada, se quiser
    } else {
      console.error('Erro ao enviar resposta.');
    }
  })
  .catch(error => {
    console.error('Erro no fetch:', error);
  });
}

typePhrase();
