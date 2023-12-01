# odin-etch-a-sketch

Odin etch a sketch project

# SPEC

GRID

Hover effect vs press effect
to change color of grid square

be able to change number of sqaures
with upper limit of 100

keep grid same size always

change color not to single color but random color

progressive darkening effect with some percent more darkening

first make grid change able
user input number of sqaures
change dimension of sqaure class
change number of sqaures needed

change width and height in sqaure class
change iterators in javascript

add hover and press and black coloring options
on hover or on press

add event listeners

html options:

color picker

random color

darkening colors

Input draw mode, draw mode effects listeners on each square each
square needs a listener for on mousedown and on mouseenter pressed
if mouse is down and mouse enters a new square then we can "addColor"

how does this complicate the add color functioin,

right now we just add 1 event listener on mouseover

but what we need to do is add a mousedown listener that colors the square

and then create a boolean variable that keeps track of mouse down

and then we add a listener that takes into account the mousedown boolean along with
listening to mousedown

that boolean is change when mouse goes up

will need a general mouse up listener that turns the mousedown boolean false

how does everything combine

changeSquares() //changes amount of squares (doesnt need to change listeners)

changeColor() //changes color applied to squares

randomColor() //changes color applied to squares

changeBackgroundColor() //changes background color of squares

darkening() // changes percent of color applied, add a multiplier to rgb

eraser() //changes individual squares to background color

clear() clear all squares to background color

changeDrawMode() //changes listeners on sqaures

Create squares first before adding any listeners to them

coloring has nothing to do with the creation of squares, cant color squares before
they have been made but the coloring inputs don't interact with the squares

drawmode needs to add and remove listeners from squares

main()

function main() {
//add squares
//add drawmode

    listen()

}

function listen() {

    listenNewGridSize()
    listenForNewDrawMode()
    listenForDrawEvent()
    listenForNewColors()

}

function listenNewGridSize() {
//event listener
//erase grid
//add new grid with appropriate square  
//add back appropriate listeners
}

function listenNewDrawMode() {
//add listener to draw mode button set global draw mode
}

function listenForDrawEvent() {
hover listener --> easy
press listener -->:
add listener for mouse down
set mousedown to true
add color
add listener for mouse up
set mousedown to false
add listener to mousenter
if (mousedown true)
add color

}

function listenForNewColor {
// have global variable for color
listener to colorPicker
listenre to background color
lister to random color
listener to darkening changes multiplier for on color
have background color and target color (doesnt work for random)
set square background color to target color in increments of 10%
always start with grid background color to get increment towards target
either you know what the background color is or darkening isnt possible
you always have to set color to bg color -> target color, cant shade a existent color, have to replace it
}
