//% block="OLED 3D" icon="\uf1b2" color=#0000ff
namespace OLED_3D {
    let objects: any[] = []
    export class Cube {
        constructor(x: number, y: number, z: number) {}
    }
    //% block="initalize OLED display"
    //% block.loc.cs="inicializovat OLED display"
    //% weight=100
    export function init() {
        OLED.init()
    }
    //% block="initalize OLED display"
    //% block.loc.cs="inicializovat OLED display"
    //% weight=99
    export function addCube() {
        objects.push(new Cube(0,0,0))
    }
}