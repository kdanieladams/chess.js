# Chess.js
### by K. Daniel Adams

This is a simple chess engine written in ES6, transpiled using [Babel](https://babeljs.io/) minified with [Webpack](https://webpack.js.org/).  There is no AI for now, but [MiniMax](https://www.freecodecamp.org/news/simple-chess-ai-step-by-step-1d55a9266977/) is on the list for roadmap goals.  *I do not intend for this library to be redistributable for any reason*; this is simply my way of figuring out chess for JavaScript.  If you want a library that is redistributable to build your own chess game, use the official [Chessboard.js](https://chessboardjs.com/).  If you want to see what this thing can do because you're curious, read on.

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