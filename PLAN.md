# Project Plan

## Goals

- Build a Go-based low-latency voice chat system.
- Keep exactly two primary modules: `client` and `server`.
- Support multiple channels with live voice plus text messaging.
- Support plain text, links, and file sharing in channel text.
- Ship a client that runs on Windows and macOS.

## Core Decisions

- Use a root `go.work` to compose `./client` and `./server`.
- Keep realtime media transport separate from signaling, text, and file transfer.
- Use WebRTC over UDP with Opus for voice in the initial version.
- Use reliable transports for coordination and messaging:
  - WebSocket for signaling, presence, and channel state.
  - HTTP for file upload and download.
- Keep the server authoritative for identity, permissions, channel state, message persistence, and file metadata.
- Avoid server-side audio mixing, transcoding, or unnecessary resampling in the first iteration.

## Proposed Repository Layout

```text
/
├── go.work
├── PLAN.md
├── client/
│   ├── go.mod
│   ├── cmd/client/
│   ├── internal/app/
│   ├── internal/media/
│   ├── internal/platform/
│   ├── internal/protocol/
│   └── internal/ui/
└── server/
    ├── go.mod
    ├── cmd/server/
    ├── internal/auth/
    ├── internal/channel/
    ├── internal/media/
    ├── internal/message/
    ├── internal/filemeta/
    ├── internal/protocol/
    └── internal/store/
```

## Architecture Sketch

### Client

- Desktop shell for sign-in, channel list, channel switching, text chat, and attachment actions.
- Media pipeline isolated behind narrow interfaces for:
  - audio capture
  - audio playback
  - device enumeration and selection
  - mute and push-to-talk
- Channel session controller that manages signaling, reconnect, speaking state, and media session lifecycle.
- Platform-specific audio code split cleanly for Windows and macOS.

### Server

- Signaling service for session setup, reconnect, and channel membership changes.
- Channel coordinator for authoritative membership, mute state, speaking state, and permissions.
- Realtime media relay path that stays independent from database and file I/O.
- Message service for channel text history and link-friendly text payloads.
- File metadata service for attachment validation, storage references, and resumable transfer coordination.

### Data Flows

- Voice:
  - client capture -> Opus encode -> WebRTC/UDP transport -> server relay -> subscribed clients
- Signaling:
  - client <-> WebSocket <-> server signaling and channel services
- Text:
  - client -> WebSocket/HTTP API -> durable store -> fanout to channel subscribers
- Files:
  - client -> chunked HTTP upload -> file storage and metadata -> message attachment reference

## Delivery Phases

### Phase 1: Workspace Bootstrap

- Create `go.work`, `client/go.mod`, and `server/go.mod`.
- Define shared protocol models in parallel client and server packages.
- Add root documentation that explains transport choices and repository layout.
- Establish interfaces for media, storage, signaling, and channel coordination.

### Phase 2: Server Control Plane

- Implement identity and session management.
- Build channel creation, join, leave, permissions, mute, and speaking-state updates.
- Add reconnect and session recovery flows.
- Store message history and file metadata behind interfaces.

### Phase 3: Voice Path

- Add WebRTC signaling and peer/session setup.
- Implement encoded audio relay without server mixing.
- Benchmark channel join latency, speaking-state propagation, and packet fanout.
- Tune buffering conservatively to favor end-to-end latency.

### Phase 4: Client Media + Shell

- Implement device discovery, input selection, output selection, mute, and push-to-talk.
- Add a minimal desktop UI for authentication, channel navigation, text chat, and voice controls.
- Keep audio pipeline and UI interactions decoupled.
- Validate behavior on both Windows and macOS early.

### Phase 5: Messaging + File Attachments

- Support plain text messages and links as first-class channel events.
- Add attachment metadata to messages.
- Implement resumable or chunked uploads separate from message fanout.
- Enforce file size, type, and permission checks at the server boundary.

### Phase 6: Hardening

- Add protocol and channel-state unit tests.
- Add benchmarks for packet handling, buffering, and latency-sensitive flows.
- Test reconnect under network interruption.
- Measure load impact of large channel fanout and file traffic on voice latency.

## Immediate Milestone

Deliver a single working channel with:

- authenticated connect
- channel join and leave
- live voice
- mute
- push-to-talk
- speaking indicators
- basic channel text messaging

This milestone proves the latency-sensitive architecture before broadening feature scope.

## Risks And Tradeoffs

- WebRTC adds implementation complexity, but it sharply reduces NAT traversal and cross-platform delivery risk.
- Cross-platform desktop audio integration is the highest client risk; keep it behind small interfaces and test on Windows and macOS from the start.
- File transfer can easily interfere with latency-sensitive paths if queues, workers, or storage calls are shared with voice.
- Over-designing persistence or permissions too early could slow down delivery without improving the realtime path.

## Success Criteria

- Voice latency remains the primary optimization target.
- Audio quality stays acceptable under normal network conditions without avoidable buffering.
- Join, leave, mute, and speaking-state updates feel immediate.
- Text and file features stay reliable without degrading the live audio path.
