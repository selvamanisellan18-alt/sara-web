// Web Audio API romantic melody generator & sound effects

class RomanticAudioEngine {
  constructor() {
    this.ctx = null;
    this.isPlayingBGM = false;
    this.bgmTimer = null;
    this.masterGain = null;
    this.soundscape = 'piano'; // 'piano' | 'musicbox' | 'aurora'
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
        this.masterGain = this.ctx.createGain();
        this.masterGain.gain.setValueAtTime(0.2, this.ctx.currentTime);
        this.masterGain.connect(this.ctx.destination);
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  setSoundscape(mode) {
    this.soundscape = mode;
  }

  playChime(type = 'sweet') {
    this.init();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    
    if (type === 'heart') {
      osc.frequency.setValueAtTime(523.25, now); // C5
      osc.frequency.exponentialRampToValueAtTime(659.25, now + 0.15); // E5
      osc.frequency.exponentialRampToValueAtTime(783.99, now + 0.35); // G5
      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.6);
    } else if (type === 'gift') {
      osc.frequency.setValueAtTime(440, now); // A4
      osc.frequency.exponentialRampToValueAtTime(880, now + 0.4); // A5
      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.8);
    } else {
      osc.frequency.setValueAtTime(587.33, now); // D5
      osc.frequency.exponentialRampToValueAtTime(880, now + 0.2); // A5
      gain.gain.setValueAtTime(0.1, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);
    }

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.9);
  }

  // Play real Tamil romantic song Vaarayo Vaarayo (Aadhavan)
  startRomanticBGM() {
    this.init();
    if (this.isPlayingBGM) return;
    this.isPlayingBGM = true;

    if (!this.bgmAudio) {
      this.bgmAudio = new Audio('/audio/vaarayo-vaarayo.mp3');
      this.bgmAudio.loop = true;
      this.bgmAudio.volume = 0.55;
    }

    const playPromise = this.bgmAudio.play();
    if (playPromise !== undefined) {
      playPromise.catch((err) => {
        console.warn('Audio playback waiting for user gesture or delayed:', err);
      });
    }
  }

  stopRomanticBGM() {
    this.isPlayingBGM = false;
    if (this.bgmAudio) {
      this.bgmAudio.pause();
    }
    if (this.bgmTimer) {
      clearTimeout(this.bgmTimer);
      this.bgmTimer = null;
    }
  }

  toggleRomanticBGM() {
    if (this.isPlayingBGM) {
      this.stopRomanticBGM();
      return false;
    } else {
      this.startRomanticBGM();
      return true;
    }
  }
}

export const audioService = new RomanticAudioEngine();
