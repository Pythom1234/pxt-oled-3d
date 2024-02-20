//% block="OLED 3D" icon="\uf1b2" color=#0000ff
namespace OLED_3D {
    export class Cube {
        constructor() {}
    }
    let objects = []
    //% block="initalize OLED display"
    //% block.loc.cs="inicializovat OLED display"
    export function init() {
        OLED.init()
    }
}