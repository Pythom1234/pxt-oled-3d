
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
            let lines = useful.createLines([[0, 0, 0], [1, 1, 1]], [cameraPos, cameraRotation])
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


namespace useful {
    type Vertex = [number, number, number];
    type Line = [[number, number], [number, number]];

    type Camera = number[][];

    function rotateX(vertex: Vertex, angle: number): Vertex {
        const [x, y, z] = vertex;
        const rotatedY = y * Math.cos(angle) - z * Math.sin(angle);
        const rotatedZ = y * Math.sin(angle) + z * Math.cos(angle);
        return [x, rotatedY, rotatedZ];
    }

    function rotateY(vertex: Vertex, angle: number): Vertex {
        const [x, y, z] = vertex;
        const rotatedX = x * Math.cos(angle) + z * Math.sin(angle);
        const rotatedZ = -x * Math.sin(angle) + z * Math.cos(angle);
        return [rotatedX, y, rotatedZ];
    }

    function rotateZ(vertex: Vertex, angle: number): Vertex {
        const [x, y, z] = vertex;
        const rotatedX = x * Math.cos(angle) - y * Math.sin(angle);
        const rotatedY = x * Math.sin(angle) + y * Math.cos(angle);
        return [rotatedX, rotatedY, z];
    }

    function project(vertex: Vertex, camera: Camera): [number, number] {
        const [x, y, z] = [
            vertex[0] - camera[0][0],
            vertex[1] - camera[0][1],
            vertex[2] - camera[0][2],
        ];

        const rotatedX = rotateX(rotateY(rotateZ([x, y, z], camera[1][2]), camera[1][1]), camera[1][0]);
        const scaleFactor = 10;
        const screenX = rotatedX[0] * scaleFactor + 64;
        const screenY = rotatedX[1] * scaleFactor + 32;

        return [screenX, screenY];
    }

    export function createLines(vertices: Vertex[], camera: Camera): Line[] {
        const lines: Line[] = [];

        for (let i = 0; i < vertices.length; i++) {
            for (let j = i + 1; j < vertices.length; j++) {
                const start = project(vertices[i], camera);
                const end = project(vertices[j], camera);
                lines.push([start, end]);
            }
        }

        return lines;
    }
}
