//==========================================================================================

function findByAddress(obj, address) {
    if (obj.address === address) return obj;
    if (Array.isArray(obj)) {
        for (const el of obj) {
            const found = findByAddress(el, address);
            if (found) return found;
        }
    } else if (obj && typeof obj === 'object') {
        for (const key in obj) {
            const found = findByAddress(obj[key], address);
            if (found) return found;
        }
    }
    return null;
}

//==========================================================================================

function getParamMinMax(param) {
    const minValue = param?.min;
    const maxValue = param?.max;
    return [minValue, maxValue]
}

//==========================================================================================

function setMotionListeners() {
  if (typeof DeviceMotionEvent.requestPermission === 'function') {
    // alert('Motion sensors permission denied. Please enable in Settings > Safari > Motion & Orientation Access');

    // iOS 13+ requires permission request from user gesture
    DeviceMotionEvent.requestPermission()
      .then(permissionState => {
        if (permissionState === 'granted') {
          console.log("Permission granted to sensors");
        }
      })
      .catch((error) => {
        console.log("Error getting sensor permission: %O", error);
        alert('Motion sensors permission denied.');
      });
  }
  // rotationX/Y/Z come from orientation events, which iOS gates with a separate permission
  if (typeof DeviceOrientationEvent !== 'undefined' &&
      typeof DeviceOrientationEvent.requestPermission === 'function') {
    DeviceOrientationEvent.requestPermission()
      .then(state => console.log("Orientation permission: " + state))
      .catch(error => console.log("Error getting orientation permission: %O", error));
  }
}

//==========================================================================================

// On iPhone, play web audio even when the silent switch is on (Safari 16.4+)
if (navigator.audioSession) {
  navigator.audioSession.type = 'playback';
}
const audioContext = new AudioContext();