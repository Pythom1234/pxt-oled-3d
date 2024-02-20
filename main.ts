//% block="OLED 3D" icon="\uf1b2" color=#0000ff
namespace OLED_3D {
    let objects: any[] = []
    export class Cube {
        x: number
        y: number
        z: number
        constructor(_x: number, _y: number, _z: number) {
            this.x = _x
            this.y = _y
            this.z = _z
        }
    }
    //% block="initalize OLED display"
    //% block.loc.cs="inicializovat OLED display"
    //% weight=100
    export function init() {
        OLED.init()
        OLED.clear(false)
    }
    //% block="draw"
    //% block.loc.cs="vykreslit"
    //% weight=99
    export function draw() {
        OLED.draw()
    }
    //% block="add cube|x $x|y $y|z $z"
    //% block.loc.cs="přidat krychli|x $x|y $y|z $z"
    //% inlineInputMode=external
    //% weight=99
    export function addCube(x: number, y: number, z: number) {
        objects.push(new Cube(x, y, z))
    }
}