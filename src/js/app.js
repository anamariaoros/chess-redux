import { createStore } from "redux";
import chessApp from "../reducers";
import { movePiece } from "../actions";
import "../css/main.css";

const container = document.querySelector( ".main" );

const store = createStore( chessApp );

function move( ) {
    return store.dispatch( movePiece( "1", { x: "c", y: "3" } ) );
}

function render() {
    container.innerHTML =
        `<h1>Hello from webpack starter app!</h1>
        <button
            style="width:200px;height:200px"
            onclick="${ move() }">
            Button
        </button>
        `;
}

store.subscribe( render );
render();
