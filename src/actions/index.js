export const movePiece = ( id, nextPos ) => ( {
    type: "MOVE_PIECE",
    payload: {
        id,
        nextPos,
    },
} );
