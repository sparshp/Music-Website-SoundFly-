const previous = document.querySelector('#previous');
const play = document.querySelector('#play');
const next = document.querySelector('#next');
const title = document.querySelector('#title');
const image = document.querySelector('#image');
const track = document.createElement('audio');
const recent_volume= document.querySelector('#volume');
const volume_show = document.querySelector('#volume_show');
const slider = document.querySelector('#duration_slider');
const show_duration = document.querySelector('#show_duration');
const auto_play = document.querySelector('#auto');
const present = document.querySelector('#present');
const total = document.querySelector('#total');
const artist = document.querySelector('#artist');

let index = 0;
let playingSong = false;

let timer;
let autoplay = 0;


let songs = [{
        name: 'Love Like This',
        path: "./songs/love-like-this.mp3",
        image: './images/audio1.jpg',
    },
    {
        name: 'Pay Phone',
        path: './songs/payphone.mp3',
        image: './images/audio2.jpg',
    },
    {
        name: 'Intentions',
        path: './songs/intentions.mp3',
        image: './images/audio3.jpg',
    },
    {
        name: 'How Long',
        path: './songs/how-long.mp3',
        image: './images/audio4.jpg',
    },
    {
        name: 'Lets Get Crazy',
        path: './songs/lets-get-crazy.mp3',
        image: './images/audio5.jpg',
    }
];

function loadTrack(index) {
    clearInterval(timer);
	
    track.src = songs[index].path;
    title.innerHTML = songs[index].name;
    image.src = songs[index].image;
    track.load();

    timer = setInterval(range_slider ,1000);
	total.innerHTML = songs.length;
	present.innerHTML = index + 1;
}

loadTrack(index);

//mute sound function
function mute_sound(){
	track.volume = 0;
	volume.value = 0;
	volume_show.innerHTML = 0;
}

function playSong() {
    track.play();
    playingSong = true;
    play.innerHTML = '<i class="fas fa-pause"></i>';
}

function pauseSong() {
    track.pause();
    playingSong = false;
    play.innerHTML = '<i class="fas fa-play"></i>';
}

function nextSong() {
    if (index < songs.length - 1) {
        index += 1;
        loadTrack(index);
        playSong();
    } else {
        index = 0;
        loadTrack(index);
        playSong();

    }
}

function previousSong() {
    if (index > 0) {
        index -= 1;
        loadTrack(index);
        playSong();

    } else {
        index = songs.length;
        loadTrack(index);
        playSong();
    }
}

function justPlay() {
    if (playingSong == false) {
        playSong();

    } else {
        pauseSong();
    }
}

function reset_slider(){
    slider.value = 0;
}

// change volume
function volume_change(){
	volume_show.innerHTML = recent_volume.value;
	track.volume = recent_volume.value / 100;
}

// change slider position 
function change_duration(){
	slider_position = track.duration * (slider.value / 100);
	track.currentTime = slider_position;
}

// autoplay function
function autoplay_switch(){
	if (autoplay==1){
       autoplay = 0;
       auto_play.style.background = "rgba(255,255,255,0.2)";
	}else{
       autoplay = 1;
       auto_play.style.background = "#FF8A65";
	}
}


function range_slider() {
    let position = 0;
        
    // update slider position
    if (!isNaN(track.duration)) {
        position = track.currentTime * (100 / track.duration);
        slider.value = position;
    }

       
    // function will run when the song is over
    if (track.ended) {
        play.innerHTML = '<i class="fa fa-play" aria-hidden="true"></i>';
        if (autoplay == 1) {
            index_no += 1;
            loadTrack(index);
            playSong();
        }
    }
}
