<script setup>
const { videoLink, qualityOptions } = defineProps({
  videoLink: String,
  qualityOptions: Array,
});
const isPlaying = ref(false);
const isHovered = ref(false);
const currentTime = ref(0);
const duration = ref(0);
const volume = ref(1);
const videoPlayer = ref(null);
const isFullscreen = ref(false);
const showVolumeControls = ref(false);
const isPlayerSettings = ref(false);
const newSpeed = ref(1);

let controlsTimeout = null;

function togglePlay() {
  if (videoPlayer.value.paused) {
    videoPlayer.value.play();
    isPlaying.value = true;
  } else {
    videoPlayer.value.pause();
    isPlaying.value = false;
  }
}
function initializeVideo() {
  duration.value = videoPlayer.value.duration;
  videoPlayer.value.volume = volume.value;
  if (currentTime.value > 0) {
    videoPlayer.value.currentTime = currentTime.value;
  }
}

function ShowControls() {
  if (isFullscreen) {
    clearTimeout(controlsTimeout);
    controlsTimeout = setTimeout(() => {
      isHovered.value = false;
    }, 4000);
  }

  if (isHovered.value) {
    isHovered.value = false;
  }
  if (!isHovered.value) {
    isHovered.value = true;
  }
}

function handleSeek(event) {
  videoPlayer.value.currentTime = event.target.value;
  currentTime.value = event.target.value;
}

const seekBarStyle = computed(() => {
  const progressPercentage = (currentTime.value / duration.value) * 100;
  return {
    background: `linear-gradient(to right, #ffd700 ${progressPercentage}%, #ddd ${progressPercentage}%)`,
  };
});

function toggleFullscreen() {
  const wrapper = videoPlayer.value.closest('.s-movie-player-video-wrapper');
  if (!isFullscreen.value) {
    if (wrapper.requestFullscreen) {
      wrapper.requestFullscreen();
    } else if (wrapper.webkitRequestFullscreen) {
      wrapper.webkitRequestFullscreen();
    } else if (wrapper.mozRequestFullScreen) {
      wrapper.mozRequestFullScreen();
    } else if (wrapper.msRequestFullscreen) {
      wrapper.msRequestFullscreen();
    }
    isFullscreen.value = true;
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    }
    isFullscreen.value = false;
  }
}

function seek(seconds) {
  const newTime = videoPlayer.value.currentTime + seconds;
  videoPlayer.value.currentTime = Math.min(
    Math.max(newTime, 0),
    duration.value,
  );
  currentTime.value = videoPlayer.value.currentTime;
}

function handleKeydown(event) {
  if (event.code === 'Space') {
    event.preventDefault();
    togglePlay();
  }
  if (event.code === 'ArrowRight' || event.code === 'KeyD') {
    seek(5);
  }
  if (event.code === 'ArrowLeft' || event.code === 'KeyA') {
    seek(-5);
  }
  if (event.code === 'KeyF') {
    toggleFullscreen();
  }
}

function adjustVolume(event) {
  volume.value = event.target.value;
  videoPlayer.value.volume = volume.value;
}

const volumeBarStyle = computed(() => {
  const volumePercentage = volume.value * 100;
  return {
    background: `linear-gradient(to right, #ffd700 ${volumePercentage}%, #ddd ${volumePercentage}%)`,
  };
});

const changePlaybackSpeed = (event) => {
  const speed = parseFloat(event.target.value);
  newSpeed.value = speed;
  if (videoPlayer.value) {
    videoPlayer.value.playbackRate = speed;
  }
};

function handleTimeUpdate() {
  currentTime.value = videoPlayer.value.currentTime;
}

onMounted(() => {
  window.addEventListener('keydown', handleKeydown);
});
onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown);
});
</script>

<template>
  <section class="s-movie-player">
    <div class="container">
      <div
        class="s-movie-player-video-wrapper"
        @mouseenter="isHovered = true"
        @mouseleave="isHovered = false"
        @touchstart="ShowControls"
      >
        <video
          class="s-movie-player-video-wrapper-video"
          :src="videoLink"
          ref="videoPlayer"
          :controls="false"
          @mouseenter="ShowControls"
          @mousemove="ShowControls"
          @loadedmetadata="initializeVideo"
          @timeupdate="handleTimeUpdate"
          @click="togglePlay"
          @play="isPlaying = true"
          @pause="isPlaying = false"
          @contextmenu.prevent
        />
        <div
          class="s-movie-player-video-wrapper-play-pause-overlay"
          @click="togglePlay"
        >
          <Icon v-if="!isPlaying" name="mdi:play" />
        </div>
        <MMovieVideoControls
          :isFullscreen="isFullscreen"
          :isHovered="isHovered"
          :isPlaying="isPlaying"
          :currentTime="currentTime"
          :duration="duration"
          :volume="volume"
          :showVolumeControls="showVolumeControls"
          :seekBarStyle="seekBarStyle"
          :volumeBarStyle="volumeBarStyle"
          @togglePlay="togglePlay"
          @handleSeek="handleSeek"
          @toggleFullscreen="toggleFullscreen"
          @adjustVolume="adjustVolume"
          @toggleSettings="isPlayerSettings = !isPlayerSettings"
          @toggleShowVolume="showVolumeControls = !showVolumeControls"
        />
        <MMoviePlayerSettings
          :isFullscreen="isFullscreen"
          :qualityOptions
          :hidden="isPlayerSettings"
          @close="isPlayerSettings = false"
          @changeSpeed="changePlaybackSpeed"
          v-model="newSpeed"
        />
      </div>
    </div>
  </section>
</template>

<style src="./SMoviePlayer.scss" lang="scss" scoped />
