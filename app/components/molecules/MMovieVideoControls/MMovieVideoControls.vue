<script setup>
import { formatTime } from '~/utils/formatTime'

defineProps({
	isFullscreen: Boolean,
	isHovered: Boolean,
	isPlaying: Boolean,
	currentTime: Number,
	duration: Number,
	volume: Number,
	showVolumeControls: Boolean,
	seekBarStyle: Object,
	volumeBarStyle: Object,
})

const emit = defineEmits([
	'togglePlay',
	'handleSeek',
	'toggleFullscreen',
	'adjustVolume',
	'toggleSettings',
	'toggleShowVolume',
])

const volume = defineModel('volume', { type: Number, default: 1 })
</script>

<template>
	<div
		class="m-movie-video-controls"
		:class="{ fullscreen: isFullscreen, hidden: !isHovered }"
	>
		<div class="m-movie-video-controls-left">
			<div
				class="m-movie-video-controls-left-play-pause"
				@click="emit('togglePlay')"
			>
				<Icon v-if="!isPlaying" name="mdi:play" />
				<Icon v-else name="mdi:pause" />
			</div>
			<span>{{ formatTime(currentTime) }}</span>
			<span>/</span>
			<span>{{ formatTime(duration) }}</span>
			<input
				class="m-movie-video-controls-left-seek-bar"
				type="range"
				min="0"
				:max="duration"
				step="0.1"
				:value="currentTime"
				@input="emit('handleSeek', $event)"
				:style="seekBarStyle"
			/>
		</div>
		<div class="m-movie-video-controls-right">
			<Icon
				name="mdi:volume-off"
				v-if="volume <= 0.01"
				@click="emit('toggleShowVolume')"
			/>
			<Icon v-else name="mdi:volume-high" @click="emit('toggleShowVolume')" />
			<input
				v-show="showVolumeControls"
				type="range"
				min="0"
				max="1"
				class="m-movie-video-controls-right-volume-bar"
				step="0.1"
				v-model="volume"
				@input="emit('adjustVolume', $event)"
				:style="volumeBarStyle"
			/>
			<Icon name="mdi:cog" @click="emit('toggleSettings')" />
			<Icon
				name="mdi:fullscreen"
				v-if="!isFullscreen"
				@click="emit('toggleFullscreen')"
			/>
			<Icon
				name="mdi:fullscreen-exit"
				v-else
				@click="emit('toggleFullscreen')"
			/>
		</div>
	</div>
</template>

<style src="./MMovieVideoControls.scss" lang="scss" scoped />
