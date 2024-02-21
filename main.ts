
//% block="OLED 3D" icon="\uf1b2" color=#0000ff
namespace OLED_3D {
    let objects: Cube[] = []
    let cameraPos = [0, 0, 0]
    let cameraRotation = [0, 90, 0]
    export class Cube {
        public x: number
        public y: number
        public z: number
        public size: number
        constructor(_x: number, _y: number, _z: number, _size: number) {
            this.x = _x
            this.y = _y
            this.z = _z
            this.size = _size
        }

        public draw(): void {
            let lines = [[[10,10],[30,30]]]
            console.log(lines)
            for (let line of lines) {
                OLED.drawLine(line[0][0], line[0][1], line[1][0], line[1][1], true)
                console.log(line)
            }
        }
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
        for (let obj of objects) {
            obj.draw()
        }
        OLED.draw()
    }
    //% block="cube|x $x|y $y|z $z|size $size"
    //% block.loc.cs="krychle|x $x|y $y|z $z|velikost $size"
    //% x.defl=0
    //% y.delf=0
    //% z.delf=0
    //% size.delf=1
    //% inlineInputMode=external
    //% weight=98
    export function addCube(x: number, y: number, z: number, size: number): Cube {
        objects.push(new Cube(x, y, z, size))
        return new Cube(x, y, z, size)
    }
}

