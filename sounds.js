let musicAudio;

function playSoundSelect() {
    playSound("startsound");
    return 4000;
}

function playSoundLose() {
    playSound("lose");
    return 5000;
}

function playSoundWin() {
    playSound("win");
    return 8000;
}


function playSoundMusic() {
    musicAudio = playSound("song2");
    musicAudio.loop = true;
    return 160000;
}

function stopSoundMusic() {
    musicAudio.pause();
    musicAudio.currentTime = 0;
}


function playSoundTheme() {
    playSound("theme");
    return 34000;
}

function playSound(name) {
    const audio = new Audio('./assets/sounds/' + name + '.mp3');
    audio.play();
    return audio;
}