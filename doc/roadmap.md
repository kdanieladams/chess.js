# Chess.js Roadmap
### by K. Daniel Adams

*I don't intend for this project to be redistributable for any reason at any point.*  With that in mind, I do have some goals to achieve before I consider the project complete.  As it stands, my Chess.js is moderately useful for two people who want to play a game of chess on one PC.  In the context of the internet, this seems very underserved - why can't I save matches, play with someone on the other side of the world, or versus an AI?  This roadmap will lay out some goals with the ideal in mind to make the program more of a web-app, and less a proof-of-concept.

## Goals

#### Check/Checkmate checking
Right now, the program doesn't know if you're king is in danger or not.  That's a pretty easy thing to determine by itself, but understanding whether or not the king has any possible recourse at all (checkmate) seems like something an AI should be responsible for determining, as it involves possible moves of the king, but also any pieces which might block the king from capture.  So the first aspect of the AI will likely be "can I get out of this *in-check* situation, or can I not?"

---

#### Match resolution as a draw/forfeit
It should just be a button that resolves the match in it's current state, marking it as a draw, maybe providing an option to save it in that state...  However, determining when the AI should push this button is another story.  

Perhaps it shouldn't, perhaps the only way to beat the AI should be in capturing the AI king, or producing a checkmate situation.  It seems like most chess AI's I come across adhere to this concept, as I've often found myself chasing the king as the sole opponent-piece on the board for an hour, before I give up and call a draw.  Perhaps I can create some situational awareness on the part of the AI, that if it has a small fraction of the pieces it started with, and we keep dancing with each other around the board, it could just call for a draw after so many check's or whatever...

---

#### Save match to browser storage
Given the OOP nature of the majority of the program, this one should be fairly straight-forward.  The `Match` object instance contains everything that's necessary to resume a match from any point.  We simply save that to browser storage, and provide a UI for accessing and deleting stored matches.

---

#### AI based on MiniMax algorithm
This one's going to be an adventure, I fear.  I can summarize as implementing a relatively easy-to-understand AI algorithm, but I'll have to figure out how to pass control to this algorithm, and give it the opportunity to predict possible moves, while eliminating less efficient moves until it finds the best.  This is a guide which may assist: [MiniMax](https://www.freecodecamp.org/news/simple-chess-ai-step-by-step-1d55a9266977/).

---

#### Display captures graphically
Just a box for each team displaying sprites for each captured piece they have.  Probably put this under the chess board, just for a visual reference to accompany the score.

---

#### Mouse hover effects for interactable pieces
This one seems easy, but the canvas complicates things.  HTML events only provide information about when the mouse enters the canvas and where on the canvas it is.  Determining which tile or piece is being hovered over requires constant checking of the mouse position within the canvas...I'm not sure the end-effect is worth the overhead.  Maybe I'm being silly...

---
