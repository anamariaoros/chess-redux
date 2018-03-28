const initialState = [ {
    id: "1",
    type: "pawn",
    color: "white",
    x: "a",
    y: "1",
},
{
    id: "2",
    type: "pawn",
    color: "white",
    x: "a",
    y: "2",
},
];

export default ( state = initialState, action ) => {
    switch ( action.type ) {
        case "MOVE_PIECE":
            console.log( "a piece was moved" );
            const movedPiece = state.find( piece => piece.id === action.payload.id );
            console.log( "movedPiece", movedPiece );
            const updatedPiece = Object.assign( {}, movedPiece, { x: action.payload.nextPos.x, y: action.payload.nextPos.y } );
            console.log( "updatedPiece", updatedPiece );
            const newState = [ ...state.slice( 0, movedPiece.id ), updatedPiece, ...state.slice( movedPiece.id + 1 ) ];
            console.log( "newState", newState );
            return newState;
        default:
            return state;
    }
};
