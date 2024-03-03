
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
            let lines = projectPoints(this.vertices,[0,0,0],[0,0,0])
            for (let i = 0; i < lines.length; i += 2) {
                OLED.drawLine(lines[i][0], lines[i][1], lines[i + 1][0], lines[i + 1][1], true)
            }
        }
    }
    function projectPoints(points: number[][], cameraPosition: number[], cameraRotation: number[]): number[][] {
        const result: number[][] = [];

        const rotationInRadians = cameraRotation.map(angle => (angle * Math.PI) / 180);

        for (const point of points) {
            const translatedPoint = point.map((coord, index) => coord - cameraPosition[index]);

            const rotatedPoint = [
                translatedPoint[0] * Math.cos(rotationInRadians[1]) - translatedPoint[2] * Math.sin(rotationInRadians[1]),
                translatedPoint[1] * Math.cos(rotationInRadians[0]) + translatedPoint[2] * Math.sin(rotationInRadians[0]),
                translatedPoint[0] * Math.sin(rotationInRadians[1]) + translatedPoint[2] * Math.cos(rotationInRadians[1])
            ];

            const distance = 0.001;
            const scaleFactor = distance / (distance + rotatedPoint[2]);

            const projectedPoint = [
                Math.round(rotatedPoint[0] * scaleFactor)+64,
                Math.round(rotatedPoint[1] * scaleFactor)+32
            ];

            result.push(projectedPoint);
        }

        return result;
    }
    /*
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
            const scale = 60
            let x_proj = NaN
            let y_proj = NaN
            x_proj = (rotated_point[0] / z) * scale;
            y_proj = (rotated_point[1] / z) * scale;
            return [x_proj, y_proj]
        }
        let result: number[][] = []
        for (let point of vertices) {
            let point2d = projectPoint(
                point[0] - cameraPos[0],
                point[1] + cameraPos[1],
                point[2] - cameraPos[2],
                0)
            let res = [Math.round(point2d[0] + 64), Math.round(point2d[1] + 32)]
            console.log(res[0].toString()+res[1].toString())
            result.push(res)
        }
        return result
    }*/

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
