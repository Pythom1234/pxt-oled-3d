function projectLines(vertices: number[][]): number[][] {
    function rotatePoint(x: number, y: number, angle: number): number[] {
        const cos_theta = Math.cos(angle)
        const sin_theta = Math.sin(angle)
        const x_rotated = cos_theta * x - sin_theta * y
        const y_rotated = sin_theta * x + cos_theta * y
        return [x_rotated, y_rotated]
    }
    function projectPoint(x: number, y: number, z: number, angle: number): number[] {
        const rotated_point = rotatePoint(x, y, angle)
        const f = 2
        const scale = 2
        const x_proj = (rotated_point[0] / (z + f)) * scale
        const y_proj = (rotated_point[1] / (z + f)) * scale
        return [x_proj, y_proj]
    }
    let result: number[][] = []
    for (let point of vertices) {
        let point2d = projectPoint(point[0], point[1], point[2], 0)
        result.push(point2d)
    }
    return result
}
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
            let lines = projectLines([[0, 0, 0], [1, 1, 1]])
            console.log(lines[0])
            console.log(lines[1])
            console.log(lines.length)
            for (let i = 0; i < lines.length; i += 2) {
                OLED.drawLine(lines[i][0], lines[i][1], lines[i + 1][0], lines[i + 1][1], true)
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

