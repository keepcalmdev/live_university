function play_video(video_id) {
    let video = $(video_id)[0];
    let target = $('input.progresso')[0];
    video.play();
    video.ontimeupdate = function () {
        let progresso = (video.currentTime) * 100 / video.duration;
        console.log(progresso.toString());
        target.value = progresso.toString();
    };
}

function pause_video(video_id) {
    $(video_id)[0].pause();
}

function toggle_mute_video(video_id) {
    let video = $(video_id)[0];
    video.muted = (video.muted == false) ? true : false;
}

function fullscreen_video(video_id) {
    $(video_id)[0].requestFullscreen();
}