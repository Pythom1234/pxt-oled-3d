
//% block="OLED 3D" icon="\uf1b2" color=#0065ff
namespace OLED_3D {
    let objects: Cube[] = []
    export let cameraPos = [0, 0, 0]
    export let cameraRotation = [0, 0, 0]
    let maxId = 0
    export class Cube {
        public _x: number
        public _y: number
        public _z: number
        public size: number
        public vertices: number[][]
        public id: number
        public name: string
        constructor(_x: number, _y: number, _z: number, _size: number, _id: number, _name: string) {
            this._x = _x
            this._y = _y
            this._z = _z
            this.size = _size
            this.id = _id
            this.name = _name
            this.setup()
        }

        set x(value: number) {
            this._x = value
            this.setup()
        }
        set y(value: number) {
            this._y = value
            this.setup()
        }
        set z(value: number) {
            this._z = value
            this.setup()
        }
        get x(): number {
            return this._x
        }
        get y(): number {
            return this._y
        }
        get z(): number {
            return this._z
        }

        private setup(): void {
            const s = this.size
            const x = this._x
            const y = this._y
            const z = this._z
            this.vertices = [
                [-s + x, -s - y, -s + z],
                [s + x, -s - y, -s + z],

                [-s + x, -s - y, -s + z],
                [-s + x, s - y, -s + z],

                [s + x, -s - y, -s + z],
                [s + x, s - y, -s + z],

                [-s + x, s - y, -s + z],
                [s + x, s - y, -s + z],

                [-s + x, -s - y, s + z],
                [s + x, -s - y, s + z],

                [-s + x, -s - y, s + z],
                [-s + x, s - y, s + z],

                [s + x, -s - y, s + z],
                [s + x, s - y, s + z],

                [-s + x, s - y, s + z],
                [s + x, s - y, s + z],

                [-s + x, -s - y, -s + z],
                [-s + x, -s - y, s + z],

                [-s + x, s - y, -s + z],
                [-s + x, s - y, s + z],

                [s + x, -s - y, -s + z],
                [s + x, -s - y, s + z],

                [s + x, s - y, -s + z],
                [s + x, s - y, s + z],

            ]
        }

        public draw(): void {
            let lines = projectPoints(this.vertices, cameraPos, cameraRotation)
            for (let i = 0; i < lines.length; i += 2) {
                OLED.drawLine(lines[i][0], lines[i][1], lines[i + 1][0], lines[i + 1][1], true)
            }
        }
    }
    function projectPoints(points: number[][], cameraPosition: number[], cameraRotation: number[]): number[][] {
        const size = 40
        const centerX = 64
        const centerY = 32
        let rotatedVertices = points.map(vertex => {
            let x = vertex[0];
            let y = vertex[1];
            let z = vertex[2];

            let cosX = Math.cos(cameraRotation[0]);
            let sinX = Math.sin(cameraRotation[0]);
            let rotatedY = y * cosX - z * sinX;
            let rotatedZ = y * sinX + z * cosX;

            let cosY = Math.cos(cameraRotation[1]);
            let sinY = Math.sin(cameraRotation[1]);
            let rotatedX = x * cosY + rotatedZ * sinY;
            let rotatedZ2 = -x * sinY + rotatedZ * cosY;

            let cosZ = Math.cos(cameraRotation[2]);
            let sinZ = Math.sin(cameraRotation[2]);
            let rotatedX2 = rotatedX * cosZ - rotatedY * sinZ;
            let rotatedY2 = rotatedX * sinZ + rotatedY * cosZ;

            let scaleFactor = 200 / (200 + rotatedZ2);
            let projectedX = rotatedX2 * scaleFactor;
            let projectedY = rotatedY2 * scaleFactor;

            let screenX = centerX + projectedX;
            let screenY = centerY + projectedY;

            return [screenX,screenY];
        })
        return rotatedVertices
    }

    //% block="initalize OLED display"
    //% weight=100
    export function init(): void {
        OLED.init()
        OLED.clear(false)
    }
    //% block="draw"
    //% weight=99
    export function draw(): void {
        for (let obj of objects) {
            obj.draw()
        }
        OLED.draw()
    }
    //% block="clear"
    //% weight=98
    export function clear(): void {
        OLED.clear(false)
    }
    //% block="move camera to x $x y $y z $z"
    //% weight=97
    //% inlineInputMode=inline
    export function moveCamera(x: number, y: number, z: number): void {
        cameraPos = [x, y, z]
    }
    //% block="move camera by x $x y $y z $z"
    //% weight=96
    //% inlineInputMode=inline
    export function moveCameraBy(x: number, y: number, z: number): void {
        cameraPos[0] += x
        cameraPos[1] += y
        cameraPos[2] += z
    }
    //% block="rotate camera to x $x y $y z $z"
    //% weight=95
    //% inlineInputMode=inline
    export function rotateCamera(x: number, y: number, z: number): void {
        cameraRotation = [x, y, z]
    }
    //% block="rotate camera by x $x y $y z $z"
    //% weight=94
    //% inlineInputMode=inline
    export function rotateCameraBy(x: number, y: number, z: number): void {
        cameraRotation[0] += x
        cameraRotation[1] += y
        cameraRotation[2] += z
    }
    //% block="cube|x $x|y $y|z $z|size $size||name $name"
    //% x.defl=0
    //% y.defl=0
    //% z.defl=0
    //% size.defl=1
    //% inlineInputMode=external
    //% expandableArgumentMode=enabled
    //% weight=100
    //% subcategory="objects"
    export function cube(x: number, y: number, z: number, size: number, name?: string): Cube {
        if (name) { } else { name = "OBJECT" }
        const cube = new Cube(x, y, z, size, maxId, name)
        maxId += 1
        objects.push(cube)
        return cube
    }
    //% block="move object with ID $value to|x $x|y $y|z $z"
    //% inlineInputMode=external
    //% weight=100
    //% subcategory="moving"
    export function moveObjectID(value: number, x: number, y: number, z: number): void {
        objects[value].x = x
        objects[value].y = y
        objects[value].z = z
    }
    //% block="move object with name $value to|x $x|y $y|z $z"
    //% inlineInputMode=external
    //% weight=99
    //% subcategory="moving"
    export function moveObjectName(value: string, x: number, y: number, z: number): void {
        for (let i of objects) {
            if (i.name == value) {
                i.x = x
                i.y = y
                i.z = z
            }
        }
    }
    //% block="move object with ID $value by|x $x|y $y|z $z"
    //% inlineInputMode=external
    //% weight=98
    //% subcategory="moving"
    export function moveObjectIDBy(value: number, x: number, y: number, z: number): void {
        objects[value].x += x
        objects[value].y += y
        objects[value].z += z
    }
    //% block="move object with name $value by|x $x|y $y|z $z"
    //% inlineInputMode=external
    //% weight=97
    //% subcategory="moving"
    export function moveObjectNameBy(value: string, x: number, y: number, z: number): void {
        for (let i of objects) {
            if (i.name == value) {
                i.x += x
                i.y += y
                i.z += z
            }
        }
    }
}
