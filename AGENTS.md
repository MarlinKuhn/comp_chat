# Project Agent Guide

## Scope
- This file applies to the entire repository.

## Project Summary
- Build this project in Go.
- Keep the repository organized around exactly two primary modules: `client` and `server`.
- The product is a low-latency voice chat system with multiple channels.
- Each channel must support both live voice and text messaging.
- Text messaging must support plain text, links, and file sharing.
- The client target platforms are Windows and macOS.

## Repository Shape
- Prefer a root `go.work` that includes `./client` and `./server`.
- Keep `client` as its own Go module for the desktop application and local media pipeline.
- Keep `server` as its own Go module for signaling, channel coordination, presence, and message/file services.
- Do not add extra top-level application modules unless the user asks for them.

## Product Priorities
- Optimize first for end-to-end voice latency, then for audio quality, then for feature breadth.
- Preserve good audio quality under normal network conditions without adding avoidable buffering.
- Treat channel join, leave, mute, and speaking-state updates as latency-sensitive flows.
- Keep text and file features reliable, but do not let them degrade the live audio path.

## Architecture Guidance
- Use a UDP-based real-time transport for live audio. WebRTC is acceptable if it clearly improves cross-platform delivery and NAT traversal.
- Prefer Opus for voice encoding unless the user asks for a different codec.
- Avoid unnecessary transcoding, resampling, or server-side audio mixing in early iterations.
- Separate realtime media transport from reliable signaling and messaging.
- Design channels so voice membership, text history, and file metadata can evolve independently.
- Keep transport, protocol, and storage concerns behind interfaces so client and server can be tested without live devices.

## Client Guidance
- The client must build and run on both Windows and macOS.
- Keep platform-specific audio capture and playback code isolated behind narrow interfaces.
- Favor lightweight desktop approaches that work well with Go and do not add browser-style latency unless required.
- Expose clear abstractions for input device selection, output device selection, push-to-talk, mute, and channel switching.

## Server Guidance
- Keep the server authoritative for channel state, identity, permissions, message persistence, and file metadata.
- Treat the realtime voice path as performance-critical and avoid blocking it on database or file I/O.
- Prefer append-only or queue-friendly patterns for message and file events when possible.
- Make reconnect and session recovery explicit in the protocol design.

## Messaging And Files
- Support channel text messages, links, and file attachments as first-class features.
- Keep large file transfer logic separate from latency-sensitive message fan-out.
- Prefer resumable or chunked file transfer designs over single large in-memory payloads.
- Validate file metadata, size limits, and permissions at the server boundary.

## Code And Testing Expectations
- Keep dependencies minimal and justify anything heavy.
- Favor clear package boundaries over premature abstraction.
- Add unit tests for protocol logic, channel state transitions, and message handling.
- Add benchmarks for latency-sensitive code paths when touching audio transport, buffering, encoding, or packet handling.
- Document any latency-impacting tradeoffs in code comments or adjacent docs when they are not obvious.

## Change Rules
- Do not sacrifice the voice path to simplify text or file features.
- Do not introduce architecture that forces the client to depend on Linux-only behavior.
- When adding new features, state how they affect latency, audio quality, and cross-platform support.
- Keep the root documentation updated when project layout or transport decisions change.
