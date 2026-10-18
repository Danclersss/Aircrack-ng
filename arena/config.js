'use strict';
// Add a TURN service with short-lived credentials when deploying a relay.
// Never commit permanent TURN credentials. Tests inject their own local relay.
window.FutBRArenaConfig=window.FutBRArenaConfig||{
 iceServers:[{urls:'stun:stun.l.google.com:19302'}]
};
