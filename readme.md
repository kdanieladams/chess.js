# Chess.js
### by K. Daniel Adams

This is a simple chess engine written in ES6, transpiled using [Babel](https://babeljs.io/) minified with [Webpack](https://webpack.js.org/).  There is no AI for now, but [MiniMax](https://www.freecodecamp.org/news/simple-chess-ai-step-by-step-1d55a9266977/) is on the list for roadmap goals.  I based this project loosely on [a tutorial series from Bluefever](https://www.youtube.com/watch?v=2eA0bD3wV3Q&list=PLZ1QII7yudbe4gz2gh9BCI6VDA-xafLog) (although I couldn't make it through more than 8 episodes...my OOP mind just couldn't deal with it).  

This is simply my way of figuring out chess for JavaScript, it's not intended to be redistributable.  If you want a library that is redistributable to build your own chess game, use the official [Chessboard.js](https://chessboardjs.com/).  If you want to see what this thing can do because you're curious, read on.

## Installation and Running the Dev Build

1. Download the archive (.zip) and unpack it to your desired destination (e.g. `C:\Dev\js\chess`).
2. Install project dependencies (Babel and Webpack):
    ```
    cd C:\Dev\js\chess
    npm install
    ```
3. Build the dev version of the bundle.  The dev version is not committed to VCS.  This prevents an old version of the dev build from being persisted in VCS and distributed with the code:
    ```
    npm run build
    ```
4. Run the development server:
    ```
    npm start
    ```
5. Visit the appropriate URL in a browser (defaults to http://localhost:3000, configured in `server.js`).

Generally, I debug using browser tools.  This means any changes made to the source have to be built before they'll appear in the browser - no hotloading, sorry.  The dev build includes deep source-mapping, which can get a bit heavy as a project goes on.  Alternatively, you can run the production build, which will be minified and obfuscated, but gives you a sense of what the program looks like in prod.

## Running the Prod Build

1. (*Optional*) Build the prod version of the bundle.  The latest-stable prod version should be committed to VCS, so you can skip this part if you want to run latest-stable in a state prior to any changes you may have made:
    ```
    npm run build_prod
    ```
2. Modify `dist/index.html` to use the prod bundle:
    1. Find the `<script>` tag at the bottom of the page
    2. Replace `src='chess.js'` with `src='chess.min.js'`

3. Run the development server:
   ```
   npm start
   ```
4. Visit the appropriate URL in a browser (defaults to http://localhost:3000, configured in `server.js`).

## Modification and Adaptation
This library makes some assumptions (surprise, it's not a perfect model).  If you want to modify it, you'll need to understand a number of these assumptions:
1. The board is square.  This doesn't mean the board is a fixed size (8x8 for chess).  However, it *must* be square, otherwise the Board constructor will not fill the entire space.  If you want a rectangular board, the Board `constructor()` and `draw()` methods will need work.
   1. If you change the Board size, the Match setup-phase will need work.  It places 32 pieces on a Board that is 8x8 according to a traditional chess starting layout.  This will include editing the pieces - each piece specifies all possible starting locations for that piece according to the same layout.
   2. It is possible to use this library to build a different game with a different *square* board...or several *square* boards. Such an endeavor would require significant editing (or replacement) of the Match class.
2. The sprites are square.  Sprite size is configurable in the `globals.js` file, but there's only one dimension for them, because it's assumed that they're square.  Drawing pieces is handled in the abstract `_piece` class. 
3. The Match class is designed for chess, quite specifically as we know it in 2 dimensional terms.  But this library could handle 3d chess, with modifications to Match, Board, _piece.canMove() and match resolution goals (checkmate).  