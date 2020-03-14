export const Direction = Object.freeze({
    NORTH:      Object.freeze({x:  0, y: -1, sprite: 0}),
    NORTHEAST:  Object.freeze({x:  1, y: -1, sprite: 1}),
    EAST:       Object.freeze({x:  1, y:  0, sprite: 2}),
    SOUTHEAST:  Object.freeze({x:  1, y:  1, sprite: 3}),
    SOUTH:      Object.freeze({x:  0, y:  1, sprite: 4}),
    SOUTHWEST:  Object.freeze({x: -1, y:  1, sprite: 5}),
    WEST:       Object.freeze({x: -1, y:  0, sprite: 6}),
    NORTHWEST:  Object.freeze({x: -1, y: -1, sprite: 7}),
});
export const anim = [0, 1, 2, 1, 0, 4, 3, 4];
