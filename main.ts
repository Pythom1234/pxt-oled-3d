namespace useful {
    type Vertex = [number, number, number];
    type Line = [Vertex, Vertex];

    // Definice typu pro kameru
    type Camera = {
        position: Vertex;
        rotation: Vertex; // Natočení kamery ve formě [pitch, yaw, roll]
    };

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
            vertex[0] - camera.position[0],
            vertex[1] - camera.position[1],
            vertex[2] - camera.position[2],
        ];

        // Natočení souřadnic podle natočení kamery
        const rotatedX = rotateX(rotateY(rotateZ([x, y, z], camera.rotation[2]), camera.rotation[1]), camera.rotation[0]);
        // Projekce na rovinu XZ (ignoruje třetí souřadnici)
        const scaleFactor = 10; // Měřítko pro změnu velikosti výsledného obrazu
        const screenX = rotatedX[0] * scaleFactor + 64;
        const screenY = rotatedX[1] * scaleFactor + 32;

        return [screenX, screenY];
    }

    function createLines(vertices: Vertex[], camera: Camera): number[][][] {
        const lines: number[][][] = [];

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

//% block="OLED 3D" icon="\uf1b2" color=#0000ff
namespace OLED_3D {
    let objects: any[] = []
    let cameraPos: number[] = [0, 0, 0]
    let cameraRotation: number[] = [0, 0, 0]
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
        }
    }
    function drawVertices(vertices: number[][][]) {
        for (let tuple of vertices) {
            
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