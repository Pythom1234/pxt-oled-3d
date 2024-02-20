//% block="OLED 3D" icon="\uf1b2" color=#0000ff
namespace OLED_3D {
    let objects: any[] = []
    let cameraPos: number[] = [0, 0, 0]
    let cameraRotation: number[] = [0, 0, 0]
    export class Cube {
        x: number
        y: number
        z: number
        constructor(_x: number, _y: number, _z: number) {
            this.x = _x
            this.y = _y
            this.z = _z
        }
        
        public draw(): void {}
    }
    //% block="initalize OLED display"
    //% block.loc.cs="inicializovat OLED display"
    //% weight=100
    export function init(): void {
        OLED.init()
        OLED.clear(false)
    }
    //% block="draw"
    //% block.loc.cs="vykreslit"
    //% weight=99
    export function draw(): void {
        OLED.draw()
    }
    //% block="add cube|x $x|y $y|z $z"
    //% block.loc.cs="přidat krychli|x $x|y $y|z $z"
    //% inlineInputMode=external
    //% weight=98
    export function addCube(x: number, y: number, z: number): void {
        objects.push(new Cube(x, y, z))
    }
}