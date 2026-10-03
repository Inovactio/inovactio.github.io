# Core concepts

These pages cover the rules that apply across the whole library, whatever base class you extend. Read them before writing your second ability: each one describes a mistake that compiles, runs, and silently does the wrong thing.

| Page | What it answers |
|---|---|
| [The registry](registry.md) | Every `register...` method of `AkumaRegistry`, the id it gives and the name it records |
| [Damage](damage.md) | Why a damage constant of 10 deals 4, and why a burst sometimes deals nothing at all |
| [What the library registers](library-registrations.md) | What you get for free, and what you must never register yourself |
| [Morph gates and stats](morph-gates-and-stats.md) | Locking a technique to a form, and declaring a form's attributes in one line |
| [Amplification](amplification.md) | Letting a morph upgrade the rest of its fruit's kit |
| [Charges](charges.md) | Why an interrupted charge delivers its full effect, and the one line that stops it |
| [Held inputs](held-inputs.md) | Why a right click in the open air never reaches the server, and how an ability learns that a key is held |
