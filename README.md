# comp_chat

`comp_chat` is a Go-based low-latency voice chat system split into two primary modules:

- `client` for the desktop application, local media pipeline, and signaling client
- `server` for authoritative channel state, signaling, presence, text messaging, and file metadata

## Transport Direction

- Voice: WebRTC over UDP with Opus-compatible defaults
- Signaling and channel state: WebSocket
- File transfer: HTTP upload and download paths kept separate from the voice path

## Repository Layout

- `go.work` composes `./client` and `./server`
- `client` targets Windows and macOS and isolates platform audio behind interfaces
- `server` keeps realtime relay separate from durable message and file flows

## Current Bootstrap

This scaffold establishes:

- compileable `client` and `server` commands
- protocol models for session, channel, message, and file events
- narrow interfaces for media, platform audio, storage, channel coordination, and auth
- a starter in-memory channel service plus tests

## Next Steps

- implement WebSocket signaling on the server
- add the client signaling session and reconnect flow
- connect WebRTC session setup to channel membership
- add persistent message and file metadata stores behind the defined interfaces
