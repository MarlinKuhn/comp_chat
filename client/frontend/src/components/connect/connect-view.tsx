import { useState } from 'react'
import logo from '../../assets/images/logo.png'
import {Greet} from "@wails/go/app/App";

export default function ConnectView() {
    const [resultText, setResultText] = useState('Please enter your name below.')
    const [name, setName] = useState('')

    function greet() {
        Greet(name).then(setResultText)
    }

    return (
        <main className="flex min-h-screen items-center justify-center px-6 py-10">
            <section className="w-full max-w-4xl overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950/45 shadow-panel backdrop-blur">
                <div className="grid gap-8 lg:grid-cols-[1.1fr,0.9fr]">
                    <div className="flex flex-col justify-between gap-8 px-8 py-10 sm:px-10 lg:px-12">
                        <div className="space-y-5 text-left">
                            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-sky-300/80">
                                Nano Wave
                            </p>
                            <h1 className="max-w-md text-2xl font-black tracking-tight text-white sm:text-3xl">
                                Low-latency voice and channel messaging, ready for gamers.
                            </h1>
                        </div>
                        <div className="rounded-3xl border border-sky-400/20 bg-slate-900/80 p-6">
                            <label className="mb-3 block text-sm font-medium uppercase tracking-[0.3em] text-slate-400" htmlFor="name">
                                Quick Check
                            </label>
                            <div className="flex flex-col gap-3 sm:flex-row">
                                <input
                                    id="name"
                                    name="input"
                                    type="text"
                                    autoComplete="off"
                                    value={name}
                                    onChange={(event) => setName(event.target.value)}
                                    className="min-w-0 flex-1 rounded-2xl border border-white/10 bg-slate-950/80 px-4 py-3 text-base text-white outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-400/30"
                                    placeholder="Enter your name"
                                />
                                <button
                                    type="button"
                                    onClick={greet}
                                    className="rounded-2xl bg-sky-400 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-sky-300 focus:outline-none focus:ring-2 focus:ring-sky-200/70"
                                >
                                    Send
                                </button>
                            </div>
                            <p className="mt-4 min-h-[1.75rem] text-sm text-slate-300">{resultText}</p>
                        </div>
                    </div>
                    <div className="relative flex items-center justify-center overflow-hidden border-t border-white/10 bg-gradient-to-br from-sky-500/10 via-slate-900 to-slate-950 px-8 py-10 lg:border-l lg:border-t-0">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.2),transparent_55%)]" />
                        <img src={logo} alt="Comp Chat logo" className="relative z-10 w-full max-w-sm" />
                    </div>
                </div>
            </section>
        </main>
    )
}
